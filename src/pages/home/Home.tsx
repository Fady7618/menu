import React from 'react';
import HeroSection from '../../components/features/hero/HeroSection';
import Card from '../../components/common/card/Card';
import Button from '../../components/common/button/Button';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const features = [
    {
      icon: '👨‍🍳',
      title: 'Expert Chefs',
      description: 'Our team of talented chefs brings years of culinary expertise'
    },
    {
      icon: '🥗',
      title: 'Fresh Ingredients',
      description: 'We source only the finest and freshest local ingredients'
    },
    {
      icon: '⭐',
      title: 'Premium Quality',
      description: 'Every dish is crafted with attention to detail and passion'
    },
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Quick and reliable delivery right to your doorstep'
    }
  ];

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-center text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Why Choose Us
          </h2>
          <p className="text-center text-xl text-gray-600 mb-12">
            We are committed to providing the best dining experience
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} hover>
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-bounce-slow">{feature.icon}</div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-8 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-95">
            Explore our delicious menu and discover your new favorite dish
          </p>
          <Link to="/menu">
            <Button size="large">Browse Menu</Button>
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;