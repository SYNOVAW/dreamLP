"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { mindfulDesign, applyMindful } from "@/lib/mindful-design-system"
import { useLocale } from "@/hooks/use-locale"
import { createConstellationCards, ConstellationCard } from "@/lib/constellation-data"

// Simple, natural element indicators
const elementStyles = {
  Fire: "bg-orange-50 text-orange-600 border-orange-100",
  Earth: "bg-amber-50 text-amber-700 border-amber-100", 
  Air: "bg-sky-50 text-sky-600 border-sky-100",
  Water: "bg-blue-50 text-blue-600 border-blue-100"
}

// Minimal card component focused on content
interface MindfulCardProps {
  card: ConstellationCard
  isSelected: boolean
  onClick: () => void
  t: any
}

function MindfulCard({ card, isSelected, onClick, t }: MindfulCardProps) {
  return (
    <motion.div
      className="w-64 cursor-pointer"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={onClick}
    >
      <Card className={`${applyMindful.card(isSelected ? 'highlight' : 'default')} h-full`}>
        <CardContent className={`${mindfulDesign.spacing.cardPadding} h-full flex flex-col`}>
          {/* Simple header with name and element */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className={`${applyMindful.heading('h3')} mb-1`}>
                {card.name}
              </h3>
              <p className={`${applyMindful.text('caption', 'muted')}`}>
                {card.dates}
              </p>
            </div>
            <div className={`px-2 py-1 ${mindfulDesign.shapes.borderRadiusSmall} ${elementStyles[card.element as keyof typeof elementStyles]} text-xs font-medium border`}>
              {card.element}
            </div>
          </div>

          {/* Natural image - no flashy effects */}
          <div className={`relative ${mindfulDesign.shapes.borderRadius} overflow-hidden mb-6 bg-gradient-to-br from-slate-50 to-stone-50 aspect-[4/3]`}>
            <img
              src={card.image}
              alt={card.name}
              className={`w-full h-full object-cover ${mindfulDesign.animation.gentle}`}
            />
          </div>

          {/* Content focused on meaning */}
          <div className="flex-1 space-y-4">
            <div>
              <h4 className={`${applyMindful.text('body', 'primary')} font-medium mb-2`}>
                {isSelected ? card.backTitle : card.frontTitle}
              </h4>
              <p className={`${applyMindful.text('small', 'secondary')} leading-relaxed`}>
                {isSelected ? card.backDescription : card.frontDescription}
              </p>
            </div>
          </div>

          {/* Simple interaction hint */}
          <div className="pt-4 border-t border-slate-100 mt-6">
            <p className={`${applyMindful.text('caption', 'muted')} text-center`}>
              {isSelected ? t.constellationCards.clickToFlipBack : t.constellationCards.clickForGuidance}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Main component with minimal, centered layout
export default function MindfulConstellationCards() {
  const { t } = useLocale()
  const constellationCards = createConstellationCards(t)
  const [selectedCard, setSelectedCard] = useState<string | null>(null)

  const handleCardClick = (cardId: string) => {
    setSelectedCard(selectedCard === cardId ? null : cardId)
  }

  return (
    <section className={`${applyMindful.section('large')} ${applyMindful.background()}`}>
      <div className={mindfulDesign.layout.containerWide}>
        {/* Simple, clear heading */}
        <div className="text-center mb-16">
          <h2 className={`${applyMindful.heading('h1')} mb-6`}>
            {t.constellationCards.sectionTitle}
          </h2>
          <p className={`${applyMindful.text('body', 'secondary')} max-w-2xl mx-auto leading-relaxed`}>
            {t.constellationCards.sectionDescription}
          </p>
        </div>

        {/* Simple instructions */}
        <div className="text-center mb-12">
          <Card className={`${applyMindful.card()} inline-block`}>
            <CardContent className="px-8 py-4">
              <p className={`${applyMindful.text('small', 'secondary')}`}>
                {t.constellationCards.instructions}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Clean grid layout - no fancy scrolling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {constellationCards.map((card) => (
            <MindfulCard
              key={card.id}
              card={card}
              isSelected={selectedCard === card.id}
              onClick={() => handleCardClick(card.id)}
              t={t}
            />
          ))}
        </div>

        {/* Simple daily draw section */}
        <div className="mt-20 text-center">
          <Card className={`${applyMindful.card('highlight')} inline-block`}>
            <CardContent className={`${mindfulDesign.spacing.cardPaddingLarge} max-w-md`}>
              <h3 className={`${applyMindful.heading('h3')} mb-4`}>
                Today's Guidance
              </h3>
              <p className={`${applyMindful.text('small', 'secondary')} mb-6 leading-relaxed`}>
                Draw a card for your daily mindfulness practice
              </p>
              <button 
                className={`px-6 py-3 ${mindfulDesign.colors.accent.primary} ${mindfulDesign.shapes.borderRadius} ${applyMindful.text('small', 'primary')} font-medium ${mindfulDesign.animation.hover}`}
                onClick={() => {
                  const randomCard = constellationCards[Math.floor(Math.random() * constellationCards.length)]
                  setSelectedCard(randomCard.id)
                }}
              >
                Draw Today's Card
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}