'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Target, Clock, Flame } from 'lucide-react'
import { useUserProfile, useWorkouts, useGymSessions } from '@/app/lib/hooks'

export function StatsOverview() {
  const { profile } = useUserProfile()
  const { workouts } = useWorkouts()
  const { sessions } = useGymSessions()

  const getStats = () => {
    if (!profile) return []

    const completedWorkouts = workouts.filter(w => w.completed).length
    const totalMinutes = sessions.reduce((sum, s) => sum + (s.duration || 0), 0)
    const totalHours = Math.round(totalMinutes / 60 * 10) / 10
    const weightLost = profile.settings.startWeight - profile.settings.currentWeight
    const targetWeightLoss = profile.settings.startWeight - profile.settings.targetWeight
    const progressPercentage = Math.round((weightLost / targetWeightLoss) * 100)

    // Calculate streak (simplified - consecutive days with workouts)
    const sortedWorkouts = workouts
      .filter(w => w.completed)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    let streak = 0
    const today = new Date()
    for (const workout of sortedWorkouts) {
      const workoutDate = new Date(workout.date)
      const daysDiff = Math.floor((today.getTime() - workoutDate.getTime()) / (1000 * 60 * 60 * 24))
      if (daysDiff === streak) {
        streak++
      } else {
        break
      }
    }

    return [
      {
        icon: Flame,
        label: 'Day Streak',
        value: streak.toString(),
        change: streak > 0 ? `+${streak}` : '0',
        color: 'text-orange-400',
        bgColor: 'bg-orange-500/20'
      },
      {
        icon: Target,
        label: 'Workouts',
        value: completedWorkouts.toString(),
        change: `+${completedWorkouts}`,
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/20'
      },
      {
        icon: Clock,
        label: 'Hours',
        value: totalHours.toString(),
        change: `+${totalHours}`,
        color: 'text-green-400',
        bgColor: 'bg-green-500/20'
      },
      {
        icon: TrendingUp,
        label: 'Progress',
        value: `${Math.max(0, progressPercentage)}%`,
        change: `+${Math.max(0, progressPercentage)}%`,
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-500/20'
      }
    ]
  }

  const stats = getStats()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
          className="card p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <span className="text-xs text-secondary-400 font-medium">
              {stat.change}
            </span>
          </div>
          
          <div>
            <p className="text-xl sm:text-2xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-sm sm:text-xs text-dark-400">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}