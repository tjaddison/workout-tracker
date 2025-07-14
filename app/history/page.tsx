'use client'

import { motion } from 'framer-motion'
import { History, Calendar, Clock, ChevronLeft, Filter, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useWorkouts } from '@/app/lib/hooks'

interface WorkoutSession {
  id: string
  date: string
  workout: string
  duration: string
  exercises: number
  notes?: string
  completed: boolean
}

export default function HistoryPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const { workouts } = useWorkouts()

  const workoutHistory = workouts.map(w => ({
    id: w.workoutId,
    date: w.date,
    workout: w.name,
    duration: `${w.duration} mins`,
    exercises: w.exercises.length,
    notes: w.notes,
    completed: w.completed
  }))

  const filteredHistory = workoutHistory.filter(session => {
    const matchesSearch = session.workout.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.notes?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || 
                         (filter === 'completed' && session.completed) ||
                         (filter === 'skipped' && !session.completed)
    return matchesSearch && matchesFilter
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const getSessionColor = (completed: boolean) => {
    return completed ? 'border-green-500/20 bg-green-500/5' : 'border-red-500/20 bg-red-500/5'
  }

  const getTotalStats = () => {
    const completed = workoutHistory.filter(s => s.completed).length
    const totalTime = workoutHistory
      .filter(s => s.completed)
      .reduce((sum, s) => sum + parseInt(s.duration), 0)
    
    return { completed, totalTime, total: workoutHistory.length }
  }

  const stats = getTotalStats()

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
            <h1 className="text-2xl font-bold">Workout History</h1>
            <p className="text-gray-400">Track your fitness journey</p>
          </div>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          <div className="card text-center">
            <div className="text-2xl font-bold text-green-400">{stats.completed}</div>
            <div className="text-sm text-gray-400">Completed</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-blue-400">{stats.totalTime}</div>
            <div className="text-sm text-gray-400">Total Minutes</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-purple-400">{((stats.completed / stats.total) * 100).toFixed(0)}%</div>
            <div className="text-sm text-gray-400">Success Rate</div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-6"
        >
          <div className="flex flex-col gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search workouts or notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none text-base"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:border-blue-500 focus:outline-none text-base min-w-[140px]"
              >
                <option value="all">All Sessions</option>
                <option value="completed">Completed</option>
                <option value="skipped">Skipped</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* History List */}
        <div className="space-y-4">
          {filteredHistory.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className={`card border ${getSessionColor(session.completed)} hover:bg-dark-800/30 transition-colors`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <Calendar className={`h-5 w-5 mb-1 ${session.completed ? 'text-green-400' : 'text-red-400'}`} />
                    <span className="text-xs text-gray-400">{formatDate(session.date)}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{session.workout}</h3>
                    {session.completed && (
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {session.duration}
                        </div>
                        <span>{session.exercises} exercises</span>
                      </div>
                    )}
                    {session.notes && (
                      <p className="text-sm text-gray-300 bg-dark-800/50 p-2 rounded-lg">
                        {session.notes}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    session.completed 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {session.completed ? 'Completed' : 'Skipped'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="card text-center py-8"
          >
            <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-300 mb-2">No workouts found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}