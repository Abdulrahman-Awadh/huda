'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { RotateCcw, Play, Pause, Volume2, VolumeX, Upload, X } from 'lucide-react'

export default function CharacterViewer() {
  const [isAnimating, setIsAnimating] = useState(true)
  const [hasSound, setHasSound] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [show3D, setShow3D] = useState(false)
  const [Character3DView, setCharacter3DView] = useState<any>(null)
  const [modelUrl, setModelUrl] = useState<string>('/charecter.glb')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMounted(true)
    
    // Try to load 3D component dynamically
    import('./Character3DView')
      .then((module) => {
        setCharacter3DView(() => module.default)
        setShow3D(true)
      })
      .catch((error) => {
        console.log('3D model not available, using fallback:', error)
        setShow3D(false)
      })
  }, [])

  const resetView = () => {
    // Reset any transformations
    console.log('Resetting view...')
  }

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating)
  }

  const toggleSound = () => {
    setHasSound(!hasSound)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const validTypes = ['.glb', '.gltf', '.obj']
    const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'))
    
    if (!validTypes.includes(fileExtension)) {
      setFileError(`نوع الملف غير مدعوم. الأنواع المدعومة: ${validTypes.join(', ')}`)
      return
    }

    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024 // 50MB
    if (file.size > maxSize) {
      setFileError('حجم الملف كبير جداً. الحد الأقصى: 50MB')
      return
    }

    setFileError('')
    setUploadedFile(file)
    
    // Create URL for the uploaded file
    const url = URL.createObjectURL(file)
    setModelUrl(url)
    
    // Re-trigger 3D component loading with new model
    setShow3D(false)
    setTimeout(() => {
      setShow3D(true)
    }, 100)
  }

  const clearUploadedFile = () => {
    if (uploadedFile && modelUrl.startsWith('blob:')) {
      URL.revokeObjectURL(modelUrl)
    }
    setUploadedFile(null)
    setModelUrl('/charecter.glb')
    setFileError('')
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Fallback character component
  const FallbackCharacter = () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="text-center"
        animate={isAnimating ? {
          scale: [1, 1.05, 1],
          rotate: [0, 2, -2, 0]
        } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div
          className="text-8xl mb-4 drop-shadow-lg"
          animate={isAnimating ? {
            rotate: [0, 10, -10, 0]
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          👩‍🦱
        </motion.div>
        <div className="text-6xl mb-2 animate-wave">👋</div>
        <div className="text-white font-bold text-2xl drop-shadow-lg">هدى</div>
      </motion.div>
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-4 left-4 text-2xl"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 15, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        ✨
      </motion.div>

      <motion.div
        className="absolute top-4 right-4 text-2xl"
        animate={{
          y: [0, -15, 0],
          rotate: [0, -20, 0]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        💫
      </motion.div>
    </div>
  )

  if (!mounted) {
    return (
      <div className="grid lg:grid-cols-2 gap-12 items-center mt-12">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
          <div className="h-96 w-full bg-gray-100 rounded-2xl flex items-center justify-center">
            <div className="loading-spinner"></div>
          </div>
        </div>
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
          <div className="h-64 bg-gray-100 rounded-2xl animate-pulse"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center mt-12">
      {/* Character Display */}
      <motion.div 
        className="relative"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
          <div className="relative h-96 w-full mb-6 bg-gradient-to-br from-secondary-100 to-accent-100 rounded-2xl overflow-hidden">
            {/* 3D Character Canvas or Fallback */}
            {show3D && Character3DView ? (
              <Character3DView isAnimating={isAnimating} modelUrl={modelUrl} />
            ) : (
              <FallbackCharacter />
            )}

            {/* Status Indicator */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-primary-600">
                {show3D ? 'نموذج ثلاثي الأبعاد' : 'نموذج تفاعلي'}
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <motion.button
              onClick={() => fileInputRef.current?.click()}
              className="btn-secondary flex items-center gap-2 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Upload className="w-4 h-4" />
              رفع نموذج 3D
            </motion.button>
            
            {uploadedFile && (
              <motion.button
                onClick={clearUploadedFile}
                className="btn-secondary flex items-center gap-2 text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <X className="w-4 h-4" />
                إزالة النموذج
              </motion.button>
            )}

            <motion.button
              onClick={resetView}
              className="btn-secondary flex items-center gap-2 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-4 h-4" />
              إعادة العرض
            </motion.button>
            
            <motion.button
              onClick={toggleAnimation}
              className="btn-secondary flex items-center gap-2 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isAnimating ? (
                <>
                  <Pause className="w-4 h-4" />
                  إيقاف الحركة
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  تشغيل الحركة
                </>
              )}
            </motion.button>
            
            <motion.button
              onClick={toggleSound}
              className="btn-secondary flex items-center gap-2 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {hasSound ? (
                <>
                  <Volume2 className="w-4 h-4" />
                  إيقاف الصوت
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  تشغيل الصوت
                </>
              )}
            </motion.button>
          </div>
          
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".glb,.gltf,.obj"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          {/* File error message */}
          {fileError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm text-center"
            >
              {fileError}
            </motion.div>
          )}
          
          <div className="text-center mt-6">
            <h3 className="text-2xl font-bold text-primary-500 mb-2">
              {uploadedFile ? uploadedFile.name.split('.')[0] : 'هدى'}
            </h3>
            <p className="text-gray-600 text-sm">
              شخصيتك التفاعلية {show3D ? 'ثلاثية الأبعاد' : ''} لتعلم لغة الإشارة
            </p>
          </div>

          {/* 3D Model Status */}
          <div className="mt-4 p-4 bg-secondary-50 rounded-xl border border-secondary-200">
            <div className="flex items-center gap-2 text-secondary-700">
              <div className="text-xl">ℹ️</div>
              <div className="text-sm">
                {show3D ? (
                  <>
                    <strong>النموذج ثلاثي الأبعاد:</strong> 
                    <br />استخدم الماوس للتدوير والتكبير لاستكشاف الشخصية من جميع الزوايا.
                    <br />
                    <span className="text-xs mt-1 inline-block">
                      الأنواع المدعومة: GLB, GLTF, OBJ (حتى 50MB)
                    </span>
                  </>
                ) : (
                  <>
                    <strong>النموذج التفاعلي:</strong> 
                    <br />يتم عرض النسخة المبسطة من هدى.
                    <br />
                    <span className="text-xs mt-1 inline-block">
                      يمكنك رفع نماذج 3D بصيغة GLB, GLTF, أو OBJ
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Character Information */}
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-primary-500 mb-6">
            مرحباً! أنا هدى
          </h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              أهلاً وسهلاً بكم في عالم لغة الإشارة! أنا هنا لمساعدتكم في اكتشاف العالم الجميل والمعبر للتواصل بلغة الإشارة.
            </p>
            
            <p>
              مهمتي هي جعل لغة الإشارة في متناول الجميع وممتعة للجميع. سواء كنتم مبتدئين تماماً أو تسعون لتحسين مهاراتكم، أنا هنا لأرشدكم في كل خطوة من الرحلة.
            </p>
            
            <p>
              من خلال الفيديوهات التفاعلية والمطبوعات المفيدة والإرشاد خطوة بخطوة، سنستكشف لغة الإشارة معاً. دعونا نكسر حواجز التواصل ونبني عالماً أكثر شمولية، إشارة واحدة في كل مرة!
            </p>
            
            <div className="bg-primary-50 rounded-2xl p-6 mt-6">
              <h3 className="font-bold text-primary-600 mb-3 text-lg">
                لماذا تعلم لغة الإشارة؟
              </h3>
              <ul className="space-y-2 text-primary-700">
                <li className="flex items-start gap-3">
                  <span className="text-primary-500 mt-1">🤝</span>
                  تفتح أبواب صداقات جديدة ومجتمعات متنوعة
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-500 mt-1">💬</span>
                  تعزز مهارات التواصل والتعبير
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-500 mt-1">🌍</span>
                  تساعد في خلق مجتمع أكثر شمولية
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-500 mt-1">🧠</span>
                  تطور القدرات المعرفية والذهنية
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features Highlight */}
        <div className="card-sunset">
          <h3 className="text-xl font-bold text-gradient-sunset mb-4">
            ✨ الميزات الخاصة
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl border border-primary-200/30">
              <div className="text-2xl mb-2">🎭</div>
              <p className="text-sm font-semibold text-primary-600">
                شخصية تفاعلية
              </p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-secondary-50 to-warm-50 rounded-xl border border-secondary-200/30">
              <div className="text-2xl mb-2">🎥</div>
              <p className="text-sm font-semibold text-secondary-600">
                فيديوهات تعليمية
              </p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-accent-50 to-secondary-50 rounded-xl border border-accent-200/30">
              <div className="text-2xl mb-2">📚</div>
              <p className="text-sm font-semibold text-accent-600">
                مواد شاملة
              </p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-warm-50 to-cool-50 rounded-xl border border-warm-200/30">
              <div className="text-2xl mb-2">🖨️</div>
              <p className="text-sm font-semibold text-warm-600">
                مطبوعات مجانية
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Tips */}
        <div className="card-ocean">
          <h3 className="text-lg font-bold text-gradient-ocean mb-4">
            💡 نصائح التفاعل
          </h3>
          <div className="space-y-3 text-sm text-secondary-700">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse"></div>
              <span>اضغط على أزرار التحكم لتجربة خيارات مختلفة</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></div>
              <span>استخدم زر الحركة لتشغيل أو إيقاف الأنيميشن</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
              <span>{show3D ? 'استخدم الماوس للتفاعل مع النموذج ثلاثي الأبعاد!' : 'النموذج ثلاثي الأبعاد قادم قريباً!'}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}