import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Sparkles, User, Calendar, Clock, MapPin, ArrowRight } from 'lucide-react'
import { useAppStore } from '../store'
import { hapticFeedback } from '../utils/telegram'
import { updateUserProfile } from '../utils/telegram'

const personaSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  gender: z.enum(['male', 'female', 'other']),
  birthDate: z.string().min(1, 'Дата рождения обязательна'),
  birthTime: z.string().min(1, 'Время рождения обязательно'),
  birthPlace: z.string().min(2, 'Место рождения должно содержать минимум 2 символа')
})

type PersonaFormData = z.infer<typeof personaSchema>

const personas = [
  {
    id: 'curious' as const,
    title: 'Любопытный новичок',
    description: 'Только начинаете свой мистический путь? Идеально для начинающих!',
    icon: '🔮',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'analytical' as const,
    title: 'Аналитический верующий',
    description: 'Вы ищете глубокие смыслы и духовные прозрения.',
    icon: '🧠',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'meme' as const,
    title: 'Любитель мемов',
    description: 'Жизнь слишком коротка, чтобы относиться ко всему серьезно!',
    icon: '😂',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'collector' as const,
    title: 'Коллекционер таро',
    description: 'Вы цените искусство и историю таро.',
    icon: '🎴',
    color: 'from-green-500 to-emerald-500'
  }
]

const Onboarding = () => {
  const [step, setStep] = useState<'persona' | 'form'>('persona')
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null)
  const { setUser, setOnboarded, setPersona } = useAppStore()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PersonaFormData>({
    resolver: zodResolver(personaSchema)
  })

  const handlePersonaSelect = (personaId: string) => {
    hapticFeedback('light')
    setSelectedPersona(personaId)
    setPersona(personaId as any)
    setStep('form')
  }

  const onSubmit = async (data: PersonaFormData) => {
    hapticFeedback('medium')
    
    console.log('Onboarding onSubmit:', data)
    
    const res = await updateUserProfile({
      name: data.name,
      gender: data.gender,
      birthDate: data.birthDate,
      birthTime: data.birthTime,
      birthPlace: data.birthPlace,
      persona: selectedPersona || undefined,
      onboarded: true
    })
    if (res.user) {
      const u = res.user
      setUser({
        id: u.id, name: u.name,
        gender: (u.gender as any) ?? 'other',
        birthDate: u.birthDate ?? '', birthTime: u.birthTime ?? '', birthPlace: u.birthPlace ?? '',
        karma: u.karma ?? 100, referralCode: u.referralCode ?? `REF${u.id}`,
        isPremium: u.isPremium ?? false, dailyDrawsUsed: u.dailyDrawsUsed ?? 0,
        lastDailyDraw: u.lastDailyDraw, quests: [], achievements: []
      })
      setOnboarded(true)
    }
  }

  return (
    <div className="min-h-screen cosmic-bg flex items-center justify-center p-6 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {step === 'persona' ? (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="mb-8"
            >
              <Sparkles className="w-16 h-16 mx-auto text-yellow-300 mb-4" />
              <h1 className="text-3xl font-bold text-white mb-2">Добро пожаловать в Таро Мистик</h1>
              <p className="text-white/80">Выберите свою мистическую персону для начала путешествия</p>
            </motion.div>

            <div className="space-y-4">
              {personas.map((persona, index) => (
                <motion.button
                  key={persona.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handlePersonaSelect(persona.id)}
                  className={`w-full p-4 rounded-xl glass-effect text-left transition-all duration-300 hover:scale-105 ${
                    selectedPersona === persona.id ? 'ring-2 ring-white' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{persona.icon}</span>
                    <div>
                      <h3 className="text-white font-semibold">{persona.title}</h3>
                      <p className="text-white/70 text-sm">{persona.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-effect rounded-xl p-6"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Завершите свой профиль</h2>
              <p className="text-white/80">Помогите нам персонализировать ваш опыт таро</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  <User className="inline w-4 h-4 mr-2" />
                  Полное имя
                </label>
                <input
                  {...register('name')}
                  type="text"
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Введите ваше полное имя"
                />
                {errors.name && (
                  <p className="text-red-300 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Пол</label>
                <select
                  {...register('gender')}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <option value="">Выберите пол</option>
                  <option value="male">Мужской</option>
                  <option value="female">Женский</option>
                  <option value="other">Другой</option>
                </select>
                {errors.gender && (
                  <p className="text-red-300 text-sm mt-1">{errors.gender.message}</p>
                )}
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  <Calendar className="inline w-4 h-4 mr-2" />
                  Дата рождения
                </label>
                <input
                  {...register('birthDate')}
                  type="date"
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                {errors.birthDate && (
                  <p className="text-red-300 text-sm mt-1">{errors.birthDate.message}</p>
                )}
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  <Clock className="inline w-4 h-4 mr-2" />
                  Время рождения
                </label>
                <input
                  {...register('birthTime')}
                  type="time"
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                {errors.birthTime && (
                  <p className="text-red-300 text-sm mt-1">{errors.birthTime.message}</p>
                )}
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  <MapPin className="inline w-4 h-4 mr-2" />
                  Место рождения
                </label>
                <input
                  {...register('birthPlace')}
                  type="text"
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Город, Страна"
                />
                {errors.birthPlace && (
                  <p className="text-red-300 text-sm mt-1">{errors.birthPlace.message}</p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              >
                <span>Начать путешествие</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </form>

            <button
              onClick={() => setStep('persona')}
              className="w-full mt-4 text-white/70 hover:text-white transition-colors"
            >
              ← Вернуться к выбору персоны
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default Onboarding 