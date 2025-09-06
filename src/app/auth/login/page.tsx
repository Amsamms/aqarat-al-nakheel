import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { LoginForm } from '@/components/auth/LoginForm'
import Link from 'next/link'

export const metadata = {
  title: 'تسجيل الدخول | 3عقارات النخيل',
  description: 'سجل دخولك للوصول إلى حسابك وإدارة العقارات المفضلة لديك'
}

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ message?: string; redirectTo?: string }>
}) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  // Redirect if already logged in
  if (user) {
    redirect('/dashboard')
  }

  const params = await searchParams
  const message = params.message
  const redirectTo = params.redirectTo

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-amber-400 mb-2">3عقارات النخيل</h1>
          </Link>
          <h2 className="text-2xl font-bold text-white mb-2">
            تسجيل الدخول
          </h2>
          <p className="text-gray-400">
            سجل دخولك للوصول إلى حسابك
          </p>
        </div>

        {/* Error/Success Message */}
        {message && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-center">
            {message}
          </div>
        )}

        {/* Login Form */}
        <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
          <Suspense fallback={<div className="animate-pulse bg-gray-800 h-64 rounded-lg"></div>}>
            <LoginForm redirectTo={redirectTo} />
          </Suspense>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-gray-400">
            ليس لديك حساب؟{' '}
            <Link href="/auth/register" className="text-amber-400 hover:text-amber-300 font-semibold">
              إنشاء حساب جديد
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm">
            ← العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  )
}