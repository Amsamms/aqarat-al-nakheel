'use client'

import { useState } from 'react'
import { UserFavorite } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Bed, Bath, Square, MapPin, Trash2, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'

interface FavoritesListProps {
  favorites: UserFavorite[]
}

export function FavoritesList({ favorites: initialFavorites }: FavoritesListProps) {
  const [favorites, setFavorites] = useState(initialFavorites)
  const [removingId, setRemovingId] = useState<string | null>(null)

  const handleRemoveFavorite = async (favoriteId: string) => {
    setRemovingId(favoriteId)
    
    try {
      const response = await fetch('/api/favorites/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ favoriteId }),
      })

      if (response.ok) {
        setFavorites(prev => prev.filter(fav => fav.id !== favoriteId))
        toast.success('تم إزالة العقار من المفضلة')
      } else {
        throw new Error('فشل في إزالة العقار')
      }
    } catch (error) {
      console.error('Error removing favorite:', error)
      toast.error('حدث خطأ في إزالة العقار من المفضلة')
    } finally {
      setRemovingId(null)
    }
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-6">
          <Heart className="w-12 h-12 text-gray-600" />
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-2">
          لا توجد عقارات مفضلة
        </h3>
        
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          ابدأ في إضافة العقارات التي تهمك إلى قائمة المفضلة لسهولة الوصول إليها لاحقاً
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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Heart className="w-6 h-6 text-red-400 ml-2" />
          العقارات المفضلة ({favorites.length})
        </h2>
        
        <div className="text-gray-400 text-sm">
          آخر تحديث: {new Date().toLocaleDateString('ar-EG')}
        </div>
      </div>

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatePresence>
          {favorites.map((favorite, index) => (
            <motion.div
              key={favorite.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 group"
            >
              <div className="flex">
                {/* Property Image */}
                <div className="relative w-48 h-40 flex-shrink-0">
                  <Link href={`/properties/${favorite.property_id}`}>
                    <Image
                      src={favorite.properties?.images?.[0] || '/placeholder-property.jpg'}
                      alt={favorite.properties?.title_ar || ''}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveFavorite(favorite.id)}
                    disabled={removingId === favorite.id}
                    className="absolute top-3 left-3 bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all disabled:opacity-50"
                    title="إزالة من المفضلة"
                  >
                    {removingId === favorite.id ? (
                      <div className="animate-spin w-4 h-4 border border-white/30 border-t-white rounded-full" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Property Details */}
                <div className="flex-1 p-5">
                  <Link href={`/properties/${favorite.property_id}`} className="block">
                    <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-amber-400 transition-colors">
                      {favorite.properties?.title_ar}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center text-gray-400 text-sm mb-3">
                      <MapPin className="w-4 h-4 ml-1" />
                      <span>{favorite.properties?.location_ar}</span>
                    </div>

                    {/* Price */}
                    <div className="text-amber-400 font-bold text-xl mb-3">
                      {favorite.properties?.price?.toLocaleString('ar-EG')} جنيه
                    </div>

                    {/* Property Specs */}
                    <div className="flex items-center space-x-4 rtl:space-x-reverse text-gray-300 text-sm mb-3">
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 ml-1" />
                        <span>{favorite.properties?.bedrooms}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 ml-1" />
                        <span>{favorite.properties?.bathrooms}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Square className="w-4 h-4 ml-1" />
                        <span>{favorite.properties?.area} م²</span>
                      </div>
                    </div>

                    {/* Added Date */}
                    <div className="text-gray-500 text-xs">
                      أُضيف في {favorite.created_at ? new Date(favorite.created_at).toLocaleDateString('ar-EG', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'تاريخ غير محدد'}
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="text-center pt-8 border-t border-gray-800">
        <p className="text-gray-400 mb-4">
          هل تبحث عن المزيد من العقارات؟
        </p>
        <Link
          href="/properties"
          className="inline-flex items-center bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <span>تصفح جميع العقارات</span>
          <ExternalLink className="w-5 h-5 mr-2" />
        </Link>
      </div>
    </div>
  )
}