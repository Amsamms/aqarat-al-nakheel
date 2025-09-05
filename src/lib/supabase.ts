import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export type Database = {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string
          title: string
          description: string
          price: number
          area: number
          bedrooms: number
          bathrooms: number
          property_type: 'apartment' | 'villa' | 'studio' | 'penthouse'
          status: 'available' | 'sold' | 'rented' | 'draft'
          location: string
          amenities: string[]
          images: string[]
          created_at: string
          updated_at: string
          created_by: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          price: number
          area: number
          bedrooms: number
          bathrooms: number
          property_type: 'apartment' | 'villa' | 'studio' | 'penthouse'
          status?: 'available' | 'sold' | 'rented' | 'draft'
          location: string
          amenities?: string[]
          images?: string[]
          created_at?: string
          updated_at?: string
          created_by: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          price?: number
          area?: number
          bedrooms?: number
          bathrooms?: number
          property_type?: 'apartment' | 'villa' | 'studio' | 'penthouse'
          status?: 'available' | 'sold' | 'rented' | 'draft'
          location?: string
          amenities?: string[]
          images?: string[]
          created_at?: string
          updated_at?: string
          created_by?: string
        }
      }
      property_images: {
        Row: {
          id: string
          property_id: string
          image_url: string
          alt_text: string
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          image_url: string
          alt_text: string
          order_index: number
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          image_url?: string
          alt_text?: string
          order_index?: number
          created_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          phone: string | null
          role: 'user' | 'moderator' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          phone?: string | null
          role?: 'user' | 'moderator' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          phone?: string | null
          role?: 'user' | 'moderator' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}