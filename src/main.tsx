import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize Telegram Web App
declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void
        expand: () => void
        close: () => void
        MainButton: {
          text: string
          color: string
          textColor: string
          isVisible: boolean
          isActive: boolean
          isProgressVisible: boolean
          setText: (text: string) => void
          onClick: (callback: () => void) => void
          show: () => void
          hide: () => void
          enable: () => void
          disable: () => void
          showProgress: (leaveActive?: boolean) => void
          hideProgress: () => void
        }
        BackButton: {
          isVisible: boolean
          onClick: (callback: () => void) => void
          show: () => void
          hide: () => void
        }
        themeParams: {
          bg_color: string
          text_color: string
          hint_color: string
          link_color: string
          button_color: string
          button_text_color: string
          secondary_bg_color?: string
          tertiary_bg_color?: string
          destructive_text_color?: string
        }
        colorScheme: 'light' | 'dark'
        isExpanded: boolean
        viewportHeight: number
        viewportStableHeight: number
        headerColor: string
        backgroundColor: string
        isClosingConfirmationEnabled: boolean
        HapticFeedback: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void
          notificationOccurred: (type: 'error' | 'success' | 'warning') => void
          selectionChanged: () => void
        }
        CloudStorage: {
          getItem: (key: string) => Promise<string | null>
          setItem: (key: string, value: string) => Promise<void>
          getItems: (keys: string[]) => Promise<Record<string, string | null>>
          removeItem: (key: string) => Promise<void>
          removeItems: (keys: string[]) => Promise<void>
          getKeys: () => Promise<string[]>
        }
        BiometricManager: {
          isInited: boolean
          isAvailable: boolean
          isDeviceSupported: boolean
          isAccessRequested: boolean
          isAccessGranted: boolean
          init: () => Promise<void>
          authenticate: () => Promise<boolean>
          close: () => void
        }
        initData: string
        initDataUnsafe: {
          query_id: string
          user: {
            id: number
            is_bot: boolean
            first_name: string
            last_name?: string
            username?: string
            language_code?: string
            is_premium?: boolean
            added_to_attachment_menu?: boolean
            allows_write_to_pm?: boolean
            photo_url?: string
          }
          receiver: {
            id: number
            type: 'user' | 'group' | 'supergroup' | 'channel'
            title?: string
            username?: string
            photo_url?: string
          }
          chat: {
            id: number
            type: 'group' | 'supergroup' | 'channel'
            title: string
            username?: string
            photo_url?: string
          }
          chat_type: 'sender' | 'private' | 'group' | 'supergroup' | 'channel'
          chat_instance: string
          start_param: string
          can_send_after: number
          auth_date: number
          hash: string
        }
        isVersionAtLeast: (version: string) => boolean
        platform: 'android' | 'ios' | 'macos' | 'tdesktop' | 'weba' | 'webk' | 'unigram' | 'unknown'
        sendData: (data: string) => void
        switchInlineQuery: (query: string, choose_chat_types?: string[]) => void
        openLink: (url: string, options?: { try_instant_view?: boolean }) => void
        openTelegramLink: (url: string) => void
        openInvoice: (url: string, callback?: (status: 'paid' | 'cancelled' | 'failed' | 'pending') => void) => void
        showPopup: (params: { title?: string; message: string; buttons?: Array<{ id?: string; type: 'default' | 'ok' | 'close' | 'cancel' | 'destructive'; text: string }> }, callback?: (buttonId: string) => void) => void
        showAlert: (message: string, callback?: () => void) => void
        showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void
        showScanQrPopup: (params: { text?: string }, callback?: (text: string) => void) => void
        closeScanQrPopup: () => void
        readTextFromClipboard: (callback?: (text: string) => void) => void
        requestWriteAccess: (callback?: (access: boolean) => void) => void
        requestContact: (callback?: (contact: { phone_number: string; first_name: string; last_name?: string; user_id?: number; vcard?: string }) => void) => void
        invokeCustomMethod: (method: string, params?: any, callback?: (result: any) => void) => void
        invokeCustomMethodUnsafe: (method: string, params?: any, callback?: (result: any) => void) => void
        isSettingsButtonVisible: boolean
        showSettings: () => void
        isThemeSupported: boolean
        setHeaderColor: (color: string) => void
        setBackgroundColor: (color: string) => void
        enableClosingConfirmation: () => void
        disableClosingConfirmation: () => void
        onEvent: (eventType: string, eventHandler: () => void) => void
        offEvent: (eventType: string, eventHandler: () => void) => void
        version: string
      }
    }
  }
}

// Initialize Telegram Web App
if (window.Telegram?.WebApp) {
  window.Telegram.WebApp.ready()
  window.Telegram.WebApp.expand()
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
) 