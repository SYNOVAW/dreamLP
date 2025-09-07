"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLocale } from "@/hooks/use-locale"
import { locales, localeNames, localeFlags } from "@/lib/i18n"
import { Languages } from "lucide-react"

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
          <Languages className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">
            {localeFlags[locale]} {localeNames[locale]}
          </span>
          <span className="sm:hidden">
            {localeFlags[locale]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-slate-800 border-white/10">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => setLocale(loc)}
            className={`cursor-pointer hover:bg-white/10 text-slate-200 ${
              locale === loc ? 'bg-white/5' : ''
            }`}
          >
            <span className="mr-2">{localeFlags[loc]}</span>
            {localeNames[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
