import { supabase } from '@/lib/supabase'
import { ColorPalette } from './colorUtils'

export async function signUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) throw error
    return { data }
  } catch (error) {
    console.error('Error signing up:', error)
    return { error }
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    console.error('Error signing out:', error)
    throw error
  }
}

export async function savePalette(palette: ColorPalette) {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!userData.user) throw new Error('No user found')

    const { data, error } = await supabase
      .from('saved_palettes')
      .insert({
        user_id: userData.user.id,
        palette_name: palette.name,
        primary_color: palette.primary,
        secondary_color: palette.secondary,
        accent_color: palette.accent,
        background_color: palette.background,
        text_color: palette.text,
        category: palette.category,
      })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error saving palette:', error)
    throw error
  }
}

export async function incrementStat(statName: 'generated' | 'downloaded') {
  try {
    const { data, error } = await supabase.rpc('increment_stat', { stat_name: statName })
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error incrementing stat:', error)
    throw error
  }
}

export async function getGlobalStats() {
  try {
    const { data, error } = await supabase
      .from('stats')
      .select('*')
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching global stats:', error)
    throw error
  }
}

export async function checkSavedPalettesTable() {
  try {
    const { data, error } = await supabase
      .from('saved_palettes')
      .select('id')
      .limit(1)

    if (error) {
      if (error.code === 'PGRST116') {
        // Table doesn't exist
        return false
      }
      throw error
    }

    return true
  } catch (error) {
    console.error('Error checking saved_palettes table:', error)
    throw error
  }
}

export async function createSavedPalettesTable() {
  try {
    const { error } = await supabase.rpc('create_saved_palettes_table', {
      sql: `
        CREATE TABLE IF NOT EXISTS saved_palettes (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
          palette_name TEXT NOT NULL,
          primary_color TEXT NOT NULL,
          secondary_color TEXT NOT NULL,
          accent_color TEXT NOT NULL,
          background_color TEXT NOT NULL,
          text_color TEXT NOT NULL,
          category TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
        );
        
        CREATE INDEX IF NOT EXISTS saved_palettes_user_id_idx ON saved_palettes(user_id);
      `
    })
    if (error) throw error
    return true
  } catch (error) {
    console.error('Error creating saved_palettes table:', error)
    throw error
  }
}

export async function getSavedPalettes() {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!userData.user) throw new Error('No user found')

    const { data, error } = await supabase
      .from('saved_palettes')
      .select('*')
      .eq('user_id', userData.user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    // Transform the data to match the ColorPalette interface
    return data?.map(palette => ({
      id: palette.id,
      created_at: palette.created_at,
      name: palette.palette_name,
      category: palette.category,
      primary: palette.primary_color,
      secondary: palette.secondary_color,
      accent: palette.accent_color,
      background: palette.background_color,
      text: palette.text_color,
    })) || []
  } catch (error) {
    console.error('Error fetching saved palettes:', error)
    throw error
  }
}

export async function deleteSavedPalette(id: string) {
  try {
    const { error } = await supabase
      .from('saved_palettes')
      .delete()
      .eq('id', id)

    if (error) throw error
  } catch (error) {
    console.error('Error deleting saved palette:', error)
    throw error
  }
}

