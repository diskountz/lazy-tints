import { motion } from 'framer-motion'
import { ColorPalette } from '../utils/colorUtils'
import { Linkedin } from 'lucide-react'

export default function Footer({ colors }: { colors: ColorPalette }) {
  return (
    <motion.footer
      className="py-8 px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-col items-center gap-4">
        <a
          href="https://www.linkedin.com/in/syedasifsultan/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          style={{ color: colors.primary }}
        >
          <Linkedin className="w-5 h-5" />
          <span>Follow the Creator</span>
        </a>
        <p style={{ color: colors.text }}>
          © 2024 LazyTints. All rights reserved.
        </p>
      </div>
    </motion.footer>
  )
}

