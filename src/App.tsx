import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useRef, useEffect } from 'react';
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';
import Loader from './components/common/loader/Loader';
import { ScrollSmoother } from './utils/gsap';

const Home = lazy(() => import('./pages/home/Home'));
const Menu = lazy(() => import('./pages/menu/Menu'));
const About = lazy(() => import('./pages/about/About'));
const NotFound = lazy(() => import('./pages/notfound/NotFound'));

function AppContent() {
  const smoothWrapper = useRef<HTMLDivElement>(null);
  const smoothContent = useRef<HTMLDivElement>(null);

  // Initialize ScrollSmoother globally
  useEffect(() => {
    if (!smoothWrapper.current || !smoothContent.current) return;

    const smoother = ScrollSmoother.create({
      wrapper: smoothWrapper.current,
      content: smoothContent.current,
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.1,
    });

    return () => {
      smoother.kill();
    };
  }, []);

  return (
    <>
      {/* Global fixed particle dots background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.5,
        }}
      />

      <Header />

      <div id="smooth-wrapper" ref={smoothWrapper}>
        <div id="smooth-content" ref={smoothContent}>
          <Suspense fallback={<Loader fullScreen />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/menu/:category" element={<Menu />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;