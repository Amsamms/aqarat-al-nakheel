'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Bed, 
  Bath, 
  Square, 
  MapPin, 
  Heart, 
  Share2,
  Eye,
  ArrowRight,
  Star
} from 'lucide-react'
import Image from 'next/image'

const FeaturedProperties = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  
  const filters = [
    { id: 'all', label: 'الكل' },
    { id: 'apartment', label: 'شقق' },
    { id: 'villa', label: 'فيلات' },
    { id: 'studio', label: 'استوديو' },
    { id: 'penthouse', label: 'بنتهاوس' },
  ]

  // Mock property data - in real app this would come from Supabase
  const properties = [
    {
      id: '1',
      title: 'شقة مميزة بإطلالة بحرية',
      title_ar: 'شقة مميزة بإطلالة بحرية',
      price: 2500000,
      location: 'شاطئ النخيل',
      location_ar: 'شاطئ النخيل',
      area: 120,
      bedrooms: 3,
      bathrooms: 2,
      property_type: 'apartment',
      images: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'
      ],
      featured: true,
      rating: 4.8,
      amenities: ['مسبح', 'جيم', 'أمن 24/7']
    },
    {
      id: '2',
      title: 'فيلا فاخرة في العجمي',
      title_ar: 'فيلا فاخرة في العجمي',
      price: 5500000,
      location: 'العجمي',
      location_ar: 'العجمي',
      area: 300,
      bedrooms: 4,
      bathrooms: 3,
      property_type: 'villa',
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
      ],
      featured: true,
      rating: 4.9,
      amenities: ['حديقة', 'جراج', 'مدفأة']
    },
    {
      id: '3',
      title: 'استوديو عصري ومفروش',
      title_ar: 'استوديو عصري ومفروش',
      price: 1200000,
      location: 'شاطئ النخيل',
      location_ar: 'شاطئ النخيل',
      area: 50,
      bedrooms: 1,
      bathrooms: 1,
      property_type: 'studio',
      images: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
      ],
      featured: true,
      rating: 4.7,
      amenities: ['مفروش', 'بلكونة', 'مكيف']
    },
    {
      id: '4',
      title: 'بنتهاوس بإطلالة خلابة',
      title_ar: 'بنتهاوس بإطلالة خلابة',
      price: 8500000,
      location: 'العجمي',
      location_ar: 'العجمي',
      area: 250,
      bedrooms: 3,
      bathrooms: 3,
      property_type: 'penthouse',
      images: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80'
      ],
      featured: true,
      rating: 5.0,
      amenities: ['تراس', 'جاكوزي', 'مصعد خاص']
    }
  ]

  const filteredProperties = activeFilter === 'all' 
    ? properties 
    : properties.filter(p => p.property_type === activeFilter)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-600 font-semibold text-sm tracking-wide uppercase">
            العقارات المميزة
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            اكتشف أفضل العقارات
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            مجموعة مختارة بعناية من أجمل وأفضل العقارات في شاطئ النخيل والعجمي
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Properties Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          layout
        >
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              layout
            >
              {/* Property Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={property.images[0]}
                  alt={property.title_ar}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4 space-x-reverse">
                  <button className="p-3 bg-white/90 rounded-full hover:bg-white transition-colors">
                    <Eye className="w-5 h-5 text-gray-700" />
                  </button>
                  <button className="p-3 bg-white/90 rounded-full hover:bg-white transition-colors">
                    <Heart className="w-5 h-5 text-red-500" />
                  </button>
                  <button className="p-3 bg-white/90 rounded-full hover:bg-white transition-colors">
                    <Share2 className="w-5 h-5 text-gray-700" />
                  </button>
                </div>

                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {formatPrice(property.price)}
                </div>

                {/* Rating */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1 space-x-reverse">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{property.rating}</span>
                </div>
              </div>

              {/* Property Details */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {property.title_ar}
                </h3>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 ml-1" />
                  <span className="text-sm">{property.location_ar}</span>
                </div>

                {/* Property Stats */}
                <div className="flex items-center justify-between text-gray-600 mb-4">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Bed className="w-4 h-4" />
                    <span className="text-sm">{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Bath className="w-4 h-4" />
                    <span className="text-sm">{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Square className="w-4 h-4" />
                    <span className="text-sm">{property.area}م²</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {property.amenities.slice(0, 2).map((amenity, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                  {property.amenities.length > 2 && (
                    <span className="text-xs text-gray-500">
                      +{property.amenities.length - 2} المزيد
                    </span>
                  )}
                </div>

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 flex items-center justify-center space-x-2 space-x-reverse font-medium">
                  <span>عرض التفاصيل</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <button className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center space-x-2 space-x-reverse mx-auto">
            <span>عرض جميع العقارات</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedProperties