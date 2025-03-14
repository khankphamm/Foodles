import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroImage {
  url: string;
  title: string;
  description: string;
}

const heroImages: HeroImage[] = [
  {
    url: 'https://images.unsplash.com/photo-1498579809087-ef1e558fd1da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Savoring the Art of Cooking',
    description: 'Discover exquisite recipes that blend tradition with innovation'
  },
  {
    url: 'https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Fresh Ingredients, Bold Flavors',
    description: 'Explore our collection of seasonal recipes crafted with care'
  },
  {
    url: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Culinary Adventures Await',
    description: 'Journey through global cuisines from the comfort of your kitchen'
  }
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Preload the first image
    const img = new Image();
    img.src = heroImages[0].url;
    img.onload = () => setIsLoaded(true);

    // Start the rotation
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Function to handle hero navigation
  const handleNavigate = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="relative h-[100vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Images with Animation */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 bg-cover bg-center bg-no-repeat ${
              currentIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${image.url})` }}
          >
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      {/* Content Container */}
      <div className="container relative z-10 h-full mx-auto px-4 md:px-6 flex flex-col justify-center items-center text-center">
        <div className="max-w-3xl">
          <div className="animate-slideDown">
            <span className="inline-block py-1 px-3 mb-6 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium tracking-wide text-sm">
              Culinary Magic for Food Lovers
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white text-shadow-lg mb-6 animate-slideUp">
            {heroImages[currentIndex].title}
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-8 animate-slideUp max-w-2xl mx-auto">
            {heroImages[currentIndex].description}
          </p>

          <div className="animate-slideUp">
            <Link 
              to="/recipes?type=all" 
              className="bg-white text-primary hover:bg-primary hover:text-white transition-colors duration-300 py-3 px-8 rounded-md font-medium inline-flex items-center gap-2 shadow-lg"
            >
              Explore Recipes
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => handleNavigate(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
