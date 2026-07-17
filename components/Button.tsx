import Link from "next/link";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "ghost";
type Size = "md" | "lg";

const base =
  "group relative inline-flex select-none items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 ease-out focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60";

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-[0.95rem]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-amber text-[#1a1206] shadow-[0_6px_20px_-6px_rgba(245,166,35,0.5)] hover:bg-amber-bright hover:shadow-[0_10px_30px_-6px_rgba(245,166,35,0.6)] hover:-translate-y-0.5 active:translate-y-0",
  ghost:
    "border border-hairline bg-white/[0.02] text-ink hover:border-[color:var(--muted-2)] hover:bg-white/[0.05] hover:-translate-y-0.5 active:translate-y-0",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button({ variant = "primary", size = "md", children, className = "", ...rest }, ref) {
    const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

    if ("href" in rest && rest.href !== undefined) {
      const { href, ...anchorRest } = rest as ButtonAsLink;
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={cls}
          {...anchorRest}
        >
          {children}
        </Link>
      );
    }

    const buttonRest = rest as ButtonAsButton;
    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={cls} {...buttonRest}>
        {children}
      </button>
    );
  }
);
