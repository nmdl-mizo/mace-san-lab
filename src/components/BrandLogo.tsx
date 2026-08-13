import { withBasePath } from '../lib/paths';

type BrandLogoKind = 'symbol' | 'wordmark';
type BrandLogoTone = 'dark' | 'light' | 'theme';

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  kind?: BrandLogoKind;
  label?: string;
  tone?: BrandLogoTone;
}

const logoSources: Record<BrandLogoKind, { dark: string; light: string }> = {
  symbol: {
    dark: withBasePath('/brand/nmdl-symbol-clean.png'),
    light: withBasePath('/brand/nmdl-symbol-clean.png'),
  },
  wordmark: {
    dark: withBasePath('/brand/nmdl-logo-dark.jpg'),
    light: withBasePath('/brand/nmdl-logo-light.jpg'),
  },
};

export default function BrandLogo({
  className = '',
  imageClassName = '',
  kind = 'wordmark',
  label = 'NMDL / UTokyo',
  tone = 'theme',
}: BrandLogoProps) {
  if (kind === 'wordmark') {
    return (
      <span
        aria-label={label}
        className={`brand-logo brand-logo-wordmark brand-logo-tone-${tone} ${className}`.trim()}
        role="img"
      >
        <span className="brand-wordmark-title">NMDL</span>
        <span className="brand-wordmark-meta">playground</span>
      </span>
    );
  }

  const sources = logoSources[kind];

  return (
    <span
      aria-label={label}
      className={`brand-logo brand-logo-${kind} brand-logo-tone-${tone} ${className}`.trim()}
      role="img"
    >
      <img
        alt=""
        aria-hidden="true"
        className={`brand-logo-image brand-logo-image-dark ${imageClassName}`.trim()}
        decoding="async"
        src={sources.dark}
      />
      <img
        alt=""
        aria-hidden="true"
        className={`brand-logo-image brand-logo-image-light ${imageClassName}`.trim()}
        decoding="async"
        src={sources.light}
      />
    </span>
  );
}
