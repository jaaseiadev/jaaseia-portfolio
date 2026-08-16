import { portfolio } from "@/app/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-[680px] px-5 pb-8 pt-8 sm:px-8 sm:pb-12">
      <div className="flex flex-col gap-2 pt-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {portfolio.name}
        </p>
        <p>Designed with restraint. Built with care.</p>
      </div>
    </footer>
  );
}
