import { slug } from "github-slugger";
import { marked } from "marked";
import config from "../../config/config.json";

const rawBasePath = config.site.base_path || "/";
const basePath = rawBasePath === "/" ? "" : rawBasePath.replace(/\/$/, "");

const withBasePath = (pathname: string) => {
  if (!basePath) return pathname;
  if (pathname === basePath || pathname.startsWith(`${basePath}/`)) {
    return pathname;
  }
  if (pathname === "/") return basePath;
  return `${basePath}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
};

const rewriteInternalAssetAndAnchorUrls = (html: string) => {
  return html.replace(/\b(href|src)="(\/[^"]*)"/g, (_match, attr, url) => {
    return `${attr}="${withBasePath(url)}"`;
  });
};

// slugify
export const slugify = (content: string) => {
  return slug(content);
};

// markdownify
export const markdownify = (content: string, div?: boolean) => {
  const html = div ? marked.parse(content) : marked.parseInline(content);
  return rewriteInternalAssetAndAnchorUrls(String(html));
};

// humanize
export const humanize = (content: string) => {
  return content
    .replace(/^[\s_]+|[\s_]+$/g, "")
    .replace(/[_\s]+/g, " ")
    .replace(/[-\s]+/g, " ")
    .replace(/^[a-z]/, function (m) {
      return m.toUpperCase();
    });
};

// titleify
export const titleify = (content: string) => {
  const humanized = humanize(content);
  return humanized
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// plainify
export const plainify = (content: string) => {
  const parseMarkdown: any = marked.parse(content);
  const filterBrackets = parseMarkdown.replace(/<\/?[^>]+(>|$)/gm, "");
  const filterSpaces = filterBrackets.replace(/[\r\n]\s*[\r\n]/gm, "");
  const stripHTML = htmlEntityDecoder(filterSpaces);
  return stripHTML;
};

// strip entities for plainify
const htmlEntityDecoder = (htmlWithEntities: string) => {
  let entityList: { [key: string]: string } = {
    "&nbsp;": " ",
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&#39;": "'",
  };
  let htmlWithoutEntities: string = htmlWithEntities.replace(
    /(&amp;|&lt;|&gt;|&quot;|&#39;)/g,
    (entity: string): string => {
      return entityList[entity];
    },
  );
  return htmlWithoutEntities;
};
