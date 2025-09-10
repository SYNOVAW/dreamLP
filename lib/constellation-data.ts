// Constellation card type
export interface ConstellationCard {
  id: string
  name: string
  chineseName: string
  image: string
  frontTitle: string
  frontDescription: string
  backTitle: string
  backDescription: string
  element: string
  dates: string
}

// Function to create constellation cards data using translations
export const createConstellationCards = (t: any): ConstellationCard[] => [
  {
    id: "aries",
    name: t.constellationCards.cards.aries.name,
    chineseName: t.constellationCards.cards.aries.name,
    image: "/Aries.jpg",
    frontTitle: t.constellationCards.cards.aries.frontTitle,
    frontDescription: t.constellationCards.cards.aries.frontDescription,
    backTitle: t.constellationCards.backTitle,
    backDescription: t.constellationCards.cards.aries.backDescription,
    element: "Fire",
    dates: "3/21 - 4/19"
  },
  {
    id: "taurus",
    name: t.constellationCards.cards.taurus.name,
    chineseName: t.constellationCards.cards.taurus.name,
    image: "/Taurus.jpg",
    frontTitle: t.constellationCards.cards.taurus.frontTitle,
    frontDescription: t.constellationCards.cards.taurus.frontDescription,
    backTitle: t.constellationCards.backTitle,
    backDescription: t.constellationCards.cards.taurus.backDescription,
    element: "Earth",
    dates: "4/20 - 5/20"
  },
  {
    id: "gemini",
    name: t.constellationCards.cards.gemini.name,
    chineseName: t.constellationCards.cards.gemini.name,
    image: "/Gemini.jpg",
    frontTitle: t.constellationCards.cards.gemini.frontTitle,
    frontDescription: t.constellationCards.cards.gemini.frontDescription,
    backTitle: t.constellationCards.backTitle,
    backDescription: t.constellationCards.cards.gemini.backDescription,
    element: "Air",
    dates: "5/21 - 6/20"
  },
  {
    id: "cancer",
    name: t.constellationCards.cards.cancer.name,
    chineseName: t.constellationCards.cards.cancer.name,
    image: "/Cancer.jpg",
    frontTitle: t.constellationCards.cards.cancer.frontTitle,
    frontDescription: t.constellationCards.cards.cancer.frontDescription,
    backTitle: t.constellationCards.backTitle,
    backDescription: t.constellationCards.cards.cancer.backDescription,
    element: "Water",
    dates: "6/21 - 7/22"
  },
  {
    id: "leo",
    name: t.constellationCards.cards.leo.name,
    chineseName: t.constellationCards.cards.leo.name,
    image: "/Leo.jpg",
    frontTitle: t.constellationCards.cards.leo.frontTitle,
    frontDescription: t.constellationCards.cards.leo.frontDescription,
    backTitle: t.constellationCards.backTitle,
    backDescription: t.constellationCards.cards.leo.backDescription,
    element: "Fire",
    dates: "7/23 - 8/22"
  },
  {
    id: "virgo",
    name: t.constellationCards.cards.virgo.name,
    chineseName: t.constellationCards.cards.virgo.name,
    image: "/Virgo.jpg",
    frontTitle: t.constellationCards.cards.virgo.frontTitle,
    frontDescription: t.constellationCards.cards.virgo.frontDescription,
    backTitle: t.constellationCards.backTitle,
    backDescription: t.constellationCards.cards.virgo.backDescription,
    element: "Earth",
    dates: "8/23 - 9/22"
  },
  {
    id: "libra",
    name: t.constellationCards.cards.libra.name,
    chineseName: t.constellationCards.cards.libra.name,
    image: "/Libra.jpg",
    frontTitle: t.constellationCards.cards.libra.frontTitle,
    frontDescription: t.constellationCards.cards.libra.frontDescription,
    backTitle: t.constellationCards.backTitle,
    backDescription: t.constellationCards.cards.libra.backDescription,
    element: "Air",
    dates: "9/23 - 10/22"
  },
  {
    id: "scorpio",
    name: t.constellationCards.cards.scorpio.name,
    chineseName: t.constellationCards.cards.scorpio.name,
    image: "/Scorpio.jpg",
    frontTitle: t.constellationCards.cards.scorpio.frontTitle,
    frontDescription: t.constellationCards.cards.scorpio.frontDescription,
    backTitle: t.constellationCards.backTitle,
    backDescription: t.constellationCards.cards.scorpio.backDescription,
    element: "Water",
    dates: "10/23 - 11/21"
  },
  {
    id: "sagittarius",
    name: t.constellationCards.cards.sagittarius.name,
    chineseName: t.constellationCards.cards.sagittarius.name,
    image: "/Sagittarius.jpg",
    frontTitle: t.constellationCards.cards.sagittarius.frontTitle,
    frontDescription: t.constellationCards.cards.sagittarius.frontDescription,
    backTitle: t.constellationCards.backTitle,
    backDescription: t.constellationCards.cards.sagittarius.backDescription,
    element: "Fire",
    dates: "11/22 - 12/21"
  },
  {
    id: "capricorn",
    name: t.constellationCards.cards.capricorn.name,
    chineseName: t.constellationCards.cards.capricorn.name,
    image: "/Capricorn.jpg",
    frontTitle: t.constellationCards.cards.capricorn.frontTitle,
    frontDescription: t.constellationCards.cards.capricorn.frontDescription,
    backTitle: t.constellationCards.backTitle,
    backDescription: t.constellationCards.cards.capricorn.backDescription,
    element: "Earth",
    dates: "12/22 - 1/19"
  },
  {
    id: "aquarius",
    name: t.constellationCards.cards.aquarius.name,
    chineseName: t.constellationCards.cards.aquarius.name,
    image: "/Aquarius.jpg",
    frontTitle: t.constellationCards.cards.aquarius.frontTitle,
    frontDescription: t.constellationCards.cards.aquarius.frontDescription,
    backTitle: t.constellationCards.backTitle,
    backDescription: t.constellationCards.cards.aquarius.backDescription,
    element: "Air",
    dates: "1/20 - 2/18"
  },
  {
    id: "pisces",
    name: t.constellationCards.cards.pisces.name,
    chineseName: t.constellationCards.cards.pisces.name,
    image: "/Pisces.jpg",
    frontTitle: t.constellationCards.cards.pisces.frontTitle,
    frontDescription: t.constellationCards.cards.pisces.frontDescription,
    backTitle: t.constellationCards.backTitle,
    backDescription: t.constellationCards.cards.pisces.backDescription,
    element: "Water",
    dates: "2/19 - 3/20"
  }
]