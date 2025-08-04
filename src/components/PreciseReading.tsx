import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Sparkles, Clock, Zap, Lightbulb } from 'lucide-react'
import { useAppStore } from '../store'
import { generatePreciseReading } from '../utils/tarot'

const PreciseReading = () => {
  const navigate = useNavigate()
  const { currentReading } = useAppStore()

  if (!currentReading) {
    navigate('/')
    return null
  }

  const preciseReading = generatePreciseReading(currentReading)

  return (
    <div className="min-h-screen p-6 sm:p-8 mobile-safe-area" style={{ 
      paddingTop: '80px',
      paddingBottom: '40px'
    }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center mb-6 sm:mb-8"
      >
        <button
          onClick={() => navigate('/')}
          className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors mr-3 sm:mr-4"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </button>
        <h1 className="text-lg sm:text-2xl font-bold text-white">Детальный прогноз</h1>
      </motion.div>

      <div className="space-y-6 sm:space-y-8">
        {/* Detailed Interpretation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-effect rounded-2xl p-6 sm:p-8"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white'
          }}
        >
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Детальная интерпретация
          </h2>
          <p className="text-white/90 leading-relaxed text-sm sm:text-base">{preciseReading.detailedInterpretation}</p>
        </motion.div>

        {/* Advice */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-effect rounded-2xl p-6 sm:p-8"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white'
          }}
        >
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center">
            <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Совет
          </h3>
          <p className="text-white/90 text-sm sm:text-base">{preciseReading.advice}</p>
        </motion.div>

        {/* Timing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-2xl p-6 sm:p-8"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white'
          }}
        >
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Время
          </h3>
          <p className="text-white/90 text-sm sm:text-base">{preciseReading.timing}</p>
        </motion.div>

        {/* Energy */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-2xl p-6 sm:p-8"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white'
          }}
        >
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Энергия
          </h3>
          <p className="text-white/90 text-sm sm:text-base">{preciseReading.energy}</p>
        </motion.div>
      </div>
    </div>
  )
}

export default PreciseReading 