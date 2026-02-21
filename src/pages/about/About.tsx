import React from 'react';

const VALUES = [
  { title: 'No Shortcuts', body: 'We dry-age our beef for a minimum of 28 days. We render our own stocks. We never sacrifice time for convenience.' },
  { title: 'Provenance', body: 'Every ingredient on our menu has a name, an address, and a story. We know our farmers, fishers, and foragers personally.' },
  { title: 'The Fire', body: 'Open-fire cooking is not a trend for us — it is the foundation. Hardwood. Cast iron. Smoke. These are our tools.' },
  { title: 'Hospitality', body: 'A perfect meal is inseparable from the people who serve it. Our team trains for months before their first table.' },
];

const TEAM = [
  { name: 'Marcus Reyes', role: 'Executive Chef & Founder', img: 'https://images.unsplash.com/photo-1583394293214-90b96cfe9aa2?w=400&q=80&fit=crop' },
  { name: 'Lena Fischer', role: 'Head Sommelier', img: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&q=80&fit=crop' },
  { name: 'James Okafor', role: 'Sous Chef', img: 'https://images.unsplash.com/photo-1540492649367-c8565a571e4b?w=400&q=80&fit=crop' },
  { name: 'Priya Nair', role: 'Pastry Chef', img: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=400&q=80&fit=crop' },
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg text-white">
      {/* Hero */}
      <div className="relative h-[70vh] flex items-end pb-16 px-8 md:px-16 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80&fit=crop"
          alt="Restaurant interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <p className="font-serif text-rust italic text-xl mb-3">About us</p>
          <h1
            className="font-display font-bold text-white"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            The Ember &amp; Oak<br />
            <span className="italic">Story</span>
          </h1>
        </div>
      </div>

      {/* Our Story prose */}
      <section className="max-w-3xl mx-auto px-8 md:px-0 py-20">
        <p className="font-sans font-light text-white/70 text-lg leading-loose">
          In 2009, chef Marcus Reyes converted a forgotten rail-yard warehouse on the edge of the city
          into what would become the most talked-about dining room in the region. His bet was simple:
          that fire — honest, unpredictable, ancient — was the only cooking technique that
          could not be franchised, copied, or automated.
        </p>
        <p className="font-sans font-light text-white/70 text-lg leading-loose mt-6">
          Sixteen years later, The Ember &amp; Oak holds two Michelin stars and remains
          exactly as it began — a single open kitchen, a hardwood fire, and a team of cooks
          who believe the best meal you've ever had is still ahead of you.
        </p>
      </section>

      {/* Values */}
      <section className="bg-white/3 border-t border-b border-white/10 py-20 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <p className="font-serif text-rust italic text-xl mb-3">What we stand for</p>
          <h2
            className="font-display font-bold text-white mb-12"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((v) => (
              <div key={v.title} className="border-t border-white/10 pt-6">
                <h3 className="font-display font-bold text-white text-xl mb-3">{v.title}</h3>
                <p className="font-sans font-light text-white/50 text-sm leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <p className="font-serif text-rust italic text-xl mb-3">The people</p>
          <h2
            className="font-display font-bold text-white mb-12"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Our Team
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {TEAM.map((member) => (
              <div key={member.name} className="group">
                <div className="aspect-square overflow-hidden mb-4">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <p className="font-display font-bold text-white">{member.name}</p>
                <p className="font-sans font-light text-white/40 text-sm mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;