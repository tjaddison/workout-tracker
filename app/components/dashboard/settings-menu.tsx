'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, User, Bell, Moon, Sun, Zap, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useUserProfile } from '@/app/lib/hooks'

interface SettingsMenuProps {
  isOpen: boolean
  onClose: () => void
  anchorRef: React.RefObject<HTMLButtonElement>
}

export function SettingsMenu({ isOpen, onClose, anchorRef }: SettingsMenuProps) {
  const router = useRouter()
  const { profile, updateProfile } = useUserProfile()
  const [darkMode, setDarkMode] = useState(true) // App is dark by default
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose, anchorRef])

  const toggleNotifications = async () => {
    if (profile?.settings) {
      await updateProfile({
        reminderNotifications: !profile.settings.reminderNotifications
      })
    }
  }

  const menuItems = [
    {
      icon: User,
      label: 'Profile',
      onClick: () => {
        router.push('/profile')
        onClose()
      }
    },
    {
      icon: Settings,
      label: 'All Settings',
      onClick: () => {
        router.push('/settings')
        onClose()
      }
    },
    {
      icon: Bell,
      label: 'Notifications',
      onClick: toggleNotifications,
      toggle: true,
      enabled: profile?.settings.reminderNotifications ?? true
    },
    {
      icon: darkMode ? Sun : Moon,
      label: darkMode ? 'Light Mode' : 'Dark Mode',
      onClick: () => setDarkMode(!darkMode),
      disabled: true, // Disabled for now since app is designed for dark mode
      subtitle: 'Coming soon'
    },
    {
      icon: Zap,
      label: 'Quick Start Workout',
      onClick: () => {
        router.push('/workout')
        onClose()
      }
    },
    {
      icon: LogOut,
      label: 'Sign Out',
      onClick: () => {
        signOut({ callbackUrl: '/auth/signin' })
        onClose()
      },
      destructive: true
    }
  ]

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ duration: 0.15 }}
        className="absolute right-2 sm:right-4 top-16 z-50 w-72 sm:w-64 max-w-[calc(100vw-1rem)] bg-dark-800 border border-dark-700 rounded-xl shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-dark-700">
          <h3 className="text-sm font-medium text-white">Quick Settings</h3>
          <p className="text-xs text-gray-400">Manage your preferences</p>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={item.onClick}
              disabled={item.disabled}
              className={`w-full flex items-center justify-between px-4 py-4 text-left transition-colors min-h-[48px] ${
                item.disabled
                  ? 'opacity-50 cursor-not-allowed'
                  : item.destructive
                  ? 'hover:bg-red-500/10 text-red-400'
                  : 'hover:bg-dark-700 text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`h-4 w-4 ${
                  item.destructive ? 'text-red-400' : 'text-gray-400'
                }`} />
                <div>
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.subtitle && (
                    <p className="text-xs text-gray-500">{item.subtitle}</p>
                  )}
                </div>
              </div>
              
              {item.toggle && (
                <div className={`w-12 h-6 rounded-full transition-colors ${
                  item.enabled ? 'bg-blue-600' : 'bg-gray-600'
                }`}>
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform mt-0.5 ${
                    item.enabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-dark-700 bg-dark-800/50">
          <p className="text-xs text-gray-500 text-center">
            Workout Tracker v1.0
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}