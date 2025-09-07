"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLocale } from "@/hooks/use-locale"
import { locales, localeNames } from "@/lib/i18n"
import { Languages, ChevronDown, Check } from "lucide-react"
import { glassCardStyles } from "@/lib/card-styles"
import { useReducedMotion } from "@/hooks/use-animation"
import { useState } from "react"

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()
  const prefersReducedMotion = useReducedMotion()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu modal={false} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <motion.div
          whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        >
          <Button 
            variant="ghost" 
            size="sm" 
            className={`${glassCardStyles.text.secondary} hover:${glassCardStyles.text.primary} hover:bg-white/10 transition-all duration-200 gap-1 relative overflow-hidden`}
            aria-label="Switch language"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0"
              initial={{ x: "-100%" }}
              whileHover={prefersReducedMotion ? {} : {
                x: "100%",
                transition: { duration: 0.6 }
              }}
            />
            <div className="relative z-10 flex items-center gap-1">
              <motion.div
                animate={prefersReducedMotion ? {} : (isOpen ? { rotate: 180 } : {})}
                transition={{ duration: 0.2 }}
              >
                <Languages className="h-4 w-4" />
              </motion.div>
              <span className="hidden sm:inline">
                {localeNames[locale]}
              </span>
              <motion.div
                animate={prefersReducedMotion ? {} : (isOpen ? { rotate: 180 } : { rotate: 0 })}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <ChevronDown className="h-3 w-3 opacity-60" />
              </motion.div>
            </div>
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <AnimatePresence>
        {isOpen && (
          <DropdownMenuContent 
            align="end" 
            className="bg-slate-800/95 backdrop-blur-xl border border-white/20 min-w-[120px] z-50 shadow-xl text-slate-100 p-1 rounded-md"
            sideOffset={8}
            alignOffset={-4}
            asChild
            forceMount
          >
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.95 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.95 }}
              transition={{
                duration: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {locales.map((loc, index) => (
                <motion.div
                  key={loc}
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                  animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                >
                  <DropdownMenuItem
                    onClick={() => setLocale(loc)}
                    className="cursor-pointer text-slate-200 hover:text-slate-100 hover:bg-white/10 transition-colors relative rounded-sm px-2 py-1.5 text-sm outline-none select-none focus:bg-white/10 focus:text-slate-100 group"
                  >
                    <span className="flex-1">{localeNames[loc]}</span>
                    {locale === loc && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={prefersReducedMotion ? {} : { scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        <Check className="h-4 w-4 ml-2 text-fuchsia-400" />
                      </motion.div>
                    )}
                  </DropdownMenuItem>
                </motion.div>
              ))}
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  )
}
