import type { ArtKind } from "@/lib/site";

/**
 * Technical line-art used in place of photography until real product images
 * are uploaded in Supabase Storage. Drawn on a 160x120 grid with a single red
 * accent so the catalogue still looks like a technical catalogue.
 */
export function ProductArt({
  kind = "generic",
  className = "",
  accentClass = "text-brand",
}: {
  kind?: ArtKind;
  className?: string;
  accentClass?: string;
}) {
  return (
    <svg
      viewBox="0 0 160 120"
      className={className}
      role="img"
      aria-label={`${kind} illustration`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {artFor(kind, accentClass)}
    </svg>
  );
}

function artFor(kind: ArtKind, accentClass: string) {
  switch (kind) {
    case "chainring": {
      const teeth = Array.from({ length: 16 }, (_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const x = 80 + Math.cos(angle) * 46;
        const y = 60 + Math.sin(angle) * 46;
        const x2 = 80 + Math.cos(angle) * 38;
        const y2 = 60 + Math.sin(angle) * 38;
        return <line key={i} x1={x} y1={y} x2={x2} y2={y2} />;
      });
      const arms = Array.from({ length: 5 }, (_, i) => {
        const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
        return (
          <line
            key={i}
            x1={80 + Math.cos(angle) * 16}
            y1={60 + Math.sin(angle) * 16}
            x2={80 + Math.cos(angle) * 36}
            y2={60 + Math.sin(angle) * 36}
          />
        );
      });
      return (
        <>
          {teeth}
          <circle cx={80} cy={60} r={38} />
          <circle cx={80} cy={60} r={16} />
          {arms}
          <circle cx={80} cy={60} r={4} className={accentClass} stroke="none" fill="currentColor" />
        </>
      );
    }
    case "cassette": {
      const cogs = [46, 37, 29, 21, 13];
      return (
        <>
          {cogs.map((r, i) => (
            <circle key={r} cx={80} cy={60} r={r} opacity={1 - i * 0.12} />
          ))}
          <circle cx={80} cy={60} r={5} className={accentClass} stroke="none" fill="currentColor" />
          {Array.from({ length: 24 }, (_, i) => {
            const angle = (i / 24) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={80 + Math.cos(angle) * 46}
                y1={60 + Math.sin(angle) * 46}
                x2={80 + Math.cos(angle) * 41}
                y2={60 + Math.sin(angle) * 41}
              />
            );
          })}
        </>
      );
    }
    case "rotor": {
      const holes = Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        return (
          <circle
            key={i}
            cx={80 + Math.cos(angle) * 36}
            cy={60 + Math.sin(angle) * 36}
            r={2.6}
          />
        );
      });
      return (
        <>
          <circle cx={80} cy={60} r={44} opacity={0.5} />
          <circle cx={80} cy={60} r={30} />
          {holes}
          {Array.from({ length: 6 }, (_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={80 + Math.cos(angle) * 12}
                y1={60 + Math.sin(angle) * 12}
                x2={80 + Math.cos(angle) * 30}
                y2={60 + Math.sin(angle) * 30}
              />
            );
          })}
          <circle cx={80} cy={60} r={11} />
          <circle cx={80} cy={60} r={4} className={accentClass} stroke="none" fill="currentColor" />
        </>
      );
    }
    case "wheel": {
      const spokes = Array.from({ length: 16 }, (_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={80}
            y1={60}
            x2={80 + Math.cos(angle) * 40}
            y2={60 + Math.sin(angle) * 40}
          />
        );
      });
      return (
        <>
          <circle cx={80} cy={60} r={47} />
          <circle cx={80} cy={60} r={42} />
          {spokes}
          <circle cx={80} cy={60} r={8} />
          <circle cx={80} cy={60} r={3} className={accentClass} stroke="none" fill="currentColor" />
        </>
      );
    }
    case "fork":
      return (
        <>
          <path d="M62 22h36v10H62z" />
          <path d="M68 32v34M92 32v34" />
          <path d="M62 44h12M86 44h12" opacity={0.6} />
          <path d="M66 66c2 16 2 22 0 30M94 66c-2 16-2 22 0 30" />
          <path d="M58 96h16M86 96h16" />
          <circle cx={80} cy={27} r={2.4} className={accentClass} stroke="none" fill="currentColor" />
        </>
      );
    case "helmet":
      return (
        <>
          <path d="M38 74c0-24 18-40 42-40s42 16 42 40" />
          <path d="M38 74h84" />
          <path d="M34 74h92c0 6-4 10-10 10H44c-6 0-10-4-10-10Z" />
          <path d="M60 44c6-4 12-4 16 0M84 44c4-4 10-4 16 0" opacity={0.7} />
          <path d="M76 34h8" className={accentClass} />
        </>
      );
    case "bottle":
      return (
        <>
          <path d="M70 20h20v10l6 10v52a6 6 0 0 1-6 6H70a6 6 0 0 1-6-6V40l6-10V20Z" />
          <path d="M70 20h20" />
          <path d="M64 52h32M64 72h32" opacity={0.5} />
          <path d="M64 46c-6 6-6 50 0 56" />
          <path d="M96 46c6 6 6 50 0 56" />
          <path d="M76 12h8v8h-8z" className={accentClass} />
        </>
      );
    case "wrench":
      return (
        <>
          <path d="M112 30a20 20 0 0 0-24 26L48 96a8 8 0 0 1-11-11l40-40a20 20 0 0 1 26-24l-12 12 4 12 12 4 12-12Z" />
          <path d="M70 74l16 16" opacity={0.5} />
          <circle cx={62} cy={88} r={2.6} className={accentClass} stroke="none" fill="currentColor" />
        </>
      );
    case "generic":
    default:
      return (
        <>
          <path d="M60 34h40l20 26-20 26H60L40 60l20-26Z" />
          <circle cx={80} cy={60} r={14} />
          <path d="M80 46v28M66 60h28" opacity={0.5} />
          <circle cx={80} cy={60} r={3.4} className={accentClass} stroke="none" fill="currentColor" />
        </>
      );
  }
}
