import React from 'react';
import Card from '../../components/common/card/Card';

const About: React.FC = () => {
  const team = [
    { name: 'Chef Michael', role: 'Head Chef', icon: '👨‍🍳' },
    { name: 'Sarah Johnson', role: 'Pastry Chef', icon: '👩‍🍳' },
    { name: 'David Chen', role: 'Sous Chef', icon: '👨‍🍳' },
    { name: 'Emily White', role: 'Manager', icon: '👩‍💼' }
  ];

  const values = [
    { title: 'Quality', icon: '⭐', description: 'We never compromise on ingredient quality' },
    { title: 'Passion', icon: '❤️', description: 'Cooking is our art and passion' },
    { title: 'Service', icon: '🤝', description: 'Your satisfaction is our priority' },
    { title: 'Innovation', icon: '💡', description: 'Always creating new exciting flavors' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-500 to-purple-600 pt-40 pb-24 px-8 text-center text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-fade-in-up">About Us</h1>
          <p className="text-xl md:text-2xl opacity-95 animate-fade-in-up-delay">
            Discover our story and passion for culinary excellence
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-800">Our Story</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                Founded in 2010, Delicious Restaurant has been serving the community with 
                exceptional cuisine and warm hospitality. What started as a small family 
                restaurant has grown into a beloved dining destination.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                Our commitment to using fresh, locally-sourced ingredients and traditional 
                cooking methods has remained unchanged. Every dish tells a story, and every 
                meal is a celebration of flavors.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Today, we continue to innovate while honoring our roots, creating memorable 
                dining experiences for our guests every single day.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-md aspect-square bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl flex items-center justify-center text-9xl shadow-2xl shadow-red-500/30 animate-float">
                🏪
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-center text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} hover>
                <div className="text-center">
                  <div className="text-6xl mb-4">{value.icon}</div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-800">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-center text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Meet Our Team
          </h2>
          <p className="text-center text-xl text-gray-600 mb-12">
            The talented people behind your favorite dishes
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} hover>
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-6xl shadow-lg shadow-indigo-500/30">
                    {member.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800">{member.name}</h3>
                  <p className="text-gray-600 text-lg">{member.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-8">
          <Card>
            <div className="text-center p-8">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Our Mission
              </h2>
              <p className="text-gray-600 text-xl leading-relaxed">
                To create unforgettable dining experiences through exceptional food, 
                outstanding service, and a welcoming atmosphere. We believe that great 
                food brings people together and creates lasting memories.
              </p>
            </div>
          </Card>
        </div>
      </section>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease;
        }
        .animate-fade-in-up-delay {
          animation: fade-in-up 0.8s ease 0.2s backwards;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default About;