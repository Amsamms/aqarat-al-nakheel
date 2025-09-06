export interface Property {
  id: string
  title: string
  title_ar: string
  description: string | null
  description_ar: string | null
  price: number
  area: number
  bedrooms: number
  bathrooms: number
  property_type: string
  status: string
  location: string
  location_ar: string
  floor_number: number | null
  total_floors: number | null
  parking_spaces: number | null
  furnished: boolean | null
  amenities: string[] | null
  amenities_ar: string[] | null
  images: string[] | null
  video_url: string | null
  virtual_tour_url: string | null
  coordinates: unknown | null
  created_at: string | null
  updated_at: string | null
  created_by: string | null
  featured: boolean | null
  rating: number | null
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
  full_name_ar: string | null
  phone: string | null
  role: string
  avatar_url: string | null
  created_at: string | null
  updated_at: string | null
  user_id: string | null
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

export interface UserFavorite {
  id: string
  user_id: string | null
  property_id: string | null
  created_at: string | null
  properties?: Property
}

export interface PropertyInquiry {
  id: string
  property_id: string
  user_id?: string
  name: string
  email: string
  phone?: string
  message: string
  inquiry_type: 'general' | 'viewing' | 'price' | 'availability'
  status: 'new' | 'contacted' | 'scheduled' | 'resolved' | 'closed'
  created_at: string
  updated_at: string
  properties?: {
    id: string
    title_ar: string
    images: string[]
  }
}

export interface PageContent {
  id: string
  page_slug: string
  title_ar: string
  title_en?: string
  content_ar: string
  content_en?: string
  meta_description_ar?: string
  meta_description_en?: string
  meta_keywords_ar?: string
  meta_keywords_en?: string
  published: boolean
  created_at: string
  updated_at: string
  created_by?: string
}