'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Square, Clock, Zap } from 'lucide-react'
import { formatDuration } from '@/app/lib/utils'
import { useGymSessions } from '@/app/lib/hooks'

export function GymSession() {
  const { checkIn, checkOut, getCurrentSession, loading } = useGymSessions()
  const [currentTime, setCurrentTime] = useState(new Date())
  
  const currentSession = getCurrentSession()
  const isActive = !!currentSession
  const startTime = currentSession ? new Date(currentSession.checkInTime) : null

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

  const handleStart = async () => {
    if (!loading) {
      await checkIn()
    }
  }

  const handleEnd = async () => {
    if (!loading && currentSession) {
      await checkOut(currentSession.sessionId)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`card ${isActive ? 'bg-gradient-to-r from-green-600/20 to-blue-600/20 border-green-500/30' : ''}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-full ${isActive ? 'bg-green-500' : 'bg-dark-700'}`}>
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
                  className="text-sm text-green-400 font-mono"
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
          onClick={isActive ? handleEnd : handleStart}
          disabled={loading}
          className={`btn ${
            isActive 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          ) : isActive ? (
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