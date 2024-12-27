import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ColorPalette, getContrastColor } from '../utils/colorUtils'
import { Wand2 } from 'lucide-react'

export default function CTA({ colors, onGenerateNewPalette }: { colors: ColorPalette, onGenerateNewPalette: () => void }) {
  // Create desaturated versions of primary and secondary colors for the gradient
  const desaturatedPrimary = `${colors.primary}99`;
  const desaturatedSecondary = `${colors.secondary}99`;

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div 
          className="max-w-5xl mx-auto rounded-3xl p-12 md:p-16 relative overflow-hidden"
          style={{ 
            background: `linear-gradient(135deg, ${desaturatedPrimary}, ${desaturatedSecondary})` 
          }}
        >
          <div className="relative z-10">
            <motion.div
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ color: '#FFFFFF' }}
              >
                Ready to Generate Your Next Color Palette?
              </h2>
              <p 
                className="text-xl mb-8 opacity-90"
                style={{ color: '#FFFFFF' }}
              >
                Create beautiful color combinations with just one click.
              </p>
              <Button
                onClick={onGenerateNewPalette}
                size="lg"
                className="h-12 px-8 text-lg font-medium"
                style={{
                  backgroundColor: colors.accent,
                  color: getContrastColor(colors.accent)
                }}
              >
                Generate New Palette
                <Wand2 className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

