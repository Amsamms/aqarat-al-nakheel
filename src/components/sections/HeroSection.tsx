'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Home, Star } from 'lucide-react'
import Image from 'next/image'

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const heroImages = [
    '/images/hero/alex-beach-1.jpg',
    '/images/hero/alex-beach-2.jpg',
    '/images/hero/alex-beach-3.jpg',
  ]

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroImages.length])

  const searchOptions = {
    propertyTypes: [
      { value: '', label: 'نوع العقار' },
      { value: 'apartment', label: 'شقة' },
      { value: 'villa', label: 'فيلا' },
      { value: 'studio', label: 'استوديو' },
      { value: 'penthouse', label: 'بنتهاوس' },
    ],
    locations: [
      { value: '', label: 'الموقع' },
      { value: 'shate2-nakheel', label: 'شاطئ النخيل' },
      { value: 'agamy', label: 'العجمي' },
      { value: 'marina', label: 'مارينا' },
    ],
    bedrooms: [
      { value: '', label: 'غرف النوم' },
      { value: '1', label: 'غرفة واحدة' },
      { value: '2', label: 'غرفتان' },
      { value: '3', label: 'ثلاث غرف' },
      { value: '4+', label: '4+ غرف' },
    ]
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === index ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1920&q=80')`
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-10">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-32 right-16 w-32 h-32 bg-yellow-500/20 rounded-full blur-xl"
          animate={{
            y: [0, 20, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main Heading */}
          <div className="space-y-4">
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              اكتشف منزل
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                أحلامك
              </span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              في شاطئ النخيل والعجمي، الإسكندرية - أفضل العقارات بأسعار تنافسية وخدمة متميزة
            </motion.p>
          </div>

          {/* Stats */}
          <motion.div
            className="flex justify-center items-center space-x-8 space-x-reverse text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">500+</div>
              <div className="text-sm text-gray-300">عقار متاح</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">1000+</div>
              <div className="text-sm text-gray-300">عميل راضٍ</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">10+</div>
              <div className="text-sm text-gray-300">سنوات خبرة</div>
            </div>
          </motion.div>

          {/* Search Form */}
          <motion.div
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Property Type */}
              <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700">
                {searchOptions.propertyTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>

              {/* Location */}
              <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700">
                {searchOptions.locations.map((location) => (
                  <option key={location.value} value={location.value}>
                    {location.label}
                  </option>
                ))}
              </select>

              {/* Bedrooms */}
              <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700">
                {searchOptions.bedrooms.map((bedroom) => (
                  <option key={bedroom.value} value={bedroom.value}>
                    {bedroom.label}
                  </option>
                ))}
              </select>

              {/* Search Button */}
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 flex items-center justify-center space-x-2 space-x-reverse font-semibold shadow-lg">
                <Search className="w-5 h-5" />
                <span>ابحث الآن</span>
              </button>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg flex items-center space-x-2 space-x-reverse">
              <Home className="w-5 h-5" />
              <span>تصفح العقارات</span>
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center space-x-2 space-x-reverse">
              <MapPin className="w-5 h-5" />
              <span>اتصل بنا</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 space-x-reverse">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSection