import { motion } from 'framer-motion'
import { ColorPalette } from '../utils/colorUtils'
import { Palette, Download } from 'lucide-react'

interface StatsProps {
  colors: ColorPalette;
  generatedCount: number;
  downloadCount: number;
}

export default function Stats({ colors, generatedCount, downloadCount }: StatsProps) {
  return (
    <section className="py-16" style={{ backgroundColor: colors.background }}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto grid grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatItem
            icon={<Palette className="w-8 h-8" />}
            label="Palettes Generated"
            value={generatedCount}
            colors={colors}
          />
          <StatItem
            icon={<Download className="w-8 h-8" />}
            label="Palettes Downloaded"
            value={downloadCount}
            colors={colors}
          />
        </motion.div>
      </div>
    </section>
  )
}

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  colors: ColorPalette;
}

function StatItem({ icon, label, value, colors }: StatItemProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div 
        className="mb-4 p-4 rounded-full"
        style={{ backgroundColor: `${colors.primary}22` }}
      >
        <div style={{ color: colors.primary }}>{icon}</div>
      </div>
      <div 
        className="text-4xl font-bold mb-2"
        style={{ color: colors.primary }}
      >
        {value.toLocaleString()}
      </div>
      <div 
        className="text-lg"
        style={{ color: colors.text }}
      >
        {label}
      </div>
    </div>
  )
}

