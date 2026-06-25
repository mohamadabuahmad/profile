import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Apps from './pages/Apps';  // Import the new Apps page
import About from './pages/About';
import Contact from './pages/Contact';
import LandingPage from './pages/landingpage';
import Services from './pages/Services';
import MainLayout from './layouts/MainLayout';
const AppRouter = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apps" element={<Apps />} />  {/* New route for Apps page */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-services" element={<LandingPage />} />
          <Route path="/services" element={<Services />} />
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