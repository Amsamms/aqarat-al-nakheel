'use client'

import { motion } from 'framer-motion'
import { 
  Award, 
  Users, 
  Home, 
  Shield, 
  Clock, 
  Star,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import Image from 'next/image'

const AboutSection = () => {
  const stats = [
    {
      icon: Home,
      number: '500+',
      label: 'عقار متاح',
      description: 'مجموعة متنوعة من العقارات'
    },
    {
      icon: Users,
      number: '1000+',
      label: 'عميل راضٍ',
      description: 'ثقة العملاء هي أولويتنا'
    },
    {
      icon: Award,
      number: '10+',
      label: 'سنوات خبرة',
      description: 'خبرة طويلة في السوق العقاري'
    },
    {
      icon: Star,
      number: '4.9/5',
      label: 'تقييم العملاء',
      description: 'أعلى معدلات الرضا'
    }
  ]

  const features = [
    {
      icon: Shield,
      title: 'ثقة وأمان',
      description: 'جميع المعاملات آمنة ومضمونة قانونياً'
    },
    {
      icon: Clock,
      title: 'خدمة 24/7',
      description: 'فريقنا متاح على مدار الساعة لخدمتكم'
    },
    {
      icon: Star,
      title: 'جودة عالية',
      description: 'نختار العقارات بعناية فائقة لضمان الجودة'
    }
  ]

  const achievements = [
    'أول شركة عقارية في شاطئ النخيل',
    'شريك معتمد لأكبر المطورين في الإسكندرية',
    'حائزة على جائزة أفضل خدمة عملاء 2023',
    'أكثر من 1000 صفقة عقارية ناجحة'
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Section Header */}
            <div>
              <span className="text-blue-600 font-semibold text-sm tracking-wide uppercase">
                من نحن
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
                شريكك الموثوق في
                <span className="block text-blue-600">عالم العقارات</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                نحن فريق من الخبراء المتخصصين في السوق العقاري في الإسكندرية، نسعى لتقديم أفضل الخدمات العقارية وأجمل العقارات في شاطئ النخيل والعجمي. مهمتنا هي مساعدتك في العثور على منزل أحلامك أو الاستثمار المثالي.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4 space-x-reverse"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">إنجازاتنا</h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3 space-x-reverse"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-blue-900 transition-all duration-300 flex items-center space-x-2 space-x-reverse shadow-lg">
                <span>تعرف علينا أكثر</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right Side - Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
                alt="فريق عقارات النخيل"
                width={600}
                height={400}
                className="w-full h-[400px] object-cover"
              />
              
              {/* Floating Card */}
              <motion.div
                className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">100%</div>
                    <div className="text-sm text-gray-600">رضا العملاء</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-4 -right-4 w-32 h-32 bg-yellow-500/20 rounded-full blur-xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-gray-800 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection