import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Sparkles, RotateCcw } from 'lucide-react'
import { useAppStore } from '../store'
import { useState } from 'react'

const CardReading = () => {
  const navigate = useNavigate()
  const { currentReading } = useAppStore()
  // Состояние: flipped для каждой карты
  const [flipped, setFlipped] = useState(() => currentReading ? currentReading.cards.map(() => false) : [])

  if (!currentReading) {
    navigate('/')
    return null
  }

  // Функция flip
  const handleFlip = (idx: number) => {
    setFlipped(f => f.map((val, i) => (i === idx ? true : val)))
  }

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
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
        <h1 className="text-2xl font-bold text-white">Ваше гадание</h1>
      </motion.div>

      <div className="space-y-6">
        {/* Cards Display */}
        <div className="flex justify-center space-x-4 mb-8">
          {currentReading.cards.map((reading, index) => (
            <div
              key={reading.card.id}
              className="relative cursor-pointer"
              onClick={() => !flipped[index] && handleFlip(index)}
              style={{ perspective: '800px' }}
            >
              <div
                className={`w-24 h-36 rounded-lg shadow-xl border-2 border-white/20 relative transition-transform duration-500 card-3d ${flipped[index] ? 'flipped' : ''}`}
                style={{ transformStyle: 'preserve-3d', transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
              >
                {/* Back (рубашка) */}
                <div className="card-face absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-900 rounded-lg" style={{ backfaceVisibility: 'hidden', zIndex: 2 }}>
                  <Sparkles className="w-10 h-10 text-white opacity-60" />
                </div>
                {/* Front (открытая карта) */}
                <div className="card-face absolute inset-0 flex flex-col items-center justify-center rounded-lg" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', zIndex: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                  <div className="flex-1 flex items-center justify-center w-full">
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div className="relative z-10 text-white text-xs font-bold text-center px-1 bg-black/20 rounded-sm m-1 leading-tight">
                      {reading.card.name.split(' ').map((word, i) => (
                        <div key={i}>{word}</div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-2 mt-auto">
                    <span className="bg-white/30 px-2 py-1 rounded text-xs text-white backdrop-blur-sm border border-white/20">
                      {reading.position === 'upright' ? 'прямая' : 'перевернутая'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interpretation - показывать только если все карты открыты */}
        {flipped.every(f => f) && (
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
            <h2 className="text-xl font-bold text-white mb-4">Послание дня</h2>
            <p className="text-white/90 leading-relaxed">{currentReading.interpretation}</p>
          </motion.div>
        )}

        {/* Card Details - показывать только если все карты открыты */}
        {flipped.every(f => f) && (
          <div className="space-y-4">
            {currentReading.cards.map((reading, index) => (
              <motion.div
                key={reading.card.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="glass-effect rounded-xl p-4"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white'
                }}
              >
                <h3 className="text-lg font-semibold text-white mb-2">{reading.card.name}</h3>
                <p className="text-white/70 text-sm mb-2">
                  Позиция: <span className="capitalize">{reading.position === 'upright' ? 'прямая' : 'перевернутая'}</span>
                </p>
                <p className="text-white/80">{reading.meaning}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Action Buttons - показывать только если все карты открыты */}
        {flipped.every(f => f) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex space-x-4"
          >
            <button
              onClick={() => navigate('/precise')}
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
            >
              Детальное гадание
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
            >
              <RotateCcw className="w-4 h-4 inline mr-2" />
              Новое гадание
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default CardReading

/*
CSS для flip-эффекта уже есть в tailwind + .card-3d, .card-face. Если нужно, можно добавить:
.card-3d { perspective: 800px; }
.card-face { backface-visibility: hidden; position: absolute; width: 100%; height: 100%; }
*/ 