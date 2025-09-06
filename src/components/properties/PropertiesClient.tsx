'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Property } from '@/types'
import { PropertyCard } from './PropertyCard'
import { PropertyListItem } from './PropertyListItem'
import { Pagination } from './Pagination'
import { Grid, List } from 'lucide-react'
import { motion } from 'framer-motion'

interface PropertiesClientProps {
  properties: Property[]
  totalCount: number
  currentPage: number
  totalPages: number
  currentSort: string
  currentView: string
  searchTerm?: string
}

export function PropertiesClient({
  properties,
  totalCount,
  currentPage,
  totalPages,
  currentSort,
  currentView,
  searchTerm
}: PropertiesClientProps) {
  const router = useRouter()
  const [view, setView] = useState<'grid' | 'list'>(currentView as 'grid' | 'list')

  const sortOptions = [
    { value: 'featured', label: 'المميزة أولاً' },
    { value: 'newest', label: 'الأحدث' },
    { value: 'oldest', label: 'الأقدم' },
    { value: 'price_asc', label: 'السعر: من الأقل للأعلى' },
    { value: 'price_desc', label: 'السعر: من الأعلى للأقل' },
    { value: 'area_asc', label: 'المساحة: من الأصغر للأكبر' },
    { value: 'area_desc', label: 'المساحة: من الأكبر للأصغر' }
  ]

  const handleSortChange = (newSort: string) => {
    const url = new URL(window.location.href)
    url.searchParams.set('sort', newSort)
    url.searchParams.delete('page') // Reset to first page when sorting
    router.push(url.toString())
  }

  const handleViewChange = (newView: 'grid' | 'list') => {
    setView(newView)
    const url = new URL(window.location.href)
    url.searchParams.set('view', newView)
    router.push(url.toString())
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="text-white">
            <span className="font-semibold">{totalCount.toLocaleString('ar-EG')}</span>
            <span className="text-gray-400 mr-2">عقار متاح</span>
            {searchTerm && (
              <span className="text-gray-400 mr-2">
                - البحث عن &ldquo;{searchTerm}&rdquo;
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <label className="text-gray-400 text-sm whitespace-nowrap">ترتيب حسب:</label>
            <select
              value={currentSort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => handleViewChange('grid')}
              className={`p-2 rounded-md transition-colors ${
                view === 'grid'
                  ? 'bg-amber-400 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
              aria-label="عرض الشبكة"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleViewChange('list')}
              className={`p-2 rounded-md transition-colors ${
                view === 'list'
                  ? 'bg-amber-400 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
              aria-label="عرض القائمة"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Properties Grid/List */}
      {properties.length > 0 ? (
        <>
          {view === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {properties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PropertyListItem property={property} />
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalCount={totalCount}
              />
            </div>
          )}
        </>
      ) : (
        /* No Results */
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-2">
            لا توجد عقارات متطابقة
          </h3>
          
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            {searchTerm 
              ? `لم نعثر على أي عقارات تطابق البحث "${searchTerm}". جرب تعديل معايير البحث.`
              : 'لم نعثر على أي عقارات تطابق المعايير المحددة. جرب تعديل الفلاتر.'
            }
          </p>

          <div className="space-y-4">
            <button
              onClick={() => {
                const url = new URL(window.location.href)
                url.searchParams.delete('search')
                Object.keys(Object.fromEntries(url.searchParams)).forEach(key => {
                  if (key !== 'view') {
                    url.searchParams.delete(key)
                  }
                })
                router.push(url.toString())
              }}
              className="bg-amber-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-amber-500 transition-colors"
            >
              إزالة جميع الفلاتر
            </button>
            
            <div className="text-gray-500">
              أو <Link href="/properties" className="text-amber-400 hover:text-amber-300">تصفح جميع العقارات</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}