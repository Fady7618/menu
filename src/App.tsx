import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Header from './components/layout/header/Header';
import Loader from './components/common/loader/Loader';

const Home = lazy(() => import('./pages/home/Home'));
const Menu = lazy(() => import('./pages/menu/Menu'));
const About = lazy(() => import('./pages/about/About'));
const NotFound = lazy(() => import('./pages/notfound/NotFound'));

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<Loader fullScreen />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu/:category" element={<Menu />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;