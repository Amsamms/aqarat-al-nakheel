import { Suspense } from 'react'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { Property, SearchFilters } from '@/types'
import { PropertiesClient } from '@/components/properties/PropertiesClient'
import { PropertyFilters } from '@/components/properties/PropertyFilters'

interface PropertiesPageProps {
  searchParams: Promise<{
    search?: string
    property_type?: string
    min_price?: string
    max_price?: string
    bedrooms?: string
    bathrooms?: string
    min_area?: string
    max_area?: string
    location?: string
    sort?: string
    page?: string
    view?: string
  }>
}

async function getProperties(filters: SearchFilters, page: number = 1, itemsPerPage: number = 12, sortBy: string = 'created_at') {
  const supabase = await createSupabaseServerClient()
  
  let query = supabase
    .from('properties')
    .select('*', { count: 'exact' })
    .eq('status', 'available')

  // Apply filters
  if (filters.property_type && filters.property_type.length > 0) {
    query = query.in('property_type', filters.property_type)
  }

  if (filters.min_price) {
    query = query.gte('price', filters.min_price)
  }

  if (filters.max_price) {
    query = query.lte('price', filters.max_price)
  }

  if (filters.bedrooms) {
    query = query.gte('bedrooms', filters.bedrooms)
  }

  if (filters.bathrooms) {
    query = query.gte('bathrooms', filters.bathrooms)
  }

  if (filters.min_area) {
    query = query.gte('area', filters.min_area)
  }

  if (filters.max_area) {
    query = query.lte('area', filters.max_area)
  }

  if (filters.location) {
    query = query.or(`location.ilike.%${filters.location}%,location_ar.ilike.%${filters.location}%`)
  }

  // Apply sorting
  switch (sortBy) {
    case 'price_asc':
      query = query.order('price', { ascending: true })
      break
    case 'price_desc':
      query = query.order('price', { ascending: false })
      break
    case 'area_asc':
      query = query.order('area', { ascending: true })
      break
    case 'area_desc':
      query = query.order('area', { ascending: false })
      break
    case 'newest':
      query = query.order('created_at', { ascending: false })
      break
    case 'oldest':
      query = query.order('created_at', { ascending: true })
      break
    default:
      query = query.order('featured', { ascending: false }).order('created_at', { ascending: false })
  }

  // Apply pagination
  const from = (page - 1) * itemsPerPage
  const to = from + itemsPerPage - 1
  query = query.range(from, to)

  const { data: properties, error, count } = await query

  if (error) {
    console.error('Error fetching properties:', error)
    return { properties: [], count: 0 }
  }

  return { properties: (properties as Property[]) || [], count: count || 0 }
}

async function searchProperties(searchTerm: string) {
  const supabase = await createSupabaseServerClient()
  
  const { data: properties, error } = await supabase
    .from('properties')
    .select('*')
    .eq('status', 'available')
    .or(`title.ilike.%${searchTerm}%,title_ar.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,description_ar.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%,location_ar.ilike.%${searchTerm}%`)
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) {
    console.error('Error searching properties:', error)
    return []
  }

  return (properties as Property[]) || []
}

export async function generateMetadata({ searchParams }: PropertiesPageProps) {
  const params = await searchParams
  const search = params.search
  const propertyType = params.property_type

  let title = 'جميع العقارات | 3عقارات النخيل'
  let description = 'اكتشف مجموعة واسعة من العقارات المتميزة في شاطئ النخيل، الإسكندرية. شقق، فيلات، واستوديوهات بأفضل الأسعار.'

  if (search) {
    title = `البحث عن "${search}" | 3عقارات النخيل`
    description = `نتائج البحث عن "${search}" في عقارات شاطئ النخيل، الإسكندرية.`
  } else if (propertyType) {
    const typeMap = {
      apartment: 'شقق',
      villa: 'فيلات',
      studio: 'استوديوهات',
      penthouse: 'بنتهاوس',
      duplex: 'دوبلكس'
    }
    const typeName = typeMap[propertyType as keyof typeof typeMap] || propertyType
    title = `${typeName} للبيع | 3عقارات النخيل`
    description = `اكتشف أفضل ${typeName} للبيع في شاطئ النخيل، الإسكندرية بأسعار مناسبة.`
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: 'ar_EG',
      type: 'website',
    },
  }
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const params = await searchParams
  const search = params.search
  const page = parseInt(params.page || '1')
  const sort = params.sort || 'featured'
  const view = params.view || 'grid'

  // Build filters from search params
  const filters: SearchFilters = {
    property_type: params.property_type ? [params.property_type] : undefined,
    min_price: params.min_price ? parseInt(params.min_price) : undefined,
    max_price: params.max_price ? parseInt(params.max_price) : undefined,
    bedrooms: params.bedrooms ? parseInt(params.bedrooms) : undefined,
    bathrooms: params.bathrooms ? parseInt(params.bathrooms) : undefined,
    min_area: params.min_area ? parseInt(params.min_area) : undefined,
    max_area: params.max_area ? parseInt(params.max_area) : undefined,
    location: params.location || undefined,
  }

  let properties: Property[] = []
  let totalCount = 0

  if (search) {
    // If there's a search term, use search function
    properties = await searchProperties(search)
    totalCount = properties.length
  } else {
    // Otherwise, use filtered query
    const result = await getProperties(filters, page, 12, sort)
    properties = result.properties
    totalCount = result.count
  }

  const totalPages = Math.ceil(totalCount / 12)

  const breadcrumbs = [
    { name: 'الرئيسية', href: '/' },
    { name: 'العقارات', href: '/properties' }
  ]

  if (search) {
    breadcrumbs.push({ name: `البحث: "${search}"`, href: `/properties?search=${search}` })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Breadcrumbs */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.href} className="flex items-center">
                {index > 0 && (
                  <svg className="w-4 h-4 mx-2 text-gray-400 rtl:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-amber-400">{crumb.name}</span>
                ) : (
                  <a href={crumb.href} className="text-gray-300 hover:text-white transition-colors">
                    {crumb.name}
                  </a>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-gradient-to-b from-gray-900 to-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            {search ? `نتائج البحث عن "${search}"` : 'جميع العقارات'}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {search 
              ? `وجدنا ${totalCount} نتيجة مطابقة لبحثك`
              : 'اكتشف مجموعة واسعة من العقارات المتميزة في أفضل المواقع بشاطئ النخيل'
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <Suspense fallback={<div className="bg-gray-900 rounded-xl p-6 animate-pulse h-96"></div>}>
              <PropertyFilters initialFilters={filters} />
            </Suspense>
          </div>

          {/* Properties Content */}
          <div className="flex-1">
            <Suspense 
              fallback={
                <div className="space-y-6">
                  <div className="bg-gray-900 rounded-xl p-4 animate-pulse h-16"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="bg-gray-900 rounded-xl animate-pulse h-80"></div>
                    ))}
                  </div>
                </div>
              }
            >
              <PropertiesClient
                properties={properties}
                totalCount={totalCount}
                currentPage={page}
                totalPages={totalPages}
                currentSort={sort}
                currentView={view}
                searchTerm={search}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}