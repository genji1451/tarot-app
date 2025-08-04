import { motion } from 'framer-motion'
import { Sparkles, Moon, Star } from 'lucide-react'

const LoadingScreen = () => {
  return (
    <div className="min-h-screen cosmic-bg flex items-center justify-center">
      <div className="text-center text-white">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 mx-auto mb-4 relative"
            >
              <div className="absolute inset-0 border-4 border-white/30 rounded-full"></div>
              <div className="absolute inset-2 border-4 border-white/50 rounded-full"></div>
              <div className="absolute inset-4 border-4 border-white/70 rounded-full"></div>
              <div className="absolute inset-6 border-4 border-white rounded-full"></div>
            </motion.div>
            
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <Sparkles className="w-8 h-8 text-yellow-300" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl font-bold mb-2"
        >
          Tarot Mystic
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-lg opacity-80 mb-8"
        >
          Connecting to the cosmic energies...
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex justify-center space-x-2"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            className="w-3 h-3 bg-white rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            className="w-3 h-3 bg-white rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            className="w-3 h-3 bg-white rounded-full"
          />
        </motion.div>

        {/* Floating cosmic elements */}
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 left-10 opacity-30"
        >
          <Star className="w-6 h-6 text-yellow-300" />
        </motion.div>

        <motion.div
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-40 right-10 opacity-30"
        >
          <Moon className="w-6 h-6 text-blue-300" />
        </motion.div>

        <motion.div
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-40 left-20 opacity-30"
        >
          <Sparkles className="w-5 h-5 text-purple-300" />
        </motion.div>
      </div>
    </div>
  )
}

export default LoadingScreen 