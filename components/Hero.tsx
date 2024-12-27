'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ColorPalette, getContrastColor, downloadPalette } from '../utils/colorUtils'
import { ArrowRight, Download } from 'lucide-react'
import { SavePaletteButton } from './SavePaletteButton'
import { useToast } from "@/components/ui/use-toast"

export default function Hero({ colors, onGenerateNewPalette, onDownloadPalette }: { colors: ColorPalette, onGenerateNewPalette: () => void, onDownloadPalette: () => void }) {
  const { toast } = useToast()
  return (
    <section className="relative pt-32 pb-32 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${colors.primary}22 0%, transparent 50%)`
        }}
      />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.h1
            className="text-6xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Create the Perfect Color Palette in Seconds
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-6"
            style={{ color: colors.text }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Generate beautiful, harmonious color combinations instantly with our simple color palette generator.
          </motion.p>
          <motion.p
            className="text-lg md:text-xl mb-12"
            style={{ color: colors.accent }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Current Palette: {colors.name} ({colors.category})
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              onClick={onGenerateNewPalette}
              size="lg"
              className="h-12 px-8 text-lg font-medium"
              style={{
                backgroundColor: colors.primary,
                color: getContrastColor(colors.primary)
              }}
            >
              Generate Palette
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => {
                onDownloadPalette();
                downloadPalette(colors);
              }}
              variant="outline"
              size="lg"
              className="h-12 px-8 text-lg font-medium"
              style={{
                borderColor: colors.secondary,
                color: colors.secondary
              }}
            >
              Download Palette
              <Download className="ml-2 h-5 w-5" />
            </Button>
            <SavePaletteButton 
              palette={colors} 
              onSave={() => {
                toast({
                  title: "Palette Saved",
                  description: "Your palette has been saved successfully.",
                })
              }} 
            />
          </motion.div>
        </div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg">
            <div className="absolute inset-0 flex">
              {Object.entries(colors).filter(([key]) => key !== 'name' && key !== 'category').map(([name, color]) => (
                <motion.div
                  key={name}
                  className="flex-1 relative group"
                  style={{ backgroundColor: color }}
                  whileHover={{ flex: 1.5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                    <span 
                      className="font-mono text-sm px-3 py-1 rounded-full bg-white/90 shadow-sm"
                      style={{ color: colors.text }}
                    >
                      {color.toUpperCase()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

