'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Square, Plus, Minus, Check, Clock, Dumbbell } from 'lucide-react'
import { useWorkouts } from '@/app/lib/hooks'
import { getTodaysWorkout } from '@/app/lib/workouts'
import type { WorkoutSchedule, Exercise } from '@/app/types'

interface WorkoutTrackerProps {
  workout?: WorkoutSchedule
  onComplete?: () => void
}

interface ExerciseProgress {
  exerciseIndex: number
  phaseIndex: number
  sets?: number[]
  reps?: number[]
  weight?: number
  duration?: number
  completed: boolean
}

export function WorkoutTracker({ workout, onComplete }: WorkoutTrackerProps) {
  const { createWorkout } = useWorkouts()
  const [currentWorkout, setCurrentWorkout] = useState<WorkoutSchedule | null>(workout || getTodaysWorkout())
  const [isActive, setIsActive] = useState(false)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [progress, setProgress] = useState<ExerciseProgress[]>([])
  const [notes, setNotes] = useState('')

  const initializeProgress = useCallback(() => {
    if (!currentWorkout) return

    const exerciseProgress: ExerciseProgress[] = []
    let exerciseIndex = 0

    currentWorkout.phases.forEach((phase, phaseIndex) => {
      phase.exercises.forEach((exercise) => {
        exerciseProgress.push({
          exerciseIndex,
          phaseIndex,
          sets: exercise.sets ? Array(exercise.sets).fill(0) : undefined,
          reps: exercise.reps ? Array(exercise.sets || 1).fill(0) : undefined,
          weight: exercise.weight || 0,
          duration: exercise.duration || 0,
          completed: false
        })
        exerciseIndex++
      })
    })

    setProgress(exerciseProgress)
  }, [currentWorkout])

  useEffect(() => {
    if (currentWorkout) {
      initializeProgress()
    }
  }, [currentWorkout, initializeProgress])


  const startWorkout = () => {
    setIsActive(true)
    setStartTime(new Date())
  }

  const pauseWorkout = () => {
    setIsActive(false)
  }

  const completeWorkout = async () => {
    if (!currentWorkout || !startTime) return

    const endTime = new Date()
    const duration = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60))
    
    const workoutData = {
      name: currentWorkout.name,
      date: new Date().toISOString().split('T')[0],
      duration,
      exercises: progress.map((p, index) => ({
        name: getCurrentExerciseName(index),
        sets: p.sets || [],
        reps: p.reps || [],
        weight: p.weight || 0,
        duration: p.duration || 0,
        completed: p.completed
      })),
      notes,
      completed: true
    }

    await createWorkout(workoutData)
    setIsActive(false)
    onComplete?.()
  }

  const getCurrentExerciseName = (index: number): string => {
    if (!currentWorkout) return ''
    
    let exerciseIndex = 0
    for (const phase of currentWorkout.phases) {
      for (const exercise of phase.exercises) {
        if (exerciseIndex === index) {
          return exercise.name
        }
        exerciseIndex++
      }
    }
    return ''
  }

  const updateExerciseProgress = (exerciseIndex: number, updates: Partial<ExerciseProgress>) => {
    setProgress(prev => prev.map((p, i) => 
      i === exerciseIndex ? { ...p, ...updates } : p
    ))
  }

  const getCurrentPhaseExercises = () => {
    if (!currentWorkout || currentPhase >= currentWorkout.phases.length) return []
    return currentWorkout.phases[currentPhase].exercises
  }

  const nextExercise = () => {
    const phaseExercises = getCurrentPhaseExercises()
    if (currentExercise < phaseExercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
    } else if (currentPhase < (currentWorkout?.phases.length || 0) - 1) {
      setCurrentPhase(currentPhase + 1)
      setCurrentExercise(0)
    }
  }

  const prevExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1)
    } else if (currentPhase > 0) {
      setCurrentPhase(currentPhase - 1)
      const prevPhaseExercises = currentWorkout?.phases[currentPhase - 1].exercises || []
      setCurrentExercise(prevPhaseExercises.length - 1)
    }
  }

  if (!currentWorkout) {
    return (
      <div className="card text-center py-8">
        <Dumbbell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-300 mb-2">No workout scheduled</h3>
        <p className="text-gray-400">This is a rest day - take it easy!</p>
      </div>
    )
  }

  const currentPhaseData = currentWorkout.phases[currentPhase]
  const currentExerciseData = currentPhaseData?.exercises[currentExercise]
  const totalExercises = currentWorkout.phases.reduce((sum, phase) => sum + phase.exercises.length, 0)
  const currentExerciseGlobalIndex = currentWorkout.phases.slice(0, currentPhase).reduce((sum, phase) => sum + phase.exercises.length, 0) + currentExercise

  return (
    <div className="space-y-6">
      {/* Workout Header */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white">{currentWorkout.name}</h2>
            <p className="text-gray-400">
              {currentPhaseData?.name} • Exercise {currentExerciseGlobalIndex + 1} of {totalExercises}
            </p>
          </div>
          <div className="flex gap-2">
            {!isActive ? (
              <button
                onClick={startWorkout}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Play className="h-4 w-4" />
                Start
              </button>
            ) : (
              <>
                <button
                  onClick={pauseWorkout}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
                >
                  <Pause className="h-4 w-4" />
                  Pause
                </button>
                <button
                  onClick={completeWorkout}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Check className="h-4 w-4" />
                  Complete
                </button>
              </>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-dark-800 rounded-full h-2 mb-4">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentExerciseGlobalIndex + 1) / totalExercises) * 100}%` }}
          />
        </div>

        {/* Timer */}
        {isActive && startTime && (
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              <Timer startTime={startTime} />
            </div>
          </div>
        )}
      </div>

      {/* Current Exercise */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentPhase}-${currentExercise}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-white mb-4">{currentExerciseData?.name}</h3>
          
          {currentExerciseData?.sets && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-400">Sets & Reps</h4>
              {Array.from({ length: currentExerciseData.sets }).map((_, setIndex) => (
                <div key={setIndex} className="flex items-center gap-4 p-3 bg-dark-800/50 rounded-lg">
                  <span className="text-gray-400 w-12">Set {setIndex + 1}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Reps:</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      min="0"
                      className="w-16 sm:w-20 px-2 py-2 bg-dark-700 border border-dark-600 rounded text-white text-center text-base"
                      value={progress[currentExerciseGlobalIndex]?.reps?.[setIndex] || 0}
                      onChange={(e) => {
                        const newReps = [...(progress[currentExerciseGlobalIndex]?.reps || [])]
                        newReps[setIndex] = parseInt(e.target.value) || 0
                        updateExerciseProgress(currentExerciseGlobalIndex, { reps: newReps })
                      }}
                    />
                  </div>
                  {currentExerciseData.weight && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">Weight:</span>
                      <input
                        type="number"
                        inputMode="numeric"
                        min="0"
                        className="w-20 sm:w-24 px-2 py-2 bg-dark-700 border border-dark-600 rounded text-white text-center text-base"
                        value={progress[currentExerciseGlobalIndex]?.weight || 0}
                        onChange={(e) => {
                          updateExerciseProgress(currentExerciseGlobalIndex, { 
                            weight: parseInt(e.target.value) || 0 
                          })
                        }}
                      />
                      <span className="text-sm text-gray-400">lbs</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {currentExerciseData?.duration && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-400">Duration</h4>
              <div className="flex items-center gap-4 p-3 bg-dark-800/50 rounded-lg">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-white">{currentExerciseData.duration} minutes</span>
              </div>
            </div>
          )}

          {/* Exercise Controls */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
            <button
              onClick={prevExercise}
              disabled={currentPhase === 0 && currentExercise === 0}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-dark-700 hover:bg-dark-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors min-h-[48px] flex-1 sm:flex-none"
            >
              Previous
            </button>
            
            <button
              onClick={() => updateExerciseProgress(currentExerciseGlobalIndex, { completed: true })}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors min-h-[48px] flex-1 sm:flex-none ${
                progress[currentExerciseGlobalIndex]?.completed
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
            >
              <Check className="h-4 w-4" />
              Complete
            </button>

            <button
              onClick={nextExercise}
              disabled={currentPhase >= (currentWorkout?.phases.length || 0) - 1 && 
                       currentExercise >= getCurrentPhaseExercises().length - 1}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors min-h-[48px] flex-1 sm:flex-none"
            >
              Next
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Notes */}
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-3">Workout Notes</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="How did the workout feel? Any observations?"
          className="w-full h-24 sm:h-32 px-3 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-400 resize-none focus:border-blue-500 focus:outline-none text-base"
        />
      </div>
    </div>
  )
}

function Timer({ startTime }: { startTime: Date }) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime.getTime()) / 1000))
    }, 1000)

    return () => clearInterval(timer)
  }, [startTime])

  const minutes = Math.floor(elapsed / 60)
  const seconds = elapsed % 60

  return <span>{minutes}:{seconds.toString().padStart(2, '0')}</span>
}