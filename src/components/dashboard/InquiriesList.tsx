'use client'

import { useState } from 'react'
import { PropertyInquiry } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle, Calendar, ExternalLink, Filter, Mail, Phone, Eye } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface InquiriesListProps {
  inquiries: PropertyInquiry[]
}

export function InquiriesList({ inquiries }: InquiriesListProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')

  const statusOptions = [
    { value: 'all', label: 'جميع الحالات', count: inquiries.length },
    { value: 'new', label: 'جديد', count: inquiries.filter(i => i.status === 'new').length },
    { value: 'contacted', label: 'تم التواصل', count: inquiries.filter(i => i.status === 'contacted').length },
    { value: 'resolved', label: 'تم الحل', count: inquiries.filter(i => i.status === 'resolved').length },
    { value: 'closed', label: 'مغلق', count: inquiries.filter(i => i.status === 'closed').length },
  ]

  const typeOptions = [
    { value: 'all', label: 'جميع الأنواع' },
    { value: 'general', label: 'استفسار عام' },
    { value: 'viewing', label: 'طلب معاينة' },
    { value: 'price', label: 'استفسار عن السعر' },
    { value: 'availability', label: 'استفسار عن التوفر' },
  ]

  const filteredInquiries = inquiries.filter(inquiry => {
    const statusMatch = selectedStatus === 'all' || inquiry.status === selectedStatus
    const typeMatch = selectedType === 'all' || inquiry.inquiry_type === selectedType
    return statusMatch && typeMatch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'contacted':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'resolved':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'closed':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'جديد'
      case 'contacted': return 'تم التواصل'
      case 'resolved': return 'تم الحل'
      case 'closed': return 'مغلق'
      default: return status
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case 'general': return 'استفسار عام'
      case 'viewing': return 'طلب معاينة'
      case 'price': return 'استفسار عن السعر'
      case 'availability': return 'استفسار عن التوفر'
      default: return type
    }
  }

  if (inquiries.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-6">
          <MessageCircle className="w-12 h-12 text-gray-600" />
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-2">
          لا توجد استفسارات
        </h3>
        
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          لم ترسل أي استفسارات بعد. ابدأ في تصفح العقارات وأرسل استفساراتك
        </p>

        <Link
          href="/properties"
          className="inline-flex items-center bg-amber-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-amber-500 transition-colors"
        >
          <span>تصفح العقارات</span>
          <ExternalLink className="w-5 h-5 mr-2" />
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <MessageCircle className="w-6 h-6 text-blue-400 ml-2" />
          استفساراتي ({inquiries.length})
        </h2>
        
        <div className="text-gray-400 text-sm">
          آخر تحديث: {new Date().toLocaleDateString('ar-EG')}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
        <div className="flex items-center mb-4">
          <Filter className="w-5 h-5 text-gray-400 ml-2" />
          <span className="text-white font-medium">تصفية النتائج</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              الحالة
            </label>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              {statusOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setSelectedStatus(option.value)}
                  className={`text-sm p-3 rounded-lg border transition-colors ${
                    selectedStatus === option.value
                      ? 'bg-amber-400/20 text-amber-400 border-amber-400/50'
                      : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'
                  }`}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs opacity-75">({option.count})</div>
                </button>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              نوع الاستفسار
            </label>
            <div className="grid grid-cols-1 gap-2">
              {typeOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setSelectedType(option.value)}
                  className={`text-sm p-3 rounded-lg border transition-colors text-right ${
                    selectedType === option.value
                      ? 'bg-amber-400/20 text-amber-400 border-amber-400/50'
                      : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredInquiries.map((inquiry, index) => (
            <motion.div
              key={inquiry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Property Info */}
                {inquiry.properties && (
                  <div className="lg:w-80 flex-shrink-0">
                    <Link 
                      href={`/properties/${inquiry.property_id}`}
                      className="flex items-center space-x-4 rtl:space-x-reverse group"
                    >
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={inquiry.properties.images?.[0] || '/placeholder-property.jpg'}
                          alt={inquiry.properties.title_ar}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium line-clamp-2 group-hover:text-amber-400 transition-colors">
                          {inquiry.properties.title_ar}
                        </h3>
                        <div className="flex items-center text-gray-400 text-sm mt-1">
                          <ExternalLink className="w-3 h-3 ml-1" />
                          <span>عرض العقار</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                )}

                {/* Inquiry Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(inquiry.status)}`}>
                        {getStatusText(inquiry.status)}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {getTypeText(inquiry.inquiry_type)}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar className="w-4 h-4 ml-1" />
                      <span>
                        {new Date(inquiry.created_at).toLocaleDateString('ar-EG', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center text-gray-300">
                      <Mail className="w-4 h-4 ml-2 text-blue-400" />
                      <span>{inquiry.email}</span>
                    </div>
                    {inquiry.phone && (
                      <div className="flex items-center text-gray-300">
                        <Phone className="w-4 h-4 ml-2 text-green-400" />
                        <span>{inquiry.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Message */}
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <p className="text-gray-300 leading-relaxed">
                      {inquiry.message}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* No Results */}
      {filteredInquiries.length === 0 && inquiries.length > 0 && (
        <div className="text-center py-8 text-gray-400">
          <Eye className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>لا توجد استفسارات مطابقة للفلاتر المحددة</p>
          <button
            onClick={() => {
              setSelectedStatus('all')
              setSelectedType('all')
            }}
            className="text-amber-400 hover:text-amber-300 mt-2 inline-block"
          >
            إزالة جميع الفلاتر
          </button>
        </div>
      )}
    </div>
  )
}