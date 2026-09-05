"use client";

import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type IntroPhase = "greetings" | "identity" | "profile";
type IntroMode = "pending" | "play" | "skip";

type PortfolioIntroProps = {
  firstName: string;
  fullName: string;
  introduction: string;
  jobTitle: string;
  profileImage: string;
  remainingName: string;
};

type ProfileHeaderProps = Omit<PortfolioIntroProps, "introduction"> & {
  shouldAnimateDetails: boolean;
};

const greetings = [
  "Hello",
  "Bonjour",
  "你好",
  "Kamusta",
  "Hola",
  "Ciao",
  "Olá",
  "Namaste",
  "Konnichiwa",
] as const;

const introSessionKey = "portfolio-intro-played";
const greetingDurationMs = 180;
const identityHoldMs = 600;
const curtainDelaySeconds = 0.78;
const curtainDurationSeconds = 0.28;
const avatarLayoutId = "portfolio-profile-avatar";
const nameLayoutId = "portfolio-profile-name";

const profileLayoutTransition = {
  duration: 0.65,
  ease: [0.77, 0, 0.175, 1],
  type: "tween",
} as const;

const curtainTransition = {
  delay: curtainDelaySeconds,
  duration: curtainDurationSeconds,
  ease: [0.23, 1, 0.32, 1],
  type: "tween",
} as const;

const detailTransition = {
  delay: 0.58,
  duration: 0.18,
  ease: [0.23, 1, 0.32, 1],
  type: "tween",
} as const;

const roleTransition = {
  ...detailTransition,
  delay: detailTransition.delay + 0.06,
} as const;

let introHasPlayedInMemory = false;

