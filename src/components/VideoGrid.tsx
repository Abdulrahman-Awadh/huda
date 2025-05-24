'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Clock, Star, Users } from 'lucide-react'

interface VideoItem {
  id: string
  title: string
  description: string
  duration: string
  difficulty: 'مبتدئ' | 'متوسط' | 'متقدم'
  views: string
  thumbnail: string
  category: string
}

const videoItems: VideoItem[] = [
  {
    id: 'basic-greetings',
    title: 'التحيات الأساسية',
    description: 'تعلموا التحيات الضرورية مثل "السلام عليكم" و"صباح الخير" و"كيف حالك؟" وأكثر.',
    duration: '5:30',
    difficulty: 'مبتدئ',
    views: '15.2k',
    thumbnail: '🤝',
    category: 'أساسيات'
  },
  {
    id: 'alphabet',
    title: 'أبجدية لغة الإشارة',
    description: 'أتقنوا الأبجدية الكاملة بلغة الإشارة مع عروض هدى الواضحة.',
    duration: '12:45',
    difficulty: 'مبتدئ',
    views: '23.7k',
    thumbnail: '🔤',
    category: 'أساسيات'
  },
  {
    id: 'numbers',
    title: 'الأرقام من ١ إلى ٢٠',
    description: 'عدوا من ١ إلى ٢٠ باستخدام لغة الإشارة مع تعليمات سهلة المتابعة.',
    duration: '8:15',
    difficulty: 'مبتدئ',
    views: '18.9k',
    thumbnail: '🔢',
    category: 'أساسيات'
  },
  {
    id: 'family',
    title: 'إشارات العائلة',
    description: 'تعلموا إشارات أفراد العائلة: أم، أب، أخت، أخ، وأكثر.',
    duration: '10:20',
    difficulty: 'متوسط',
    views: '12.4k',
    thumbnail: '👨‍👩‍👧‍👦',
    category: 'العائلة'
  },
  {
    id: 'emotions',
    title: 'المشاعر والأحاسيس',
    description: 'عبروا عن المشاعر مثل السعادة والحزن والإثارة والدهشة من خلال لغة الإشارة.',
    duration: '14:30',
    difficulty: 'متوسط',
    views: '20.1k',
    thumbnail: '😊',
    category: 'التعبير'
  },
  {
    id: 'daily-activities',
    title: 'الأنشطة اليومية',
    description: 'إشارات للأنشطة اليومية مثل الأكل والنوم والعمل واللعب.',
    duration: '16:45',
    difficulty: 'متقدم',
    views: '9.8k',
    thumbnail: '🏃‍♀️',
    category: 'الحياة اليومية'
  },
  {
    id: 'colors',
    title: 'الألوان',
    description: 'تعلموا كيفية التعبير عن جميع الألوان الأساسية والثانوية بلغة الإشارة.',
    duration: '7:20',
    difficulty: 'مبتدئ',
    views: '14.3k',
    thumbnail: '🌈',
    category: 'أساسيات'
  },
  {
    id: 'food',
    title: 'الطعام والشراب',
    description: 'إشارات للأطعمة والمشروبات المختلفة التي نستخدمها يومياً.',
    duration: '11:10',
    difficulty: 'متوسط',
    views: '16.7k',
    thumbnail: '🍽️',
    category: 'الحياة اليومية'
  },
  {
    id: 'weather',
    title: 'حالة الطقس',
    description: 'وصف أحوال الطقس المختلفة من مشمس وممطر وغائم بلغة الإشارة.',
    duration: '6:40',
    difficulty: 'متوسط',
    views: '11.5k',
    thumbnail: '☀️',
    category: 'الطبيعة'
  }
]

const difficultyColors = {
  'مبتدئ': 'bg-accent-100 text-accent-700 border border-accent-200',
  'متوسط': 'bg-warm-100 text-warm-700 border border-warm-200',
  'متقدم': 'bg-pink-100 text-pink-700 border border-pink-200'
}

export default function VideoGrid() {
  const [selectedCategory, setSelectedCategory] = useState('الكل')
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null)

  const categories = ['الكل', 'أساسيات', 'العائلة', 'التعبير', 'الحياة اليومية', 'الطبيعة']

  const filteredVideos = selectedCategory === 'الكل' 
    ? videoItems 
    : videoItems.filter(video => video.category === selectedCategory)

  const handleVideoPlay = (videoId: string) => {
    // Here you would implement the actual video playback
    alert(`تشغيل الفيديو: ${videoItems.find(v => v.id === videoId)?.title}`)
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
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-white/80 text-gray-700 hover:bg-primary-50 hover:text-primary-600'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Videos Grid */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {filteredVideos.map((video) => (
          <motion.div
            key={video.id}
            className="card group cursor-pointer"
            variants={itemVariants}
            onHoverStart={() => setHoveredVideo(video.id)}
            onHoverEnd={() => setHoveredVideo(null)}
            onClick={() => handleVideoPlay(video.id)}
          >
            {/* Video Thumbnail */}
            <div className="relative mb-4 bg-gradient-sunset rounded-xl h-48 flex items-center justify-center overflow-hidden">
              <div className="text-6xl group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                {video.thumbnail}
              </div>
              
              {/* Play Button Overlay */}
              <motion.div
                className="absolute inset-0 bg-black/30 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredVideo === video.id ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-primary-500 mr-1" fill="currentColor" />
                </div>
              </motion.div>

              {/* Duration Badge */}
              <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-lg text-sm flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {video.duration}
              </div>

              {/* Difficulty Badge */}
              <div className={`absolute top-3 left-3 px-2 py-1 rounded-lg text-sm font-semibold ${difficultyColors[video.difficulty]}`}>
                {video.difficulty}
              </div>
            </div>

            {/* Video Info */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gradient-sunset group-hover:text-gradient-rainbow transition-all duration-300">
                {video.title}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                {video.description}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{video.views} مشاهدة</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                  <span>4.8</span>
                </div>
              </div>

              {/* Category Tag */}
              <div className="flex justify-start">
                <span className="bg-gradient-to-r from-secondary-100 to-accent-100 text-secondary-700 px-3 py-1 rounded-full text-xs font-semibold border border-secondary-200/50">
                  {video.category}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredVideos.length === 0 && (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            لا توجد فيديوهات في هذه الفئة
          </h3>
          <p className="text-gray-500">
            جرب فئة أخرى أو ارجع إلى "الكل"
          </p>
        </motion.div>
      )}

      {/* Call to Action */}
      <motion.div 
        className="text-center mt-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-primary-500 mb-4">
            هل تريد المزيد من الدروس؟
          </h3>
          <p className="text-gray-600 mb-6">
            اشترk في قناتنا للحصول على أحدث دروس لغة الإشارة مع هدى
          </p>
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            اشترك الآن
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}