import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Property } from '@/types'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { PropertyGallery } from '@/components/property/PropertyGallery'
import { PropertySpecs } from '@/components/property/PropertySpecs'
import { PropertyContact } from '@/components/property/PropertyContact'
import { RelatedProperties } from '@/components/property/RelatedProperties'

interface PropertyDetailPageProps {
  params: Promise<{ id: string }>
}

async function getProperty(id: string): Promise<Property | null> {
  const supabase = await createSupabaseServerClient()
  
  const { data: property, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .eq('status', 'available')
    .single()

  if (error || !property) {
    return null
  }

  return property as Property
}

async function getRelatedProperties(currentId: string, propertyType: string): Promise<Property[]> {
  const supabase = await createSupabaseServerClient()
  
  const { data: properties, error } = await supabase
    .from('properties')
    .select('*')
    .eq('property_type', propertyType)
    .eq('status', 'available')
    .neq('id', currentId)
    .limit(4)

  if (error || !properties) {
    return []
  }

  return properties as Property[]
}

export async function generateMetadata({ params }: PropertyDetailPageProps) {
  const { id } = await params
  const property = await getProperty(id)

  if (!property) {
    return {
      title: 'عقار غير موجود | 3عقارات النخيل',
      description: 'العقار المطلوب غير موجود أو غير متاح للعرض'
    }
  }

  return {
    title: `${property.title_ar} | 3عقارات النخيل`,
    description: property.description_ar || `${property.property_type} في ${property.location_ar} بمساحة ${property.area} متر مربع`,
    openGraph: {
      title: property.title_ar,
      description: property.description_ar,
      images: property.images && property.images.length > 0 ? [property.images[0]] : [],
      locale: 'ar_EG',
      type: 'website',
    },
  }
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { id } = await params
  const property = await getProperty(id)

  if (!property) {
    notFound()
  }

  const relatedProperties = await getRelatedProperties(property.id, property.property_type)

  const breadcrumbs = [
    { name: 'الرئيسية', href: '/' },
    { name: 'العقارات', href: '/properties' },
    { name: property.title_ar, href: `/properties/${property.id}` }
  ]

  const propertyTypeMap = {
    apartment: 'شقة',
    villa: 'فيلا',
    studio: 'استوديو',
    penthouse: 'بنتهاوس',
    duplex: 'دوبلكس'
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
                  <Link href={crumb.href} className="text-gray-300 hover:text-white transition-colors">
                    {crumb.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Property Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="flex-1">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              {property.title_ar}
            </h1>
            <div className="flex items-center space-x-4 rtl:space-x-reverse text-gray-300 mb-4">
              <span className="flex items-center">
                <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {property.location_ar}
              </span>
              <span>{propertyTypeMap[property.property_type as keyof typeof propertyTypeMap] || property.property_type}</span>
              <span>{property.area} م²</span>
            </div>
          </div>
          
          <div className="lg:text-left">
            <div className="text-3xl lg:text-4xl font-bold text-amber-400 mb-2">
              {property.price.toLocaleString('ar-EG')} جنيه
            </div>
            <div className="text-gray-300">
              {Math.round(property.price / property.area).toLocaleString('ar-EG')} جنيه / م²
            </div>
          </div>
        </div>

        {/* Property Gallery */}
        <div className="mb-12">
          <PropertyGallery images={property.images || []} title={property.title_ar} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Property Details */}
          <div className="lg:col-span-2">
            <PropertySpecs property={property} />
            
            {/* Property Description */}
            {property.description_ar && (
              <div className="bg-gray-900/50 rounded-xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">وصف العقار</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {property.description_ar}
                </p>
              </div>
            )}

            {/* Amenities */}
            {property.amenities_ar && property.amenities_ar.length > 0 && (
              <div className="bg-gray-900/50 rounded-xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-white mb-6">المرافق والمميزات</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities_ar.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                      <span className="text-gray-300">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-1">
            <PropertyContact propertyId={property.id} />
          </div>
        </div>

        {/* Related Properties */}
        {relatedProperties.length > 0 && (
          <div className="mt-16">
            <RelatedProperties 
              properties={relatedProperties} 
              title="عقارات مشابهة" 
            />
          </div>
        )}
      </div>
    </div>
  )
}