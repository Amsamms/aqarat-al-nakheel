'use client'

import Link from 'next/link'
import { useState } from 'react'
import { 
  Home, 
  Building, 
  Phone, 
  Info, 
  User, 
  Menu, 
  X,
  Search,
  Heart
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigationLinks = [
    { href: '/', label: 'الرئيسية', icon: Home },
    { href: '/properties', label: 'العقارات', icon: Building },
    { href: '/about', label: 'من نحن', icon: Info },
    { href: '/contact', label: 'اتصل بنا', icon: Phone },
  ]

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <h1 className="text-xl font-bold text-gray-900">عقارات النخيل</h1>
                <p className="text-xs text-gray-600">شاطئ النخيل - العجمي</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="mr-10 flex items-baseline space-x-4 space-x-reverse">
              {navigationLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center space-x-1 space-x-reverse px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <Link
              href="/auth/login"
              className="flex items-center space-x-1 space-x-reverse bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              <User className="w-4 h-4" />
              <span>تسجيل الدخول</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-2">
              {navigationLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200"
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                )
              })}
              
              {/* Mobile Action Buttons */}
              <div className="pt-4 space-y-2">
                <button className="w-full flex items-center justify-center space-x-2 space-x-reverse px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                  <Search className="w-5 h-5" />
                  <span>البحث</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 space-x-reverse px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span>المفضلة</span>
                </button>
                <Link
                  href="/auth/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full flex items-center justify-center space-x-2 space-x-reverse bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  <User className="w-5 h-5" />
                  <span>تسجيل الدخول</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navigation