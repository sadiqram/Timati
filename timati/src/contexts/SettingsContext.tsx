'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface TimerSettings {
  pomodoro: number // in minutes
  shortBreak: number // in minutes
  longBreak: number // in minutes
  soundEnabled: boolean
  notificationsEnabled: boolean
  volume: number // 0-100
  soundType: 'bell' | 'chime' | 'ocean' | 'melody'
  autoStartBreaks: boolean
  autoStartPomodoros: boolean
  // Theme
  themeMode: 'light' | 'dark' | 'system'
  accent: 'blue' | 'green' | 'purple'
}

interface SettingsContextType {
  settings: TimerSettings
  updateSettings: (newSettings: Partial<TimerSettings>) => void
  resetToDefaults: () => void
  loading: boolean
}

const defaultSettings: TimerSettings = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  soundEnabled: true,
  notificationsEnabled: true,
  volume: 50,
  soundType: 'bell',
  autoStartBreaks: false,
  autoStartPomodoros: false,
  themeMode: 'system',
  accent: 'blue',
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<TimerSettings>(defaultSettings)
  const [loading, setLoading] = useState(true)

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('timati-settings')
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings)
        setSettings({ ...defaultSettings, ...parsed })
      }
    } catch (error) {
      console.error('Error loading settings:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem('timati-settings', JSON.stringify(settings))
      } catch (error) {
        console.error('Error saving settings:', error)
      }
    }
  }, [settings, loading])

  const updateSettings = (newSettings: Partial<TimerSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }

  const resetToDefaults = () => {
    setSettings(defaultSettings)
  }

  const value = {
    settings,
    updateSettings,
    resetToDefaults,
    loading,
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}
