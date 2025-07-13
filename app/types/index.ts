export interface Exercise {
  name: string
  sets?: number
  reps?: string | number
  duration?: number
  rest?: number
  weight?: number
  type?: 'cardio' | 'strength' | 'recovery' | 'rest'
  complex?: boolean
  description?: string
}

export interface WorkoutPhase {
  name: string
  exercises: Exercise[]
  rounds?: string
  weight?: string
}

export interface WorkoutSchedule {
  name: string
  phases: WorkoutPhase[]
}

export interface WorkoutSession {
  sessionId?: string
  userId: string
  workoutType: string
  date: string
  exercises: ExerciseLog[]
  totalExercises: number
  completedExercises: number
  duration?: number
  notes?: string
  createdAt?: string
  updatedAt?: string
}

export interface ExerciseLog {
  key: string
  name: string
  sets: SetLog[]
  targetSets?: number
  targetReps?: string | number
}

export interface SetLog {
  weight: number
  actualReps: number
  targetReps?: string | number
  completed: boolean
  restTime?: number
}

export interface GymSession {
  sessionId?: string
  userId: string
  checkInTime: string
  checkOutTime?: string
  duration?: number
  createdAt?: string
  updatedAt?: string
}

export interface UserSettings {
  userId: string
  defaultWeight: number
  weightUnit: 'lbs' | 'kg'
  exerciseWeights: Record<string, number>
  notifications: boolean
  theme: 'light' | 'dark' | 'auto'
  updatedAt?: string
}

export interface User {
  userId: string
  email: string
  name: string
  image?: string
  createdAt: string
  updatedAt: string
}

export interface WeeklyStats {
  totalWorkouts: number
  totalDuration: number
  avgDuration: number
  completionRate: number
  streak: number
}

export interface ProgressData {
  exercise: string
  weights: { date: string; weight: number }[]
  reps: { date: string; reps: number }[]
}