import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Settings as SettingsIcon } from 'lucide-react'

const Settings = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center mb-6"
      >
        <button
          onClick={() => navigate('/')}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors mr-4"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-2xl font-bold text-white">Настройки</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-effect rounded-2xl p-6"
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'white'
        }}
      >
        <div className="text-center">
          <SettingsIcon className="w-12 h-12 mx-auto text-white mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Настройки</h2>
          <p className="text-white/70">Настройки скоро появятся...</p>
        </div>
      </motion.div>
    </div>
  )
}

export default Settings 