"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Armchair } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Status model                                                        */
/* ------------------------------------------------------------------ */

type StatusKey = "empty" | "seated" | "waiting" | "dessert" | "pay" | "dirty";

type StatusDef = {
  label: string;
  color: string;
  /** soft rgba fill tint */
  glow: string;
  /** stronger rgba for the drop shadow */
  glowStrong: string;
  attention?: boolean;
};

const STATUS: Record<StatusKey, StatusDef> = {
  empty: { label: "Open", color: "var(--muted-2)", glow: "rgba(107,120,133,0.10)", glowStrong: "rgba(107,120,133,0.30)" },
  seated: { label: "Seated", color: "var(--teal)", glow: "rgba(45,212,191,0.16)", glowStrong: "rgba(45,212,191,0.6)" },
  waiting: { label: "Waiting", color: "var(--amber)", glow: "rgba(245,166,35,0.22)", glowStrong: "rgba(245,166,35,0.75)", attention: true },
  dessert: { label: "Dessert", color: "var(--violet)", glow: "rgba(167,139,250,0.18)", glowStrong: "rgba(167,139,250,0.6)" },
  pay: { label: "Ready to pay", color: "var(--amber-bright)", glow: "rgba(255,194,75,0.22)", glowStrong: "rgba(255,194,75,0.75)", attention: true },
  dirty: { label: "Needs reset", color: "var(--alert)", glow: "rgba(248,113,113,0.18)", glowStrong: "rgba(248,113,113,0.6)" },
};

// Which states run a table timer (a party is seated).
const TIMED = new Set<StatusKey>(["seated", "waiting", "dessert", "pay"]);

const CYCLE: StatusKey[] = ["empty", "seated", "waiting", "dessert", "pay", "dirty"];
function nextStatus(s: StatusKey): StatusKey {
  return CYCLE[(CYCLE.indexOf(s) + 1) % CYCLE.length];
}

/* ------------------------------------------------------------------ */
/* Floor layout — a believable dining room                            */
/* Positions are the table CENTER in % of the floor box.              */
/* Sizes are in cqw (container-query width units) so the whole plan   */
/* scales proportionally with the widget.                             */
/* ------------------------------------------------------------------ */

type Shape = "round" | "square";
type TableDef = {
  id: number;
  label: string;
  shape: Shape;
  x: number;
  y: number;
  w: number; // cqw
  seats: number;
  seed: StatusKey;
  /** seconds already elapsed at load, for a lived-in first paint */
  seedSecs: number;
};

const TABLES: TableDef[] = [
  // Left-wall booths
  { id: 1, label: "T1", shape: "square", x: 12, y: 19, w: 13, seats: 4, seed: "seated", seedSecs: 742 },
  { id: 2, label: "T2", shape: "square", x: 12, y: 45, w: 13, seats: 4, seed: "waiting", seedSecs: 318 },
  { id: 3, label: "T3", shape: "square", x: 12, y: 71, w: 13, seats: 4, seed: "empty", seedSecs: 0 },
  // Inner two-/four-tops
  { id: 4, label: "T4", shape: "round", x: 30, y: 18, w: 10, seats: 2, seed: "seated", seedSecs: 1187 },
  { id: 5, label: "T5", shape: "round", x: 31, y: 46, w: 13, seats: 4, seed: "dessert", seedSecs: 2140 },
  { id: 6, label: "T6", shape: "round", x: 30, y: 73, w: 10, seats: 2, seed: "empty", seedSecs: 0 },
  // Center rounds
  { id: 7, label: "T7", shape: "round", x: 48, y: 25, w: 13, seats: 4, seed: "pay", seedSecs: 3320 },
  { id: 8, label: "T8", shape: "round", x: 49, y: 60, w: 15, seats: 6, seed: "seated", seedSecs: 905 },
  // Right of the bar
  { id: 9, label: "T9", shape: "round", x: 77, y: 17, w: 10, seats: 2, seed: "dirty", seedSecs: 0 },
  { id: 10, label: "T10", shape: "round", x: 77, y: 35, w: 10, seats: 2, seed: "empty", seedSecs: 0 },
  { id: 11, label: "T11", shape: "round", x: 89, y: 26, w: 12, seats: 4, seed: "seated", seedSecs: 641 },
  { id: 12, label: "T12", shape: "square", x: 85, y: 62, w: 17, seats: 8, seed: "waiting", seedSecs: 384 },
];

