import Image from "next/image";
import logoMark from "@/public/logo-mark.png";

type LogoMarkProps = {
  size?: number;
  className?: string;
  priority?: boolean;
};

/**
 * App-tile icon — the DiningOS brand mark: a line-art dining table in a
 * teal→amber gradient with a soft neon glow on a rounded tile.
 */
export function LogoMark({ size = 40, className, priority = false }: LogoMarkProps) {
  return (
    <Image
      src={logoMark}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      priority={priority}
      className={`rounded-[26%] ${className ?? ""}`}
      sizes={`${size}px`}
    />
  );
}

type LogoLockupProps = {
  size?: number;
  className?: string;
  /** Accessible label for the whole lockup when used as a link/brand. */
  label?: string;
  priority?: boolean;
};

/** Icon + "DiningOS" wordmark ("OS" in amber). */
export function LogoLockup({
  size = 34,
  className,
  label = "DiningOS",
  priority = false,
}: LogoLockupProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark size={size} priority={priority} />
      <span
        className="text-[1.35rem] font-extrabold leading-none tracking-tightest text-ink"
        aria-label={label}
      >
        Dining<span className="text-amber">OS</span>
      </span>
    </span>
  );
}
