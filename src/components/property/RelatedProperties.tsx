'use client'

import { Property } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Bed, Bath, Square, MapPin } from 'lucide-react'

interface RelatedPropertiesProps {
  properties: Property[]
  title: string
}

export function RelatedProperties({ properties, title }: RelatedPropertiesProps) {
  if (!properties || properties.length === 0) {
    return null
  }

  const propertyTypeMap = {
    apartment: 'شقة',
    villa: 'فيلا',
    studio: 'استوديو',
    penthouse: 'بنتهاوس',
    duplex: 'دوبلكس'
  }

  return (
    <div className="bg-gray-900/30 rounded-xl p-8">
      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 text-center">
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/properties/${property.id}`}>
              <div className="bg-gray-900/50 rounded-xl overflow-hidden group hover:bg-gray-800/50 transition-all duration-300">
                {/* Property Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={property.images?.[0] || '/placeholder-property.jpg'}
                    alt={property.title_ar}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Property Type Badge */}
                  <div className="absolute top-3 right-3 bg-amber-400 text-black px-2 py-1 rounded-lg text-xs font-semibold">
                    {propertyTypeMap[property.property_type as keyof typeof propertyTypeMap] || property.property_type}
                  </div>

                  {/* Featured Badge */}
                  {property.featured && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                      مميز
                    </div>
                  )}

                  {/* Price Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="text-amber-400 font-bold text-lg">
                      {property.price.toLocaleString('ar-EG')} جنيه
                    </div>
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-4">
                  <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-amber-400 transition-colors">
                    {property.title_ar}
                  </h3>

                  <div className="flex items-center text-gray-400 text-sm mb-3">
                    <MapPin className="w-4 h-4 ml-1" />
                    <span className="line-clamp-1">{property.location_ar}</span>
                  </div>

                  {/* Property Specs */}
                  <div className="flex items-center justify-between text-gray-300 text-sm">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 ml-1" />
                      <span>{property.bedrooms}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 ml-1" />
                      <span>{property.bathrooms}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Square className="w-4 h-4 ml-1" />
                      <span>{property.area} م²</span>
                    </div>
                  </div>

                  {/* Price per sqm */}
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <div className="text-gray-400 text-xs">
                      {Math.round(property.price / property.area).toLocaleString('ar-EG')} جنيه / م²
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* View All Properties Button */}
      <div className="text-center mt-8">
        <Link
          href="/properties"
          className="inline-flex items-center bg-amber-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-amber-500 transition-colors"
        >
          <span>مشاهدة جميع العقارات</span>
          <svg className="w-5 h-5 mr-2 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  )
}