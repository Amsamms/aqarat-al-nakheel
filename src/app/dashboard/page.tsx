import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { DashboardClient } from '@/components/dashboard/DashboardClient'
import { UserFavorite, PropertyInquiry } from '@/types'

export const metadata = {
  title: 'لوحة التحكم | 3عقارات النخيل',
  description: 'إدارة العقارات المفضلة والاستفسارات'
}

async function getUserData(userId: string) {
  const supabase = await createSupabaseServerClient()

  // Get user profile
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single()

  // Get user favorites
  const { data: favoriteIds } = await supabase
    .from('user_favorites')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  // Get properties for favorites
  let favorites: UserFavorite[] = []
  if (favoriteIds && favoriteIds.length > 0) {
    const propertyIds = favoriteIds.map(f => f.property_id).filter(Boolean) as string[]
    if (propertyIds.length > 0) {
      const { data: properties } = await supabase
        .from('properties')
        .select('*')
        .in('id', propertyIds)
      
      favorites = favoriteIds.map(fav => ({
        ...fav,
        properties: properties?.find(p => p.id === fav.property_id)
      })) as UserFavorite[]
    } else {
      favorites = favoriteIds as UserFavorite[]
    }
  }

  // Get user inquiries
  const { data: inquiryList } = await supabase
    .from('property_inquiries')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  // Get properties for inquiries
  let inquiries: PropertyInquiry[] = []
  if (inquiryList && inquiryList.length > 0) {
    const propertyIds = inquiryList.map(i => i.property_id).filter(Boolean) as string[]
    if (propertyIds.length > 0) {
      const { data: properties } = await supabase
        .from('properties')
        .select('id, title_ar, images')
        .in('id', propertyIds)
      
      inquiries = inquiryList.map(inquiry => ({
        ...inquiry,
        properties: properties?.find(p => p.id === inquiry.property_id)
      })) as PropertyInquiry[]
    } else {
      inquiries = inquiryList as PropertyInquiry[]
    }
  }

  return {
    profile,
    favorites,
    inquiries
  }
}

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?redirectTo=/dashboard')
  }

  const { profile, favorites, inquiries } = await getUserData(user.id)

  if (!profile) {
    // Create user profile if it doesn't exist
    await supabase
      .from('user_profiles')
      .insert([
        {
          id: user.id,
          full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || '',
          full_name_ar: user.user_metadata?.full_name_ar || '',
          phone: user.user_metadata?.phone || null,
          role: 'user',
          user_id: user.id
        }
      ])

    // Redirect to refresh with new profile
    redirect('/dashboard')
  }

  const userData = {
    ...profile,
    email: user.email || ''
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                مرحباً، {userData.full_name_ar || userData.full_name}
              </h1>
              <p className="text-gray-400">
                إدارة العقارات المفضلة والاستفسارات الخاصة بك
              </p>
            </div>
            
            <div className="text-left">
              <div className="text-gray-400 text-sm">عضو منذ</div>
              <div className="text-white font-semibold">
                {new Date(user.created_at).toLocaleDateString('ar-EG', {
                  year: 'numeric',
                  month: 'long'
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardClient
          user={userData}
          favorites={favorites}
          inquiries={inquiries}
        />
      </div>
    </div>
  )
}