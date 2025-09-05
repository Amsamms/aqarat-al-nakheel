export interface Property {
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

export interface PropertyImage {
  id: string
  property_id: string
  image_url: string
  alt_text: string
  order_index: number
  created_at: string
}

export interface User {
  id: string
  email: string
  full_name: string
  phone: string | null
  role: 'user' | 'moderator' | 'admin'
  created_at: string
  updated_at: string
}

export interface SearchFilters {
  property_type?: string[]
  min_price?: number
  max_price?: number
  bedrooms?: number
  bathrooms?: number
  min_area?: number
  max_area?: number
  location?: string
  amenities?: string[]
  status?: string
}

export interface ContactForm {
  name: string
  email: string
  phone?: string
  message: string
  property_id?: string
}