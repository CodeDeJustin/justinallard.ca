import type { CSSProperties, HTMLAttributes } from "react";

const AURORA_CLIP_PATH =
  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)";

const AURORA_BASE =
  "absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 aspect-[1155/678] aurora-gradient";

const STAGE = {
  md: "relative h-[28rem] sm:h-[42rem]",
  lg: "relative h-[32rem] sm:h-[48rem]",
} as const;

type CSSVars = CSSProperties & Record<`--${string}`, string | number>;

const HALO_MID_Y = "34%";
const HALO_DEPTH_Y = "58%";

const ORBIT_CLASS = {
  1: "aurora-orbit aurora-orbit-1",
  2: "aurora-orbit aurora-orbit-2",
  3: "aurora-orbit aurora-orbit-3",
} as const;

const ARM_CLASS = {
  1: "aurora-arm aurora-arm-1",
  2: "aurora-arm aurora-arm-2",
  3: "aurora-arm aurora-arm-3",
} as const;

type AuroraBlobProps = HTMLAttributes<HTMLDivElement>;

function AuroraBlob({ className = "", style, ...props }: AuroraBlobProps) {
  return (
    <div
      {...props}
      className={className}
      style={{ ...style, clipPath: AURORA_CLIP_PATH }}
    />
  );
}

type BlobSpec = {
  orbit: 1 | 2 | 3;
  arm: 1 | 2 | 3;
  blobClass: string; // ce qui change d’un blob à l’autre
};

type HaloSpec = {
  id: "top" | "mid" | "mid2" | "bottom";
  wrapperClass: string;
  wrapperStyle?: CSSVars;
  stage: keyof typeof STAGE;
  blobs: readonly BlobSpec[];
};

function AuroraHalo({ wrapperClass, wrapperStyle, stage, blobs }: HaloSpec) {
  return (
    <div className={wrapperClass} style={wrapperStyle}>
      <div className={STAGE[stage]}>
        {blobs.map((b) => (
          <div
            key={`${b.orbit}-${b.arm}-${b.blobClass}`}
            className={ORBIT_CLASS[b.orbit]}
          >
            <div className={ARM_CLASS[b.arm]}>
              <AuroraBlob className={`${AURORA_BASE} ${b.blobClass}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const HALOS = [
  {
    id: "top",
    // Halo haut
    wrapperClass:
      "aurora-wander-a absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-3xl sm:-top-80",
    stage: "md",
    blobs: [
      {
        orbit: 1,
        arm: 1,
        blobClass:
          "aurora-glow-1 rotate-30 w-[36.125rem] opacity-30 sm:w-[72.1875rem] dark:opacity-20",
      },
      {
        orbit: 2,
        arm: 2,
        blobClass:
          "aurora-glow-2 -rotate-12 w-[28rem] opacity-[0.18] sm:w-[60rem] dark:opacity-[0.14]",
      },
      {
        orbit: 3,
        arm: 3,
        blobClass:
          "aurora-glow-3 rotate-[8deg] w-[24rem] opacity-[0.14] sm:w-[54rem] dark:opacity-[0.10]",
      },
    ],
  },
  {
    id: "mid",
    // Halo milieu (VISIBLE)
    wrapperClass:
      "aurora-wander-b absolute inset-x-0 top-[var(--aurora-y)] transform-gpu overflow-hidden blur-[90px]",
    wrapperStyle: { "--aurora-y": HALO_MID_Y },
    stage: "md",
    blobs: [
      {
        orbit: 1,
        arm: 1,
        blobClass:
          "aurora-glow-2 -rotate-6 w-[44rem] opacity-[0.16] sm:w-[86rem] dark:opacity-[0.12]",
      },
      {
        orbit: 2,
        arm: 2,
        blobClass:
          "aurora-glow-1 rotate-[12deg] w-[34rem] opacity-[0.11] sm:w-[70rem] dark:opacity-[0.09]",
      },
      {
        orbit: 3,
        arm: 3,
        blobClass:
          "aurora-glow-3 -rotate-[10deg] w-[28rem] opacity-[0.09] sm:w-[58rem] dark:opacity-[0.07]",
      },
    ],
  },
  {
    id: "mid2",
    // Halo milieu #2 (diffus, profondeur)
    wrapperClass:
      "aurora-wander-b2 absolute inset-x-0 top-[var(--aurora-y)] transform-gpu overflow-hidden blur-[100px] mix-blend-screen saturate-150 brightness-110",
    wrapperStyle: { "--aurora-y": HALO_DEPTH_Y },
    stage: "lg",
    blobs: [
      {
        orbit: 2,
        arm: 1,
        blobClass:
          "aurora-glow-3 rotate-[18deg] w-[56rem] opacity-[0.12] sm:w-[110rem] dark:opacity-[0.08]",
      },
      {
        orbit: 3,
        arm: 2,
        blobClass:
          "aurora-glow-1 -rotate-[14deg] w-[44rem] opacity-[0.10] sm:w-[92rem] dark:opacity-[0.07]",
      },
      {
        orbit: 1,
        arm: 3,
        blobClass:
          "aurora-glow-2 rotate-[6deg] w-[36rem] opacity-[0.09] sm:w-[78rem] dark:opacity-[0.06]",
      },
    ],
  },
  {
    id: "bottom",
    // Halo bas
    wrapperClass:
      "aurora-wander-c absolute inset-x-0 top-[calc(100%-13rem)] transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]",
    stage: "md",
    blobs: [
      {
        orbit: 1,
        arm: 2,
        blobClass:
          "aurora-glow-3 w-[36.125rem] opacity-30 sm:w-[72.1875rem] dark:opacity-20",
      },
      {
        orbit: 2,
        arm: 3,
        blobClass:
          "aurora-glow-2 rotate-[10deg] w-[28rem] opacity-[0.15] sm:w-[60rem] dark:opacity-[0.11]",
      },
      {
        orbit: 3,
        arm: 1,
        blobClass:
          "aurora-glow-1 -rotate-[8deg] w-[24rem] opacity-[0.12] sm:w-[52rem] dark:opacity-[0.09]",
      },
    ],
  },
] as const satisfies readonly HaloSpec[];

export default function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-zinc-900"
    >
      {HALOS.map((h) => (
        <AuroraHalo key={h.id} {...h} />
      ))}
    </div>
  );
}
