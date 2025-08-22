import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppStore } from './store'
import { getTelegramUser, getTelegramTheme, expandTelegramApp, authWithTelegram } from './utils/telegram'

// Components
import Onboarding from './components/Onboarding'
import Home from './components/Home'
import Profile from './components/Profile'
import Settings from './components/Settings'
import CardReading from './components/CardReading'
import PreciseReading from './components/PreciseReading'
import LoadingScreen from './components/LoadingScreen'

function App() {
  const { 
    user, 
    settings, 
    isOnboarded, 
    setUser, 
    setOnboarded, 
    setSettings,
    isLoading,
    setLoading 
  } = useAppStore()

  useEffect(() => {
    // Initialize Telegram Web App
    expandTelegramApp()
    
    // Check if user is onboarded
    if (!isOnboarded) {
      setLoading(false)
      return
    }

    const doAuth = async () => {
      try {
        if (!user) {
          // Prefer server auth with Telegram verification
          const result = await authWithTelegram()
          if (result.user) {
            const srv = result.user
            const newUser = {
              id: srv.id,
              name: srv.name,
              gender: 'other' as const,
              birthDate: '',
              birthTime: '',
              birthPlace: '',
              karma: srv.karma ?? 100,
              referralCode: srv.referralCode ?? `REF${srv.id}`,
              isPremium: srv.isPremium ?? false,
              dailyDrawsUsed: srv.dailyDrawsUsed ?? 0,
              lastDailyDraw: srv.lastDailyDraw,
              quests: [],
              achievements: []
            }
            setUser(newUser)
          } else {
            // Fallback to client-only creation if API not available
            const telegramUser = getTelegramUser()
            if (telegramUser) {
              const fallbackUser = {
                id: telegramUser.id.toString(),
                name: telegramUser.first_name,
                gender: 'other' as const,
                birthDate: '',
                birthTime: '',
                birthPlace: '',
                karma: 100,
                referralCode: `REF${telegramUser.id}`,
                isPremium: false,
                dailyDrawsUsed: 0,
                quests: [],
                achievements: []
              }
              setUser(fallbackUser)
            }
          }
        }
      } finally {
        // Set theme based on Telegram
        const theme = getTelegramTheme()
        if (settings.theme === 'auto') {
          setSettings({
            ...settings,
            theme: theme
          })
        }
        setLoading(false)
      }
    }

    void doAuth()
  }, [isOnboarded, user, settings, setUser, setOnboarded, setSettings, setLoading])

  if (isLoading) {
    return <LoadingScreen />
  }

  // For testing - skip onboarding if user exists
  if (!isOnboarded && !user) {
    return <Onboarding />
  }

  return (
    <Router>
      <div 
        className="min-h-screen"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease infinite',
          minHeight: '100vh',
          width: '100%'
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/reading" element={<CardReading />} />
          <Route path="/precise" element={<PreciseReading />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App 