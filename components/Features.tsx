import { motion } from 'framer-motion'
import { ColorPalette, getContrastColor } from '../utils/colorUtils'
import { Zap, Palette, Download, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: "One-Click Generation",
    description: "Generate harmonious color palettes instantly with a single click."
  },
  {
    icon: Palette,
    title: "Color Theory Built-in",
    description: "Our algorithm ensures balanced and visually pleasing color combinations."
  },
  {
    icon: Download,
    title: "Easy Export",
    description: "Download your color palette instantly in a simple text format."
  },
  {
    icon: Sparkles,
    title: "Modern Color Schemes",
    description: "Get trendy color combinations perfect for modern web design."
  }
]

export default function Features({ colors }: { colors: ColorPalette }) {
  return (
    <section className="py-24" style={{ backgroundColor: colors.background }}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.h2
              className="text-4xl font-bold mb-6 bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Simple Tools for Perfect Colors
            </motion.h2>
            <motion.p
              className="text-xl mb-12"
              style={{ color: colors.text }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              LazyTints makes color selection effortless with our straightforward tools and features.
            </motion.p>
            
            <div className="grid sm:grid-cols-2 gap-8 lg:gap-12">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="space-y-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <div className="flex items-center gap-3">
                    <feature.icon 
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: colors.accent }}
                    />
                    <h3 
                      className="font-semibold"
                      style={{ color: colors.primary }}
                    >
                      {feature.title}
                    </h3>
                  </div>
                  <p 
                    className="text-sm pl-8"
                    style={{ color: colors.text }}
                  >
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div
            className="relative h-full flex items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-full aspect-square rounded-2xl shadow-lg overflow-hidden">
              <div className="w-full h-full flex flex-col">
                <div className="flex-1 flex">
                  <ColorStrip color={colors.primary} colors={colors} />
                  <ColorStrip color={colors.secondary} colors={colors} />
                </div>
                <div className="flex-1 flex">
                  <ColorStrip color={colors.accent} colors={colors} />
                  <ColorStrip color={colors.text} colors={colors} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ColorStrip({ color, colors }: { color: string, colors: ColorPalette }) {
  return (
    <motion.div
      className="flex-1 relative group"
      style={{ backgroundColor: color }}
      whileHover={{ flex: 1.2 }}
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
  )
}

