// Languages the services page is published in, and the site chrome (navbar/footer) strings
// needed on those pages. Kept tiny because it ships in the main bundle; page copy lives in
// src/pages/services/locales/*.json and loads with the page.

export const LOCALES = {
  en: { dir: 'ltr', name: 'English', servicesPath: '/services' },
  ar: { dir: 'rtl', name: 'العربية', servicesPath: '/ar/services' },
  he: { dir: 'rtl', name: 'עברית', servicesPath: '/he/services' },
};

export const LOCALE_ORDER = ['en', 'ar', 'he'];

export const localeFromPath = (pathname) => {
  const first = pathname.split('/')[1];
  return first === 'ar' || first === 'he' ? first : 'en';
};

export const CHROME = {
  en: {
    nav: { home: 'Home', services: 'Services', projects: 'Projects', about: 'About', contact: 'Contact' },
    toggleTheme: 'Toggle theme',
    toggleMenu: 'Toggle menu',
    tagline: 'AI, automation and custom software, built around real business problems.',
    navigate: 'Navigate',
    connect: 'Connect',
    rights: 'All rights reserved.',
  },
  ar: {
    nav: { home: 'الرئيسية', services: 'الخدمات', projects: 'المشاريع', about: 'نبذة', contact: 'تواصل' },
    toggleTheme: 'تبديل المظهر',
    toggleMenu: 'فتح القائمة',
    tagline: 'حلول ذكاء اصطناعي وأتمتة وبرمجيات مخصّصة، تُبنى حول مشاكل الأعمال الحقيقية.',
    navigate: 'تصفّح',
    connect: 'تواصل',
    rights: 'جميع الحقوق محفوظة.',
  },
  he: {
    nav: { home: 'ראשי', services: 'שירותים', projects: 'פרויקטים', about: 'אודות', contact: 'יצירת קשר' },
    toggleTheme: 'החלפת ערכת צבע',
    toggleMenu: 'פתיחת תפריט',
    tagline: 'פתרונות בינה מלאכותית, אוטומציה ותוכנה בהתאמה אישית — שנבנים סביב בעיות עסקיות אמיתיות.',
    navigate: 'ניווט',
    connect: 'יצירת קשר',
    rights: 'כל הזכויות שמורות.',
  },
};
