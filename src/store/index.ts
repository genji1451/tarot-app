import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppState, User, AppSettings, DailyReading } from '../types'

interface AppStore extends AppState {
  // Actions
  setUser: (user: User) => void
  updateUser: (updates: Partial<User>) => void
  setSettings: (settings: AppSettings) => void
  setCurrentReading: (reading: DailyReading | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setOnboarded: (onboarded: boolean) => void
  setPersona: (persona: 'curious' | 'analytical' | 'meme' | 'collector' | null) => void
  resetState: () => void
  
  // Computed values
  canDrawDaily: boolean
  getCanDrawDaily: () => boolean
  karmaBalance: number
  isPremium: boolean
}

const initialState: AppState = {
  user: null,
  settings: {
    language: 'en',
    selectedDeck: 'classic',
    notifications: true,
    soundEffects: true,
    hapticFeedback: true,
    theme: 'auto'
  },
  currentReading: null,
  isLoading: false,
  error: null,
  isOnboarded: false,
  selectedPersona: null
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Actions
      setUser: (user) => {
        console.log('setUser called with:', user)
        set({ user })
      },
      
      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),
      
      setSettings: (settings) => set({ settings }),
      
      setCurrentReading: (reading) => set((state) => {
        // Update user's daily draw info when setting a reading
        const updatedUser = state.user ? {
          ...state.user,
          lastDailyDraw: new Date().toISOString(),
          dailyDrawsUsed: state.user.dailyDrawsUsed + 1
        } : null
        
        return {
          currentReading: reading,
          user: updatedUser
        }
      }),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      setError: (error) => set({ error }),
      
      setOnboarded: (onboarded) => set({ isOnboarded: onboarded }),
      
      setPersona: (persona) => set({ selectedPersona: persona }),
      
      resetState: () => set(initialState),
      
      // Computed values
      canDrawDaily: false, // Will be calculated dynamically
      
      getCanDrawDaily: () => {
        const { user } = get()
        if (!user) return false
        
        const today = new Date().toDateString()
        const lastDraw = user.lastDailyDraw ? new Date(user.lastDailyDraw).toDateString() : null
        
        // If lastDailyDraw is undefined or null, user can draw
        const canDraw = !user.lastDailyDraw || lastDraw !== today
        console.log('canDrawDaily calculation:', { 
          user: user.name, 
          today, 
          lastDraw, 
          canDraw,
          lastDailyDraw: user.lastDailyDraw 
        })
        
        return canDraw
      },
      
      get karmaBalance() {
        return get().user?.karma || 0
      },
      
      get isPremium() {
        return get().user?.isPremium || false
      }
    }),
    {
      name: 'tarot-app-storage',
      partialize: (state) => ({
        user: state.user,
        settings: state.settings,
        isOnboarded: state.isOnboarded,
        selectedPersona: state.selectedPersona
      })
    }
  )
) 