'use client'

import { motion } from 'framer-motion'
import { Play, Clock, Dumbbell, Zap } from 'lucide-react'
import { WorkoutSchedule } from '@/app/types'
import { useRouter } from 'next/navigation'

interface WorkoutCardProps {
  workout: WorkoutSchedule
  title: string
  subtitle?: string
}

export function WorkoutCard({ workout, title, subtitle }: WorkoutCardProps) {
  const router = useRouter()

  const getTotalExercises = () => {
    return workout.phases.reduce((total, phase) => total + phase.exercises.length, 0)
  }

  const getEstimatedDuration = () => {
    // Rough estimation based on exercise types and sets
    let duration = 0
    workout.phases.forEach(phase => {
      phase.exercises.forEach(exercise => {
        if (exercise.duration) {
          duration += exercise.duration
        } else if (exercise.sets) {
          duration += exercise.sets * 2 // 2 minutes per set average
        } else {
          duration += 1 // 1 minute for single exercises
        }
      })
    })
    return duration
  }

  const getWorkoutTypeIcon = () => {
    const name = workout.name.toLowerCase()
    if (name.includes('cardio')) return Clock
    if (name.includes('circuit')) return Zap
    return Dumbbell
  }

  const Icon = getWorkoutTypeIcon()

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="card cursor-pointer bg-gradient-to-br from-primary-600/10 to-secondary-600/10 border-primary-500/20 hover:border-primary-400/40 transition-all duration-300"
      onClick={() => router.push(`/workout?type=${workout.name.toLowerCase().replace(/\s+/g, '-')}`)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          {subtitle && (
            <p className="text-sm text-dark-400">{subtitle}</p>
          )}
        </div>
        
        <div className="p-3 bg-primary-600/20 rounded-full">
          <Icon className="h-6 w-6 text-primary-400" />
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-xl font-bold text-white mb-2">{workout.name}</h4>
        <div className="flex items-center space-x-4 text-sm text-dark-400">
          <div className="flex items-center">
            <Dumbbell className="h-4 w-4 mr-1" />
            {getTotalExercises()} exercises
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            ~{getEstimatedDuration()} min
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {workout.phases.slice(0, 3).map((phase, index) => (
          <div key={index} className="flex items-center text-sm">
            <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
            <span className="text-dark-300">{phase.name}</span>
            <span className="text-dark-500 ml-1">({phase.exercises.length})</span>
          </div>
        ))}
        {workout.phases.length > 3 && (
          <div className="text-xs text-dark-500">
            +{workout.phases.length - 3} more phases
          </div>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full btn btn-primary"
        onClick={(e) => {
          e.stopPropagation()
          router.push(`/workout?type=${workout.name.toLowerCase().replace(/\s+/g, '-')}`)
        }}
      >
        <Play className="h-4 w-4 mr-2" />
        Start Workout
      </motion.button>
    </motion.div>
  )
}