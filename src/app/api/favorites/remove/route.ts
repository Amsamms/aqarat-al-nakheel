import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { favoriteId } = body

    if (!favoriteId) {
      return NextResponse.json(
        { error: 'Missing favorite ID' },
        { status: 400 }
      )
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

    // Delete the favorite (RLS policy will ensure user can only delete their own favorites)
    const { error: deleteError } = await supabase
      .from('user_favorites')
      .delete()
      .eq('id', favoriteId)
      .eq('user_id', user.id)

    if (deleteError) {
      console.error('Database error:', deleteError)
      return NextResponse.json(
        { error: 'Failed to remove favorite' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Favorite removed successfully' },
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