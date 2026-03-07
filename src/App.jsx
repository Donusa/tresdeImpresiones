import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import ProjectsCarousel from './components/ProjectsCarousel';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <ProjectsCarousel />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
