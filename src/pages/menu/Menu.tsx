import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMenu } from '../../hooks/useMenu';
import { getCategories } from '../../services/menuService';
import type { MenuCategory } from '../../types/MenuCategory';
import Loader from '../../components/common/loader/Loader';
import MenuItemCard from '../../components/features/menu/MenuItemCard';

const Menu: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<MenuCategory[]>([]);

  const { data: menuItems, loading, error } = useMenu({
    category,
    availableOnly: !category,
  });

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-500 to-purple-600 min-h-[40vh] flex items-center justify-center pt-32 pb-16 px-8 text-center text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Our Menu</h1>
          <p className="text-xl md:text-2xl opacity-90">Fresh ingredients, crafted with care</p>
        </div>
      </section>

      {/* Category tabs */}
      {categories.length > 0 && (
        <div className="sticky top-0 z-10 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-8 py-3 flex gap-3 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => navigate('/menu')}
              className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                !category ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-indigo-100'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => navigate(`/menu/${encodeURIComponent(cat.name)}`)}
                className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  category?.toLowerCase() === cat.name.toLowerCase()
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-indigo-100'
                }`}
              >
                {cat.name}
                <span className="ml-1 text-xs opacity-70">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {loading && <Loader />}

        {error && (
          <div className="text-center py-20 text-red-500">
            <p className="text-xl font-semibold">Failed to load menu</p>
            <p className="text-sm mt-2">{error.message}</p>
          </div>
        )}

        {!loading && !error && menuItems?.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">No items available in this category.</p>
          </div>
        )}

        {!loading && !error && menuItems && menuItems.length > 0 && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {menuItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;