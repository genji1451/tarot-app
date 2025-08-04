import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppStore } from './store'
import { getTelegramUser, getTelegramTheme, expandTelegramApp } from './utils/telegram'

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

    // Try to get Telegram user data
    const telegramUser = getTelegramUser()
    if (telegramUser && !user) {
      // Create user from Telegram data
      const newUser = {
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
      setUser(newUser)
    }

    // Set theme based on Telegram
    const theme = getTelegramTheme()
    if (settings.theme === 'auto') {
      setSettings({
        ...settings,
        theme: theme
      })
    }

    setLoading(false)
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