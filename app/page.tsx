import DreamLifeLanding from "@/components/dream-life-landing"
import { GradientBackground } from "@/components/gradient-background"
import { LocaleProvider } from "@/components/locale-provider"

export default function Page() {
  return (
    <LocaleProvider>
      <main className="relative min-h-screen overflow-hidden">
        <GradientBackground />
        <div className="relative z-10">
          <DreamLifeLanding />
        </div>
      </main>
    </LocaleProvider>
  )
}
