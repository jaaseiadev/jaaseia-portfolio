"use client";

import { type FormEvent, useState } from "react";

type FormStatus = {
  state: "idle" | "submitting" | "success" | "error";
  message: string;
};

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>({ state: "idle", message: "" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus({ state: "submitting", message: "Sending your message…" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Your message could not be sent.");
      }

      form.reset();
      setStatus({
        state: "success",
        message: "Message sent. Thanks for reaching out — I’ll get back to you soon.",
      });
    } catch (error) {
      setStatus({
        state: "error",
        message: error instanceof Error ? error.message : "Your message could not be sent.",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[560px] space-y-3"
      aria-label="Contact form"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="contact-field">
          <span>Name</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            maxLength={80}
            required
            placeholder="Your name"
          />
        </label>
        <label className="contact-field">
          <span>Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            maxLength={254}
            required
            placeholder="you@example.com"
          />
        </label>
      </div>

      <label className="contact-field">
        <span>Message</span>
        <textarea
          name="message"
          rows={4}
          maxLength={5000}
          required
          placeholder="Tell me about your project or idea…"
          onKeyDown={(event) => {
            if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
              event.preventDefault();
              event.currentTarget.form?.requestSubmit();
            }
          }}
        />
      </label>

      <label className="hidden" aria-hidden="true">
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
          <button
            type="submit"
            disabled={status.state === "submitting"}
            className="rounded-md bg-foreground px-3 py-2 text-xs font-medium text-background transition-opacity hover:opacity-80 disabled:cursor-wait disabled:opacity-55"
          >
            {status.state === "submitting" ? "Sending…" : "Send message"}
          </button>
          <p
            className={`text-xs leading-5 ${
              status.state === "error" ? "text-red-600 dark:text-red-400" : "text-muted"
            }`}
            role="status"
            aria-live="polite"
          >
            {status.message}
          </p>
        </div>
        <p className="font-mono text-[9px] text-faint">
          <span className="rounded border border-border px-1 py-0.5">Ctrl/⌘ + Enter</span> to send
        </p>
      </div>
    </form>
  );
}
