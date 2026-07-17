import Image, { type StaticImageData } from "next/image";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import cameraFeed from "@/public/camera-feed.webp";
import dirtyTable from "@/public/dirty.webp";
import notOrdered from "@/public/notordered.webp";

/** Viewfinder corner brackets, camera-chrome style. */
function Corners() {
  const base = "absolute h-5 w-5 border-white/25";
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-3 z-10">
      <span className={`${base} left-0 top-0 border-l-2 border-t-2 rounded-tl-sm`} />
      <span className={`${base} right-0 top-0 border-r-2 border-t-2 rounded-tr-sm`} />
      <span className={`${base} bottom-0 left-0 border-b-2 border-l-2 rounded-bl-sm`} />
      <span className={`${base} bottom-0 right-0 border-b-2 border-r-2 rounded-br-sm`} />
    </div>
  );
}

/** Detection frame: a zoom-in pulled out of the master feed. */
function Detection({
  src,
  alt,
  tag,
  caption,
  sizes,
}: {
  src: StaticImageData;
  alt: string;
  tag: string;
  caption: string;
  sizes: string;
}) {
  return (
    <figure>
      <div className="group relative overflow-hidden rounded-2xl border border-hairline shadow-[0_32px_64px_-24px_rgba(0,0,0,0.9)]">
        <Image
          src={src}
          alt={alt}
          placeholder="blur"
          sizes={sizes}
          className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        />
        {/* Detection tag */}
        <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-2 rounded-md border border-[color:rgba(245,166,35,0.4)] bg-black/60 px-2.5 py-1.5 font-mono text-[0.68rem] font-semibold uppercase tracking-wider text-amber backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-amber" />
          {tag}
        </span>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_60px_rgba(11,15,20,0.35)]"
        />
      </div>
      <figcaption className="mt-4 flex items-start gap-2.5 px-1">
        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber" />
        <span className="text-sm font-medium leading-relaxed text-muted">{caption}</span>
      </figcaption>
    </figure>
  );
}

export function CameraShowcase() {
  return (
    <section id="cameras" className="section-pad">
      <div className="container-max">
        <SectionHeading
          eyebrow="Computer vision"
          title="See what the cameras see."
          intro="No new hardware. DiningOS reads table states straight from the cameras you already run — and flags what needs attention the moment it happens."
        />

        <div className="mt-16">
          {/* Master feed with camera chrome */}
          <Reveal>
            <figure className="relative">
              <div className="group relative overflow-hidden rounded-2xl border border-hairline">
                <Image
                  src={cameraFeed}
                  alt="A single overhead security-camera feed labeled CAM 04, showing a full dining room on a Friday night with every occupied table subtly highlighted by DiningOS."
                  placeholder="blur"
                  sizes="(max-width: 1200px) 100vw, 1140px"
                  className="h-auto w-full object-cover"
                />
                <Corners />
                {/* LIVE chip */}
                <span className="absolute right-5 top-5 z-10 inline-flex items-center gap-2 rounded-md bg-black/60 px-2.5 py-1.5 font-mono text-[0.68rem] font-semibold uppercase tracking-wider text-teal backdrop-blur-sm">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-live-dot rounded-full bg-teal" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal" />
                  </span>
                  Live · Cam 04
                </span>
                {/* Bottom fade so the pulled-up detections sit comfortably */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[rgba(11,15,20,0.85)] to-transparent"
                />
              </div>
              <figcaption className="sr-only">
                One camera covers the whole room — no new hardware, no blind spots.
              </figcaption>
            </figure>
          </Reveal>

          {/* Detections pulled out of the feed */}
          <div className="relative z-10 mx-auto -mt-10 grid max-w-[92%] grid-cols-1 gap-x-8 gap-y-10 sm:-mt-14 md:-mt-20 md:grid-cols-2 lg:max-w-[88%]">
            <Reveal>
              <Detection
                src={dirtyTable}
                alt="Close-up camera view of a table covered in used plates, cutlery and glasses, tagged by DiningOS with a label reading 'Dirty table — not cleaned for 9 minutes.'"
                tag="Detection · Dirty table"
                caption="Detects the moment a table needs resetting — before the next party is waiting."
                sizes="(max-width: 768px) 92vw, 520px"
              />
            </Reveal>
            <Reveal index={1}>
              <Detection
                src={notOrdered}
                alt="Camera view of three guests seated at a table, tagged by DiningOS with a label reading 'Sitting for 13 minutes — not ordered.'"
                tag="Detection · Not ordered"
                caption="Flags a seated party that hasn't ordered yet — so a server gets there in time."
                sizes="(max-width: 768px) 92vw, 520px"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
