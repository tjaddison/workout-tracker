'use client'

import { motion } from 'framer-motion'
import { Calendar, BarChart3, History, User, Play } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function QuickActions() {
  const router = useRouter()

  const actions = [
    {
      icon: Calendar,
      label: 'Schedule',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      onClick: () => router.push('/schedule')
    },
    {
      icon: BarChart3,
      label: 'Progress',
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      onClick: () => router.push('/progress')
    },
    {
      icon: History,
      label: 'History',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      onClick: () => router.push('/history')
    },
    {
      icon: User,
      label: 'Profile',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
      onClick: () => router.push('/profile')
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="card"
    >
      <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
      
      {/* Start Workout CTA */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => router.push('/workout')}
        className="w-full flex items-center justify-center gap-3 p-4 mb-4 rounded-xl bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transition-all duration-200"
      >
        <Play className="h-5 w-5 text-white" />
        <span className="font-semibold text-white">Start Today&apos;s Workout</span>
      </motion.button>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={action.onClick}
            className="flex flex-col items-center p-4 rounded-xl bg-dark-800/30 hover:bg-dark-700/50 transition-all duration-200 min-h-[80px]"
          >
            <div className={`p-3 rounded-full ${action.bgColor} mb-2`}>
              <action.icon className={`h-5 w-5 ${action.color}`} />
            </div>
            <span className="text-sm font-medium text-white">{action.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}