import React from 'react'
import { Button } from "@/components/ui/button"
import { ColorPalette } from '@/utils/colorUtils'
import { useAuth } from '@/contexts/AuthContext'
import { savePalette } from '@/utils/supabaseUtils'
import { Heart } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from 'next/link'

interface SavePaletteButtonProps {
  palette: ColorPalette
  onSave: () => void
}

export function SavePaletteButton({ palette, onSave }: SavePaletteButtonProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [open, setOpen] = React.useState(false)
  const [isSaving, setIsSaving] = React.useState(false)

  const handleSave = async () => {
    if (!user) {
      setOpen(true)
      return
    }

    setIsSaving(true)
    try {
      console.log('Attempting to save palette:', palette)
      await savePalette(palette)
      onSave()
      toast({
        title: "Palette Saved",
        description: "Your palette has been saved successfully.",
      })
    } catch (error) {
      console.error('Error saving palette:', error)
      toast({
        title: "Error",
        description: "Failed to save the palette. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={user ? handleSave : undefined}
          variant="outline"
          size="sm"
          className="gap-2"
          disabled={isSaving}
        >
          <Heart size={16} />
          {isSaving ? 'Saving...' : 'Save Palette'}
        </Button>
      </DialogTrigger>
      {!user && (
        <DialogContent className="sm:max-w-md bg-white text-gray-900 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl" style={{ color: palette.primary }}>
              Join LazyTints
            </DialogTitle>
            <DialogDescription style={{ color: palette.text }}>
              Create an account to save your favorite palettes and access them anytime.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-4">
            <Button
              asChild
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              <Link href="/signup">Create Account</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <Link href="/login">Log In</Link>
            </Button>
          </div>
        </DialogContent>
      )}
    </Dialog>
  )
}

