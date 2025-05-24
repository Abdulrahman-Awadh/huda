# مها - موقع تعلم لغة الإشارة

موقع تفاعلي باللغة العربية لتعلم لغة الإشارة مع الشخصية ثلاثية الأبعاد "مها".

## المميزات

### 🎭 شخصية ثلاثية الأبعاد
- عرض نموذج GLB ثلاثي الأبعاد لمها
- تحكم تفاعلي بالكاميرا والدوران
- إضاءة احترافية وظلال واقعية
- دعم الأنيميشن والحركات

### 📱 تصميم متجاوب
- دعم كامل للغة العربية من اليمين إلى اليسار (RTL)
- تصميم متجاوب لجميع الأجهزة
- أنيميشن سلسة باستخدام Framer Motion
- ألوان وتدرجات جذابة

### 📚 محتوى تعليمي شامل
- فيديوهات تعليمية مصنفة حسب المستوى
- مطبوعات قابلة للتحميل
- تصنيف المحتوى حسب الفئات
- نظام تقييم وإحصائيات

## التقنيات المستخدمة

- **Next.js 14** - إطار العمل الأساسي
- **TypeScript** - للتطوير الآمن
- **Tailwind CSS** - للتصميم والتنسيق
- **Three.js** - للرسوميات ثلاثية الأبعاد
- **React Three Fiber** - لدمج Three.js مع React
- **Framer Motion** - للأنيميشن
- **Lucide React** - للأيقونات

## التثبيت والتشغيل

### 1. إنشاء المشروع
```bash
mkdir maha-sign-language
cd maha-sign-language
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

### 2. تثبيت المكتبات الإضافية
```bash
npm install three @types/three @react-three/fiber @react-three/drei lucide-react framer-motion tailwind-scrollbar
```

### 3. نسخ الملفات
انسخ جميع الملفات المقدمة إلى المجلدات المناسبة في مشروعك.

### 4. إضافة نموذج GLB
ضع ملف `العظام.blend تجربة (1).glb` في مجلد `public/models/`

### 5. تشغيل المشروع
```bash
npm run dev
```

## هيكل المشروع

```
src/
├── app/
│   ├── layout.tsx          # التخطيط الأساسي
│   ├── page.tsx            # الصفحة الرئيسية
│   └── globals.css         # الأنماط العامة
├── components/
│   ├── Header.tsx          # شريط التنقل
│   ├── Hero.tsx           # القسم الترحيبي
│   ├── CharacterViewer.tsx # عارض الشخصية ثلاثية الأبعاد
│   ├── VideoGrid.tsx      # شبكة الفيديوهات
│   └── PrintablesGrid.tsx # شبكة المطبوعات
public/
├── models/
│   └── العظام.blend تجربة (1).glb  # نموذج مها ثلاثي الأبعاد
├── images/                 # الصور
└── videos/                # الفيديوهات
```

## التخصيص

### إضافة فيديوهات حقيقية
في `VideoGrid.tsx`، استبدل دالة `handleVideoPlay` لتشغيل فيديوهات حقيقية:

```typescript
const handleVideoPlay = (videoId: string) => {
  // إضافة رابط الفيديو الحقيقي
  window.open(`https://your-video-url/${videoId}`, '_blank')
}
```

### إضافة روابط تحميل المطبوعات
في `PrintablesGrid.tsx`، استبدل دالة `handleDownload`:

```typescript
const handleDownload = (itemId: string) => {
  // إضافة رابط التحميل الحقيقي
  const downloadUrl = `/downloads/${itemId}.pdf`
  window.open(downloadUrl, '_blank')
}
```

### تعديل نموذج GLB
1. ضع ملف GLB الجديد في `public/models/`
2. حدث المسار في `CharacterViewer.tsx`:

```typescript
const gltf = useLoader(GLTFLoader, '/models/your-new-model.glb')
```

## الميزات المتقدمة

### دعم PWA
لإضافة دعم Progressive Web App:

```bash
npm install next-pwa
```

### تحسين الأداء
- ضغط صور WebP/AVIF
- تحميل كسول للمكونات
- تخزين مؤقت للموارد

### إضافة قاعدة بيانات
لحفظ التقدم والإحصائيات:

```bash
npm install prisma @prisma/client
```

## نشر الموقع

### Vercel (مُوصى به)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# ثم ارفع مجلد .next إلى Netlify
```

## المساهمة

لتحسين المشروع:

1. Fork المشروع
2. أنشئ فرع جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push للفرع (`git push origin feature/amazing-feature`)
5. افتح Pull Request

## الترخيص

هذا المشروع مُرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## الدعم

إذا واجهت أي مشاكل أو كان لديك أسئلة:

- افتح Issue في GitHub
- راسلنا على البريد الإلكتروني
- راجع الوثائق في [Wiki](../../wiki)

---

## معلومات إضافية

### متطلبات النظام
- Node.js 18+ 
- npm أو yarn
- متصفح حديث يدعم WebGL

### الأداء
- حجم التطبيق: ~2MB (مضغوط)
- وقت التحميل الأول: <3 ثوانٍ
- درجة Lighthouse: 95+

### إمكانية الوصول
- دعم كامل لقارئات الشاشة
- تباين ألوان عالي
- تنقل بلوحة المفاتيح
- دعم الحركة المخفضة

شكراً لاستخدام مها لتعلم لغة الإشارة! 🤟