import type { ReactNode } from "react";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
};

export function ArrowLink({ href, children, external = false }: ArrowLinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group inline-flex items-center gap-1.5 text-sm font-medium"
    >
      <span className="border-b border-foreground/25 pb-0.5 transition-colors group-hover:border-foreground">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      >
        ↗
      </span>
    </a>
  );
}
