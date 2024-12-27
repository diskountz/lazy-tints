'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getSavedPalettes, deleteSavedPalette, createSavedPalettesTable, checkSavedPalettesTable } from '../../utils/supabaseUtils'
import { ColorPalette } from '../../utils/colorUtils'
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Trash2, Palette, Copy } from 'lucide-react'
import { useToast } from "../../components/ui/use-toast"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface SavedPalette extends ColorPalette {
  id: string;
  created_at: string;
}

export default function Dashboard() {
  const { user, loading } = useAuth()
  const [savedPalettes, setSavedPalettes] = useState<SavedPalette[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tableExists, setTableExists] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login')
      } else {
        checkAndFetchPalettes()
      }
    }
  }, [user, loading, router])

  const checkAndFetchPalettes = async () => {
    try {
      setIsLoading(true)
      const exists = await checkSavedPalettesTable()
      setTableExists(exists)
      if (exists) {
        await fetchSavedPalettes()
      } else {
        setError('The saved_palettes table does not exist. Please create it to start saving palettes.')
      }
    } catch (error) {
      console.error('Error checking table existence:', error)
      setError('An error occurred while checking for the saved_palettes table.')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchSavedPalettes = async () => {
    try {
      const data = await getSavedPalettes()
      setSavedPalettes(data as SavedPalette[] || [])
      setError(null)
    } catch (error) {
      console.error('Error fetching saved palettes:', error)
      if (error instanceof Error) {
        setError(`Failed to load your saved palettes: ${error.message}`)
      } else {
        setError('An unexpected error occurred while loading your saved palettes.')
      }
      toast({
        title: "Error",
        description: "Failed to load your saved palettes. Please try again later.",
        variant: "destructive",
      })
    }
  }

  const handleCreateTable = async () => {
    try {
      setIsLoading(true)
      await createSavedPalettesTable()
      toast({
        title: "Success",
        description: "The saved_palettes table has been created. You can now save palettes.",
      })
      setTableExists(true)
      await fetchSavedPalettes()
    } catch (error) {
      console.error('Error creating saved_palettes table:', error)
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again or contact support.",
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteSavedPalette(id)
      setSavedPalettes(savedPalettes.filter(palette => palette.id !== id))
      toast({
        title: "Success",
        description: "Palette deleted successfully.",
      })
    } catch (error) {
      console.error('Error deleting palette:', error)
      toast({
        title: "Error",
        description: "Failed to delete the palette. Please try again.",
        variant: "destructive",
      })
    }
  }

  const copyColorCode = (color: string | undefined) => {
    if (color) {
      navigator.clipboard.writeText(color)
      toast({
        title: "Color Copied",
        description: `${color.toUpperCase()} has been copied to your clipboard.`,
      })
    } else {
      toast({
        title: "Error",
        description: "Unable to copy color code.",
        variant: "destructive",
      })
    }
  }

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your palettes...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Please Log In</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              You need to be logged in to view your saved palettes.
            </p>
            <div className="space-y-4">
              <Button asChild className="w-full">
                <Link href="/login">Log In</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/signup">Create Account</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!tableExists) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Table Not Found</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              The saved_palettes table does not exist in the database.
            </p>
            <Button onClick={handleCreateTable} className="w-full">
              Attempt to Create Table
            </Button>
            <p className="text-sm text-gray-500">
              If this doesn't work, please contact the administrator to set up the necessary tables.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Error</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">{error}</p>
            <Button onClick={checkAndFetchPalettes} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="text-4xl font-bold text-gray-900">Your Saved Palettes</h1>
          <Button asChild size="lg" className="min-w-[200px]">
            <Link href="/">
              <Palette className="mr-2 h-5 w-5" aria-hidden="true" />
              <span>Generate New</span>
            </Link>
          </Button>
        </div>
        
        {savedPalettes.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent className="space-y-4">
              <Palette className="mx-auto h-12 w-12 text-blue-600" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-gray-900">
                No Saved Palettes Yet
              </h2>
              <p className="text-gray-600">
                Start saving your favorite color combinations to access them anytime.
              </p>
              <Button asChild className="mt-4">
                <Link href="/">Generate Your First Palette</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedPalettes.map((palette, index) => (
              <motion.div
                key={palette.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-32 grid grid-cols-5">
                    {[
                      { color: palette.primary, name: 'Primary' },
                      { color: palette.secondary, name: 'Secondary' },
                      { color: palette.accent, name: 'Accent' },
                      { color: palette.background, name: 'Background' },
                      { color: palette.text, name: 'Text' }
                    ].map(({ color, name }) => (
                      <button
                        key={name}
                        onClick={() => copyColorCode(color)}
                        className="relative group cursor-pointer transition-all duration-200 hover:flex-grow"
                        style={{ backgroundColor: color }}
                        title={`${name}: ${color?.toUpperCase() ?? 'N/A'}`}
                        aria-label={`Copy ${name} color: ${color}`}
                      >
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 transition-opacity">
                          <Copy className="h-5 w-5 text-white" aria-hidden="true" />
                        </div>
                      </button>
                    ))}
                  </div>
                  <CardContent className="p-4">
                    <h2 className="text-xl font-semibold mb-1 text-gray-900">
                      {palette.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {palette.category}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Created {new Date(palette.created_at).toLocaleDateString()}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      onClick={() => handleDelete(palette.id)}
                      variant="destructive"
                      className="w-full"
                      aria-label={`Delete ${palette.name} palette`}
                    >
                      <Trash2 className="mr-2 h-4 w-4" aria-hidden="true" />
                      Delete Palette
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

