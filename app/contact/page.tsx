import type { Metadata } from "next";
import { ContactForm } from "@/app/components/contact-form";
import { Reveal } from "@/app/components/reveal";
import { SocialLinks } from "@/app/components/social-links";

export const metadata: Metadata = {
  title: "Contact — Jaaseia Abenoja",
  description: "Send Jaaseia Abenoja a message or connect through social media.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-[680px] px-5 sm:px-8">
      <Reveal className="pb-2 pt-5 sm:pt-8">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">Contact</p>
        <h1 className="editorial-heading">Let’s work together.</h1>
        <p className="mt-3 max-w-[520px] text-sm leading-6 text-muted">
          Have a project, opportunity, or idea in mind? Send me a message and it will land directly in my inbox.
        </p>
      </Reveal>

      <Reveal as="section" className="pt-2" delay={0.03}>
        <ContactForm />
      </Reveal>

      <Reveal as="section" className="section-shell" delay={0.05}>
        <SocialLinks />
      </Reveal>
    </main>
  );
}
