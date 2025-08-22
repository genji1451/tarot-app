import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Settings as SettingsIcon } from 'lucide-react'
import { useAppStore } from '../store'
import { useForm } from 'react-hook-form'
import { updateUserProfile } from '../utils/telegram'

const Settings = () => {
  const navigate = useNavigate()
  const { user, updateUser } = useAppStore()

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: user?.name || '',
      gender: user?.gender || 'other',
      birthDate: user?.birthDate || '',
      birthTime: user?.birthTime || '',
      birthPlace: user?.birthPlace || ''
    }
  })

  const onSubmit = async (data: any) => {
    const res = await updateUserProfile({
      name: data.name, gender: data.gender, birthDate: data.birthDate, birthTime: data.birthTime, birthPlace: data.birthPlace
    })
    if (res.user) {
      updateUser({
        name: res.user.name,
        gender: (res.user.gender as any) ?? 'other',
        birthDate: res.user.birthDate ?? '',
        birthTime: res.user.birthTime ?? '',
        birthPlace: res.user.birthPlace ?? ''
      })
      reset({
        name: res.user.name,
        gender: (res.user.gender as any) ?? 'other',
        birthDate: res.user.birthDate ?? '',
        birthTime: res.user.birthTime ?? '',
        birthPlace: res.user.birthPlace ?? ''
      })
    }
  }

  return (
    <div className="min-h-screen p-6 sm:p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center mb-6">
        <button onClick={() => navigate('/')} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors mr-4">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-2xl font-bold text-white">Настройки</h1>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="glass-effect rounded-2xl p-6" style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}>
        <div className="text-center mb-6">
          <SettingsIcon className="w-12 h-12 mx-auto text-white mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Профиль</h2>
          <p className="text-white/70">Изменяйте данные, указанные при регистрации</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div><label className="block text-white text-sm font-medium mb-2">Имя</label>
            <input {...register('name')} className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white" />
          </div>
          <div><label className="block text-white text-sm font-medium mb-2">Пол</label>
            <select {...register('gender')} className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white">
              <option value="male">Мужской</option><option value="female">Женский</option><option value="other">Другой</option>
            </select>
          </div>
          <div><label className="block text-white text-sm font-medium mb-2">Дата рождения</label>
            <input type="date" {...register('birthDate')} className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white" />
          </div>
          <div><label className="block text-white text-sm font-medium mb-2">Время рождения</label>
            <input type="time" {...register('birthTime')} className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white" />
          </div>
          <div><label className="block text-white text-sm font-medium mb-2">Место рождения</label>
            <input {...register('birthPlace')} className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white" />
          </div>
          <button type="submit" className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg">Сохранить</button>
        </form>
      </motion.div>
    </div>
  )
}
export default Settings 