import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import ms from "./locales/ms.json";
import zh from "./locales/zh.json";
import ta from "./locales/ta.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "ms", "zh", "ta"],

    resources: {
      en: { translation: en },
      ms: { translation: ms },
      zh: { translation: zh },
      ta: { translation: ta },
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;