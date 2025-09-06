import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export default function PropertyNotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-amber-400/20 mb-4">404</div>
          <div className="relative">
            <div className="w-32 h-32 mx-auto bg-gray-900 rounded-full flex items-center justify-center mb-6">
              <Search className="w-16 h-16 text-gray-600" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xl font-bold transform rotate-12">
              ✕
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          العقار غير موجود
        </h1>
        
        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
          نعتذر، العقار الذي تبحث عنه غير موجود أو قد يكون تم حذفه أو نقله إلى موقع آخر.
          <br />
          يمكنك العودة إلى الصفحة الرئيسية أو تصفح العقارات المتاحة.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center bg-amber-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-amber-500 transition-colors"
          >
            <Home className="w-5 h-5 ml-2" />
            العودة للرئيسية
          </Link>
          
          <Link
            href="/properties"
            className="inline-flex items-center bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Search className="w-5 h-5 ml-2" />
            تصفح العقارات
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-4">
            هل تحتاج مساعدة؟
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            <div className="bg-gray-900/50 rounded-lg p-6">
              <h4 className="font-semibold text-white mb-2">تواصل معنا</h4>
              <p className="text-gray-400 text-sm mb-3">
                فريقنا جاهز لمساعدتك في العثور على العقار المناسب
              </p>
              <Link
                href="/contact"
                className="text-amber-400 hover:text-amber-300 transition-colors"
              >
                تواصل الآن →
              </Link>
            </div>
            
            <div className="bg-gray-900/50 rounded-lg p-6">
              <h4 className="font-semibold text-white mb-2">البحث المتقدم</h4>
              <p className="text-gray-400 text-sm mb-3">
                استخدم البحث المتقدم للعثور على العقارات بمواصفات محددة
              </p>
              <Link
                href="/properties?advanced=true"
                className="text-amber-400 hover:text-amber-300 transition-colors"
              >
                بحث متقدم →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}