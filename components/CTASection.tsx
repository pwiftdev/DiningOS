import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { LeadForm } from "./LeadForm";

export function CTASection() {
  return (
    <section id="demo" className="section-pad">
      <div className="container-max">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="flex flex-col justify-center">
            <SectionHeading
              eyebrow="Bring DiningOS to your restaurant"
              title={
                <>
                  Every restaurant should know exactly what&apos;s happening, why, and{" "}
                  <span className="text-amber">what to do next.</span>
                </>
              }
              intro="Book a demo — and if you're ready, start a one-shift pilot on the cameras and systems you already run. No new hardware."
            />
          </div>

          <Reveal index={1}>
            <div className="rounded-2xl border border-hairline bg-panel p-7 md:p-9">
              <LeadForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
