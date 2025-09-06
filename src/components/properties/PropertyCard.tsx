'use client'

import { Property } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import { Bed, Bath, Square, MapPin, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const propertyTypeMap = {
    apartment: 'شقة',
    villa: 'فيلا',
    studio: 'استوديو',
    penthouse: 'بنتهاوس',
    duplex: 'دوبلكس'
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-900/50 rounded-xl overflow-hidden group hover:bg-gray-800/50 transition-all duration-300 border border-gray-800/50 hover:border-amber-400/20"
    >
      <Link href={`/properties/${property.id}`}>
        {/* Property Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={property.images?.[0] || '/placeholder-property.jpg'}
            alt={property.title_ar}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Property Type Badge */}
          <div className="absolute top-3 right-3 bg-amber-400 text-black px-3 py-1 rounded-full text-xs font-semibold">
            {propertyTypeMap[property.property_type as keyof typeof propertyTypeMap] || property.property_type}
          </div>

          {/* Featured Badge */}
          {property.featured && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              مميز
            </div>
          )}

          {/* Actions */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center space-x-2 rtl:space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              aria-label="إضافة للمفضلة"
              onClick={(e) => {
                e.preventDefault()
                // TODO: Implement favorites functionality
                console.log('Add to favorites:', property.id)
              }}
            >
              <Heart className="w-4 h-4" />
            </button>
          </div>

          {/* Price */}
          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-2 rounded-lg">
            <div className="text-amber-400 font-bold text-lg">
              {property.price.toLocaleString('ar-EG')} جنيه
            </div>
            <div className="text-gray-300 text-xs">
              {Math.round(property.price / property.area).toLocaleString('ar-EG')} جنيه / م²
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="p-5">
          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-amber-400 transition-colors leading-tight">
            {property.title_ar}
          </h3>

          {/* Location */}
          <div className="flex items-center text-gray-400 text-sm mb-4">
            <MapPin className="w-4 h-4 ml-1 flex-shrink-0" />
            <span className="line-clamp-1">{property.location_ar}</span>
          </div>

          {/* Property Specs */}
          <div className="grid grid-cols-3 gap-4 mb-4 py-3 border-t border-b border-gray-700">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Bed className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-white font-semibold text-sm">{property.bedrooms}</div>
                <div className="text-gray-400 text-xs">غرف نوم</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Bath className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-white font-semibold text-sm">{property.bathrooms}</div>
                <div className="text-gray-400 text-xs">حمام</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Square className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-white font-semibold text-sm">{property.area}</div>
                <div className="text-gray-400 text-xs">م²</div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-400 text-xs">
              {property.furnished && (
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs ml-2">
                  مفروش
                </span>
              )}
              {property.parking_spaces && property.parking_spaces > 0 && (
                <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs">
                  {property.parking_spaces} موقف
                </span>
              )}
            </div>

            <div className="text-gray-400 text-xs">
              {property.created_at ? new Date(property.created_at).toLocaleDateString('ar-EG', {
                year: 'numeric',
                month: 'short'
              }) : 'تاريخ غير محدد'}
            </div>
          </div>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />
      </Link>
    </motion.div>
  )
}