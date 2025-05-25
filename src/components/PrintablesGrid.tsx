'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, FileText, Star, Eye, Heart, Filter, Search } from 'lucide-react'

interface PrintableItem {
  id: string
  title: string
  description: string
  type: 'PDF' | 'Word' | 'Image'
  size: string
  downloads: string
  rating: number
  icon: string
  category: string
  pages?: number
  difficulty: 'سهل' | 'متوسط' | 'صعب'
  isNew?: boolean
  isFeatured?: boolean
  previewUrl?: string
}

const printableItems: PrintableItem[] = [
  {
    id: 'magazine',
    title: 'مجلة لغة الإشارة',
    description: 'مجلة شهرية تحتوي على قصص لغة الإشارة ونصائح ورؤى ثقافية.',
    type: 'PDF',
    size: '12.5 MB',
    downloads: '8.2k',
    rating: 4.9,
    icon: '📚',
    category: 'مجلات',
    pages: 32,
    difficulty: 'متوسط',
    isNew: true,
    isFeatured: true,
    previewUrl: '/previews/magazine.jpg'
  },
  {
    id: 'alphabet',
    title: 'أوراق تمارين الأبجدية',
    description: 'أوراق عمل للتدرب على تعلم وحفظ أبجدية لغة الإشارة.',
    type: 'PDF',
    size: '2.1 MB',
    downloads: '15.7k',
    rating: 4.8,
    icon: '🔤',
    category: 'تمارين',
    pages: 8,
    difficulty: 'سهل',
    isFeatured: true
  },
  {
    id: 'flashcards',
    title: 'مجموعة البطاقات التعليمية',
    description: 'بطاقات تعليمية قابلة للطباعة للكلمات والعبارات الشائعة بلغة الإشارة.',
    type: 'PDF',
    size: '5.3 MB',
    downloads: '12.1k',
    rating: 4.7,
    icon: '🎯',
    category: 'بطاقات',
    pages: 24,
    difficulty: 'سهل'
  },
  {
    id: 'workbook',
    title: 'كتاب التعلم الشامل',
    description: 'كتاب شامل يحتوي على تمارين واختبارات وأنشطة تدريبية.',
    type: 'PDF',
    size: '18.7 MB',
    downloads: '6.9k',
    rating: 4.9,
    icon: '📖',
    category: 'كتب',
    pages: 64,
    difficulty: 'صعب',
    isFeatured: true
  },
  {
    id: 'family-pack',
    title: 'حزمة أنشطة العائلة',
    description: 'أنشطة وألعاب ممتعة للعائلات لتعلم لغة الإشارة معاً.',
    type: 'PDF',
    size: '7.8 MB',
    downloads: '9.4k',
    rating: 4.6,
    icon: '🏠',
    category: 'أنشطة',
    pages: 16,
    difficulty: 'متوسط'
  },
  {
    id: 'tracker',
    title: 'متتبع التقدم',
    description: 'تتبعوا رحلة تعلم لغة الإشارة بهذه الورقة المفيدة لمتابعة التقدم.',
    type: 'PDF',
    size: '1.2 MB',
    downloads: '11.3k',
    rating: 4.5,
    icon: '📋',
    category: 'تتبع',
    pages: 4,
    difficulty: 'سهل'
  },
  {
    id: 'coloring',
    title: 'صفحات التلوين',
    description: 'صفحات تلوين تعليمية تحتوي على رسوم توضيحية للغة الإشارة للأطفال.',
    type: 'PDF',
    size: '3.9 MB',
    downloads: '14.8k',
    rating: 4.8,
    icon: '🎨',
    category: 'أطفال',
    pages: 12,
    difficulty: 'سهل',
    isNew: true
  },
  {
    id: 'charts',
    title: 'الجداول المرجعية',
    description: 'جداول مرجعية سريعة للأرقام والألوان والعبارات الشائعة.',
    type: 'PDF',
    size: '4.2 MB',
    downloads: '16.5k',
    rating: 4.7,
    icon: '📊',
    category: 'مراجع',
    pages: 6,
    difficulty: 'سهل'
  },
  {
    id: 'stories',
    title: 'قصص بلغة الإشارة',
    description: 'مجموعة قصص قصيرة مصورة تعلم لغة الإشارة بطريقة ممتعة.',
    type: 'PDF',
    size: '9.1 MB',
    downloads: '7.6k',
    rating: 4.9,
    icon: '📚',
    category: 'قصص',
    pages: 20,
    difficulty: 'متوسط',
    isNew: true
  },
  {
    id: 'dictionary',
    title: 'قاموس لغة الإشارة المصور',
    description: 'قاموس شامل يحتوي على أكثر من 500 إشارة مع الصور التوضيحية.',
    type: 'PDF',
    size: '25.3 MB',
    downloads: '5.2k',
    rating: 4.9,
    icon: '📚',
    category: 'مراجع',
    pages: 120,
    difficulty: 'متوسط',
    isFeatured: true
  },
  {
    id: 'emotions-cards',
    title: 'بطاقات المشاعر والأحاسيس',
    description: 'بطاقات تعليمية للتعبير عن المشاعر المختلفة بلغة الإشارة.',
    type: 'PDF',
    size: '4.7 MB',
    downloads: '10.8k',
    rating: 4.6,
    icon: '😊',
    category: 'بطاقات',
    pages: 18,
    difficulty: 'سهل'
  },
  {
    id: 'numbers-poster',
    title: 'ملصق الأرقام التعليمي',
    description: 'ملصق كبير يعرض الأرقام من 1 إلى 100 بلغة الإشارة.',
    type: 'PDF',
    size: '3.2 MB',
    downloads: '13.4k',
    rating: 4.7,
    icon: '🔢',
    category: 'ملصقات',
    pages: 2,
    difficulty: 'سهل'
  }
]

