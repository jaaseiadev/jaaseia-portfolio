import type { Metadata } from "next";
import { Reveal } from "@/app/components/reveal";
import { portfolio } from "@/app/data/portfolio";

export const metadata: Metadata = {
  title: "Certificates — Jaaseia Abenoja",
  description: "Professional certificates and completed courses by Jaaseia Abenoja.",
};

export default function CertificatesPage() {
  return (
    <main className="mx-auto w-full max-w-[680px] px-5 sm:px-8">
      <Reveal as="section" className="pt-5 sm:pt-8" delay={0.03}>
        <h1 className="editorial-heading mb-3">Certificates.</h1>

        <div className="focus-list divide-y divide-border">
          {portfolio.certificates.map((certificate) => (
            <article
              key={`${certificate.issuer}-${certificate.title}`}
              className="focus-item flex items-start justify-between gap-5 py-4"
            >
              <div>
                <h2 className="text-sm font-medium tracking-[-0.01em]">
                  {certificate.title}
                </h2>
                <p className="mt-1 text-xs leading-5 text-faint">
                  {certificate.issuer} · {certificate.date}
                  {certificate.duration ? ` · ${certificate.duration}` : null}
                </p>
              </div>

              <a
                href={certificate.url}
                target="_blank"
                rel="noreferrer"
                className="traveling-link shrink-0 text-xs text-muted transition-colors hover:text-foreground"
                aria-label={`View ${certificate.title} certificate`}
              >
                View credential ↗
              </a>
            </article>
          ))}
        </div>
      </Reveal>
    </main>
  );
}
