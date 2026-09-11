// Facts shared by every language version of the page (and read by scripts/prerender-seo.js).
module.exports = {
  siteUrl: 'https://www.mohamaddev.com',
  email: 'mohamdadm25@gmail.com',
  phone: { label: '+972 54-236-6982', href: 'tel:+972542366982' },
  // The lead email goes to Mohamad, so its labels are always English, whatever the page language.
  emailLabels: {
    needs: {
      ai: 'AI Solution',
      automation: 'Automation / Integration',
      web: 'Website / E-Commerce',
      webapp: 'Web Application',
      mobile: 'Mobile Application',
      unsure: 'Not Sure Yet',
    },
    budgets: {
      unsure: 'Not sure yet',
      lt2k: 'Under $2,000',
      '2k-5k': '$2,000 – $5,000',
      '5k-15k': '$5,000 – $15,000',
      '15k+': '$15,000+',
    },
  },
  // Only these scripts need an extra web font; Latin uses Inter / Space Grotesk.
  fonts: {
    ar: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap',
    he: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Hebrew:wght@400;500;600;700&display=swap',
  },
};
