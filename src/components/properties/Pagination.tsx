'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalCount: number
}

export function Pagination({ currentPage, totalPages, totalCount }: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString() || '')
    if (page === 1) {
      params.delete('page')
    } else {
      params.set('page', page.toString())
    }
    
    const queryString = params.toString()
    const url = queryString ? `/properties?${queryString}` : '/properties'
    router.push(url)
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const delta = 2 // Number of pages to show on each side of current page
    const range: number[] = []
    const rangeWithDots: (number | string)[] = []

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else {
      if (totalPages > 1) {
        rangeWithDots.push(totalPages)
      }
    }

    // Remove duplicates
    return rangeWithDots.filter((item, index) => 
      rangeWithDots.indexOf(item) === index
    )
  }

  const pageNumbers = getPageNumbers()
  const itemsPerPage = 12
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalCount)

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Results Info */}
      <div className="text-gray-400 text-sm text-center">
        عرض {startItem.toLocaleString('ar-EG')} - {endItem.toLocaleString('ar-EG')} من {totalCount.toLocaleString('ar-EG')} عقار
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-1 rtl:space-x-reverse">
        {/* Previous Button */}
        <button
          onClick={() => navigateToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
            currentPage <= 1
              ? 'text-gray-600 cursor-not-allowed'
              : 'text-gray-300 hover:text-white hover:bg-gray-800'
          }`}
          aria-label="الصفحة السابقة"
        >
          <ChevronRight className="w-4 h-4 ml-1" />
          <span className="hidden sm:inline">السابق</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1 rtl:space-x-reverse">
          {pageNumbers.map((pageNum, index) => (
            <div key={index}>
              {pageNum === '...' ? (
                <span className="px-3 py-2 text-gray-500">
                  <MoreHorizontal className="w-4 h-4" />
                </span>
              ) : (
                <button
                  onClick={() => navigateToPage(pageNum as number)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    currentPage === pageNum
                      ? 'bg-amber-400 text-black font-semibold'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {pageNum}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => navigateToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
            currentPage >= totalPages
              ? 'text-gray-600 cursor-not-allowed'
              : 'text-gray-300 hover:text-white hover:bg-gray-800'
          }`}
          aria-label="الصفحة التالية"
        >
          <span className="hidden sm:inline">التالي</span>
          <ChevronLeft className="w-4 h-4 mr-1" />
        </button>
      </div>

      {/* Quick Navigation (for large pagination) */}
      {totalPages > 10 && (
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-gray-400 text-sm">الانتقال إلى:</span>
          <select
            value={currentPage}
            onChange={(e) => navigateToPage(parseInt(e.target.value))}
            className="bg-gray-800 border border-gray-700 text-white rounded px-3 py-1 text-sm focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <option key={page} value={page}>
                صفحة {page}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}