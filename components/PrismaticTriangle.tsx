type Props = {
  className?: string;
  compact?: boolean;
  point?: { x: number; y: number };
  labelled?: boolean;
};

export default function PrismaticTriangle({ className = '', compact = false, point, labelled = false }: Props) {
  const x = point?.x ?? 50;
  const y = point?.y ?? 55;

  return (
    <div className={`prism-wrap ${compact ? 'prism-compact' : ''} ${className}`}>
      <svg viewBox="0 0 520 450" role="img" aria-label="Politangle prismatic triangle">
        <defs>
          <linearGradient id="prismTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8db7e3" />
            <stop offset="0.5" stopColor="#fff8ec" />
            <stop offset="1" stopColor="#ef7a5c" />
          </linearGradient>
          <linearGradient id="prismLeft" x1="0" y1="0" x2="0.85" y2="1">
            <stop offset="0" stopColor="#8db7e3" />
            <stop offset="0.53" stopColor="#f8fbff" />
            <stop offset="1" stopColor="#79c5b4" />
          </linearGradient>
          <linearGradient id="prismRight" x1="1" y1="0" x2="0.2" y2="1">
            <stop offset="0" stopColor="#ef7a5c" />
            <stop offset="0.52" stopColor="#fff7ea" />
            <stop offset="1" stopColor="#79c5b4" />
          </linearGradient>
          <radialGradient id="softLight" cx="50%" cy="40%" r="65%">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.98" />
            <stop offset="0.55" stopColor="#fff8ea" stopOpacity="0.22" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="edgeGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d6ad57" stopOpacity="0.65" />
            <stop offset="0.45" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="1" stopColor="#8db7e3" stopOpacity="0.55" />
          </linearGradient>
          <filter id="prismShadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="16" stdDeviation="18" floodColor="#0b2341" floodOpacity="0.13" />
          </filter>
        </defs>

        <g filter="url(#prismShadow)">
          <path d="M60 54 L460 54 L260 405 Z" fill="#fffdf8" stroke="#ffffff" strokeWidth="5" />
          <path d="M60 54 L460 54 L260 211 Z" fill="url(#prismTop)" />
          <path d="M60 54 L260 405 L260 211 Z" fill="url(#prismLeft)" />
          <path d="M460 54 L260 405 L260 211 Z" fill="url(#prismRight)" />
          <path d="M60 54 L460 54 L260 405 Z" fill="url(#softLight)" />
          <path d="M60 54 L460 54 L260 405 Z" fill="none" stroke="url(#edgeGlow)" strokeWidth="2.5" />
        </g>

        {!compact && (
          <>
            <circle cx={(x / 100) * 400 + 60} cy={(y / 100) * 300 + 70} r="12" fill="#0b2341" stroke="#ffffff" strokeWidth="5" />
            <circle cx={(x / 100) * 400 + 60} cy={(y / 100) * 300 + 70} r="22" fill="none" stroke="#d6ad57" strokeOpacity="0.34" strokeWidth="2" />
          </>
        )}
      </svg>

      {labelled && !compact && (
        <>
          <span className="prism-label prism-label-top-left">More collective<br />solutions</span>
          <span className="prism-label prism-label-top-right">More market<br />freedom</span>
          <span className="prism-label prism-label-left">More social<br />progress</span>
          <span className="prism-label prism-label-right">More tradition<br />and continuity</span>
          <span className="prism-label prism-label-bottom">More individual freedom</span>
          <span className="prism-centre-copy">Different<br />views.<br />A shared<br />future.</span>
        </>
      )}
    </div>
  );
}
