import type { TarotCard, CardReading, DailyReading, TarotDeck } from '../types'
import { allTarotCards } from '../data/tarotCards'

export const shuffleCards = (cards: TarotCard[]): TarotCard[] => {
  const shuffled = [...cards]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const drawCards = (deck: TarotDeck, count: number): TarotCard[] => {
  const shuffled = shuffleCards(deck.cards)
  return shuffled.slice(0, count)
}

export const createCardReading = (card: TarotCard, deck: TarotDeck): CardReading => {
  const isReversed = Math.random() > 0.7 // 30% chance of reversed
  const position: 'upright' | 'reversed' = isReversed ? 'reversed' : 'upright'
  
  let meaning = ''
  if (position === 'upright') {
    meaning = card.meanings.upright
  } else {
    meaning = card.meanings.reversed
  }
  
  // Add deck-specific description
  const description = card.descriptions[deck.style]
  
  return {
    card,
    position,
    meaning: `${meaning} ${description}`
  }
}

export const generateDailyReading = (deck: TarotDeck): DailyReading => {
  const cards = drawCards(deck, 3)
  const readings = cards.map(card => createCardReading(card, deck))
  
  const interpretation = generateInterpretation(readings, deck)
  
  return {
    id: `reading-${Date.now()}`,
    date: new Date().toISOString(),
    cards: readings,
    interpretation,
    deck
  }
}

export const generateInterpretation = (readings: CardReading[], deck: TarotDeck): string => {
  const cardNames = readings.map(r => r.card.name).join(', ')
  const positions = readings.map(r => r.position).join(', ')
  
  const interpretations = {
    cartoonish: `Ваши карты сегодня: ${cardNames}! ${positions.includes('reversed') ? 'Некоторые карты перевернуты, что означает, что все может быть немного вверх ногами!' : 'Все карты в правильном положении, так что все выглядит довольно прямолинейно!'} Это будет интересный день!`,
    serious: `Сегодняшнее гадание раскрывает ${cardNames}. Позиции ${positions} предполагают более глубокое духовное послание для вашего пути. Эти карты вместе говорят о трансформации и росте.`,
    meme: `Хорошо, так что вселенная решила дать вам ${cardNames} сегодня. ${positions.includes('reversed') ? 'Некоторые карты делают ча-ча-ча вверх ногами.' : 'Все в правильном положении, что редкость в наши дни!'} Вибрации безупречны.`
  }
  
  return interpretations[deck.style]
}

export const generatePreciseReading = (dailyReading: DailyReading): any => {
  const { cards, deck } = dailyReading
  
  const detailedInterpretation = `Основываясь на ваших трех картах, сегодня приносит уникальную комбинацию энергий. ${cards.map((reading) => {
    const position = reading.position === 'reversed' ? 'перевернутая' : 'прямая'
    return `Карта ${reading.card.name} в ${position} позиции предполагает ${reading.meaning.toLowerCase()}.`
  }).join(' ')} Вместе эти карты создают мощное послание для вашего дня.`
  
  const advice = `Найдите время, чтобы поразмышлять над этими посланиями. ${deck.style === 'cartoonish' ? 'Не относитесь к жизни слишком серьезно сегодня!' : deck.style === 'meme' ? 'Вселенная в основном отправляет вам мем сегодня.' : 'Медитируйте над более глубокими значениями.'}`
  
  const timing = `Энергия этих карт сильнее всего во время ${['утра', 'дня', 'вечера'][Math.floor(Math.random() * 3)]}.`
  
  const energy = `Общая энергия: ${['позитивная', 'нейтральная', 'сложная'][Math.floor(Math.random() * 3)]}`
  
  return {
    ...dailyReading,
    detailedInterpretation,
    advice,
    timing,
    energy
  }
}

export const getCardImageUrl = (card: TarotCard): string => {
  // In a real app, you'd have different images for different decks
  return card.imageUrl
}

export const getDeckBackground = (deck: TarotDeck): string => {
  switch (deck.style) {
    case 'cartoonish':
      return 'cosmic-bg'
    case 'serious':
      return 'night-bg stars-bg'
    case 'meme':
      return 'mystic-bg'
    default:
      return 'cosmic-bg'
  }
}

export const getDeckGlow = (deck: TarotDeck): string => {
  switch (deck.style) {
    case 'cartoonish':
      return 'cosmic-glow'
    case 'serious':
      return ''
    case 'meme':
      return 'mystic-glow'
    default:
      return 'cosmic-glow'
  }
}

export const getRandomCard = (): TarotCard => {
  return allTarotCards[Math.floor(Math.random() * allTarotCards.length)]
}

export const getCardsBySuit = (suit: 'major' | 'wands' | 'cups' | 'swords' | 'pentacles'): TarotCard[] => {
  return allTarotCards.filter(card => card.suit === suit)
}

export const getMajorArcana = (): TarotCard[] => {
  return getCardsBySuit('major')
}

export const getMinorArcana = (): TarotCard[] => {
  return allTarotCards.filter(card => card.suit !== 'major')
} 