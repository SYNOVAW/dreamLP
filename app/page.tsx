import DreamLifeLanding from "@/components/dream-life-landing"
import { GradientBackground } from "@/components/gradient-background"

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <GradientBackground />
      <div className="relative z-10">
        <DreamLifeLanding />
      </div>
    </main>
  )
}
