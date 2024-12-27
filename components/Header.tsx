'use client'

import { motion } from 'framer-motion'
import { ColorPalette } from '../utils/colorUtils'
import { Linkedin, Moon, Sun, User } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useAuth } from '@/contexts/AuthContext'
import { signOut } from '@/utils/supabaseUtils'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'

interface HeaderProps {
  colors: ColorPalette;
  onDarkModeToggle: () => void;
  isDarkMode: boolean;
}

export default function Header({ colors, onDarkModeToggle, isDarkMode }: HeaderProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut()
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      })
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-slate-200/10"
      style={{ backgroundColor: colors.background }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className="container mx-auto">
        <div className="h-16 flex items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <motion.div
              className="text-2xl font-bold tracking-tight"
              style={{ color: colors.primary }}
              whileHover={{ scale: 1.05 }}
            >
              <Link href="/">LazyTints</Link>
            </motion.div>
            <Button
              onClick={onDarkModeToggle}
              variant="outline"
              size="icon"
              style={{ 
                backgroundColor: colors.background, 
                color: colors.text,
                borderColor: colors.text
              }}
            >
              {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              href="https://www.linkedin.com/in/syedasifsultan/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity text-sm"
              style={{ color: colors.secondary }}
            >
              <Linkedin className="w-4 h-4" />
              <span className="hidden sm:inline">Follow the Creator</span>
            </Link>
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Button onClick={handleLogout} variant="ghost" size="sm">
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  )
}

