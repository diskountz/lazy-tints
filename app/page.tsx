'use client'

import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import Features from '../components/Features'
import CTA from '../components/CTA'
import Footer from '../components/Footer'
import { generateColorPalette, ColorPalette } from '../utils/colorUtils'
import { incrementStat, getGlobalStats } from '../utils/supabaseUtils'
import { Toaster } from "../components/ui/toaster"
import { AuthProvider } from '../contexts/AuthContext'

export default function Home() {
  const [colors, setColors] = useState<ColorPalette>({
    primary: '#3B82F6',
    secondary: '#10B981',
    accent: '#F59E0B',
    background: '#FFFFFF',
    text: '#2D3748',
    name: 'Default',
    category: 'Vibrant'
  })
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [globalStats, setGlobalStats] = useState({ generated: 0, downloaded: 0 })

  const generateNewPalette = async () => {
    setColors(generateColorPalette(isDarkMode))
    await incrementStat('generated')
    updateGlobalStats()
  }

  const handleDownload = async () => {
    await incrementStat('downloaded')
    updateGlobalStats()
    // Call the actual download function here
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    setColors(generateColorPalette(!isDarkMode))
  }

  const updateGlobalStats = async () => {
    try {
      const stats = await getGlobalStats()
      if (stats) {
        setGlobalStats(stats)
      }
    } catch (error) {
      console.error('Error updating global stats:', error)
    }
  }

  useEffect(() => {
    generateNewPalette()
    updateGlobalStats()
  }, [])

  return (
    <AuthProvider>
      <div style={{ backgroundColor: colors.background, color: colors.text }}>
        <Header 
          colors={colors} 
          onDarkModeToggle={toggleDarkMode}
          isDarkMode={isDarkMode}
        />
        <main>
          <Hero colors={colors} onGenerateNewPalette={generateNewPalette} onDownloadPalette={handleDownload} />
          <Stats colors={colors} generatedCount={globalStats.generated} downloadCount={globalStats.downloaded} />
          <Features colors={colors} />
          <CTA colors={colors} onGenerateNewPalette={generateNewPalette} />
        </main>
        <Footer colors={colors} />
        <Toaster />
      </div>
    </AuthProvider>
  )
}

