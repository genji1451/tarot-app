import type { TarotDeck } from '../types'
import { allTarotCards } from './tarotCards'

export const tarotDecks: TarotDeck[] = [
  {
    id: 'classic',
    name: 'Classic Rider-Waite',
    description: 'The traditional tarot deck with timeless symbolism and deep spiritual meanings.',
    style: 'serious',
    isPremium: false,
    cards: allTarotCards
  },
  {
    id: 'cosmic',
    name: 'Cosmic Mystic',
    description: 'A modern deck with cosmic themes and celestial imagery for deep spiritual readings.',
    style: 'serious',
    isPremium: true,
    cards: allTarotCards
  },
  {
    id: 'cartoon',
    name: 'Funny Fortune',
    description: 'A lighthearted deck with cartoon-style cards and humorous interpretations.',
    style: 'cartoonish',
    isPremium: true,
    cards: allTarotCards
  },
  {
    id: 'meme',
    name: 'Meme Magic',
    description: 'The internet generation\'s tarot deck with meme culture and modern humor.',
    style: 'meme',
    isPremium: true,
    cards: allTarotCards
  },
  {
    id: 'mystic',
    name: 'Mystic Dreams',
    description: 'A dreamy deck with ethereal artwork and mystical interpretations.',
    style: 'serious',
    isPremium: true,
    cards: allTarotCards
  }
]

export const getDeckById = (id: string): TarotDeck | undefined => {
  return tarotDecks.find(deck => deck.id === id)
}

export const getFreeDecks = (): TarotDeck[] => {
  return tarotDecks.filter(deck => !deck.isPremium)
}

export const getPremiumDecks = (): TarotDeck[] => {
  return tarotDecks.filter(deck => deck.isPremium)
} 