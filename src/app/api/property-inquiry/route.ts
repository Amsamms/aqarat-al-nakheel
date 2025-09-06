import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { property_id, name, email, phone, message, inquiry_type = 'general' } = body

    // Validate required fields
    if (!property_id || !name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const supabase = await createSupabaseServerClient()

    // Get current user (if authenticated)
    const { data: { user } } = await supabase.auth.getUser()

    // Insert inquiry into database
    const { data, error } = await supabase
      .from('property_inquiries')
      .insert([
        {
          property_id,
          user_id: user?.id || null,
          name,
          email,
          phone: phone || null,
          message,
          inquiry_type,
          status: 'new'
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to submit inquiry' },
        { status: 500 }
      )
    }

    // TODO: Send email notification to admin (implement later)
    // TODO: Send confirmation email to user (implement later)

    return NextResponse.json(
      { 
        message: 'Inquiry submitted successfully',
        inquiry: data
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}