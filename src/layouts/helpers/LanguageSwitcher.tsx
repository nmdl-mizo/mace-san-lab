import config from "@/config/config.json";
import languages from "@/config/language.json";
import React from "react";

const LanguageSwitcher = ({
  lang,
  pathname,
}: {
  lang: string;
  pathname: string;
}) => {
  const { default_language, default_language_in_subdir } = config.settings;
  const basePath =
    config.site.base_path === "/"
      ? ""
      : config.site.base_path.replace(/\/$/, "");

  // Function to remove trailing slash if necessary
  const removeTrailingSlash = (path: string) => {
    if (!config.site.trailing_slash) {
      return path.replace(/\/$/, "");
    }
    return path;
  };

  const stripBasePath = (path: string) => {
    if (!basePath) return path || "/";
    const stripped = path.startsWith(basePath)
      ? path.slice(basePath.length) || "/"
      : path;
    return stripped.startsWith("/") ? stripped : `/${stripped}`;
  };

  const withBasePath = (path: string) => {
    const normalized = path || "/";
    if (!basePath) return normalized;
    if (normalized === basePath || normalized.startsWith(`${basePath}/`)) {
      return normalized;
    }
    if (normalized === "/") return basePath;
    return `${basePath}${normalized.startsWith("/") ? normalized : `/${normalized}`}`;
  };

  // Sort languages by weight and filter out disabled languages
  const sortedLanguages = languages
    // @ts-ignore
    .filter(language => !config.settings.disable_languages.includes(language.languageCode))
    .sort((a, b) => a.weight - b.weight);

  return (
    <div className={`mr-5 ${sortedLanguages.length > 1 ? "block" : "hidden"}`}>
      <select
        className="border border-dark text-dark bg-transparent dark:border-darkmode-primary dark:text-white py-1 rounded-sm cursor-pointer focus:ring-0 focus:border-dark dark:focus:border-darkmode-primary"
        onChange={(e) => {
          const selectedLang = e.target.value;
          let newPath;
          const baseUrl = window.location.origin;
          const pathWithoutBase = stripBasePath(pathname);

          if (selectedLang === default_language) {
            if (default_language_in_subdir) {
              newPath = `${baseUrl}${withBasePath(`/${default_language}${removeTrailingSlash(pathWithoutBase.replace(`/${lang}`, ""))}`)}`;
            } else {
              newPath = `${baseUrl}${withBasePath(removeTrailingSlash(pathWithoutBase.replace(`/${lang}`, "")) || "/")}`;
            }
          } else {
            newPath = `${baseUrl}${withBasePath(`/${selectedLang}${removeTrailingSlash(pathWithoutBase.replace(`/${lang}`, ""))}`)}`;
          }

          window.location.href = newPath;
        }}
        value={lang}
      >
        {sortedLanguages.map((language) => (
          <option
            className="dark:text-dark"
            key={language.languageCode}
            value={language.languageCode}
          >
            {language.languageName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
