'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import CharacterViewer from '@/components/CharacterViewer'
import VideoGrid from '@/components/VideoGrid'
import PrintablesGrid from '@/components/PrintablesGrid'
import { motion, AnimatePresence } from 'framer-motion'

export type PageType = 'home' | 'learning' | 'printables'

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageType>('home')

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  const pageTransition = {
    duration: 0.6,
    ease: "easeInOut"
  }

  return (
    <main className="min-h-screen">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <CharacterViewer />
            </motion.div>
          )}

          {currentPage === 'learning' && (
            <motion.div
              key="learning"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <div className="text-center mb-12">
                <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-xl">
                  <h1 className="text-4xl font-bold text-[#e4592d] mb-4">
                    التعلم مع هدى
                  </h1>
                  <p className="text-[#2a345c] text-lg">
                    شاهدوا وتعلموا لغة الإشارة من خلال دروس هدى التفاعلية المصورة
                  </p>
                </div>
              </div>
              <VideoGrid />
            </motion.div>
          )}

          {currentPage === 'printables' && (
            <motion.div
              key="printables"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <div className="text-center mb-12">
                <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-xl">
                  <h1 className="text-4xl font-bold text-[#e4592d] mb-4">
                    الموارد القابلة للطباعة
                  </h1>
                  <p className="text-[#2a345c] text-lg">
                    حملوا واطبعوا هذه المواد المفيدة لتعلم لغة الإشارة
                  </p>
                </div>
              </div>
              <PrintablesGrid />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}