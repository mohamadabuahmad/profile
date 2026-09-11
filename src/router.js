import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Apps from './pages/Apps';  // Import the new Apps page
import About from './pages/About';
import Contact from './pages/Contact';
import LandingPage from './pages/landingpage';
import MainLayout from './layouts/MainLayout';

// The services page is large and published in three languages: load the page code and only
// the visitor's language when visited.
const LOCALE_LOADERS = {
  en: () => import(/* webpackChunkName: "services-en" */ './pages/services/locales/en.json'),
  ar: () => import(/* webpackChunkName: "services-ar" */ './pages/services/locales/ar.json'),
  he: () => import(/* webpackChunkName: "services-he" */ './pages/services/locales/he.json'),
};
const servicesIn = (locale) =>
  lazy(() =>
    Promise.all([import(/* webpackChunkName: "services" */ './pages/services/ServicesPage'), LOCALE_LOADERS[locale]()]).then(
      ([page, content]) => ({ default: () => <page.default locale={locale} content={content.default} /> })
    )
  );
const SERVICES = { en: servicesIn('en'), ar: servicesIn('ar'), he: servicesIn('he') };

const servicesRoute = (locale) => (
  <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
    {React.createElement(SERVICES[locale])}
  </Suspense>
);

const AppRouter = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apps" element={<Apps />} />  {/* New route for Apps page */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-services" element={<LandingPage />} />
          <Route path="/services" element={servicesRoute('en')} />
          <Route path="/ar/services" element={servicesRoute('ar')} />
          <Route path="/he/services" element={servicesRoute('he')} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default AppRouter;


// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
// import Apps from './pages/Apps';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import LandingPage from './pages/landingpage';
// import MainLayout from './layouts/MainLayout';

// const AppRouter = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* 👇 Landing page without MainLayout */}
//         <Route path="/" element={<LandingPage />} />

//         {/* 👇 Other pages wrapped with MainLayout */}
//         <Route
//           path="*"
//           element={
//             <MainLayout>
//               <Routes>
//                 <Route path="/home" element={<Home />} />
//                 <Route path="/apps" element={<Apps />} />
//                 <Route path="/about" element={<About />} />
//                 <Route path="/contact" element={<Contact />} />
//               </Routes>
//             </MainLayout>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default AppRouter;