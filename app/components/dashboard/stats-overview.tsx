'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Target, Clock, Flame } from 'lucide-react'

export function StatsOverview() {
  // Mock data - would be fetched from API in real app
  const stats = [
    {
      icon: Flame,
      label: 'Week Streak',
      value: '7',
      change: '+2',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20'
    },
    {
      icon: Target,
      label: 'Workouts',
      value: '12',
      change: '+3',
      color: 'text-primary-400',
      bgColor: 'bg-primary-500/20'
    },
    {
      icon: Clock,
      label: 'Hours',
      value: '8.5',
      change: '+2.1',
      color: 'text-secondary-400',
      bgColor: 'bg-secondary-500/20'
    },
    {
      icon: TrendingUp,
      label: 'Progress',
      value: '85%',
      change: '+12%',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="grid grid-cols-2 gap-4"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
          className="card p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <span className="text-xs text-secondary-400 font-medium">
              {stat.change}
            </span>
          </div>
          
          <div>
            <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-xs text-dark-400">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}