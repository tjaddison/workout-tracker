'use client'

import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { WorkoutTracker } from '@/app/components/workout/workout-tracker'
import { AuthGuard } from '@/app/components/auth/auth-guard'

export default function WorkoutPage() {
  const router = useRouter()

  return (
    <AuthGuard>
      <div className="min-h-screen bg-dark-900 text-white p-4">
        <div className="max-w-2xl mx-auto">
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
              <h1 className="text-2xl font-bold">Start Workout</h1>
              <p className="text-gray-400">Track your progress in real-time</p>
            </div>
          </motion.div>

          {/* Workout Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <WorkoutTracker 
              onComplete={() => {
                router.push('/dashboard')
              }}
            />
          </motion.div>
        </div>
      </div>
    </AuthGuard>
  )
}