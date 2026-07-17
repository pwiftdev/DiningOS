import { LogoLockup } from "./Logo";
import { Button } from "./Button";
import { NAV_LINKS } from "@/lib/nav";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="hairline-t">
      <div className="container-max py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <LogoLockup />
            <p className="mt-4 text-pretty leading-relaxed text-muted">
              The operating system for the dining room.
            </p>
            <p className="mt-3 text-sm text-muted-2">
              Works with your existing cameras, POS, reservations and kitchen systems.
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav aria-label="Footer">
              <p className="eyebrow mb-4">Product</p>
              <ul className="flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="eyebrow mb-4">Get started</p>
              <Button href="#demo" size="md">
                Book a demo
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-2">© {year} DiningOS. All rights reserved.</p>
          <p className="text-sm text-muted-2">
            Events, not identities. We measure the floor, not your people.
          </p>
        </div>
      </div>
    </footer>
  );
}
