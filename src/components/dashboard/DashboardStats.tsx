'use client'

import { User, UserFavorite, PropertyInquiry } from '@/types'
import { Heart, MessageCircle, Calendar, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface DashboardStatsProps {
  user: User & { id: string; email: string }
  favoritesCount: number
  inquiriesCount: number
  recentFavorites: UserFavorite[]
  recentInquiries: PropertyInquiry[]
}

export function DashboardStats({ 
  user, 
  favoritesCount, 
  inquiriesCount, 
  recentFavorites, 
  recentInquiries 
}: DashboardStatsProps) {
  
  const stats = [
    {
      name: 'العقارات المفضلة',
      value: favoritesCount,
      icon: Heart,
      color: 'text-red-400',
      bgColor: 'bg-red-400/20',
      href: '#',
      onClick: () => window.dispatchEvent(new CustomEvent('dashboard-tab-change', { detail: 'favorites' }))
    },
    {
      name: 'الاستفسارات المرسلة',
      value: inquiriesCount,
      icon: MessageCircle,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/20',
      href: '#',
      onClick: () => window.dispatchEvent(new CustomEvent('dashboard-tab-change', { detail: 'inquiries' }))
    },
    {
      name: 'مدة العضوية',
      value: user.created_at ? Math.ceil((Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24)) : 0,
      icon: Calendar,
      color: 'text-green-400',
      bgColor: 'bg-green-400/20',
      suffix: 'يوم'
    },
    {
      name: 'نشاط الحساب',
      value: Math.min(100, Math.round(((favoritesCount * 10) + (inquiriesCount * 5)) / 2)),
      icon: TrendingUp,
      color: 'text-amber-400',
      bgColor: 'bg-amber-400/20',
      suffix: '%'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-amber-400/20 to-amber-600/20 rounded-xl p-6 border border-amber-400/30">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              مرحباً بعودتك! 👋
            </h2>
            <p className="text-gray-300">
              إليك ملخص لنشاطك على المنصة
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-right text-gray-300">
              <div className="text-sm">آخر زيارة</div>
              <div className="font-semibold">
                {new Date().toLocaleDateString('ar-EG')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors ${
                stat.onClick ? 'cursor-pointer' : ''
              }`}
              onClick={stat.onClick}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                {stat.onClick && (
                  <button className="text-gray-400 hover:text-white text-sm">
                    عرض الكل →
                  </button>
                )}
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-white">
                  {stat.value.toLocaleString('ar-EG')}{stat.suffix && ' ' + stat.suffix}
                </div>
                <div className="text-sm text-gray-400">{stat.name}</div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Favorites */}
        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <Heart className="w-5 h-5 text-red-400 ml-2" />
              العقارات المفضلة الحديثة
            </h3>
            {favoritesCount > 3 && (
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('dashboard-tab-change', { detail: 'favorites' }))}
                className="text-amber-400 hover:text-amber-300 text-sm"
              >
                عرض الكل ({favoritesCount})
              </button>
            )}
          </div>
          
          {recentFavorites.length > 0 ? (
            <div className="space-y-4">
              {recentFavorites.map((favorite) => (
                <Link 
                  key={favorite.id} 
                  href={`/properties/${favorite.property_id}`}
                  className="flex items-center space-x-4 rtl:space-x-reverse p-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={favorite.properties?.images?.[0] || '/placeholder-property.jpg'}
                      alt={favorite.properties?.title_ar || ''}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium line-clamp-1">
                      {favorite.properties?.title_ar || 'عقار غير متاح'}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {favorite.properties?.price?.toLocaleString('ar-EG') || 'السعر غير محدد'} جنيه
                    </p>
                  </div>
                  <div className="text-gray-500 text-xs">
                    {favorite.created_at ? new Date(favorite.created_at).toLocaleDateString('ar-EG', { 
                      month: 'short', 
                      day: 'numeric' 
                    }) : 'تاريخ غير محدد'}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <Heart className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>لم تضف أي عقارات للمفضلة بعد</p>
              <Link href="/properties" className="text-amber-400 hover:text-amber-300 mt-2 inline-block">
                تصفح العقارات
              </Link>
            </div>
          )}
        </div>

        {/* Recent Inquiries */}
        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <MessageCircle className="w-5 h-5 text-blue-400 ml-2" />
              الاستفسارات الحديثة
            </h3>
            {inquiriesCount > 3 && (
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('dashboard-tab-change', { detail: 'inquiries' }))}
                className="text-amber-400 hover:text-amber-300 text-sm"
              >
                عرض الكل ({inquiriesCount})
              </button>
            )}
          </div>
          
          {recentInquiries.length > 0 ? (
            <div className="space-y-4">
              {recentInquiries.map((inquiry) => (
                <div 
                  key={inquiry.id}
                  className="p-3 rounded-lg bg-gray-800/50 border border-gray-700"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white font-medium line-clamp-1 flex-1">
                      {inquiry.properties?.title_ar}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      inquiry.status === 'new' ? 'bg-blue-500/20 text-blue-400' :
                      inquiry.status === 'contacted' ? 'bg-yellow-500/20 text-yellow-400' :
                      inquiry.status === 'resolved' ? 'bg-green-500/20 text-green-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {inquiry.status === 'new' ? 'جديد' :
                       inquiry.status === 'contacted' ? 'تم التواصل' :
                       inquiry.status === 'resolved' ? 'تم الحل' : 'مغلق'}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-2">
                    {inquiry.message}
                  </p>
                  <div className="text-gray-500 text-xs">
                    {new Date(inquiry.created_at).toLocaleDateString('ar-EG', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>لم ترسل أي استفسارات بعد</p>
              <Link href="/properties" className="text-amber-400 hover:text-amber-300 mt-2 inline-block">
                تصفح العقارات وأرسل استفساراً
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}