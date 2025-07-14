'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { AuthGuard } from '../components/auth/auth-guard'
import { DashboardHeader } from '../components/dashboard/dashboard-header'
import { WorkoutCard } from '../components/workout/workout-card'
import { StatsOverview } from '../components/dashboard/stats-overview'
import { GymSession } from '../components/dashboard/gym-session'
import { QuickActions } from '../components/dashboard/quick-actions'
import { workoutSchedule, getTodaysWorkout } from '../lib/workouts'
import type { WorkoutSchedule } from '../types'
import { LoadingSpinner } from '../components/ui/loading-spinner'
import toast from 'react-hot-toast'

export default function Dashboard() {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const [todaysWorkout, setTodaysWorkout] = useState<WorkoutSchedule | null>(null)
  const [gymSessionActive, setGymSessionActive] = useState(false)
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null)

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        // Load today's workout
        const workout = getTodaysWorkout()
        setTodaysWorkout(workout)
        
        // Check for active gym session
        const savedSession = localStorage.getItem('activeGymSession')
        if (savedSession) {
          const sessionData = JSON.parse(savedSession)
          setGymSessionActive(true)
          setSessionStartTime(new Date(sessionData.startTime))
        }
      } catch (error) {
        console.error('Error loading dashboard:', error)
        toast.error('Failed to load dashboard data')
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboard()
  }, [])

  const handleStartGymSession = () => {
    const startTime = new Date()
    setGymSessionActive(true)
    setSessionStartTime(startTime)
    localStorage.setItem('activeGymSession', JSON.stringify({ startTime: startTime.toISOString() }))
    toast.success('Gym session started! 💪')
  }

  const handleEndGymSession = () => {
    setGymSessionActive(false)
    setSessionStartTime(null)
    localStorage.removeItem('activeGymSession')
    toast.success('Great workout! Session ended 🎉')
  }

  if (isLoading) {
    return (
      <AuthGuard>
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
        <DashboardHeader user={session?.user} />
        
        <main className="safe-area-top px-4 pb-24">
          <div className="max-w-lg mx-auto space-y-4 sm:space-y-6">
            {/* Gym Session Status */}
            <GymSession />

            {/* Stats Overview */}
            <StatsOverview />

            {/* Today's Workout */}
            {todaysWorkout && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <WorkoutCard
                  workout={todaysWorkout}
                  title="Today's Workout"
                  subtitle={new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                />
              </motion.div>
            )}

            {/* Quick Actions */}
            <QuickActions />

            {/* Weekly Schedule Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-white mb-4">This Week</h3>
              <div className="space-y-3">
                {Object.entries(workoutSchedule).map(([day, workout]) => {
                  const isToday = day === new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
                  return (
                    <div
                      key={day}
                      className={`flex items-center justify-between p-3 rounded-xl ${
                        isToday 
                          ? 'bg-primary-600/20 border border-primary-500/30' 
                          : 'bg-dark-800/30'
                      }`}
                    >
                      <div>
                        <h4 className={`font-medium ${isToday ? 'text-primary-400' : 'text-white'}`}>
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                        </h4>
                        <p className="text-sm text-dark-400">{workout.name}</p>
                      </div>
                      {isToday && (
                        <div className="px-2 py-1 bg-primary-600 text-white text-xs rounded-full">
                          Today
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}