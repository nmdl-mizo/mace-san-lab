const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

export function withBasePath(path: string) {
  if (!path) {
    return import.meta.env.BASE_URL || '/';
  }

  if (/^(https?:)?\/\//.test(path) || path.startsWith('#')) {
    return path;
  }

  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${normalized}`;
}
