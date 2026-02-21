import React from 'react';
import type { MenuItem } from '../../../types/MenuItem';

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => (
  <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    {item.imageUrl ? (
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
    ) : (
      <div className="w-full h-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-4xl">
        🍽️
      </div>
    )}
    <div className="p-4">
      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="font-bold text-gray-900 text-lg leading-tight">{item.name}</h3>
        <span className="text-indigo-600 font-bold text-lg shrink-0">{item.formattedPrice}</span>
      </div>
      <p className="text-gray-500 text-sm mb-3 line-clamp-2">{item.description}</p>
      <span className="inline-block bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full">
        {item.category}
      </span>
    </div>
  </div>
);

export default MenuItemCard;