const TOASTS = [
  "T2 has waited 9 minutes for food.",
  "Patio section is filling up.",
  "3 tables are ready to pay.",
] as const;

type RtTable = TableDef & {
  status: StatusKey;
  startedAt: number | null;
  nextAt: number;
};

function fmt(totalSecs: number) {
  const s = Math.max(0, Math.floor(totalSecs));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function LiveFloor() {
  const reduce = useReducedMotion();
  const [tables, setTables] = useState<RtTable[]>(() =>
    TABLES.map((t) => ({ ...t, status: t.seed, startedAt: null, nextAt: 0 }))
  );
  const [clock, setClock] = useState(0);
  const [toastIdx, setToastIdx] = useState(0);
  const [toastShown, setToastShown] = useState(true);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.15,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const active = inView && !reduce;

  // State machine + 1s clock (deliberately unhurried).
  useEffect(() => {
    if (!active) return;
    const now = Date.now();
    setClock(now);
    setTables((prev) =>
      prev.map((t, i) => ({
        ...t,
        startedAt: TIMED.has(t.status) ? now - t.seedSecs * 1000 : null,
        // staggered, slow first transitions
        nextAt: now + 6000 + i * 900 + Math.random() * 5000,
      }))
    );

    const id = setInterval(() => {
      const t = Date.now();
      setClock(t);
      setTables((prev) =>
        prev.map((tbl) => {
          if (t < tbl.nextAt) return tbl;
          const ns = nextStatus(tbl.status);
          return {
            ...tbl,
            status: ns,
            startedAt:
              ns === "seated" ? t : TIMED.has(ns) ? tbl.startedAt ?? t : null,
            // slow dwell: 8–17s per state
            nextAt: t + 8000 + Math.random() * 9000,
          };
        })
      );
    }, 1000);
    return () => clearInterval(id);
  }, [active]);

  // Toast rotation — leisurely.
  useEffect(() => {
    if (!active) return;
    let showTimer: ReturnType<typeof setTimeout>;
    const hideTimer = setTimeout(() => {
      setToastShown(false);
      showTimer = setTimeout(() => {
        setToastIdx((i) => (i + 1) % TOASTS.length);
        setToastShown(true);
      }, 800);
    }, 5200);
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(showTimer);
    };
  }, [active, toastIdx, toastShown]);

  // Single "needs attention" table gets the amber pulse.
  const attentionId = useMemo(
    () => tables.find((t) => STATUS[t.status].attention)?.id ?? null,
    [tables]
  );

  const occupied = tables.filter((t) => t.status !== "empty").length;

  return (
    <div
      ref={rootRef}
      className="relative w-full overflow-hidden rounded-2xl border border-hairline bg-panel-2/80 p-3.5 shadow-card backdrop-blur-sm sm:p-4"
      role="img"
      aria-label="Live restaurant floor plan showing twelve tables. Their status updates in real time — open, seated, waiting for food, dessert, ready to pay and needs reset — with running timers on seated tables."
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between" aria-hidden="true">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className={`absolute inline-flex h-full w-full rounded-full bg-teal ${active ? "animate-live-dot" : ""}`} />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal" />
          </span>
          <span className="text-sm font-semibold text-ink">Dining room</span>
          <span className="text-sm text-muted-2">· live</span>
        </div>
        <span className="text-xs font-medium text-muted-2">{occupied}/12 seated</span>
      </div>

      {/* Floor plan canvas */}
      <div
        className="relative w-full rounded-xl border border-hairline bg-[radial-gradient(120%_120%_at_50%_0%,rgba(255,255,255,0.03),transparent_60%)]"
        style={{ aspectRatio: "13 / 10", containerType: "inline-size" }}
      >
        {/* Bar block */}
        <div
          aria-hidden="true"
          className="absolute flex items-center justify-center rounded-md border border-hairline bg-white/[0.03]"
          style={{
            left: "64%",
            top: "40%",
            width: "6.5cqw",
            height: "58cqw",
            transform: "translate(-50%, -50%)",
          }}
        >
          <span
            className="font-semibold uppercase tracking-eyebrow text-muted-2"
            style={{ writingMode: "vertical-rl", fontSize: "clamp(7px,2cqw,11px)" }}
          >
            Bar
          </span>
        </div>

        {/* Entrance marker */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 font-medium uppercase tracking-eyebrow text-muted-2"
          style={{ bottom: "1.5cqw", fontSize: "clamp(6px,1.7cqw,9px)" }}
        >
          Entrance
        </span>

        {tables.map((t) => (
          <TableNode
            key={t.id}
            t={t}
            clock={clock}
            active={active}
            attention={t.id === attentionId}
          />
        ))}

        {/* Toast — inside the floor, bottom-left */}
        <div className="pointer-events-none absolute bottom-2.5 left-2.5 right-2.5 flex justify-start">
          <AnimatePresence mode="wait">
            {(active ? toastShown : true) && (
              <motion.div
                key={active ? toastIdx : "static"}
                initial={active ? { opacity: 0, y: 10, scale: 0.98 } : false}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-auto flex items-center gap-2 rounded-lg border border-[color:rgba(245,166,35,0.35)] bg-panel/95 px-3 py-2 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] backdrop-blur"
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className={`absolute inline-flex h-full w-full rounded-full bg-amber ${active ? "animate-ping" : ""} opacity-75`} />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
                </span>
                <span className="text-[0.76rem] font-medium text-ink">{TOASTS[toastIdx]}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5" aria-hidden="true">
        <LegendDot color="var(--teal)" label="Seated" />
        <LegendDot color="var(--amber)" label="Needs attention" />
        <LegendDot color="var(--violet)" label="Dessert" />
        <LegendDot color="var(--alert)" label="Reset" />
        <LegendDot color="var(--muted-2)" label="Open" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Table node                                                          */
/* ------------------------------------------------------------------ */

function TableNode({
  t,
  clock,
  active,
  attention,
}: {
  t: RtTable;
  clock: number;
  active: boolean;
  attention: boolean;
}) {
  const def = STATUS[t.status];
  const radius = t.shape === "round" ? "9999px" : "18%";

  const showTimer = TIMED.has(t.status);
  const elapsed =
    active && t.startedAt != null ? (clock - t.startedAt) / 1000 : t.seedSecs;

  return (
    <div
      className="absolute flex flex-col items-center justify-center text-center"
      style={{
        left: `${t.x}%`,
        top: `${t.y}%`,
        width: `${t.w}cqw`,
        height: `${t.w}cqw`,
        transform: "translate(-50%, -50%)",
        borderRadius: radius,
      }}
    >
      {/* Attention pulse ring */}
      {attention && active && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 border border-amber animate-pulse-ring"
          style={{ borderRadius: radius, animationDuration: "3.2s" }}
        />
      )}

      <div
        className="flex h-full w-full flex-col items-center justify-center gap-[0.4cqw] border transition-[background,box-shadow,border-color] duration-[1200ms] ease-out"
        style={{
          borderRadius: radius,
          borderColor: attention ? "rgba(245,166,35,0.5)" : "var(--hairline)",
          background: `linear-gradient(180deg, ${def.glow}, rgba(20,26,34,0.72))`,
          boxShadow: `0 0 26px -12px ${def.glowStrong}`,
        }}
      >
        <span
          className="font-bold leading-none text-ink"
          style={{ fontSize: "clamp(8px,3cqw,17px)" }}
        >
          {t.label}
        </span>

        {showTimer ? (
          <span
            className="font-semibold leading-none tabular-nums transition-colors duration-[1200ms]"
            style={{ color: def.color, fontSize: "clamp(7px,2.5cqw,14px)" }}
          >
            {fmt(elapsed)}
          </span>
        ) : t.status === "empty" ? (
          <span
            className="flex items-center gap-[0.4cqw] font-medium leading-none text-muted-2"
            style={{ fontSize: "clamp(6px,2.2cqw,12px)" }}
          >
            <Armchair className="h-[1.2em] w-[1.2em]" aria-hidden="true" />
            {t.seats}
          </span>
        ) : (
          <span
            className="font-semibold leading-none transition-colors duration-[1200ms]"
            style={{ color: def.color, fontSize: "clamp(6px,2.1cqw,12px)" }}
          >
            Reset
          </span>
        )}
      </div>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-[0.7rem] font-medium text-muted-2">{label}</span>
    </span>
  );
}
