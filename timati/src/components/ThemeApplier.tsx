'use client'

import { useEffect } from 'react'
import { useSettings } from '@/contexts/SettingsContext'

export default function ThemeApplier() {
  const { settings } = useSettings()

  useEffect(() => {
    const root = document.documentElement

    const applyMode = () => {
      let effectiveMode: 'light' | 'dark'
      if (settings.themeMode === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        effectiveMode = isDark ? 'dark' : 'light'
      } else {
        effectiveMode = settings.themeMode
      }
      root.setAttribute('data-mode', effectiveMode)
    }

    const applyAccent = () => {
      root.setAttribute('data-accent', settings.accent)
    }

    applyMode()
    applyAccent()

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (settings.themeMode === 'system') {
        applyMode()
      }
    }
    media.addEventListener('change', handleChange)

    return () => {
      media.removeEventListener('change', handleChange)
    }
  }, [settings.themeMode, settings.accent])

  return null
}


