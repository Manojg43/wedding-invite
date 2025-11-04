import React from 'react';
import HeroSection from './components/HeroSection';
import Gallery from './components/Gallery';
import RSVPForm from './components/RSVPForm';
import Footer from './components/Footer';

function App() {
  // Prepare all your image links:
  const images = Array.from({ length: 10 }, (_, i) => `/images/couple${i + 1}.jpg`);
  return (
    <>
      <HeroSection mainImage="/images/couple1.jpg" />
      <Gallery images={images} />
      <RSVPForm />
      <Footer />
    </>
  );
}
export default App;
