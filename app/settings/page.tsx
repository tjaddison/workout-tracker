'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, Save, User, Bell, Target, Calendar } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useUserProfile } from '@/app/lib/hooks'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const router = useRouter()
  const { profile, updateProfile, loading } = useUserProfile()
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    currentWeight: profile?.settings?.currentWeight || 270,
    targetWeight: profile?.settings?.targetWeight || 230,
    workoutTime: profile?.settings?.workoutTime || '9:00 AM',
    reminderNotifications: profile?.settings?.reminderNotifications ?? true,
    progressEmails: profile?.settings?.progressEmails ?? false,
    workoutDays: profile?.settings?.workoutDays || ['Monday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  })

  // Update form when profile loads
  useEffect(() => {
    if (profile?.settings) {
      setFormData({
        currentWeight: profile.settings.currentWeight || 270,
        targetWeight: profile.settings.targetWeight || 230,
        workoutTime: profile.settings.workoutTime || '9:00 AM',
        reminderNotifications: profile.settings.reminderNotifications ?? true,
        progressEmails: profile.settings.progressEmails ?? false,
        workoutDays: profile.settings.workoutDays || ['Monday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      })
    }
  }, [profile])

  const handleSave = async () => {
    setSaving(true)
    try {
      const success = await updateProfile(formData)
      if (success) {
        toast.success('Settings updated successfully!')
      } else {
        toast.error('Failed to update settings')
      }
    } catch (error) {
      toast.error('Error updating settings')
    } finally {
      setSaving(false)
    }
  }

  const handleWeightUpdate = (field: 'currentWeight' | 'targetWeight', value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleWorkoutDay = (day: string) => {
    setFormData(prev => ({
      ...prev,
      workoutDays: prev.workoutDays.includes(day)
        ? prev.workoutDays.filter(d => d !== day)
        : [...prev.workoutDays, day]
    }))
  }

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  return (
    <div className="min-h-screen bg-dark-900 text-white p-4">
      <div className="max-w-2xl mx-auto">
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
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-gray-400">Customize your workout experience</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            {saving ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save
          </button>
        </motion.div>

        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card mb-6"
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User className="h-5 w-5 text-blue-400" />
            Profile Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                value={profile?.user?.name || 'User'}
                disabled
                className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-gray-400 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Name cannot be changed</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={profile?.user?.email || ''}
                disabled
                className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-gray-400 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>
          </div>
        </motion.div>

        {/* Weight Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-6"
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-green-400" />
            Weight Goals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Current Weight (lbs)
              </label>
              <input
                type="number"
                inputMode="numeric"
                min="100"
                max="500"
                value={formData.currentWeight}
                onChange={(e) => handleWeightUpdate('currentWeight', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:border-blue-500 focus:outline-none text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Target Weight (lbs)
              </label>
              <input
                type="number"
                inputMode="numeric"
                min="100"
                max="500"
                value={formData.targetWeight}
                onChange={(e) => handleWeightUpdate('targetWeight', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:border-blue-500 focus:outline-none text-base"
              />
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-sm text-blue-400">
              Goal: Lose {formData.currentWeight - formData.targetWeight} lbs
            </p>
          </div>
        </motion.div>

        {/* Workout Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card mb-6"
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-400" />
            Workout Schedule
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Preferred Workout Time
              </label>
              <select
                value={formData.workoutTime}
                onChange={(e) => setFormData(prev => ({ ...prev, workoutTime: e.target.value }))}
                className="w-full px-3 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:border-blue-500 focus:outline-none text-base"
              >
                <option value="6:00 AM">6:00 AM</option>
                <option value="7:00 AM">7:00 AM</option>
                <option value="8:00 AM">8:00 AM</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="5:00 PM">5:00 PM</option>
                <option value="6:00 PM">6:00 PM</option>
                <option value="7:00 PM">7:00 PM</option>
                <option value="8:00 PM">8:00 PM</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Workout Days
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {weekDays.map(day => (
                  <label key={day} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.workoutDays.includes(day)}
                      onChange={() => toggleWorkoutDay(day)}
                      className="sr-only"
                    />
                    <div className={`flex-1 p-3 rounded-lg border transition-colors ${
                      formData.workoutDays.includes(day)
                        ? 'bg-blue-600/20 border-blue-500/50 text-blue-400'
                        : 'bg-dark-800 border-dark-700 text-gray-400 hover:border-dark-600'
                    }`}>
                      <span className="text-sm font-medium">{day}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Bell className="h-5 w-5 text-yellow-400" />
            Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Workout Reminders</p>
                <p className="text-sm text-gray-400">Get notified about upcoming workouts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.reminderNotifications}
                  onChange={(e) => setFormData(prev => ({ ...prev, reminderNotifications: e.target.checked }))}
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
                  checked={formData.progressEmails}
                  onChange={(e) => setFormData(prev => ({ ...prev, progressEmails: e.target.checked }))}
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