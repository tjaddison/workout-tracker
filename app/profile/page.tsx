'use client'

import { motion } from 'framer-motion'
import { User, Target, Calendar, TrendingDown, ChevronLeft, Edit3, Settings, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useUserProfile, useWorkouts } from '@/app/lib/hooks'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const { profile, updateProfile } = useUserProfile()
  const { workouts } = useWorkouts()
  const [editForm, setEditForm] = useState({
    currentWeight: profile?.settings?.currentWeight || 270,
    targetWeight: profile?.settings?.targetWeight || 230,
  })

  // Update form when profile loads
  useEffect(() => {
    if (profile?.settings) {
      setEditForm({
        currentWeight: profile.settings.currentWeight || 270,
        targetWeight: profile.settings.targetWeight || 230,
      })
    }
  }, [profile])

  const handleSave = async () => {
    setSaving(true)
    try {
      const success = await updateProfile(editForm)
      if (success) {
        toast.success('Profile updated successfully!')
        setIsEditing(false)
      } else {
        toast.error('Failed to update profile')
      }
    } catch (error) {
      toast.error('Error updating profile')
    } finally {
      setSaving(false)
    }
  }

  const handleEditToggle = () => {
    if (isEditing) {
      handleSave()
    } else {
      setIsEditing(true)
    }
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const userProfile = {
    name: profile?.user?.name || 'User',
    email: profile?.user?.email || '',
    age: 49, // This could be calculated from birthdate if we had it
    startWeight: profile?.settings?.startWeight || 270,
    currentWeight: isEditing ? editForm.currentWeight : (profile?.settings?.currentWeight || 270),
    targetWeight: isEditing ? editForm.targetWeight : (profile?.settings?.targetWeight || 230),
    startDate: profile?.user?.createdAt || new Date().toISOString(),
    program: profile?.settings?.program || '5-Day YMCA Weight Loss Program',
    goal: profile?.settings?.goal || 'Lose 40 lbs',
    targetDate: profile?.settings?.targetDate || '2025-12-31'
  }

  const achievements = [
    { title: 'First Week Complete', date: '2025-01-07', icon: '🎯' },
    { title: '5 lbs Lost', date: '2025-01-13', icon: '⚖️' },
    { title: '10 Workouts Done', date: '2025-01-15', icon: '💪' },
    { title: 'Consistency Streak', date: '2025-01-14', icon: '🔥' },
  ]

  const preferences = {
    workoutTime: profile?.settings?.workoutTime || '9:00 AM',
    reminderNotifications: profile?.settings?.reminderNotifications ?? true,
    progressEmails: profile?.settings?.progressEmails ?? false,
    workoutDays: profile?.settings?.workoutDays || ['Monday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  }

  const calculateProgress = () => {
    const totalToLose = userProfile.startWeight - userProfile.targetWeight
    const lostSoFar = userProfile.startWeight - userProfile.currentWeight
    return Math.round((lostSoFar / totalToLose) * 100)
  }

  const getDaysInProgram = () => {
    const start = new Date(userProfile.startDate)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
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
              <h1 className="text-2xl font-bold">Profile</h1>
              <p className="text-gray-400">Manage your fitness profile</p>
            </div>
          </div>
          <button
            onClick={handleEditToggle}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : isEditing ? (
              <Save className="h-4 w-4" />
            ) : (
              <Edit3 className="h-4 w-4" />
            )}
            {saving ? 'Saving...' : isEditing ? 'Save' : 'Edit'}
          </button>
        </motion.div>

        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card mb-6"
        >
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{userProfile.name}</h2>
              <p className="text-gray-400">{userProfile.email}</p>
              <p className="text-sm text-gray-500">Age: {userProfile.age} • Day {getDaysInProgram()} of program</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-300">Weight Progress</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Start Weight:</span>
                  <span className="font-medium">{userProfile.startWeight} lbs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Current Weight:</span>
                  {isEditing ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        inputMode="numeric"
                        min="100"
                        max="500"
                        value={editForm.currentWeight}
                        onChange={(e) => setEditForm(prev => ({ ...prev, currentWeight: parseInt(e.target.value) || 0 }))}
                        className="w-16 px-2 py-1 bg-dark-700 border border-dark-600 rounded text-blue-400 text-right text-sm"
                      />
                      <span className="text-blue-400 text-sm">lbs</span>
                    </div>
                  ) : (
                    <span className="font-medium text-blue-400">{userProfile.currentWeight} lbs</span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Target Weight:</span>
                  {isEditing ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        inputMode="numeric"
                        min="100"
                        max="500"
                        value={editForm.targetWeight}
                        onChange={(e) => setEditForm(prev => ({ ...prev, targetWeight: parseInt(e.target.value) || 0 }))}
                        className="w-16 px-2 py-1 bg-dark-700 border border-dark-600 rounded text-green-400 text-right text-sm"
                      />
                      <span className="text-green-400 text-sm">lbs</span>
                    </div>
                  ) : (
                    <span className="font-medium text-green-400">{userProfile.targetWeight} lbs</span>
                  )}
                </div>
                <div className="flex justify-between pt-2 border-t border-dark-700">
                  <span className="text-gray-400">Progress:</span>
                  <span className="font-medium text-green-400">{calculateProgress()}%</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-300">Program Details</h3>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-gray-400">Program:</span>
                  <p className="font-medium">{userProfile.program}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Goal:</span>
                  <p className="font-medium">{userProfile.goal}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Target Date:</span>
                  <p className="font-medium">{new Date(userProfile.targetDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-300">Preferences</h3>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-gray-400">Workout Time:</span>
                  <p className="font-medium">{preferences.workoutTime}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Workout Days:</span>
                  <p className="font-medium">{preferences.workoutDays.length} days/week</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Notifications:</span>
                  <p className="font-medium">{preferences.reminderNotifications ? 'Enabled' : 'Disabled'}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-6"
        >
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-green-400" />
            Weight Loss Progress
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>{userProfile.targetWeight} lbs</span>
              <span>{userProfile.startWeight} lbs</span>
            </div>
            <div className="w-full bg-dark-800 rounded-full h-3 relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${calculateProgress()}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
              />
              <div 
                className="absolute top-0 h-3 w-1 bg-white rounded-full"
                style={{ left: `${calculateProgress()}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Target</span>
              <span className="font-medium text-white">{userProfile.currentWeight} lbs (Current)</span>
              <span>Start</span>
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card mb-6"
        >
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-yellow-400" />
            Recent Achievements
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-dark-800/30">
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <p className="font-medium">{achievement.title}</p>
                  <p className="text-sm text-gray-400">{new Date(achievement.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Settings className="h-5 w-5 text-gray-400" />
            Notification Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Workout Reminders</p>
                <p className="text-sm text-gray-400">Get notified about upcoming workouts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.reminderNotifications}
                  onChange={(e) => {
                    updateProfile({ reminderNotifications: e.target.checked })
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Progress Reports</p>
                <p className="text-sm text-gray-400">Weekly progress updates via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.progressEmails}
                  onChange={(e) => {
                    updateProfile({ progressEmails: e.target.checked })
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}