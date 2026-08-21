"use client";

import { LayoutGroup, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type IntroPhase = "pending" | "greetings" | "identity" | "profile";

type PortfolioIntroProps = {
  availability: string;
  firstName: string;
  fullName: string;
  introduction: string;
  jobTitle: string;
  profileImage: string;
  remainingName: string;
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
const sharedLayoutEase = [0.77, 0, 0.175, 1] as const;
const curtainEase = [0.23, 1, 0.32, 1] as const;

let introHasPlayedInMemory = false;

function lockPageScroll() {
  const html = document.documentElement;
  const body = document.body;
  const previousHtmlOverflow = html.style.overflow;
  const previousBodyOverflow = body.style.overflow;
  const previousBodyPaddingRight = body.style.paddingRight;
  const scrollbarWidth = Math.max(0, window.innerWidth - html.clientWidth);
  const bodyPaddingRight = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;

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
}

function preloadProfileImage(src: string) {
  const image = new window.Image();
  image.src = src;

  return image.decode().catch(() => undefined);
}

export function PortfolioIntro({
  availability,
  firstName,
  fullName,
  introduction,
  jobTitle,
  profileImage,
  remainingName,
}: PortfolioIntroProps) {
  const [phase, setPhase] = useState<IntroPhase>("pending");
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [playIntro, setPlayIntro] = useState(false);
  const [curtainVisible, setCurtainVisible] = useState(true);
  const decisionRef = useRef<"play" | "skip" | null>(null);
  const preloadPromiseRef = useRef<Promise<void> | null>(null);
  const restoreScrollRef = useRef<(() => void) | null>(null);
  const sharedTransition = playIntro
    ? { layout: { duration: 0.65, ease: sharedLayoutEase } }
    : { layout: { duration: 0 } };

  useEffect(() => {
    if (decisionRef.current === null) {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      let hasPlayedThisSession = introHasPlayedInMemory;

      try {
        hasPlayedThisSession ||= window.sessionStorage.getItem(introSessionKey) === "true";
        window.sessionStorage.setItem(introSessionKey, "true");
      } catch {
        // The in-memory guard still prevents repeats if storage is unavailable.
      }

      introHasPlayedInMemory = true;
      decisionRef.current =
        prefersReducedMotion || hasPlayedThisSession ? "skip" : "play";
    }

    if (decisionRef.current === "skip") {
      setPlayIntro(false);
      setPhase("profile");
      setCurtainVisible(false);
      return;
    }

    setPlayIntro(true);
    setPhase((currentPhase) =>
      currentPhase === "pending" ? "greetings" : currentPhase,
    );

    preloadPromiseRef.current ??= preloadProfileImage(profileImage);
    restoreScrollRef.current?.();
    restoreScrollRef.current = lockPageScroll();

    return () => {
      restoreScrollRef.current?.();
      restoreScrollRef.current = null;
    };
  }, [profileImage]);

  useEffect(() => {
    if (phase !== "greetings") return;

    let nextGreetingIndex = 1;
    const interval = window.setInterval(() => {
      if (nextGreetingIndex < greetings.length) {
        setGreetingIndex(nextGreetingIndex);
        nextGreetingIndex += 1;
        return;
      }

      window.clearInterval(interval);
      setPhase("identity");
    }, 180);

    return () => window.clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "identity") return;

    let cancelled = false;
    const timeout = window.setTimeout(() => {
      void (async () => {
        await preloadPromiseRef.current;

        if (!cancelled) {
          setPhase("profile");
        }
      })();
    }, 600);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [phase]);

  const finishIntro = () => {
    if (phase !== "profile") return;

    setCurtainVisible(false);
    restoreScrollRef.current?.();
    restoreScrollRef.current = null;
  };

  return (
    <LayoutGroup id="portfolio-profile-intro">
      <section className="pb-4 pt-5 sm:pt-8">
        <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div
            className={`relative flex w-full min-w-0 items-center gap-3.5 sm:w-auto ${
              curtainVisible && phase === "profile" ? "z-[60]" : ""
            }`}
          >
            <div className="size-12 shrink-0 sm:size-14">
              {phase === "profile" && (
                <motion.div
                  layoutId="portfolio-profile-avatar"
                  transition={sharedTransition}
                  className="size-full overflow-hidden rounded-full border border-border bg-surface"
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
              )}
            </div>

            <div className="min-w-0">
              {phase === "profile" && (
                <>
                  <h1 className="flex min-w-0 items-baseline gap-[0.3em] text-sm font-normal tracking-[-0.01em] sm:text-[15px]">
                    <motion.span
                      layoutId="portfolio-profile-name"
                      transition={sharedTransition}
                      className="inline-block shrink-0"
                    >
                      {firstName}
                    </motion.span>
                    <motion.span
                      initial={playIntro ? { opacity: 0, y: 4 } : false}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: playIntro ? 0.24 : 0,
                        delay: playIntro ? 0.58 : 0,
                        ease: curtainEase,
                      }}
                      className="min-w-0"
                    >
                      {remainingName}
                    </motion.span>
                  </h1>
                  <motion.p
                    initial={playIntro ? { opacity: 0, y: 4 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: playIntro ? 0.24 : 0,
                      delay: playIntro ? 0.64 : 0,
                      ease: curtainEase,
                    }}
                    className="mt-0.5 text-[11px] text-muted sm:text-xs"
                  >
                    {jobTitle}
                  </motion.p>
                </>
              )}
            </div>
          </div>

          <div className="flex shrink-0 self-end items-center gap-2 rounded-full border border-border bg-surface px-2.5 py-1 text-[10px] text-muted sm:self-auto">
            <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            {availability}
          </div>
        </div>

        <p className="max-w-[540px] text-sm leading-6 text-muted sm:text-[15px] sm:leading-7">
          {introduction}
        </p>
      </section>

      {curtainVisible && (
        <div
          className="pointer-events-none fixed inset-0 z-50"
          data-intro-phase={phase}
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-0 bg-background"
            initial={false}
            animate={{ y: phase === "profile" ? "-100%" : "0%" }}
            transition={{
              duration: phase === "profile" ? 0.28 : 0,
              delay: phase === "profile" ? 0.78 : 0,
              ease: curtainEase,
            }}
            onAnimationComplete={finishIntro}
          />

          {phase === "greetings" && (
            <div className="absolute inset-0 z-10 grid place-items-center px-5">
              <div className="grid w-[190px] grid-cols-[0.4rem_1fr] items-center gap-3 text-[24px] font-normal tracking-[-0.025em] sm:w-[210px]">
                <span className="size-1.5 rounded-full bg-foreground" />
                <span>{greetings[greetingIndex]}</span>
              </div>
            </div>
          )}

          {phase === "identity" && (
            <div className="absolute inset-0 z-10 grid place-items-center px-5">
              <div className="flex items-center justify-center gap-3 whitespace-nowrap text-[24px] font-normal tracking-[-0.025em]">
                <span>I’m</span>
                <motion.div
                  layoutId="portfolio-profile-avatar"
                  transition={sharedTransition}
                  className="size-[38px] overflow-hidden rounded-full border border-border bg-surface"
                  style={{ borderRadius: 9999 }}
                >
                  <Image
                    src={profileImage}
                    alt=""
                    width={76}
                    height={76}
                    priority
                    className="size-full object-cover grayscale"
                  />
                </motion.div>
                <motion.span
                  layoutId="portfolio-profile-name"
                  transition={sharedTransition}
                  className="inline-block"
                >
                  {firstName}
                </motion.span>
              </div>
            </div>
          )}
        </div>
      )}
    </LayoutGroup>
  );
}
