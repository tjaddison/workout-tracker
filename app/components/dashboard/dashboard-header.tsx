'use client'

import { signOut } from 'next-auth/react'
import { motion } from 'framer-motion'
import { User, LogOut, Settings } from 'lucide-react'
import Image from 'next/image'

interface DashboardHeaderProps {
  user?: any
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="safe-area-top sticky top-0 z-50 glass-effect border-b border-white/10 px-4 py-4"
    >
      <div className="max-w-lg mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name || 'User'}
              width={48}
              height={48}
              className="rounded-full ring-2 ring-primary-500/30"
            />
          ) : (
            <div className="h-12 w-12 bg-primary-600 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
          )}
          <div>
            <p className="text-sm text-dark-400">{getGreeting()}</p>
            <h1 className="text-lg font-semibold text-white">
              {user?.name?.split(' ')[0] || 'Athlete'}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-xl bg-dark-800/50 hover:bg-dark-700/50 transition-colors"
          >
            <Settings className="h-5 w-5 text-dark-400" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => signOut({ callbackUrl: '/auth/signin' })}
            className="p-2 rounded-xl bg-dark-800/50 hover:bg-red-500/20 transition-colors"
          >
            <LogOut className="h-5 w-5 text-dark-400 hover:text-red-400" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}