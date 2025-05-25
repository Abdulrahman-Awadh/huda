'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { RotateCcw, Play, Pause, Volume2, VolumeX } from 'lucide-react'
import Image from 'next/image'

export default function CharacterViewer() {
  const [isAnimating, setIsAnimating] = useState(true)
  const [hasSound, setHasSound] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
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
        <div className="bg-white backdrop-blur-md rounded-3xl p-8 shadow-2xl">
          <div className="relative h-96 w-full mb-6 bg-gradient-to-br from-[#e4592d] to-[#f2a71e] rounded-2xl overflow-hidden flex items-center justify-center">
            {/* 2D Character Image */}
            <motion.div
              className="relative w-64 h-64"
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
              <Image
                src="/huda.png"
                alt="هدى"
                width={256}
                height={256}
                className="rounded-full shadow-2xl border-4 border-white"
                priority
              />
              
              {/* Animated decorative elements */}
              <motion.div
                className="absolute -top-4 -left-4 text-3xl"
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
                className="absolute -top-4 -right-4 text-3xl"
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
              
              <motion.div
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🤟
              </motion.div>
            </motion.div>

            {/* Status Indicator */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-white backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-[#2a345c] shadow-lg">
                شخصية تفاعلية
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <motion.button
              onClick={resetView}
              className="bg-[#2a345c] hover:bg-[#1d2440] text-white font-semibold py-3 px-6 rounded-full flex items-center gap-2 text-sm transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-4 h-4" />
              إعادة العرض
            </motion.button>
            
            <motion.button
              onClick={toggleAnimation}
              className="bg-gradient-to-r from-[#e4592d] to-[#f2a71e] hover:from-[#d0431a] hover:to-[#e08816] text-white font-semibold py-3 px-6 rounded-full flex items-center gap-2 text-sm transition-all duration-300 shadow-lg"
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
              className="bg-[#669bbc] hover:bg-[#5080a8] text-white font-semibold py-3 px-6 rounded-full flex items-center gap-2 text-sm transition-all duration-300 shadow-lg"
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
          
          <div className="text-center mt-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#e4592d] to-[#f2a71e] bg-clip-text text-transparent mb-2">
              هدى
            </h3>
            <p className="text-[#2a345c] text-sm font-medium">
              شخصيتك التفاعلية لتعلم لغة الإشارة
            </p>
          </div>

          {/* Model Status */}
          <div className="mt-4 p-4 bg-[#f2a71e]/10 rounded-xl border border-[#f2a71e]/30">
            <div className="flex items-center gap-2 text-[#2a345c]">
              <div className="text-xl">ℹ️</div>
              <div className="text-sm">
                <strong className="text-[#2a345c]">الشخصية التفاعلية:</strong> 
                <br />استمتع بالحركات التفاعلية وتعلم لغة الإشارة مع هدى.
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
        <div className="bg-white backdrop-blur-md rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#e4592d] to-[#f2a71e] bg-clip-text text-transparent mb-6">
            مرحباً! أنا هدى
          </h2>
          
          <div className="space-y-4 text-[#2a345c] leading-relaxed">
            <p>
              أهلاً وسهلاً بكم في عالم لغة الإشارة! أنا هنا لمساعدتكم في اكتشاف العالم الجميل والمعبر للتواصل بلغة الإشارة.
            </p>
            
            <p>
              مهمتي هي جعل لغة الإشارة في متناول الجميع وممتعة للجميع. سواء كنتم مبتدئين تماماً أو تسعون لتحسين مهاراتكم، أنا هنا لأرشدكم في كل خطوة من الرحلة.
            </p>
            
            <p>
              من خلال الفيديوهات التفاعلية والمطبوعات المفيدة والإرشاد خطوة بخطوة، سنستكشف لغة الإشارة معاً. دعونا نكسر حواجز التواصل ونبني عالماً أكثر شمولية، إشارة واحدة في كل مرة!
            </p>
            
            <div className="bg-gradient-to-br from-[#e4592d]/5 to-[#f2a71e]/5 rounded-2xl p-6 mt-6 border border-[#f2a71e]/20">
              <h3 className="font-bold text-[#2a345c] mb-3 text-lg">
                لماذا تعلم لغة الإشارة؟
              </h3>
              <ul className="space-y-3 text-[#2a345c]">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#e4592d] to-[#f2a71e] flex items-center justify-center text-white text-xs mt-0.5">✓</div>
                  <span>تفتح أبواب صداقات جديدة ومجتمعات متنوعة</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#e4592d] to-[#f2a71e] flex items-center justify-center text-white text-xs mt-0.5">✓</div>
                  <span>تعزز مهارات التواصل والتعبير</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#e4592d] to-[#f2a71e] flex items-center justify-center text-white text-xs mt-0.5">✓</div>
                  <span>تساعد في خلق مجتمع أكثر شمولية</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#e4592d] to-[#f2a71e] flex items-center justify-center text-white text-xs mt-0.5">✓</div>
                  <span>تطور القدرات المعرفية والذهنية</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features Highlight */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
          <h3 className="text-xl font-bold text-[#2a345c] mb-4">
            ✨ الميزات الخاصة
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-[#e4592d]/5 to-[#f2a71e]/5 rounded-xl border border-[#f2a71e]/20 hover:shadow-md transition-shadow">
              <div className="text-2xl mb-2">🎭</div>
              <p className="text-sm font-semibold text-[#2a345c]">
                شخصية تفاعلية
              </p>
            </div>
            <div className="text-center p-4 bg-[#669bbc]/5 rounded-xl border border-[#669bbc]/20 hover:shadow-md transition-shadow">
              <div className="text-2xl mb-2">🎥</div>
              <p className="text-sm font-semibold text-[#2a345c]">
                فيديوهات تعليمية
              </p>
            </div>
            <div className="text-center p-4 bg-[#f2a71e]/5 rounded-xl border border-[#f2a71e]/20 hover:shadow-md transition-shadow">
              <div className="text-2xl mb-2">📚</div>
              <p className="text-sm font-semibold text-[#2a345c]">
                مواد شاملة
              </p>
            </div>
            <div className="text-center p-4 bg-[#a9c686]/5 rounded-xl border border-[#a9c686]/20 hover:shadow-md transition-shadow">
              <div className="text-2xl mb-2">🖨️</div>
              <p className="text-sm font-semibold text-[#2a345c]">
                مطبوعات مجانية
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Tips */}
        <div className="bg-[#2a345c] text-white rounded-2xl p-6 shadow-xl">
          <h3 className="text-lg font-bold mb-4">
            💡 نصائح التفاعل
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>اضغط على أزرار التحكم لتجربة خيارات مختلفة</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#f2a71e] rounded-full animate-pulse"></div>
              <span>استخدم زر الحركة لتشغيل أو إيقاف الأنيميشن</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-gradient-to-r from-[#e4592d] to-[#f2a71e] rounded-full animate-pulse"></div>
              <span>شخصية هدى التفاعلية ترحب بكم في عالم لغة الإشارة!</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}