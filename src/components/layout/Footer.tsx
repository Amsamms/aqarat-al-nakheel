import Link from 'next/link'
import { 
  Building, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter,
  Youtube
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: '/properties', label: 'العقارات' },
    { href: '/properties?type=apartment', label: 'الشقق' },
    { href: '/properties?type=villa', label: 'الفيلات' },
    { href: '/properties?type=studio', label: 'الاستوديوهات' },
  ]

  const supportLinks = [
    { href: '/about', label: 'من نحن' },
    { href: '/contact', label: 'اتصل بنا' },
    { href: '/privacy', label: 'سياسة الخصوصية' },
    { href: '/terms', label: 'الشروط والأحكام' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <h3 className="text-xl font-bold">عقارات النخيل</h3>
                <p className="text-sm text-gray-400">شاطئ النخيل - العجمي</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              شريكك الموثوق في عالم العقارات في الإسكندرية. نقدم أفضل الشقق والفيلات في شاطئ النخيل والعجمي بأسعار تنافسية وخدمة عالية الجودة.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">الدعم</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">معلومات التواصل</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2 space-x-reverse">
                <MapPin className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  شاطئ النخيل، العجمي، الإسكندرية، مصر
                </p>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Phone className="w-5 h-5 text-green-500 flex-shrink-0" />
                <a 
                  href="tel:+201234567890" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  +20 123 456 7890
                </a>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Mail className="w-5 h-5 text-red-500 flex-shrink-0" />
                <a 
                  href="mailto:info@3aqarat-al-nakheel.com" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  info@3aqarat-al-nakheel.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} عقارات النخيل. جميع الحقوق محفوظة.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            تم التطوير بواسطة{' '}
            <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors">
              Ahmed Mohamed Sabri
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer