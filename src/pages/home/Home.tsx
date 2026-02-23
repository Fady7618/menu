import React from 'react';
import HeroSection from '../../components/features/hero/HeroSection';
import OurStorySection from '../../components/features/story/OurStorySection';
import MenuSection from '../../components/features/menu/MenuSection';
import EventsSection from '../../components/features/events/EventsSection';
import ReservationsSection from '../../components/features/reservation/ReservationSection';

const Home: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen">
        <HeroSection />
      </section>

      {/* Our Story Section */}
      <section className="min-h-screen">
        <OurStorySection />
      </section>

      {/* Menu Section */}
      <section className="min-h-screen">
        <MenuSection />
      </section>

      {/* Events Section */}
      <section className="min-h-screen">
        <EventsSection />
      </section>

      {/* Reservations Section */}
      <section className="min-h-screen">
        <ReservationsSection />
      </section>
    </>
  );
};

export default Home;