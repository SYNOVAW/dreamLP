import DreamLifeLanding from "@/components/dream-life-landing"
import { GradientBackground } from "@/components/gradient-background"
import { LocaleProvider } from "@/components/locale-provider"
import { ErrorBoundary } from "@/components/error-boundary"

export default function Page() {
  return (
    <ErrorBoundary>
      <LocaleProvider>
        <main className="relative min-h-screen overflow-hidden">
          <GradientBackground />
          <div className="relative z-10">
            <DreamLifeLanding />
          </div>
        </main>
      </LocaleProvider>
    </ErrorBoundary>
  )
}
