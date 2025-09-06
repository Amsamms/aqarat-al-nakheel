'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { Mail, Lock, User, Phone, Eye, EyeOff, UserPlus } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'

export function RegisterForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    fullNameAr: '',
    phone: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error('كلمات المرور غير متطابقة')
      setIsLoading(false)
      return
    }

    // Validate password length
    if (formData.password.length < 6) {
      toast.error('كلمة المرور يجب أن تكون 6 أحرف على الأقل')
      setIsLoading(false)
      return
    }

    try {
      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            full_name_ar: formData.fullNameAr,
            phone: formData.phone
          }
        }
      })

      if (error) {
        toast.error('خطأ في إنشاء الحساب: ' + (
          error.message === 'User already registered' 
            ? 'هذا البريد الإلكتروني مسجل مسبقاً'
            : error.message
        ))
        return
      }

      if (data.user) {
        // User registered successfully
        if (data.user.email_confirmed_at) {
          // Email is already confirmed, redirect to dashboard
          toast.success('تم إنشاء حسابك بنجاح!')
          router.push('/dashboard')
        } else {
          // Email confirmation required
          toast.success('تم إنشاء حسابك! يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب')
          router.push('/auth/login?message=تحقق من بريدك الإلكتروني لتأكيد حسابك')
        }
      }
    } catch (error) {
      console.error('Registration error:', error)
      toast.error('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى')
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name in Arabic */}
      <div>
        <label htmlFor="fullNameAr" className="block text-sm font-medium text-gray-300 mb-2">
          الاسم الكامل بالعربية
        </label>
        <div className="relative">
          <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            id="fullNameAr"
            name="fullNameAr"
            value={formData.fullNameAr}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-10 text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-colors"
            placeholder="ادخل اسمك الكامل بالعربية"
          />
        </div>
      </div>

      {/* Full Name in English */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
          الاسم الكامل بالإنجليزية
        </label>
        <div className="relative">
          <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-10 text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-colors"
            placeholder="Enter your full name in English"
            dir="ltr"
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
          رقم الهاتف (اختياري)
        </label>
        <div className="relative">
          <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-10 text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-colors"
            placeholder="+20 123 456 7890"
            dir="ltr"
          />
        </div>
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          البريد الإلكتروني
        </label>
        <div className="relative">
          <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-10 text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-colors"
            placeholder="ادخل بريدك الإلكتروني"
            dir="ltr"
          />
        </div>
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
          كلمة المرور
        </label>
        <div className="relative">
          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-10 pl-10 text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-colors"
            placeholder="ادخل كلمة المرور (6 أحرف على الأقل)"
            dir="ltr"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Confirm Password Field */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
          تأكيد كلمة المرور
        </label>
        <div className="relative">
          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-10 pl-10 text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-colors"
            placeholder="أعد كتابة كلمة المرور"
            dir="ltr"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-start">
        <input
          type="checkbox"
          id="terms"
          required
          className="mt-1 w-4 h-4 text-amber-600 bg-gray-800 border-gray-700 rounded focus:ring-amber-500 focus:ring-2"
        />
        <label htmlFor="terms" className="mr-2 text-sm text-gray-300">
          أوافق على{' '}
          <a href="/terms" className="text-amber-400 hover:text-amber-300">
            الشروط والأحكام
          </a>{' '}
          و{' '}
          <a href="/privacy" className="text-amber-400 hover:text-amber-300">
            سياسة الخصوصية
          </a>
        </label>
      </div>

      {/* Register Button */}
      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-black font-semibold py-3 px-6 rounded-lg hover:from-amber-500 hover:to-amber-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="animate-spin w-5 h-5 border-2 border-black/30 border-t-black rounded-full ml-2"></div>
            جاري إنشاء الحساب...
          </div>
        ) : (
          <div className="flex items-center">
            <UserPlus className="w-5 h-5 ml-2" />
            إنشاء حساب جديد
          </div>
        )}
      </motion.button>
    </form>
  )
}