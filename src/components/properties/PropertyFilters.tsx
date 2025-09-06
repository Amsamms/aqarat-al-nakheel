'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SearchFilters } from '@/types'
import { Search, Filter, X, MapPin, Home, Bed, Bath, Square, DollarSign } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface PropertyFiltersProps {
  initialFilters: SearchFilters
}

export function PropertyFilters({ initialFilters }: PropertyFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  
  const [filters, setFilters] = useState<SearchFilters>(initialFilters)
  const [searchTerm, setSearchTerm] = useState(searchParams?.get('search') || '')

  const propertyTypes = [
    { value: 'apartment', label: 'شقة', icon: Home },
    { value: 'villa', label: 'فيلا', icon: Home },
    { value: 'studio', label: 'استوديو', icon: Home },
    { value: 'penthouse', label: 'بنتهاوس', icon: Home },
    { value: 'duplex', label: 'دوبلكس', icon: Home }
  ]

  const bedroomOptions = [1, 2, 3, 4, 5, 6]
  const bathroomOptions = [1, 2, 3, 4, 5]

  const priceRanges = [
    { min: 0, max: 1000000, label: 'أقل من مليون' },
    { min: 1000000, max: 2000000, label: '1 - 2 مليون' },
    { min: 2000000, max: 3000000, label: '2 - 3 مليون' },
    { min: 3000000, max: 5000000, label: '3 - 5 مليون' },
    { min: 5000000, max: 10000000, label: '5 - 10 مليون' },
    { min: 10000000, max: undefined, label: 'أكثر من 10 مليون' }
  ]

  const areaRanges = [
    { min: 0, max: 100, label: 'أقل من 100 م²' },
    { min: 100, max: 150, label: '100 - 150 م²' },
    { min: 150, max: 200, label: '150 - 200 م²' },
    { min: 200, max: 300, label: '200 - 300 م²' },
    { min: 300, max: 500, label: '300 - 500 م²' },
    { min: 500, max: undefined, label: 'أكثر من 500 م²' }
  ]

  const locations = [
    'شاطئ النخيل',
    'العجمي',
    'الإسكندرية',
    'سيدي عبد الرحمن',
    'الساحل الشمالي'
  ]

  useEffect(() => {
    setFilters(initialFilters)
  }, [initialFilters])

  const handleSearch = () => {
    const params = new URLSearchParams()
    
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim())
    }
    
    if (filters.property_type && filters.property_type.length > 0) {
      params.set('property_type', filters.property_type[0])
    }
    
    if (filters.min_price) {
      params.set('min_price', filters.min_price.toString())
    }
    
    if (filters.max_price) {
      params.set('max_price', filters.max_price.toString())
    }
    
    if (filters.bedrooms) {
      params.set('bedrooms', filters.bedrooms.toString())
    }
    
    if (filters.bathrooms) {
      params.set('bathrooms', filters.bathrooms.toString())
    }
    
    if (filters.min_area) {
      params.set('min_area', filters.min_area.toString())
    }
    
    if (filters.max_area) {
      params.set('max_area', filters.max_area.toString())
    }
    
    if (filters.location) {
      params.set('location', filters.location)
    }

    router.push(`/properties?${params.toString()}`)
  }

  const handleReset = () => {
    setFilters({})
    setSearchTerm('')
    router.push('/properties')
  }

  const handlePropertyTypeChange = (type: string) => {
    setFilters(prev => ({
      ...prev,
      property_type: prev.property_type?.includes(type) 
        ? prev.property_type.filter(t => t !== type)
        : [type]
    }))
  }

  const handlePriceRangeChange = (min: number, max?: number) => {
    setFilters(prev => ({
      ...prev,
      min_price: min,
      max_price: max
    }))
  }

  const handleAreaRangeChange = (min: number, max?: number) => {
    setFilters(prev => ({
      ...prev,
      min_area: min,
      max_area: max
    }))
  }

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== undefined && value !== '' && 
    (Array.isArray(value) ? value.length > 0 : true)
  ).length + (searchTerm ? 1 : 0)

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-gray-900 text-white p-4 rounded-xl flex items-center justify-between"
        >
          <div className="flex items-center">
            <Filter className="w-5 h-5 ml-2" />
            <span>الفلاتر والبحث</span>
            {activeFiltersCount > 0 && (
              <span className="bg-amber-400 text-black text-xs rounded-full px-2 py-1 mr-2">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </button>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {(isOpen || window.innerWidth >= 1024) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-900/50 rounded-xl p-6 space-y-6"
          >
            {/* Search Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                البحث
              </label>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ابحث عن العقارات..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-10 text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                نوع العقار
              </label>
              <div className="grid grid-cols-2 gap-2">
                {propertyTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => handlePropertyTypeChange(type.value)}
                    className={`flex items-center p-3 rounded-lg transition-colors ${
                      filters.property_type?.includes(type.value)
                        ? 'bg-amber-400 text-black'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <type.icon className="w-4 h-4 ml-2" />
                    <span className="text-sm">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                نطاق السعر
              </label>
              <div className="space-y-2">
                {priceRanges.map((range, index) => (
                  <button
                    key={index}
                    onClick={() => handlePriceRangeChange(range.min, range.max)}
                    className={`w-full text-right p-3 rounded-lg transition-colors ${
                      filters.min_price === range.min && filters.max_price === range.max
                        ? 'bg-amber-400 text-black'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 ml-2" />
                      <span className="text-sm">{range.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                غرف النوم (الحد الأدنى)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {bedroomOptions.map((num) => (
                  <button
                    key={num}
                    onClick={() => setFilters(prev => ({ ...prev, bedrooms: prev.bedrooms === num ? undefined : num }))}
                    className={`flex items-center justify-center p-3 rounded-lg transition-colors ${
                      filters.bedrooms === num
                        ? 'bg-amber-400 text-black'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <Bed className="w-4 h-4 ml-1" />
                    <span>{num}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                دورات المياه (الحد الأدنى)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {bathroomOptions.map((num) => (
                  <button
                    key={num}
                    onClick={() => setFilters(prev => ({ ...prev, bathrooms: prev.bathrooms === num ? undefined : num }))}
                    className={`flex items-center justify-center p-3 rounded-lg transition-colors ${
                      filters.bathrooms === num
                        ? 'bg-amber-400 text-black'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <Bath className="w-4 h-4 ml-1" />
                    <span>{num}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Area Range */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                المساحة
              </label>
              <div className="space-y-2">
                {areaRanges.map((range, index) => (
                  <button
                    key={index}
                    onClick={() => handleAreaRangeChange(range.min, range.max)}
                    className={`w-full text-right p-3 rounded-lg transition-colors ${
                      filters.min_area === range.min && filters.max_area === range.max
                        ? 'bg-amber-400 text-black'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <Square className="w-4 h-4 ml-2" />
                      <span className="text-sm">{range.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                الموقع
              </label>
              <div className="space-y-2">
                {locations.map((location) => (
                  <button
                    key={location}
                    onClick={() => setFilters(prev => ({ 
                      ...prev, 
                      location: prev.location === location ? undefined : location 
                    }))}
                    className={`w-full text-right p-3 rounded-lg transition-colors ${
                      filters.location === location
                        ? 'bg-amber-400 text-black'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 ml-2" />
                      <span className="text-sm">{location}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3 pt-4 border-t border-gray-700">
              <button
                onClick={handleSearch}
                className="w-full bg-amber-400 text-black font-semibold py-3 px-6 rounded-lg hover:bg-amber-500 transition-colors"
              >
                تطبيق الفلاتر
              </button>
              
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleReset}
                  className="w-full bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center"
                >
                  <X className="w-4 h-4 ml-2" />
                  مسح الفلاتر
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}