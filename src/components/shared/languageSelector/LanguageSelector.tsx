"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/dictionary/translation";
import { useEffect, useState } from "react";

export function LanguageSelector() {
  const { language, changeLanguage } = useLanguage();
  const [lang, setLang] = useState<string | null>("bn");

  useEffect(() => {
    try {
      const getLocalStorage = localStorage.getItem("language");
      setLang(getLocalStorage);
    } catch {
      console.log("something went wrong");
    }
  }, []); // dependency empty so it only runs once

  const handleLanguageChange = (selectedLang: "en" | "bn") => {
    changeLanguage(selectedLang);
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="rounded-md border-gray-300 text-sm font-medium hover:bg-pink-50 focus:ring-2 focus:ring-pink-400"
        >
          {translations[language].language}
          {lang}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[120px] rounded-md border border-gray-200 bg-white shadow-md py-1"
      >
        <DropdownMenuItem
          className="text-sm px-3 py-2 hover:bg-pink-100 cursor-pointer"
          onClick={() => handleLanguageChange("en")}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-sm px-3 py-2 hover:bg-pink-100 cursor-pointer"
          onClick={() => handleLanguageChange("bn")}
        >
          বাংলা
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
