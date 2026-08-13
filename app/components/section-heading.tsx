type SectionHeadingProps = {
  title: string;
  description?: string;
};

export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="mb-10 sm:mb-12">
      <h2 className="text-2xl font-medium tracking-[-0.035em] sm:text-[1.75rem]">{title}</h2>
      {description ? (
        <p className="mt-3 max-w-lg text-sm leading-6 text-muted">{description}</p>
      ) : null}
    </div>
  );
}
