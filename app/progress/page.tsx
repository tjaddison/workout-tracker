'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Target, Calendar, ChevronLeft, BarChart3 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useUserProfile, useWorkouts, useGymSessions } from '@/app/lib/hooks'

export default function ProgressPage() {
  const router = useRouter()
  const { profile } = useUserProfile()
  const { workouts } = useWorkouts()
  const { sessions } = useGymSessions()

  const getStats = () => {
    if (!profile) return []

    const completedWorkouts = workouts.filter(w => w.completed).length
    const totalMinutes = sessions.reduce((sum, s) => sum + (s.duration || 0), 0)
    const weightLost = profile.settings.startWeight - profile.settings.currentWeight
    const weightToGo = profile.settings.currentWeight - profile.settings.targetWeight

    return [
      { 
        label: 'Current Weight', 
        value: `${profile.settings.currentWeight} lbs`, 
        change: weightLost > 0 ? `-${weightLost} lbs` : 'No change', 
        trend: weightLost > 0 ? 'down' : 'neutral' 
      },
      { 
        label: 'Target Weight', 
        value: `${profile.settings.targetWeight} lbs`, 
        change: `${weightToGo} lbs to go`, 
        trend: 'neutral' 
      },
      { 
        label: 'Workouts Completed', 
        value: completedWorkouts.toString(), 
        change: 'Total completed', 
        trend: 'up' 
      },
      { 
        label: 'Total Time', 
        value: `${Math.round(totalMinutes / 60 * 10) / 10} hrs`, 
        change: 'Total gym time', 
        trend: 'up' 
      },
    ]
  }

  const stats = getStats()

  const weeklyProgress = [
    { week: 'Week 1', weight: 270, workouts: 3 },
    { week: 'Week 2', weight: 268, workouts: 4 },
    { week: 'Week 3', weight: 265, workouts: 3 },
    { week: 'Current', weight: 265, workouts: 2 },
  ]

  const goals = [
    { title: 'Lose 40 lbs', current: 5, target: 40, unit: 'lbs' },
    { title: 'Complete 60 workouts', current: 8, target: 60, unit: 'sessions' },
    { title: 'Exercise 5 days/week', current: 3, target: 5, unit: 'days' },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-400" />
      case 'down': return <TrendingUp className="h-4 w-4 text-green-400 rotate-180" />
      default: return <Target className="h-4 w-4 text-gray-400" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-400'
      case 'down': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-dark-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-6"
        >
          <button
            onClick={() => router.back()}
            className="p-2 rounded-xl bg-dark-800/50 hover:bg-dark-700/50 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Progress Tracking</h1>
            <p className="text-gray-400">Monitor your weight loss journey</p>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">{stat.label}</span>
                {getTrendIcon(stat.trend)}
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className={`text-sm ${getTrendColor(stat.trend)}`}>{stat.change}</div>
            </div>
          ))}
        </motion.div>

        {/* Progress Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-blue-400" />
            <h2 className="text-lg font-semibold">Weekly Progress</h2>
          </div>
          <div className="space-y-4">
            {weeklyProgress.map((week, index) => (
              <div key={week.week} className="flex items-center justify-between p-3 rounded-lg bg-dark-800/30">
                <div className="flex items-center gap-4">
                  <span className="font-medium">{week.week}</span>
                  <span className="text-sm text-gray-400">{week.workouts} workouts</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{week.weight} lbs</span>
                  {index > 0 && (
                    <span className={`text-sm ${week.weight < weeklyProgress[index - 1].weight ? 'text-green-400' : 'text-red-400'}`}>
                      {week.weight < weeklyProgress[index - 1].weight ? '↓' : '↑'}
                      {Math.abs(week.weight - weeklyProgress[index - 1].weight)} lbs
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-green-400" />
            <h2 className="text-lg font-semibold">Goals Progress</h2>
          </div>
          <div className="space-y-4">
            {goals.map((goal) => {
              const percentage = Math.min((goal.current / goal.target) * 100, 100)
              return (
                <div key={goal.title} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{goal.title}</span>
                    <span className="text-sm text-gray-400">
                      {goal.current} / {goal.target} {goal.unit}
                    </span>
                  </div>
                  <div className="w-full bg-dark-800 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                    />
                  </div>
                  <div className="text-right text-sm text-gray-400">
                    {percentage.toFixed(0)}% complete
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Recent Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card mt-6"
        >
          <h2 className="text-lg font-semibold mb-4">Recent Achievements</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-green-400">Lost 5 pounds in 3 weeks!</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-blue-400">Completed 8 workout sessions</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-purple-400">Maintained consistency for 2 weeks</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}