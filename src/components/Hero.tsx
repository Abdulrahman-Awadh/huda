'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Heart, Users, BookOpen } from 'lucide-react'

export default function Hero() {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <motion.section 
      className="text-center mb-16"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Main Hero Card */}
      <motion.div 
        className="bg-white/95 backdrop-blur-md rounded-3xl p-12 shadow-2xl relative overflow-hidden"
        variants={itemVariants}
      >
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-10 left-10 text-6xl opacity-10"
            variants={floatingVariants}
            animate="animate"
          >
            👋
          </motion.div>
          <motion.div 
            className="absolute top-20 right-20 text-4xl opacity-10"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '1s' }}
          >
            🤟
          </motion.div>
          <motion.div 
            className="absolute bottom-10 left-20 text-5xl opacity-10"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '2s' }}
          >
            ✋
          </motion.div>
          <motion.div 
            className="absolute bottom-20 right-10 text-3xl opacity-10"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '0.5s' }}
          >
            🤲
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <motion.div 
            className="text-6xl mb-6"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              repeatDelay: 2 
            }}
          >
            👋
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 text-gradient"
            variants={itemVariants}
          >
            تعرفوا على مها!
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            دليلكم الودود لتعلم لغة الإشارة وبناء جسور التواصل
          </motion.p>

          {/* Features Icons */}
          <motion.div 
            className="flex justify-center gap-8 mb-8"
            variants={itemVariants}
          >
            <motion.div 
              className="flex flex-col items-center gap-2"
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-primary-500" />
              </div>
              <span className="text-sm font-semibold text-gray-600">ودود</span>
            </motion.div>

            <motion.div 
              className="flex flex-col items-center gap-2"
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-primary-500" />
              </div>
              <span className="text-sm font-semibold text-gray-600">تعليمي</span>
            </motion.div>

            <motion.div 
              className="flex flex-col items-center gap-2"
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-primary-500" />
              </div>
              <span className="text-sm font-semibold text-gray-600">شامل</span>
            </motion.div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <motion.button
              className="btn-primary text-lg px-8 py-4"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(227, 89, 45, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              ابدأ التعلم الآن
            </motion.button>
            
            <motion.button
              className="btn-secondary text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              تعرف على مها أكثر
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="mt-12 flex flex-col items-center"
        variants={itemVariants}
      >
        <p className="text-gray-600 mb-4">اكتشف المزيد</p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-6 h-6 text-primary-500" />
        </motion.div>
      </motion.div>
    </motion.section>
  )
}