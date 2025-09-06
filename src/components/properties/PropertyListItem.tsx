'use client'

import { Property } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import { Bed, Bath, Square, MapPin, Heart, Eye, Car, Building } from 'lucide-react'
import { motion } from 'framer-motion'

interface PropertyListItemProps {
  property: Property
}

export function PropertyListItem({ property }: PropertyListItemProps) {
  const propertyTypeMap = {
    apartment: 'شقة',
    villa: 'فيلا',
    studio: 'استوديو',
    penthouse: 'بنتهاوس',
    duplex: 'دوبلكس'
  }

  return (
    <motion.div
      whileHover={{ x: 5 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-900/50 rounded-xl overflow-hidden group hover:bg-gray-800/50 transition-all duration-300 border border-gray-800/50 hover:border-amber-400/20"
    >
      <Link href={`/properties/${property.id}`}>
        <div className="flex flex-col md:flex-row">
          {/* Property Image */}
          <div className="relative md:w-80 h-64 md:h-48 flex-shrink-0 overflow-hidden">
            <Image
              src={property.images?.[0] || '/placeholder-property.jpg'}
              alt={property.title_ar}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/40 via-transparent to-transparent" />
            
            {/* Badges */}
            <div className="absolute top-3 right-3 flex flex-col space-y-2">
              <div className="bg-amber-400 text-black px-2 py-1 rounded-lg text-xs font-semibold">
                {propertyTypeMap[property.property_type as keyof typeof propertyTypeMap] || property.property_type}
              </div>
              {property.featured && (
                <div className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                  مميز
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="absolute top-3 left-3 flex items-center space-x-2 rtl:space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

            {/* Image Counter */}
            {property.images && property.images.length > 1 && (
              <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded-lg text-xs">
                <Eye className="w-3 h-3 inline ml-1" />
                {property.images.length} صور
              </div>
            )}
          </div>

          {/* Property Details */}
          <div className="flex-1 p-5">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white font-bold text-xl group-hover:text-amber-400 transition-colors leading-tight flex-1">
                    {property.title_ar}
                  </h3>
                  <div className="text-left mr-4">
                    <div className="text-amber-400 font-bold text-xl">
                      {property.price.toLocaleString('ar-EG')} جنيه
                    </div>
                    <div className="text-gray-400 text-sm">
                      {Math.round(property.price / property.area).toLocaleString('ar-EG')} جنيه / م²
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center text-gray-400 text-sm mb-3">
                  <MapPin className="w-4 h-4 ml-1" />
                  <span>{property.location_ar}</span>
                </div>

                {/* Description */}
                {property.description_ar && (
                  <p className="text-gray-300 text-sm line-clamp-2 mb-4">
                    {property.description_ar}
                  </p>
                )}
              </div>

              {/* Property Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-300">
                  <div className="bg-amber-400/20 p-2 rounded-lg">
                    <Bed className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">{property.bedrooms}</div>
                    <div className="text-gray-400 text-xs">غرف نوم</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-300">
                  <div className="bg-amber-400/20 p-2 rounded-lg">
                    <Bath className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">{property.bathrooms}</div>
                    <div className="text-gray-400 text-xs">حمام</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-300">
                  <div className="bg-amber-400/20 p-2 rounded-lg">
                    <Square className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">{property.area}</div>
                    <div className="text-gray-400 text-xs">م²</div>
                  </div>
                </div>

                {property.parking_spaces && property.parking_spaces > 0 && (
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-300">
                    <div className="bg-amber-400/20 p-2 rounded-lg">
                      <Car className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{property.parking_spaces}</div>
                      <div className="text-gray-400 text-xs">موقف</div>
                    </div>
                  </div>
                )}

                {property.floor_number && (
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-300">
                    <div className="bg-amber-400/20 p-2 rounded-lg">
                      <Building className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">
                        {property.floor_number}
                        {property.total_floors && `/${property.total_floors}`}
                      </div>
                      <div className="text-gray-400 text-xs">طابق</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Amenities & Additional Info */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between mt-auto">
                <div className="flex flex-wrap gap-2 mb-3 md:mb-0">
                  {property.furnished && (
                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                      مفروش
                    </span>
                  )}
                  {property.amenities_ar && property.amenities_ar.slice(0, 3).map((amenity, index) => (
                    <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs">
                      {amenity}
                    </span>
                  ))}
                  {property.amenities_ar && property.amenities_ar.length > 3 && (
                    <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs">
                      +{property.amenities_ar.length - 3} المزيد
                    </span>
                  )}
                </div>

                <div className="text-gray-400 text-xs text-left">
                  {property.created_at ? new Date(property.created_at).toLocaleDateString('ar-EG', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'تاريخ غير محدد'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />
      </Link>
    </motion.div>
  )
}