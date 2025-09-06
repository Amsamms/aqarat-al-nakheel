export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          content_ar: string
          content_en: string | null
          created_at: string | null
          created_by: string | null
          excerpt_ar: string | null
          excerpt_en: string | null
          featured_image: string | null
          id: string
          published: boolean | null
          published_at: string | null
          slug: string
          tags: Json | null
          title_ar: string
          title_en: string | null
          updated_at: string | null
        }
        Insert: {
          content_ar: string
          content_en?: string | null
          created_at?: string | null
          created_by?: string | null
          excerpt_ar?: string | null
          excerpt_en?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          slug: string
          tags?: Json | null
          title_ar: string
          title_en?: string | null
          updated_at?: string | null
        }
        Update: {
          content_ar?: string
          content_en?: string | null
          created_at?: string | null
          created_by?: string | null
          excerpt_ar?: string | null
          excerpt_en?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          slug?: string
          tags?: Json | null
          title_ar?: string
          title_en?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_forms: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          property_id: string | null
          status: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          property_id?: string | null
          status?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          property_id?: string | null
          status?: string
        }
        Relationships: []
      }
      page_content: {
        Row: {
          content_ar: string
          content_en: string | null
          created_at: string | null
          created_by: string | null
          id: string
          meta_description_ar: string | null
          meta_description_en: string | null
          meta_keywords_ar: string | null
          meta_keywords_en: string | null
          page_slug: string
          published: boolean | null
          title_ar: string
          title_en: string | null
          updated_at: string | null
        }
        Insert: {
          content_ar: string
          content_en?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          meta_description_ar?: string | null
          meta_description_en?: string | null
          meta_keywords_ar?: string | null
          meta_keywords_en?: string | null
          page_slug: string
          published?: boolean | null
          title_ar: string
          title_en?: string | null
          updated_at?: string | null
        }
        Update: {
          content_ar?: string
          content_en?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          meta_description_ar?: string | null
          meta_description_en?: string | null
          meta_keywords_ar?: string | null
          meta_keywords_en?: string | null
          page_slug?: string
          published?: boolean | null
          title_ar?: string
          title_en?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          amenities: Json | null
          amenities_ar: Json | null
          area: number
          bathrooms: number
          bedrooms: number
          coordinates: unknown | null
          created_at: string | null
          created_by: string | null
          description: string | null
          description_ar: string | null
          featured: boolean | null
          floor_number: number | null
          furnished: boolean | null
          id: string
          images: Json | null
          location: string
          location_ar: string
          parking_spaces: number | null
          price: number
          property_type: string
          rating: number | null
          status: string
          title: string
          title_ar: string
          total_floors: number | null
          updated_at: string | null
          video_url: string | null
          virtual_tour_url: string | null
        }
        Insert: {
          amenities?: Json | null
          amenities_ar?: Json | null
          area: number
          bathrooms?: number
          bedrooms?: number
          coordinates?: unknown | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          description_ar?: string | null
          featured?: boolean | null
          floor_number?: number | null
          furnished?: boolean | null
          id?: string
          images?: Json | null
          location: string
          location_ar: string
          parking_spaces?: number | null
          price: number
          property_type: string
          rating?: number | null
          status?: string
          title: string
          title_ar: string
          total_floors?: number | null
          updated_at?: string | null
          video_url?: string | null
          virtual_tour_url?: string | null
        }
        Update: {
          amenities?: Json | null
          amenities_ar?: Json | null
          area?: number
          bathrooms?: number
          bedrooms?: number
          coordinates?: unknown | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          description_ar?: string | null
          featured?: boolean | null
          floor_number?: number | null
          furnished?: boolean | null
          id?: string
          images?: Json | null
          location?: string
          location_ar?: string
          parking_spaces?: number | null
          price?: number
          property_type?: string
          rating?: number | null
          status?: string
          title?: string
          title_ar?: string
          total_floors?: number | null
          updated_at?: string | null
          video_url?: string | null
          virtual_tour_url?: string | null
        }
        Relationships: []
      }
      property_images: {
        Row: {
          alt_text: string | null
          alt_text_ar: string | null
          created_at: string | null
          id: string
          image_url: string
          is_primary: boolean | null
          order_index: number
          property_id: string | null
        }
        Insert: {
          alt_text?: string | null
          alt_text_ar?: string | null
          created_at?: string | null
          id?: string
          image_url: string
          is_primary?: boolean | null
          order_index?: number
          property_id?: string | null
        }
        Update: {
          alt_text?: string | null
          alt_text_ar?: string | null
          created_at?: string | null
          id?: string
          image_url?: string
          is_primary?: boolean | null
          order_index?: number
          property_id?: string | null
        }
        Relationships: []
      }
      property_inquiries: {
        Row: {
          created_at: string | null
          email: string
          id: string
          inquiry_type: string | null
          message: string
          name: string
          phone: string | null
          property_id: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          inquiry_type?: string | null
          message: string
          name: string
          phone?: string | null
          property_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          inquiry_type?: string | null
          message?: string
          name?: string
          phone?: string | null
          property_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_favorites: {
        Row: {
          created_at: string | null
          id: string
          property_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          property_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          property_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string
          full_name_ar: string | null
          id: string
          phone: string | null
          role: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name: string
          full_name_ar?: string | null
          id: string
          phone?: string | null
          role?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string
          full_name_ar?: string | null
          id?: string
          phone?: string | null
          role?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}