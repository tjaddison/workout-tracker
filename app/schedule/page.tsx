'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ChevronLeft, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useUserProfile, useWorkouts } from '@/app/lib/hooks'

interface WorkoutSchedule {
  day: string
  workout: string
  time: string
  duration: string
  status: 'upcoming' | 'completed' | 'missed'
}

export default function SchedulePage() {
  const router = useRouter()
  const [selectedWeek, setSelectedWeek] = useState(0)

  const { profile } = useUserProfile()
  const { workouts } = useWorkouts()
  
  const getScheduleWithStatus = () => {
    const baseSchedule = [
      { day: 'Monday', workout: 'Full Body Circuit + Cardio', time: '9:00 AM', duration: '35 mins' },
      { day: 'Tuesday', workout: 'Rest Day', time: '-', duration: '-' },
      { day: 'Wednesday', workout: 'Rest Day', time: '-', duration: '-' },
      { day: 'Thursday', workout: 'Upper Body Strength + Cardio', time: '9:00 AM', duration: '35 mins' },
      { day: 'Friday', workout: 'Lower Body Strength + Cardio', time: '9:00 AM', duration: '35 mins' },
      { day: 'Saturday', workout: 'Upper Body Strength + Cardio', time: '9:00 AM', duration: '35 mins' },
      { day: 'Sunday', workout: 'Upper Body Strength + Cardio', time: '9:00 AM', duration: '35 mins' },
    ]

    return baseSchedule.map(item => {
      const today = new Date()
      const dayIndex = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(item.day.toLowerCase())
      const itemDate = new Date()
      itemDate.setDate(today.getDate() - today.getDay() + dayIndex)
      
      const workoutOnDay = workouts.find(w => {
        const workoutDate = new Date(w.date)
        return workoutDate.toDateString() === itemDate.toDateString()
      })

      let status: 'upcoming' | 'completed' | 'missed' = 'upcoming'
      if (workoutOnDay) {
        status = workoutOnDay.completed ? 'completed' : 'missed'
      } else if (itemDate < today && item.workout !== 'Rest Day') {
        status = 'missed'
      }

      return { ...item, status }
    })
  }

  const schedule = getScheduleWithStatus()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400'
      case 'upcoming': return 'bg-blue-500/20 text-blue-400'
      case 'missed': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-dark-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-xl bg-dark-800/50 hover:bg-dark-700/50 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Workout Schedule</h1>
              <p className="text-gray-400">5-Day YMCA Weight Loss Program</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4" />
            Add Session
          </button>
        </motion.div>

        {/* Week Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card mb-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Week {selectedWeek + 1}</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedWeek(Math.max(0, selectedWeek - 1))}
                disabled={selectedWeek === 0}
                className="px-3 py-1 rounded-lg bg-dark-800 hover:bg-dark-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setSelectedWeek(selectedWeek + 1)}
                className="px-3 py-1 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </motion.div>

        {/* Schedule Grid */}
        <div className="grid gap-4">
          {schedule.map((item, index) => (
            <motion.div
              key={item.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="card hover:bg-dark-800/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <Calendar className="h-5 w-5 text-blue-400 mb-1" />
                    <span className="text-sm font-medium">{item.day}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{item.workout}</h3>
                    {item.time !== '-' && (
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {item.time}
                        </div>
                        <span>{item.duration}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Weekly Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card mt-6"
        >
          <h3 className="text-lg font-semibold mb-4">Week Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">3</div>
              <div className="text-sm text-gray-400">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">4</div>
              <div className="text-sm text-gray-400">Upcoming</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">0</div>
              <div className="text-sm text-gray-400">Missed</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}