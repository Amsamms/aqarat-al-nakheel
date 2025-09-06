'use client'

import { useState } from 'react'
import { User, UserFavorite, PropertyInquiry } from '@/types'
import { DashboardStats } from './DashboardStats'
import { FavoritesList } from './FavoritesList'
import { InquiriesList } from './InquiriesList'
import { ProfileSettings } from './ProfileSettings'
import { Heart, MessageCircle, User as UserIcon, BarChart3 } from 'lucide-react'

interface DashboardClientProps {
  user: User & { id: string; email: string }
  favorites: UserFavorite[]
  inquiries: PropertyInquiry[]
}

export function DashboardClient({ user, favorites, inquiries }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'favorites' | 'inquiries' | 'profile'>('overview')

  const tabs = [
    {
      id: 'overview' as const,
      name: 'نظرة عامة',
      icon: BarChart3,
      count: null
    },
    {
      id: 'favorites' as const,
      name: 'المفضلة',
      icon: Heart,
      count: favorites.length
    },
    {
      id: 'inquiries' as const,
      name: 'الاستفسارات',
      icon: MessageCircle,
      count: inquiries.length
    },
    {
      id: 'profile' as const,
      name: 'الملف الشخصي',
      icon: UserIcon,
      count: null
    }
  ]

  return (
    <div className="space-y-8">
      {/* Navigation Tabs */}
      <div className="border-b border-gray-800">
        <nav className="flex space-x-8 rtl:space-x-reverse">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                <Icon className="w-5 h-5 ml-2" />
                <span>{tab.name}</span>
                {tab.count !== null && tab.count > 0 && (
                  <span className="bg-amber-400 text-black text-xs rounded-full px-2 py-1 mr-2">
                    {tab.count}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === 'overview' && (
          <DashboardStats 
            user={user}
            favoritesCount={favorites.length}
            inquiriesCount={inquiries.length}
            recentFavorites={favorites.slice(0, 3)}
            recentInquiries={inquiries.slice(0, 3)}
          />
        )}
        
        {activeTab === 'favorites' && (
          <FavoritesList favorites={favorites} />
        )}
        
        {activeTab === 'inquiries' && (
          <InquiriesList inquiries={inquiries} />
        )}
        
        {activeTab === 'profile' && (
          <ProfileSettings user={user} />
        )}
      </div>
    </div>
  )
}