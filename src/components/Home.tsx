import { useNavigate } from 'react-router-dom'
import { Sparkles, User, Settings, Crown, Star } from 'lucide-react'
import { useAppStore } from '../store'
import { generateDailyReading } from '../utils/tarot'
import { getDeckById } from '../data/decks'
import { hapticFeedback } from '../utils/telegram'

const Home = () => {
  const navigate = useNavigate()
  const { user, settings, currentReading, setCurrentReading, karmaBalance, setUser, setOnboarded, getCanDrawDaily } = useAppStore()
  const canDrawDaily = getCanDrawDaily()
  const selectedDeck = getDeckById(settings.selectedDeck)
  
  console.log('Home render:', { user, canDrawDaily, selectedDeck: selectedDeck?.name })

  const handleDailyDraw = () => {
    hapticFeedback('medium')
    console.log('handleDailyDraw called')
    console.log('selectedDeck:', selectedDeck)
    if (selectedDeck) {
      console.log('Generating daily reading...')
      const reading = generateDailyReading(selectedDeck)
      console.log('Generated reading:', reading)
      setCurrentReading(reading)
      navigate('/reading')
    } else {
      console.error('No deck selected!')
    }
  }

  const handlePreciseForecast = () => {
    hapticFeedback('light')
    navigate('/precise')
  }

  const handleProfileClick = () => {
    hapticFeedback('light')
    navigate('/profile')
  }

  const handleSettingsClick = () => {
    hapticFeedback('light')
    navigate('/settings')
  }

  const handleResetDaily = () => {
    hapticFeedback('light')
    console.log('handleResetDaily called')
    if (user) {
      const updatedUser = {
        ...user,
        lastDailyDraw: undefined,
        dailyDrawsUsed: 0
      }
      console.log('Updating user:', updatedUser)
      setUser(updatedUser)
      console.log('User updated, should trigger re-render')
      
      // Force immediate recalculation
      const newCanDraw = getCanDrawDaily()
      console.log('Immediate canDrawDaily after reset:', newCanDraw)
    } else {
      console.error('No user to reset!')
    }
  }

  return (
    <div className="min-h-screen p-4" style={{ 
      backgroundColor: 'transparent',
      position: 'relative',
      zIndex: 10,
      paddingTop: '80px'
    }}>
      {/* Header */}
      <div
        className="flex justify-between items-center mb-8"
        style={{ color: 'white' }}
      >
        <div className="flex items-center space-x-3">
          <Sparkles className="w-8 h-8 text-yellow-300" />
          <h1 className="text-2xl font-bold text-white">Таро Мистик</h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-white/10 px-3 py-1 rounded-full">
            <Star className="w-4 h-4 text-yellow-300" />
            <span className="text-white font-medium">{karmaBalance}</span>
          </div>
          <button
            onClick={handleProfileClick}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <User className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={handleSettingsClick}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Welcome Message */}
      {user ? (
        <div
          className="rounded-2xl p-6 mb-6"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white'
          }}
        >
          <div className="text-center">
            <h2 className="text-xl font-bold text-white mb-2">С возвращением, {user.name}! ✨</h2>
            <p className="text-white/70">Готовы к ежедневному гаданию на таро?</p>
          </div>
        </div>
      ) : (
        <div
          className="rounded-2xl p-6 mb-6"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white'
          }}
        >
          <div className="text-center">
            <h2 className="text-xl font-bold text-white mb-2">Добро пожаловать в Таро Мистик! ✨</h2>
            <p className="text-white/70 mb-4">Для начала работы создайте профиль</p>
            <button
              onClick={() => {
                console.log('Creating test user...')
                const testUser = {
                  id: 'test-user',
                  name: 'Тестовый пользователь',
                  gender: 'other' as const,
                  birthDate: '1990-01-01',
                  birthTime: '12:00',
                  birthPlace: 'Москва',
                  karma: 100,
                  referralCode: 'REF123',
                  isPremium: false,
                  dailyDrawsUsed: 0,
                  quests: [],
                  achievements: []
                }
                console.log('Test user:', testUser)
                setUser(testUser)
                setOnboarded(true)
                console.log('User and onboarded set')
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              Создать тестовый профиль
            </button>
            <button
              onClick={() => {
                console.log('Resetting all data...')
                localStorage.clear()
                window.location.reload()
              }}
              className="mt-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300"
            >
              Сбросить все данные
            </button>
            <button
              onClick={() => {
                console.log('Creating fresh test user...')
                const freshUser = {
                  id: 'fresh-test-user',
                  name: 'Новый пользователь',
                  gender: 'other' as const,
                  birthDate: '1990-01-01',
                  birthTime: '12:00',
                  birthPlace: 'Москва',
                  karma: 100,
                  referralCode: 'REF123',
                  isPremium: false,
                  dailyDrawsUsed: 0,
                  lastDailyDraw: undefined,
                  quests: [],
                  achievements: []
                }
                console.log('Fresh user:', freshUser)
                setUser(freshUser)
                setOnboarded(true)
                console.log('Fresh user set')
              }}
              className="mt-2 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-2 px-4 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300"
            >
              Создать нового пользователя
            </button>
          </div>
        </div>
      )}

      {/* Daily Draw Section */}
      {user && (
        <div
          className="rounded-2xl p-6 mb-6"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white'
          }}
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Ежедневное гадание</h2>
            <p className="text-white/70">
              {canDrawDaily 
                ? "Узнайте, что карты приготовили для вас сегодня"
                : "Вы уже получили ежедневные карты. Загляните завтра!"
              }
            </p>
            <p className="text-white/50 text-xs mt-2">
              Debug: canDrawDaily={canDrawDaily.toString()}, user={user?.name || 'none'}, lastDraw={user?.lastDailyDraw || 'none'}
            </p>
          </div>

          {canDrawDaily ? (
            <button
              onClick={handleDailyDraw}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              Вытянуть карты
            </button>
          ) : (
            <div className="text-center py-4">
              <div className="text-white/50 text-sm mb-2">
                Следующее гадание доступно завтра
              </div>
              <button
                onClick={handleResetDaily}
                className="text-white/70 text-xs underline hover:text-white transition-colors"
              >
                Сбросить для тестирования
              </button>
            </div>
          )}
          
          {/* Test button - always show for debugging */}
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                console.log('Test draw clicked')
                if (selectedDeck) {
                  console.log('Selected deck:', selectedDeck)
                  const reading = generateDailyReading(selectedDeck)
                  console.log('Generated reading:', reading)
                  setCurrentReading(reading)
                  navigate('/reading')
                } else {
                  console.error('No deck selected!')
                  alert('Колода не найдена!')
                }
              }}
              className="text-white/50 text-xs underline hover:text-white transition-colors"
            >
              Тест гадания (всегда доступно)
            </button>
            <button
              onClick={() => {
                console.log('Force refresh clicked')
                console.log('Current canDrawDaily:', canDrawDaily)
                console.log('Current user:', user)
                // Force re-render by updating user
                setUser({ ...user! })
                // Force immediate recalculation
                const newCanDraw = getCanDrawDaily()
                console.log('Immediate canDrawDaily after force refresh:', newCanDraw)
              }}
              className="text-white/50 text-xs underline hover:text-white transition-colors ml-2"
            >
              Принудительное обновление
            </button>
          </div>
        </div>
      )}

      {/* Precise Forecast */}
      {user && currentReading && (
        <div
          className="rounded-2xl p-6 mb-6"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white'
          }}
        >
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold text-white mb-2">Точный прогноз</h3>
            <p className="text-white/70 text-sm">Получите детальную интерпретацию вашего гадания</p>
          </div>
          <button
            onClick={handlePreciseForecast}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
          >
            Посмотреть детальное гадание
          </button>
        </div>
      )}

      {/* Quick Actions */}
      {user && (
        <div className="grid grid-cols-2 gap-4">
          <div 
            className="rounded-xl p-4 text-center cursor-pointer hover:bg-white/5 transition-colors"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white'
            }}
            onClick={() => {
              hapticFeedback('light')
              alert('Премиум функции скоро появятся!')
            }}
          >
            <Crown className="w-8 h-8 mx-auto text-yellow-300 mb-2" />
            <h3 className="text-white font-semibold mb-1">Премиум</h3>
            <p className="text-white/70 text-sm">Разблокировать все функции</p>
          </div>
          <div 
            className="rounded-xl p-4 text-center cursor-pointer hover:bg-white/5 transition-colors"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white'
            }}
            onClick={() => {
              hapticFeedback('light')
              alert('Система квестов скоро появится!')
            }}
          >
            <Star className="w-8 h-8 mx-auto text-purple-300 mb-2" />
            <h3 className="text-white font-semibold mb-1">Квесты</h3>
            <p className="text-white/70 text-sm">Заработать очки кармы</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home 