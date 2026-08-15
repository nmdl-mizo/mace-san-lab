type BrandLogoKind = 'symbol' | 'wordmark';
type BrandLogoTone = 'dark' | 'light' | 'theme';

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  kind?: BrandLogoKind;
  label?: string;
  tone?: BrandLogoTone;
}

export default function BrandLogo({
  className = '',
  kind = 'wordmark',
  label = 'mace-san / Materials Intelligence',
  tone = 'theme',
}: BrandLogoProps) {
  if (kind === 'symbol') {
    return (
      <span
        aria-label={label}
        className={`brand-logo brand-logo-symbol brand-logo-tone-${tone} ${className}`.trim()}
        role="img"
      >
        <span className="brand-symbol-atom">◉</span>
      </span>
    );
  }

  return (
    <span
      aria-label={label}
      className={`brand-logo brand-logo-wordmark brand-logo-tone-${tone} ${className}`.trim()}
      role="img"
    >
      <span className="brand-wordmark-title">mace-san</span>
      <span className="brand-wordmark-meta">MATERIALS INTELLIGENCE</span>
    </span>
  );
}
