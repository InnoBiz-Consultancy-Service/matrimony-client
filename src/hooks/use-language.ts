"use client";

import { Language } from "@/dictionary/translation";
import { useState, useEffect } from "react";

export function useLanguage() {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved && (saved === "en" || saved === "bn")) {
      setLanguage(saved);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return { language, changeLanguage };
}
