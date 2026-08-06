"use client";

import * as React from "react";
import { toast } from "sonner";
import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Language {
  code: string;
  /** English name, shown as the secondary line (omitted when it matches nativeLabel). */
  label: string;
  /** The language's own name, in its own script — the primary line. */
  nativeLabel: string;
}

// English first as the default; order otherwise matches how the request
// listed them. Real translation is out of scope here — this is the control
// surface the production site's translation plugin (WPML/GTranslate, whatever
// WordPress ends up using) will hang off once this ships.
const LANGUAGES: Language[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "es", label: "Spanish", nativeLabel: "Español" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية" },
  { code: "ko", label: "Korean", nativeLabel: "한국어" },
  { code: "ja", label: "Japanese", nativeLabel: "日本語" },
];

const STORAGE_KEY = "community-portal-language";

export function LanguagePicker() {
  const [language, setLanguage] = React.useState<Language>(LANGUAGES[0]);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const found = LANGUAGES.find((l) => l.code === stored);
    if (found) setLanguage(found);
  }, []);

  function handleSelect(lang: Language) {
    setLanguage(lang);
    window.localStorage.setItem(STORAGE_KEY, lang.code);
    toast.success(`Language set to ${lang.label}.`, {
      description:
        lang.code === "en"
          ? undefined
          : "Page translation isn't wired up in this preview — this is the trigger point for it.",
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={`Language: ${language.label}`}>
          <Globe className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleSelect(lang)}
            className="flex items-center justify-between gap-2"
          >
            <span className="flex flex-col">
              <span className="text-sm font-medium">{lang.nativeLabel}</span>
              {lang.nativeLabel !== lang.label && (
                <span className="text-xs text-muted-foreground">{lang.label}</span>
              )}
            </span>
            {language.code === lang.code && <Check className="size-4 shrink-0 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
