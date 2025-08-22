import type { TelegramUser } from '../types'

export const getTelegramUser = (): TelegramUser | null => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.initDataUnsafe?.user) {
    return window.Telegram.WebApp.initDataUnsafe.user
  }
  return null
}

export const getTelegramTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.colorScheme) {
    return window.Telegram.WebApp.colorScheme
  }
  return 'light'
}

export const getTelegramThemeParams = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.themeParams) {
    return window.Telegram.WebApp.themeParams
  }
  return null
}

export const hapticFeedback = (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'light') => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.HapticFeedback) {
    window.Telegram.WebApp.HapticFeedback.impactOccurred(style)
  }
}

export const showTelegramAlert = (message: string, callback?: () => void) => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.showAlert) {
    window.Telegram.WebApp.showAlert(message, callback)
  } else {
    alert(message)
    callback?.()
  }
}

export const showTelegramConfirm = (message: string, callback?: (confirmed: boolean) => void) => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.showConfirm) {
    window.Telegram.WebApp.showConfirm(message, callback)
  } else {
    const confirmed = confirm(message)
    callback?.(confirmed)
  }
}

export const setTelegramMainButton = (text: string, callback?: () => void) => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.MainButton) {
    const mainButton = window.Telegram.WebApp.MainButton
    mainButton.setText(text)
    if (callback) {
      mainButton.onClick(callback)
    }
    mainButton.show()
  }
}

export const hideTelegramMainButton = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.MainButton) {
    window.Telegram.WebApp.MainButton.hide()
  }
}

export const showTelegramBackButton = (callback?: () => void) => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.BackButton) {
    const backButton = window.Telegram.WebApp.BackButton
    if (callback) {
      backButton.onClick(callback)
    }
    backButton.show()
  }
}

export const hideTelegramBackButton = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.BackButton) {
    window.Telegram.WebApp.BackButton.hide()
  }
}

export const closeTelegramApp = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.close) {
    window.Telegram.WebApp.close()
  }
}

export const expandTelegramApp = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.expand) {
    window.Telegram.WebApp.expand()
  }
}

export const isTelegramWebApp = (): boolean => {
  return typeof window !== 'undefined' && !!window.Telegram?.WebApp
}

export const getTelegramViewportHeight = (): number => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.viewportHeight) {
    return window.Telegram.WebApp.viewportHeight
  }
  return window.innerHeight
}

export const setTelegramHeaderColor = (color: string) => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.setHeaderColor) {
    window.Telegram.WebApp.setHeaderColor(color)
  }
}

export const setTelegramBackgroundColor = (color: string) => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.setBackgroundColor) {
    window.Telegram.WebApp.setBackgroundColor(color)
  }
}

export const getTelegramInitData = (): string | null => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.initData) {
    return window.Telegram.WebApp.initData
  }
  return null
}

export const authWithTelegram = async (): Promise<{
  user?: {
    id: string
    name: string
    karma: number
    referralCode: string
    isPremium: boolean
    dailyDrawsUsed: number
    lastDailyDraw?: string
  }
  error?: string
}> => {
  const initData = getTelegramInitData()
  if (!initData) {
    return { error: 'Telegram initData not available' }
  }

  const res = await fetch('/api/auth/telegram', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ initData })
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    return { error: err?.error || 'Auth failed' }
  }

  const data = await res.json()
  return { user: data.user }
} 