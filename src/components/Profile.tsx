import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Star, Crown } from 'lucide-react'
import { useAppStore } from '../store'

const Profile = () => {
  const navigate = useNavigate()
  const { user, karmaBalance, isPremium } = useAppStore()

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
        <h1 className="text-2xl font-bold text-white">Профиль</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-effect rounded-2xl p-6 mb-6"
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'white'
        }}
      >
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">{user?.name}</h2>
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-300" />
              <span className="text-white font-medium">{karmaBalance} Карма</span>
            </div>
            {isPremium && (
              <div className="flex items-center space-x-1">
                <Crown className="w-4 h-4 text-yellow-300" />
                <span className="text-white font-medium">Премиум</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Profile 