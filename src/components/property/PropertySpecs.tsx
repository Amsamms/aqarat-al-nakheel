'use client'

import { Property } from '@/types'
import { Bed, Bath, Square, Car, Building, MapPin } from 'lucide-react'

interface PropertySpecsProps {
  property: Property
}

export function PropertySpecs({ property }: PropertySpecsProps) {
  const propertyTypeMap = {
    apartment: 'شقة',
    villa: 'فيلا',
    studio: 'استوديو',
    penthouse: 'بنتهاوس',
    duplex: 'دوبلكس'
  }

  const specs = [
    {
      icon: Square,
      label: 'المساحة',
      value: `${property.area} م²`
    },
    {
      icon: Bed,
      label: 'غرف النوم',
      value: property.bedrooms.toString()
    },
    {
      icon: Bath,
      label: 'دورات المياه',
      value: property.bathrooms.toString()
    },
    {
      icon: Car,
      label: 'مواقف السيارات',
      value: (property.parking_spaces || 0).toString()
    }
  ]

  if (property.floor_number && property.total_floors) {
    specs.push({
      icon: Building,
      label: 'الطابق',
      value: `${property.floor_number} من ${property.total_floors}`
    })
  }

  return (
    <div className="bg-gray-900/50 rounded-xl p-8 mb-8">
      <h3 className="text-2xl font-bold text-white mb-6">مواصفات العقار</h3>
      
      {/* Property Type and Status */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
          <div className="text-amber-400 text-sm font-medium mb-1">نوع العقار</div>
          <div className="text-white font-semibold">{propertyTypeMap[property.property_type as keyof typeof propertyTypeMap] || property.property_type}</div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
          <div className="text-amber-400 text-sm font-medium mb-1">الحالة</div>
          <div className="text-green-400 font-semibold">
            {property.status === 'available' ? 'متاح' : 
             property.status === 'sold' ? 'تم البيع' : 
             property.status === 'rented' ? 'مؤجر' : 'مسودة'}
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
          <div className="text-amber-400 text-sm font-medium mb-1">التأثيث</div>
          <div className="text-white font-semibold">
            {property.furnished ? 'مفروش' : 'غير مفروش'}
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
          <div className="text-amber-400 text-sm font-medium mb-1">التقييم</div>
          <div className="text-white font-semibold flex items-center justify-center">
            <span className="ml-1">{(property.rating || 0).toFixed(1)}</span>
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Specs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {specs.map((spec, index) => (
          <div key={index} className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="bg-amber-400/20 p-3 rounded-lg">
              <spec.icon className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="text-gray-400 text-sm">{spec.label}</div>
              <div className="text-white font-semibold text-lg">{spec.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Location Details */}
      <div className="mt-8 pt-8 border-t border-gray-700">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="bg-amber-400/20 p-3 rounded-lg">
            <MapPin className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="text-gray-400 text-sm">الموقع</div>
            <div className="text-white font-semibold text-lg">{property.location_ar}</div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      {(property.video_url || property.virtual_tour_url) && (
        <div className="mt-8 pt-8 border-t border-gray-700">
          <h4 className="text-lg font-semibold text-white mb-4">وسائط إضافية</h4>
          <div className="flex space-x-4 rtl:space-x-reverse">
            {property.video_url && (
              <a
                href={property.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 rtl:space-x-reverse bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
                <span>مشاهدة الفيديو</span>
              </a>
            )}
            
            {property.virtual_tour_url && (
              <a
                href={property.virtual_tour_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 rtl:space-x-reverse bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                <span>جولة افتراضية</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}