function useLockPageScroll(isLocked: boolean) {
  useLayoutEffect(() => {
    if (!isLocked) return;

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPaddingRight = body.style.paddingRight;
    const scrollbarWidth = Math.max(0, window.innerWidth - html.clientWidth);
    const bodyPaddingRight =
      Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${bodyPaddingRight + scrollbarWidth}px`;
    }

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.paddingRight = previousBodyPaddingRight;
    };
  }, [isLocked]);
}

function ProfileHeader({
  firstName,
  fullName,
  jobTitle,
  profileImage,
  remainingName,
  shouldAnimateDetails,
}: ProfileHeaderProps) {
  return (
    <div className="relative z-[60] flex min-w-0 items-center gap-3.5 sm:gap-4">
      <motion.div
        layoutId={shouldAnimateDetails ? avatarLayoutId : undefined}
        transition={
          shouldAnimateDetails ? { layout: profileLayoutTransition } : undefined
        }
        className="size-[52px] shrink-0 overflow-hidden rounded-full border border-border bg-surface sm:size-14"
        style={{ borderRadius: 9999 }}
      >
        <Image
          src={profileImage}
          alt={`Portrait of ${fullName}`}
          width={80}
          height={80}
          priority
          className="size-full object-cover grayscale"
        />
      </motion.div>

      <div className="min-w-0">
        <h1 className="flex min-w-0 items-baseline gap-[0.3em] whitespace-nowrap text-sm font-normal tracking-[-0.01em] sm:text-[15px]">
          <motion.span
            layoutId={shouldAnimateDetails ? nameLayoutId : undefined}
            transition={
              shouldAnimateDetails
                ? { layout: profileLayoutTransition }
                : undefined
            }
            className="inline-block shrink-0"
          >
            {firstName}
          </motion.span>
          <motion.span
            initial={
              shouldAnimateDetails
                ? { opacity: 0, transform: "translate3d(0, 2px, 0)" }
                : false
            }
            animate={{ opacity: 1, transform: "translate3d(0, 0, 0)" }}
            transition={detailTransition}
            className="inline-block min-w-0"
          >
            {remainingName}
          </motion.span>
        </h1>

        <motion.p
          initial={
            shouldAnimateDetails
              ? { opacity: 0, transform: "translate3d(0, 4px, 0)" }
              : false
          }
          animate={{ opacity: 1, transform: "translate3d(0, 0, 0)" }}
          transition={roleTransition}
          className="mt-0.5 text-[11px] text-muted sm:text-xs"
        >
          {jobTitle}
        </motion.p>
      </div>
    </div>
  );
}

export function PortfolioIntro({
  firstName,
  fullName,
  introduction,
  jobTitle,
  profileImage,
  remainingName,
}: PortfolioIntroProps) {
  // Keep the server and first client render identical and readable before hydration.
  const [mode, setMode] = useState<IntroMode>("pending");
  const [phase, setPhase] = useState<IntroPhase>("greetings");
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const hasDecidedRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();
  const shouldPlayIntro =
    mode === "play" && !shouldReduceMotion && !isIntroComplete;
  const visiblePhase = shouldPlayIntro ? phase : "profile";
  const shouldLockScroll = shouldPlayIntro;

  useLockPageScroll(shouldLockScroll);

  useLayoutEffect(() => {
    if (hasDecidedRef.current) return;
    hasDecidedRef.current = true;

    try {
      introHasPlayedInMemory ||=
        window.sessionStorage.getItem(introSessionKey) === "true";
    } catch {
      // Fall back to the in-memory flag when storage is unavailable.
    }

    if (introHasPlayedInMemory) {
      queueMicrotask(() => setMode("skip"));
      return;
    }

    introHasPlayedInMemory = true;

    queueMicrotask(() => setMode("play"));
  }, []);

  useEffect(() => {
    if (!shouldPlayIntro) return;

    const timers = greetings.slice(1).map((_, index) =>
      window.setTimeout(
        () => setGreetingIndex(index + 1),
        (index + 1) * greetingDurationMs,
      ),
    );
    const identityStart = greetings.length * greetingDurationMs;

    timers.push(
      window.setTimeout(() => setPhase("identity"), identityStart),
      window.setTimeout(
        () => setPhase("profile"),
        identityStart + identityHoldMs,
      ),
    );

    return () => {
      for (const timer of timers) window.clearTimeout(timer);
    };
  }, [shouldPlayIntro]);

  const finishIntro = useCallback(() => {
    setIsIntroComplete(true);

    try {
      window.sessionStorage.setItem(introSessionKey, "true");
    } catch {
      // The in-memory flag still prevents repeats during client navigation.
    }
  }, []);

  useEffect(() => {
    if (!shouldPlayIntro) return;

    // Cover the entire sequence, and unmount the curtain even if Motion never
    // reports its exit. A scroll unlock alone can leave an opaque cover behind.
    const failSafe = window.setTimeout(
      finishIntro,
      greetings.length * greetingDurationMs +
        identityHoldMs +
        (curtainDelaySeconds + curtainDurationSeconds) * 1000 +
        400,
    );

    return () => window.clearTimeout(failSafe);
  }, [finishIntro, shouldPlayIntro]);

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup id="portfolio-profile-intro">
        <section className="pb-4 pt-5 sm:pt-8">
          {shouldPlayIntro && visiblePhase !== "profile" ? (
            <Image
              src={profileImage}
              alt=""
              width={80}
              height={80}
              aria-hidden="true"
              className="pointer-events-none fixed size-px opacity-0"
              priority
            />
          ) : null}

          {shouldPlayIntro ? (
            <AnimatePresence initial={false} onExitComplete={finishIntro}>
              {visiblePhase === "profile" ? null : (
                <motion.div
                  key="intro-backdrop"
                  data-intro-backdrop=""
                  aria-hidden="true"
                  className="pointer-events-auto fixed -inset-1 z-50 touch-none bg-background will-change-transform"
                  exit={{ transform: "translate3d(0, -100%, 0)" }}
                  transition={curtainTransition}
                />
              )}
            </AnimatePresence>
          ) : null}

          {shouldPlayIntro && visiblePhase === "greetings" ? (
            <p
              aria-hidden="true"
              className="pointer-events-none fixed inset-0 z-[51] flex items-center justify-center gap-3 px-5 text-center text-2xl font-normal tracking-[-0.025em] text-foreground"
            >
              <span className="size-1.5 shrink-0 rounded-full bg-current" />
              <span>{greetings[greetingIndex]}</span>
            </p>
          ) : null}

          {shouldPlayIntro && visiblePhase === "identity" ? (
            <div
              aria-hidden="true"
              className="pointer-events-none fixed inset-0 z-[51] flex items-center justify-center gap-3 px-5 text-center text-2xl font-normal tracking-[-0.025em] text-foreground"
            >
              <span className="shrink-0">I’m</span>
              <motion.div
                layoutId={avatarLayoutId}
                transition={{ layout: profileLayoutTransition }}
                className="size-[38px] shrink-0 overflow-hidden rounded-full border border-border bg-surface"
                style={{ borderRadius: 9999 }}
              >
                <Image
                  src={profileImage}
                  alt=""
                  width={76}
                  height={76}
                  aria-hidden="true"
                  className="size-full object-cover grayscale"
                  priority
                />
              </motion.div>
              <motion.span
                layoutId={nameLayoutId}
                transition={{ layout: profileLayoutTransition }}
                className="inline-block min-w-0 truncate"
              >
                {firstName}
              </motion.span>
            </div>
          ) : null}

          {visiblePhase === "profile" ? (
            <ProfileHeader
              firstName={firstName}
              fullName={fullName}
              jobTitle={jobTitle}
              profileImage={profileImage}
              remainingName={remainingName}
              shouldAnimateDetails={shouldPlayIntro}
            />
          ) : (
            <div className="h-[52px] sm:h-14" aria-hidden="true" />
          )}

          <p className="mt-6 max-w-[540px] text-sm leading-6 text-muted sm:text-[15px] sm:leading-7">
            {introduction}
          </p>
        </section>
      </LayoutGroup>
    </MotionConfig>
  );
}
