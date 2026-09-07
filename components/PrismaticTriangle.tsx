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
            <stop offset="0" stopColor="#75a7ff" />
            <stop offset="0.56" stopColor="#f6f1ec" />
            <stop offset="1" stopColor="#ff7f8d" />
          </linearGradient>
          <linearGradient id="prismLeft" x1="0" y1="0" x2="0.85" y2="1">
            <stop offset="0" stopColor="#6ba5ff" />
            <stop offset="0.55" stopColor="#f5f3ef" />
            <stop offset="1" stopColor="#5dcf7a" />
          </linearGradient>
          <linearGradient id="prismRight" x1="1" y1="0" x2="0.2" y2="1">
            <stop offset="0" stopColor="#ff7b84" />
            <stop offset="0.55" stopColor="#f8eee8" />
            <stop offset="1" stopColor="#5dcf7a" />
          </linearGradient>
          <radialGradient id="softLight" cx="50%" cy="42%" r="62%">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="0.7" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <filter id="prismShadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="16" stdDeviation="18" floodColor="#17324f" floodOpacity="0.16" />
          </filter>
        </defs>

        <g filter="url(#prismShadow)">
          <path d="M60 54 L460 54 L260 405 Z" fill="#f4f4f1" stroke="#ffffff" strokeWidth="4" />
          <path d="M60 54 L460 54 L260 211 Z" fill="url(#prismTop)" />
          <path d="M60 54 L260 405 L260 211 Z" fill="url(#prismLeft)" />
          <path d="M460 54 L260 405 L260 211 Z" fill="url(#prismRight)" />
          <path d="M60 54 L460 54 L260 405 Z" fill="url(#softLight)" />
          <path d="M60 54 L460 54 L260 405 Z" fill="none" stroke="rgba(8,27,49,.08)" strokeWidth="2" />
        </g>

        {!compact && (
          <>
            <circle cx={(x / 100) * 400 + 60} cy={(y / 100) * 300 + 70} r="12" fill="#071a31" stroke="#ffffff" strokeWidth="5" />
            <circle cx={(x / 100) * 400 + 60} cy={(y / 100) * 300 + 70} r="22" fill="none" stroke="#071a31" strokeOpacity="0.14" strokeWidth="2" />
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
