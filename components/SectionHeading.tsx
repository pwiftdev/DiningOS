import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment} ${className}`}>
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <Reveal index={1}>
        <h2 className="text-balance text-3xl font-extrabold tracking-tightest text-ink sm:text-4xl md:text-[2.75rem] md:leading-[1.05]">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal index={2}>
          <p className="text-pretty text-base leading-relaxed text-muted md:text-lg">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
