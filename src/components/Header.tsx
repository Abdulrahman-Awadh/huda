'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import type { PageType } from '@/app/page'

interface HeaderProps {
  currentPage: PageType
  onPageChange: (page: PageType) => void
}

export default function Header({ currentPage, onPageChange }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'home' as PageType, label: 'الرئيسية', emoji: '🏠' },
    { id: 'learning' as PageType, label: 'التعلم', emoji: '📚' },
    { id: 'printables' as PageType, label: 'المطبوعات', emoji: '🖨️' },
  ]

  const headerVariants = {
    initial: { y: -100 },
    animate: { y: 0 },
  }

  // Prevent hydration mismatch by not rendering scroll-dependent styles on server
  const headerClasses = mounted 
    ? `fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/98 backdrop-blur-md shadow-lg' 
          : 'bg-white/95 backdrop-blur-sm shadow-md'
      }`
    : 'fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-md'

  return (
    <motion.header
      variants={headerVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={headerClasses}
    >
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange('home')}
          >
            <motion.div
              className="text-4xl"
              animate={{ 
                rotate: [0, 20, -10, 0],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatDelay: 3 
              }}
            >
              👋
            </motion.div>
            <h1 className="text-3xl font-bold text-[#e4592d]">هدى</h1>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  currentPage === item.id
                    ? 'bg-[#e4592d] text-white shadow-lg'
                    : 'text-[#2a345c] hover:bg-[#e4592d]/10 hover:text-[#e4592d]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">{item.emoji}</span>
                <span>{item.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg hover:bg-[#669bbc]/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-[#2a345c]" />
            ) : (
              <Menu className="w-6 h-6 text-[#2a345c]" />
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={`md:hidden overflow-hidden ${
            isMobileMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'
          }`}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex flex-col gap-2 pt-4 border-t border-[#669bbc]/20">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id)
                  setIsMobileMenuOpen(false)
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentPage === item.id
                    ? 'bg-[#e4592d] text-white'
                    : 'text-[#2a345c] hover:bg-[#e4592d]/10 hover:text-[#e4592d]'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-xl">{item.emoji}</span>
                <span>{item.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </nav>
    </motion.header>
  )
}