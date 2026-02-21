import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MenuItemCard from '../../components/features/menu/MenuItemCard';
import Loader from '../../components/common/loader/Loader';
import { useMenu } from '../../hooks/useMenu';
import { getCategories } from '../../services/menuService';
import type { MenuCategory } from '../../types/MenuCategory';

const Menu: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<MenuCategory[]>([]);

  const { data: items, loading, error } = useMenu({
    category,
    availableOnly: true,
  });

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-white pt-24 pb-20 px-8 md:px-16">
      {/* Heading */}
      <div className="max-w-7xl mx-auto mb-12">
        <p className="font-serif text-rust italic text-xl mb-3">
          {category ? `Browsing` : `Explore all`}
        </p>
        <h1
          className="font-display font-bold text-white"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          {category ? category : 'Our Menu'}
        </h1>
      </div>

      {/* Category tabs */}
      {categories.length > 0 && (
        <div className="max-w-7xl mx-auto mb-12 flex flex-wrap gap-3">
          <button
            onClick={() => navigate('/menu')}
            className={`px-5 py-2 text-xs uppercase tracking-[0.2em] font-sans border transition-all duration-200 ${
              !category
                ? 'border-rust text-rust'
                : 'border-white/20 text-white/50 hover:border-white/60 hover:text-white'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => navigate(`/menu/${encodeURIComponent(cat.name)}`)}
              className={`px-5 py-2 text-xs uppercase tracking-[0.2em] font-sans border transition-all duration-200 ${
                category === cat.name
                  ? 'border-rust text-rust'
                  : 'border-white/20 text-white/50 hover:border-white/60 hover:text-white'
              }`}
            >
              {cat.name} <span className="text-white/30 ml-1">({cat.count})</span>
            </button>
          ))}
        </div>
      )}

      {/* States */}
      {loading && <Loader fullScreen />}

      {error && (
        <div className="max-w-7xl mx-auto text-center py-20">
          <p className="font-serif text-rust italic text-2xl mb-3">Something went wrong.</p>
          <p className="font-sans font-light text-white/40">{error.message}</p>
        </div>
      )}

      {!loading && !error && items?.length === 0 && (
        <div className="max-w-7xl mx-auto text-center py-20">
          <p className="font-serif text-rust italic text-2xl">Nothing here yet.</p>
        </div>
      )}

      {!loading && !error && items && items.length > 0 && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;