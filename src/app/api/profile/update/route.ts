import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import type { Database } from '@/lib/database.types'

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { full_name, full_name_ar, phone } = body as {
      full_name: string
      full_name_ar: string
      phone: string
    }

    const supabase = await createSupabaseServerClient()

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Update user profile
    const updateData: Database['public']['Tables']['user_profiles']['Update'] = {
      updated_at: new Date().toISOString()
    }

    if (full_name && full_name.trim()) {
      updateData.full_name = full_name.trim()
    }
    
    if (full_name_ar !== undefined) {
      updateData.full_name_ar = full_name_ar?.trim() || null
    }
    
    if (phone !== undefined) {
      updateData.phone = phone?.trim() || null
    }

    const { error: updateError } = await supabase
      .from('user_profiles')
      .update(updateData)
      .eq('id', user.id)

    if (updateError) {
      console.error('Database error:', updateError)
      return NextResponse.json(
        { error: 'Failed to update profile' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Profile updated successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}