const difficultyColors = {
  'سهل': 'bg-accent-100 text-accent-700 border-accent-200',
  'متوسط': 'bg-warm-100 text-warm-700 border-warm-200',
  'صعب': 'bg-pink-100 text-pink-700 border-pink-200'
}

const typeColors = {
  'PDF': 'bg-primary-100 text-primary-700 border-primary-200',
  'Word': 'bg-secondary-100 text-secondary-700 border-secondary-200',
  'Image': 'bg-purple-100 text-purple-700 border-purple-200'
}

export default function PrintablesGrid() {
  const [selectedCategory, setSelectedCategory] = useState('الكل')
  const [selectedDifficulty, setSelectedDifficulty] = useState('الكل')
  const [searchTerm, setSearchTerm] = useState('')
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [sortBy, setSortBy] = useState<'downloads' | 'rating' | 'newest'>('downloads')

  const categories = ['الكل', 'مجلات', 'تمارين', 'بطاقات', 'كتب', 'أنشطة', 'أطفال', 'مراجع', 'قصص', 'ملصقات']
  const difficulties = ['الكل', 'سهل', 'متوسط', 'صعب']

  // Filter and sort items
  let filteredItems = printableItems.filter(item => {
    const matchesCategory = selectedCategory === 'الكل' || item.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'الكل' || item.difficulty === selectedDifficulty
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesCategory && matchesDifficulty && matchesSearch
  })

  // Sort items
  filteredItems = filteredItems.sort((a, b) => {
    switch (sortBy) {
      case 'downloads':
        return parseFloat(b.downloads) - parseFloat(a.downloads)
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      default:
        return 0
    }
  })

  const featuredItems = printableItems.filter(item => item.isFeatured)

  const handleDownload = (itemId: string) => {
    const item = printableItems.find(i => i.id === itemId)
    // In a real app, this would trigger the actual download
    alert(`تحميل: ${item?.title}\nحجم الملف: ${item?.size}\n\nسيتم تحميل الملف قريباً...`)
  }

  const handlePreview = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const item = printableItems.find(i => i.id === itemId)
    alert(`معاينة: ${item?.title}\n\nسيتم فتح المعاينة في نافذة جديدة`)
  }

  const toggleFavorite = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const newFavorites = new Set(favorites)
    if (newFavorites.has(itemId)) {
      newFavorites.delete(itemId)
    } else {
      newFavorites.add(itemId)
    }
    setFavorites(newFavorites)
  }

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="space-y-12">
      {/* Featured Section */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-primary-500 mb-6 text-center">
          ⭐ المطبوعات المميزة
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredItems.slice(0, 3).map((item) => (
            <motion.div
              key={`featured-${item.id}`}
              className="bg-gradient-sunset rounded-xl p-6 text-white relative overflow-hidden cursor-pointer shadow-warm-glow"
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(245, 158, 11, 0.5)' }}
              onClick={() => handleDownload(item.id)}
            >
              <div className="relative z-10">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm opacity-90 mb-4 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">
                    {item.downloads} تحميل
                  </span>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDownload(item.id)
                    }}
                    className="bg-white text-primary-500 px-4 py-2 rounded-lg font-semibold text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    تحميل
                  </motion.button>
                </div>
              </div>
              <div className="absolute top-2 right-2">
                {item.isNew && (
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                    جديد
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ابحث في المطبوعات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-12 pl-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'downloads' | 'rating' | 'newest')}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500"
            >
              <option value="downloads">الأكثر تحميلاً</option>
              <option value="rating">الأعلى تقييماً</option>
              <option value="newest">الأحدث</option>
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-4 text-sm text-gray-600">
          تم العثور على {filteredItems.length} من أصل {printableItems.length} مطبوعة
        </div>
      </div>

      {/* Printables Grid */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            className="card group cursor-pointer relative"
            variants={itemVariants}
            onHoverStart={() => setHoveredItem(item.id)}
            onHoverEnd={() => setHoveredItem(null)}
            onClick={() => handleDownload(item.id)}
          >
            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              {item.isNew && (
                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  جديد
                </span>
              )}
              {item.isFeatured && (
                <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  مميز
                </span>
              )}
            </div>

            {/* Favorite Button */}
            <motion.button
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm"
              onClick={(e) => toggleFavorite(item.id, e)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart 
                className={`w-4 h-4 ${
                  favorites.has(item.id) 
                    ? 'text-red-500 fill-current' 
                    : 'text-gray-400'
                }`} 
              />
            </motion.button>

            {/* Content */}
            <div className="text-center mb-6">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gradient-rainbow mb-3 group-hover:animate-pulse transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {item.description}
              </p>
            </div>

            {/* Details */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">النوع:</span>
                <span className={`px-2 py-1 rounded border text-xs font-semibold ${typeColors[item.type]}`}>
                  {item.type}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">الصفحات:</span>
                <span className="font-semibold">{item.pages} صفحة</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">الحجم:</span>
                <span className="font-semibold">{item.size}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">المستوى:</span>
                <span className={`px-2 py-1 rounded border text-xs font-semibold ${difficultyColors[item.difficulty]}`}>
                  {item.difficulty}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1">
                <Download className="w-4 h-4" />
                <span>{item.downloads}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                <span>{item.rating}</span>
              </div>
              
              <motion.button
                onClick={(e) => handlePreview(item.id, e)}
                className="flex items-center gap-1 hover:text-primary-500 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Eye className="w-4 h-4" />
                <span>معاينة</span>
              </motion.button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <motion.button
                className="flex-1 btn-primary flex items-center justify-center gap-2 text-sm py-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.stopPropagation()
                  handleDownload(item.id)
                }}
              >
                <Download className="w-4 h-4" />
                تحميل
              </motion.button>
              
              <motion.button
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handlePreview(item.id, e)}
              >
                <Eye className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Hover Overlay */}
            <motion.div
              className="absolute inset-0 bg-primary-500/5 rounded-2xl pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredItem === item.id ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            لم يتم العثور على نتائج
          </h3>
          <p className="text-gray-500 mb-4">
            جرب تغيير معايير البحث أو الفلاتر
          </p>
          <motion.button
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('الكل')
              setSelectedDifficulty('الكل')
            }}
            className="btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            مسح جميع الفلاتر
          </motion.button>
        </motion.div>
      )}

      {/* Stats Section */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-xl">
        <h3 className="text-xl font-bold text-primary-500 mb-6 text-center">
          📊 إحصائيات المطبوعات
        </h3>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-primary-50 rounded-xl"
          >
            <div className="text-3xl font-bold text-primary-500 mb-2">
              {printableItems.length}+
            </div>
            <div className="text-gray-600">مطبوعات متاحة</div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-primary-50 rounded-xl"
          >
            <div className="text-3xl font-bold text-primary-500 mb-2">
              {Math.round(printableItems.reduce((sum, item) => sum + parseFloat(item.downloads), 0))}k+
            </div>
            <div className="text-gray-600">إجمالي التحميلات</div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-primary-50 rounded-xl"
          >
            <div className="text-3xl font-bold text-primary-500 mb-2">
              {(printableItems.reduce((sum, item) => sum + item.rating, 0) / printableItems.length).toFixed(1)}
            </div>
            <div className="text-gray-600">متوسط التقييم</div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-primary-50 rounded-xl"
          >
            <div className="text-3xl font-bold text-primary-500 mb-2">
              {categories.length - 1}
            </div>
            <div className="text-gray-600">فئة مختلفة</div>
          </motion.div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="bg-gradient-to-r from-[#e4592d] to-[#f2a71e] rounded-3xl p-8 shadow-xl text-white">
          <div className="text-4xl mb-4">📬</div>
          <h3 className="text-2xl font-bold mb-4">
            احصل على المطبوعات الجديدة أولاً!
          </h3>
          <p className="mb-6 max-w-2xl mx-auto">
            اشترك في نشرتنا البريدية للحصول على أحدث المطبوعات والموارد التعليمية مجاناً
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="flex-1 px-4 py-3 rounded-xl text-[#2a345c] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 bg-white"
            />
            <motion.button
              className="bg-[#2a345c] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1d2440] transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              اشترك الآن
            </motion.button>
          </div>
          <p className="text-sm mt-4">
            لن نشارك بريدك الإلكتروني مع أي جهة خارجية
          </p>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-xl">
        <h3 className="text-xl font-bold text-primary-500 mb-6 text-center">
          🚀 إجراءات سريعة
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <motion.button
            className="p-6 text-center border-2 border-dashed border-primary-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all"
            whileHover={{ scale: 1.02 }}
            onClick={() => {
              const popularItems = printableItems.filter(item => parseFloat(item.downloads) > 10)
              if (popularItems.length > 0) {
                const randomItem = popularItems[Math.floor(Math.random() * popularItems.length)]
                handleDownload(randomItem.id)
              }
            }}
          >
            <div className="text-3xl mb-3">🎲</div>
            <h4 className="font-semibold text-primary-600 mb-2">تحميل عشوائي</h4>
            <p className="text-sm text-gray-600">احصل على مطبوعة عشوائية من المجموعة الشائعة</p>
          </motion.button>

          <motion.button
            className="p-6 text-center border-2 border-dashed border-primary-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all"
            whileHover={{ scale: 1.02 }}
            onClick={() => {
              const favItems = Array.from(favorites)
              if (favItems.length > 0) {
                alert(`لديك ${favItems.length} مطبوعة في المفضلة`)
              } else {
                alert('لم تضف أي مطبوعة للمفضلة بعد')
              }
            }}
          >
            <div className="text-3xl mb-3">❤️</div>
            <h4 className="font-semibold text-primary-600 mb-2">المفضلة</h4>
            <p className="text-sm text-gray-600">عرض المطبوعات المحفوظة في المفضلة ({favorites.size})</p>
          </motion.button>

          <motion.button
            className="p-6 text-center border-2 border-dashed border-primary-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all"
            whileHover={{ scale: 1.02 }}
            onClick={() => {
              const allSizes = printableItems.map(item => parseFloat(item.size))
              const totalSize = allSizes.reduce((sum, size) => sum + size, 0)
              alert(`حجم جميع المطبوعات: ${totalSize.toFixed(1)} MB`)
            }}
          >
            <div className="text-3xl mb-3">📦</div>
            <h4 className="font-semibold text-primary-600 mb-2">تحميل الكل</h4>
            <p className="text-sm text-gray-600">احصل على جميع المطبوعات في ملف واحد</p>
          </motion.button>
        </div>
      </div>
    </div>
  )
}