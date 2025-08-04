export interface User {
  id: string
  name: string
  gender: 'male' | 'female' | 'other'
  birthDate: string
  birthTime: string
  birthPlace: string
  karma: number
  referralCode: string
  referredBy?: string
  isPremium: boolean
  dailyDrawsUsed: number
  lastDailyDraw?: string
  quests: Quest[]
  achievements: Achievement[]
}

export interface TarotCard {
  id: string
  name: string
  suit: 'major' | 'wands' | 'cups' | 'swords' | 'pentacles'
  number: number
  keywords: string[]
  meanings: {
    upright: string
    reversed: string
  }
  descriptions: {
    cartoonish: string
    serious: string
    meme: string
  }
  imageUrl: string
}

export interface TarotDeck {
  id: string
  name: string
  description: string
  style: 'cartoonish' | 'serious' | 'meme'
  isPremium: boolean
  cards: TarotCard[]
}

export interface CardReading {
  card: TarotCard
  position: 'upright' | 'reversed'
  meaning: string
}

export interface DailyReading {
  id: string
  date: string
  cards: CardReading[]
  interpretation: string
  deck: TarotDeck
}

export interface PreciseReading extends DailyReading {
  detailedInterpretation: string
  advice: string
  timing: string
  energy: string
}

export interface Quest {
  id: string
  title: string
  description: string
  type: 'daily' | 'weekly' | 'achievement'
  reward: {
    type: 'karma' | 'premium' | 'feature'
    amount: number
  }
  progress: number
  maxProgress: number
  completed: boolean
  completedAt?: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt?: string
}

export interface ForecastType {
  id: string
  name: string
  description: string
  duration: string
  isPremium: boolean
  karmaCost: number
}

export interface AppSettings {
  language: 'en' | 'ru' | 'es' | 'fr' | 'de'
  selectedDeck: string
  notifications: boolean
  soundEffects: boolean
  hapticFeedback: boolean
  theme: 'auto' | 'light' | 'dark'
}

export interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: boolean
  photo_url?: string
}

export type AppState = {
  user: User | null
  settings: AppSettings
  currentReading: DailyReading | null
  isLoading: boolean
  error: string | null
  isOnboarded: boolean
  selectedPersona: 'curious' | 'analytical' | 'meme' | 'collector' | null
}

export type AppAction = 
  | { type: 'SET_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'SET_SETTINGS'; payload: AppSettings }
  | { type: 'SET_CURRENT_READING'; payload: DailyReading | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_ONBOARDED'; payload: boolean }
  | { type: 'SET_PERSONA'; payload: 'curious' | 'analytical' | 'meme' | 'collector' | null }
  | { type: 'RESET_STATE' } 