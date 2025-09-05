'use client'

import { motion } from 'framer-motion'
import { 
  Search, 
  HandHeart, 
  Calculator, 
  FileText, 
  Key, 
  Shield,
  ArrowRight,
  Sparkles
} from 'lucide-react'

const ServicesSection = () => {
  const services = [
    {
      icon: Search,
      title: 'البحث عن العقارات',
      description: 'نساعدك في العثور على العقار المثالي الذي يناسب احتياجاتك وميزانيتك',
      features: ['بحث متخصص', 'استشارة مجانية', 'جولات افتراضية'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: HandHeart,
      title: 'بيع وشراء العقارات',
      description: 'خدمات شاملة لبيع وشراء العقارات بأفضل الأسعار وأسرع الإجراءات',
      features: ['تقييم دقيق', 'تسويق احترافي', 'متابعة كاملة'],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Calculator,
      title: 'التقييم العقاري',
      description: 'تقييم دقيق ومهني للعقارات من قبل خبراء معتمدين',
      features: ['تقييم معتمد', 'تحليل السوق', 'تقرير مفصل'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: FileText,
      title: 'الاستشارات القانونية',
      description: 'استشارات قانونية شاملة لضمان سلامة جميع المعاملات العقارية',
      features: ['استشارة قانونية', 'مراجعة العقود', 'ضمان قانوني'],
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Key,
      title: 'إدارة العقارات',
      description: 'خدمات إدارة شاملة للعقارات الاستثمارية والسكنية',
      features: ['إدارة كاملة', 'صيانة دورية', 'تحصيل الإيجارات'],
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Shield,
      title: 'التأمين العقاري',
      description: 'حماية شاملة لاستثماراتك العقارية ضد جميع المخاطر',
      features: ['تأمين شامل', 'حماية من المخاطر', 'تعويض سريع'],
      color: 'from-teal-500 to-teal-600'
    }
  ]

  const processSteps = [
    {
      step: '01',
      title: 'التواصل الأولي',
      description: 'تواصل معنا وحدد احتياجاتك العقارية'
    },
    {
      step: '02',
      title: 'البحث والاختيار',
      description: 'نبحث لك عن أفضل الخيارات المتاحة'
    },
    {
      step: '03',
      title: 'المعاينة والتقييم',
      description: 'معاينة العقارات وتقييم شامل'
    },
    {
      step: '04',
      title: 'إتمام الصفقة',
      description: 'إجراءات قانونية آمنة وسريعة'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-600 font-semibold text-sm tracking-wide uppercase flex items-center justify-center space-x-2 space-x-reverse mb-4">
            <Sparkles className="w-4 h-4" />
            <span>خدماتنا</span>
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            خدمات عقارية
            <span className="block text-blue-600">شاملة ومتميزة</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نقدم مجموعة متكاملة من الخدمات العقارية المتخصصة لنكون شريكك الموثوق في كل خطوة من رحلتك العقارية
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button className="w-full bg-gray-50 text-gray-700 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 flex items-center justify-center space-x-2 space-x-reverse font-medium border border-gray-200 group-hover:border-blue-200">
                <span>اعرف المزيد</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              كيف نعمل معك؟
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              عملية بسيطة وواضحة لضمان تجربة سلسة ومريحة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="text-center relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                {/* Step Number */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto text-white text-xl font-bold shadow-lg">
                    {step.step}
                  </div>
                  
                  {/* Connection Line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-blue-300 to-transparent transform -translate-y-1/2 z-0"></div>
                  )}
                </div>

                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              هل تحتاج استشارة مجانية؟
            </h3>
            <p className="text-gray-600 mb-6">
              تواصل معنا الآن واحصل على استشارة مجانية من خبرائنا
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-lg">
              احجز استشارتك المجانية
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection