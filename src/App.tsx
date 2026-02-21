import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Layout components (loaded immediately)
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';
import Loader from './components/common/loader/Loader';

// Lazy load pages for performance (code splitting)
const Home = lazy(() => import('./pages/home/Home'));
const Menu = lazy(() => import('./pages/menu/Menu'));
const About = lazy(() => import('./pages/about/About'));
const NotFound = lazy(() => import('./pages/notfound/NotFound'));

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/* Header appears on all pages */}
        <Header />
        
        {/* Main content area with suspense for lazy loading */}
        <main className="main-content">
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* Define all routes */}
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<About />} />
              
              {/* Optional: Menu with category filter */}
              <Route path="/menu/:category" element={<Menu />} />
              
              {/* 404 catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        
        {/* Footer appears on all pages */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;