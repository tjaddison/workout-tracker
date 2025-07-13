'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Square, Clock, Zap } from 'lucide-react'
import { formatDuration } from '@/app/lib/utils'

interface GymSessionProps {
  isActive: boolean
  startTime: Date | null
  onStart: () => void
  onEnd: () => void
}

export function GymSession({ isActive, startTime, onStart, onEnd }: GymSessionProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getSessionDuration = () => {
    if (!startTime) return 0
    return Math.floor((currentTime.getTime() - startTime.getTime()) / 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`card ${isActive ? 'bg-gradient-to-r from-secondary-600/20 to-primary-600/20 border-secondary-500/30' : ''}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-full ${isActive ? 'bg-secondary-500' : 'bg-dark-700'}`}>
            {isActive ? (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="h-6 w-6 text-white" />
              </motion.div>
            ) : (
              <Clock className="h-6 w-6 text-dark-400" />
            )}
          </div>
          
          <div>
            <h3 className="font-semibold text-white">Gym Session</h3>
            <AnimatePresence mode="wait">
              {isActive && startTime ? (
                <motion.p
                  key="active"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-secondary-400 font-mono"
                >
                  {formatDuration(getSessionDuration())}
                </motion.p>
              ) : (
                <motion.p
                  key="inactive"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-dark-400"
                >
                  Ready to start
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isActive ? onEnd : onStart}
          className={`btn ${
            isActive 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'btn-primary'
          }`}
        >
          {isActive ? (
            <>
              <Square className="h-4 w-4 mr-2" />
              End
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Start
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}