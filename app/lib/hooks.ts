'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'

export interface UserProfile {
  user: {
    id: string
    email: string
    name: string
    image?: string
    createdAt: string
  }
  settings: {
    startWeight: number
    currentWeight: number
    targetWeight: number
    workoutTime: string
    reminderNotifications: boolean
    progressEmails: boolean
    workoutDays: string[]
    program: string
    goal: string
    targetDate: string
  }
}

export interface WorkoutSession {
  workoutId: string
  userId: string
  name: string
  date: string
  duration: number
  exercises: any[]
  notes?: string
  completed: boolean
  createdAt: string
}

export interface GymSession {
  sessionId: string
  userId: string
  checkInTime: string
  checkOutTime?: string
  duration?: number
  createdAt: string
}

export function useUserProfile() {
  const { data: session } = useSession()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = useCallback(async () => {
    if (!session?.user?.id) return

    try {
      setLoading(true)
      const response = await fetch('/api/user/profile')
      if (!response.ok) throw new Error('Failed to fetch profile')
      
      const data = await response.json()
      setProfile(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile')
    } finally {
      setLoading(false)
    }
  }, [session?.user?.id])

  const updateProfile = async (updates: Partial<UserProfile['settings']>) => {
    if (!session?.user?.id) return

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })

      if (!response.ok) throw new Error('Failed to update profile')
      
      // Refresh profile data
      await fetchProfile()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile')
      return false
    }
  }

  useEffect(() => {
    if (session?.user?.id) {
      fetchProfile()
    }
  }, [session?.user?.id, fetchProfile])

  return { profile, loading, error, updateProfile, refetch: fetchProfile }
}

export function useWorkouts() {
  const { data: session } = useSession()
  const [workouts, setWorkouts] = useState<WorkoutSession[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWorkouts = useCallback(async () => {
    if (!session?.user?.id) return

    try {
      setLoading(true)
      const response = await fetch('/api/workouts')
      if (!response.ok) throw new Error('Failed to fetch workouts')
      
      const data = await response.json()
      setWorkouts(data.workouts || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch workouts')
    } finally {
      setLoading(false)
    }
  }, [session?.user?.id])

  const createWorkout = async (workoutData: Omit<WorkoutSession, 'workoutId' | 'userId' | 'createdAt'>) => {
    if (!session?.user?.id) return null

    try {
      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workoutData),
      })

      if (!response.ok) throw new Error('Failed to create workout')
      
      const data = await response.json()
      await fetchWorkouts() // Refresh list
      return data.workout
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create workout')
      return null
    }
  }

  const updateWorkout = async (workoutId: string, updates: Partial<WorkoutSession>) => {
    try {
      const response = await fetch(`/api/workouts/${workoutId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })

      if (!response.ok) throw new Error('Failed to update workout')
      
      await fetchWorkouts() // Refresh list
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update workout')
      return false
    }
  }

  const deleteWorkout = async (workoutId: string) => {
    try {
      const response = await fetch(`/api/workouts/${workoutId}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete workout')
      
      await fetchWorkouts() // Refresh list
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete workout')
      return false
    }
  }

  useEffect(() => {
    if (session?.user?.id) {
      fetchWorkouts()
    }
  }, [session?.user?.id, fetchWorkouts])

  return { 
    workouts, 
    loading, 
    error, 
    createWorkout, 
    updateWorkout, 
    deleteWorkout, 
    refetch: fetchWorkouts 
  }
}

export function useGymSessions() {
  const { data: session } = useSession()
  const [sessions, setSessions] = useState<GymSession[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSessions = useCallback(async () => {
    if (!session?.user?.id) return

    try {
      setLoading(true)
      const response = await fetch('/api/gym-sessions')
      if (!response.ok) throw new Error('Failed to fetch gym sessions')
      
      const data = await response.json()
      setSessions(data.sessions || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch gym sessions')
    } finally {
      setLoading(false)
    }
  }, [session?.user?.id])

  const checkIn = async () => {
    if (!session?.user?.id) return null

    try {
      const response = await fetch('/api/gym-sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          checkInTime: new Date().toISOString(),
        }),
      })

      if (!response.ok) throw new Error('Failed to check in')
      
      const data = await response.json()
      await fetchSessions() // Refresh list
      return data.session
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check in')
      return null
    }
  }

  const checkOut = async (sessionId: string) => {
    try {
      const checkOutTime = new Date().toISOString()
      const session = sessions.find(s => s.sessionId === sessionId)
      const duration = session ? 
        Math.round((new Date(checkOutTime).getTime() - new Date(session.checkInTime).getTime()) / (1000 * 60)) : 0

      const response = await fetch(`/api/gym-sessions/${sessionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          checkOutTime,
          duration,
        }),
      })

      if (!response.ok) throw new Error('Failed to check out')
      
      await fetchSessions() // Refresh list
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check out')
      return false
    }
  }

  const getCurrentSession = () => {
    return sessions.find(session => !session.checkOutTime)
  }

  useEffect(() => {
    if (session?.user?.id) {
      fetchSessions()
    }
  }, [session?.user?.id, fetchSessions])

  return { 
    sessions, 
    loading, 
    error, 
    checkIn, 
    checkOut, 
    getCurrentSession,
    refetch: fetchSessions 
  }
}