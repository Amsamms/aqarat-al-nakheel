'use client'

import { useState } from 'react'
import { User } from '@/types'
import { User as UserIcon, Mail, Phone, Save, Eye, EyeOff } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'

interface ProfileSettingsProps {
  user: User & { id: string; email: string }
}

export function ProfileSettings({ user }: ProfileSettingsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showPasswordSection, setShowPasswordSection] = useState(false)
  
  const [formData, setFormData] = useState({
    full_name: user.full_name || '',
    full_name_ar: user.full_name_ar || '',
    phone: user.phone || ''
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleSaveProfile = async () => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/profile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success('تم تحديث الملف الشخصي بنجاح')
        setIsEditing(false)
        // Refresh the page to show updated data
        window.location.reload()
      } else {
        throw new Error('فشل في تحديث الملف الشخصي')
      }
    } catch (error) {
      console.error('Profile update error:', error)
      toast.error('حدث خطأ في تحديث الملف الشخصي')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('كلمات المرور الجديدة غير متطابقة')
      return
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل')
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/profile/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(passwordData),
      })

      if (response.ok) {
        toast.success('تم تغيير كلمة المرور بنجاح')
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
        setShowPasswordSection(false)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'فشل في تغيير كلمة المرور')
      }
    } catch (error: unknown) {
      console.error('Password change error:', error)
      const errorMessage = error instanceof Error ? error.message : 'حدث خطأ في تغيير كلمة المرور'
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <UserIcon className="w-6 h-6 text-amber-400 ml-2" />
          الملف الشخصي
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">المعلومات الأساسية</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-amber-400 hover:text-amber-300 text-sm font-medium"
              >
                {isEditing ? 'إلغاء' : 'تعديل'}
              </button>
            </div>

            <div className="space-y-6">
              {/* Email (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-10 text-gray-400 cursor-not-allowed"
                    dir="ltr"
                  />
                </div>
                <p className="text-gray-500 text-xs mt-1">لا يمكن تغيير البريد الإلكتروني</p>
              </div>

              {/* Full Name Arabic */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  الاسم الكامل بالعربية
                </label>
                <div className="relative">
                  <UserIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="full_name_ar"
                    value={formData.full_name_ar}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full border rounded-lg px-4 py-3 pr-10 transition-colors ${
                      isEditing
                        ? 'bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent'
                        : 'bg-gray-800 border-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                    placeholder="ادخل اسمك الكامل بالعربية"
                  />
                </div>
              </div>

              {/* Full Name English */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  الاسم الكامل بالإنجليزية
                </label>
                <div className="relative">
                  <UserIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full border rounded-lg px-4 py-3 pr-10 transition-colors ${
                      isEditing
                        ? 'bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent'
                        : 'bg-gray-800 border-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                    placeholder="Enter your full name in English"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  رقم الهاتف
                </label>
                <div className="relative">
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full border rounded-lg px-4 py-3 pr-10 transition-colors ${
                      isEditing
                        ? 'bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent'
                        : 'bg-gray-800 border-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                    placeholder="+20 123 456 7890"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Save Button */}
              {isEditing && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleSaveProfile}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-black font-semibold py-3 px-6 rounded-lg hover:from-amber-500 hover:to-amber-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin w-5 h-5 border-2 border-black/30 border-t-black rounded-full ml-2"></div>
                      جاري الحفظ...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Save className="w-5 h-5 ml-2" />
                      حفظ التغييرات
                    </div>
                  )}
                </motion.button>
              )}
            </div>
          </div>

          {/* Password Change */}
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">تغيير كلمة المرور</h3>
              <button
                onClick={() => setShowPasswordSection(!showPasswordSection)}
                className="text-amber-400 hover:text-amber-300 text-sm font-medium flex items-center"
              >
                {showPasswordSection ? <EyeOff className="w-4 h-4 ml-1" /> : <Eye className="w-4 h-4 ml-1" />}
                {showPasswordSection ? 'إخفاء' : 'عرض'}
              </button>
            </div>

            {showPasswordSection && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    كلمة المرور الحالية
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    كلمة المرور الجديدة
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    minLength={6}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    تأكيد كلمة المرور الجديدة
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    dir="ltr"
                  />
                </div>

                <button
                  onClick={handleChangePassword}
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'جاري التحديث...' : 'تغيير كلمة المرور'}
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Account Info Sidebar */}
        <div className="space-y-6">
          {/* Account Stats */}
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">معلومات الحساب</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">الدور</span>
                <span className="text-white font-medium">
                  {user.role === 'user' ? 'مستخدم' : 
                   user.role === 'moderator' ? 'مشرف' : 
                   user.role === 'admin' ? 'مدير' : user.role}
                </span>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">تاريخ التسجيل</span>
                <span className="text-white font-medium">
                  {user.created_at ? new Date(user.created_at).toLocaleDateString('ar-EG', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'تاريخ غير محدد'}
                </span>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-400">آخر تحديث</span>
                <span className="text-white font-medium">
                  {user.updated_at ? new Date(user.updated_at).toLocaleDateString('ar-EG', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  }) : 'لا يتوفر'}
                </span>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">إدارة الحساب</h3>
            
            <form action="/auth/logout" method="post">
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                تسجيل الخروج
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}