'use client'

import { useState, useEffect } from 'react'

interface Character3DViewProps {
  isAnimating: boolean
  modelUrl?: string
}

// Fallback component
const Fallback = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-center">
      <div className="loading-spinner mb-4"></div>
      <p className="text-gray-600">جاري تحميل النموذج ثلاثي الأبعاد...</p>
    </div>
  </div>
)

// Error component
const ErrorDisplay = ({ error }: { error: string }) => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-center p-4">
      <div className="text-4xl mb-4">⚠️</div>
      <p className="text-gray-600 mb-2">حدث خطأ في تحميل النموذج ثلاثي الأبعاد</p>
      <p className="text-sm text-gray-500">{error}</p>
      <p className="text-xs text-gray-400 mt-2">
        تأكد من أن الملف بصيغة GLB أو GLTF أو OBJ
      </p>
    </div>
  </div>
)

export default function Character3DView({ isAnimating, modelUrl = '/charecter.glb' }: Character3DViewProps) {
  const [Scene3D, setScene3D] = useState<any>(null)
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Only load on client side
    if (typeof window !== 'undefined') {
      import('./Scene3D')
        .then((module) => {
          setScene3D(() => module.default)
          setIsLoading(false)
        })
        .catch((err) => {
          console.error('Failed to load 3D scene:', err)
          setError('فشل تحميل المشهد ثلاثي الأبعاد')
          setIsLoading(false)
        })
    }
  }, [])

  if (isLoading) {
    return <Fallback />
  }

  if (error) {
    return <ErrorDisplay error={error} />
  }

  if (!Scene3D) {
    return <Fallback />
  }

  return <Scene3D isAnimating={isAnimating} modelUrl={modelUrl} />
}