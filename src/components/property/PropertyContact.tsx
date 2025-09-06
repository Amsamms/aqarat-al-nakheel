'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MessageCircle, Send, User, Building } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface PropertyContactProps {
  propertyId: string
}

interface FormData {
  name: string
  email: string
  phone: string
  message: string
  inquiry_type: 'general' | 'viewing' | 'price' | 'availability'
}

export function PropertyContact({ propertyId }: PropertyContactProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    inquiry_type: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/property-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          property_id: propertyId
        }),
      })

      if (response.ok) {
        toast.success('تم إرسال استفسارك بنجاح! سنتواصل معك قريباً')
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          inquiry_type: 'general'
        })
      } else {
        throw new Error('فشل في الإرسال')
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error)
      toast.error('حدث خطأ في إرسال الاستفسار. يرجى المحاولة مرة أخرى')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const inquiryTypes = {
    general: 'استفسار عام',
    viewing: 'طلب معاينة',
    price: 'استفسار عن السعر',
    availability: 'استفسار عن التوفر'
  }

  return (
    <div className="sticky top-8">
      {/* Contact Info Card */}
      <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl p-6 mb-6 text-black">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Building className="w-6 h-6 ml-2" />
          تواصل معنا
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <Phone className="w-5 h-5 ml-3 text-black/70" />
            <div>
              <div className="font-semibold">هاتف</div>
              <a href="tel:+201234567890" className="text-sm hover:underline">
                +20 123 456 7890
              </a>
            </div>
          </div>
          
          <div className="flex items-center">
            <Mail className="w-5 h-5 ml-3 text-black/70" />
            <div>
              <div className="font-semibold">إيميل</div>
              <a href="mailto:info@3aqarat-alnakheel.com" className="text-sm hover:underline">
                info@3aqarat-alnakheel.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-gray-900/50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <MessageCircle className="w-6 h-6 ml-2 text-amber-400" />
          استفسار عن العقار
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              الاسم الكامل *
            </label>
            <div className="relative">
              <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-10 text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                placeholder="اكتب اسمك الكامل"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              البريد الإلكتروني *
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
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-10 text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                placeholder="example@email.com"
              />
            </div>
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
              رقم الهاتف
            </label>
            <div className="relative">
              <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-10 text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                placeholder="+20 123 456 7890"
              />
            </div>
          </div>

          {/* Inquiry Type */}
          <div>
            <label htmlFor="inquiry_type" className="block text-sm font-medium text-gray-300 mb-2">
              نوع الاستفسار
            </label>
            <select
              id="inquiry_type"
              name="inquiry_type"
              value={formData.inquiry_type}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            >
              {Object.entries(inquiryTypes).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              الرسالة *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
              placeholder="اكتب استفسارك أو رسالتك هنا..."
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-black font-semibold py-3 px-6 rounded-lg hover:from-amber-500 hover:to-amber-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin w-5 h-5 border-2 border-black/30 border-t-black rounded-full ml-2"></div>
                جاري الإرسال...
              </div>
            ) : (
              <div className="flex items-center">
                <Send className="w-5 h-5 ml-2" />
                إرسال الاستفسار
              </div>
            )}
          </motion.button>
        </form>

        <div className="mt-4 text-xs text-gray-400 text-center">
          سنتواصل معك خلال 24 ساعة من استلام استفسارك
        </div>
      </div>
    </div>
  )
}