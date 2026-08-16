import {
  FacebookIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from "@/app/components/icons";
import { portfolio } from "@/app/data/portfolio";

const socialIcons = {
  GitHub: {
    icon: GitHubIcon,
    color: "text-[#181717] dark:text-[#f0f0f0]",
  },
  LinkedIn: {
    icon: LinkedInIcon,
    color: "text-[#0A66C2]",
  },
  Facebook: {
    icon: FacebookIcon,
    color: "text-[#1877F2]",
  },
  Email: {
    icon: MailIcon,
    color: "text-[#EA4335]",
  },
};

export function SocialLinks({ heading = "Socials" }: { heading?: string }) {
  return (
    <div>
      <h2 className="editorial-heading mb-3">{heading}.</h2>
      <div className="divide-y divide-border">
        {portfolio.socials.map((social) => {
          const socialIcon = socialIcons[social.label as keyof typeof socialIcons];
          const Icon = socialIcon?.icon;
          return (
            <a
              key={social.label}
              href={social.url}
              target={social.label === "Email" ? undefined : "_blank"}
              rel={social.label === "Email" ? undefined : "noreferrer"}
              className="group flex items-center justify-between py-3 text-sm"
            >
              <span className="flex items-center gap-3">
                {Icon ? <Icon className={`size-4 ${socialIcon.color}`} /> : null}
                <span className="traveling-link">{social.label}</span>
              </span>
              <span className="flex items-center gap-3 text-muted">
                <span className="hidden transition-colors group-hover:text-foreground sm:inline">
                  {social.handle}
                </span>
                <span className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  ↗
                </span>
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
