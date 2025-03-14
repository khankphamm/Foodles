import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedRecipes from '@/components/FeaturedRecipes';
import CategorySection from '@/components/CategorySection';
import Footer from '@/components/Footer';
import { ChevronDown } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    // Smooth scroll setup
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      });
    });

    // Add fade-in animation for sections
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('section:not(.hero-section)').forEach(section => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToContent = () => {
    const contentSection = document.getElementById('featured');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Thêm hàm xử lý submit form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailInput = e.currentTarget.querySelector('input[type="email"]') as HTMLInputElement;
    const email = emailInput.value;
    
    // Tạo mailto link với subject và body
    const mailtoLink = `mailto:${email}?subject=Subscribe to Culinary Magic&body=Thank you for subscribing to our newsletter!`;
    
    // Mở ứng dụng email
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Scroll Down Indicator */}
      <div className="relative z-10 -mt-16 flex justify-center">
        <button 
          onClick={scrollToContent}
          className="flex flex-col items-center gap-2 text-culinary-700 hover:text-primary transition-colors"
          aria-label="Scroll down"
        >
          <span className="text-sm font-medium">Scroll Down</span>
          <div className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center animate-pulse">
            <ChevronDown size={18} />
          </div>
        </button>
      </div>
      
      {/* Featured Recipes Section */}
      <div id="featured">
        <FeaturedRecipes />
      </div>
      
      {/* Categories Section */}
      <CategorySection />
      
      {/* Newsletter Section */}
      <section className="py-16 bg-culinary-50 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative rounded-2xl bg-primary overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-culinary-pattern"></div>
            
            <div className="relative py-14 px-6 md:px-12 lg:px-16 text-center">
              <span className="inline-block py-1 px-3 mb-3 rounded-full bg-secondary text-primary text-sm font-medium">
                Stay inspired
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Join Our Culinary Community
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter and get weekly curated recipes, cooking tips, and exclusive content delivered straight to your inbox.
              </p>
              
              <form 
                className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
                onSubmit={handleSubmit}  // Thêm handler
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-md border-white/20 bg-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-primary hover:bg-secondary transition-colors px-6 py-3 rounded-md font-medium"
                >
                  Subscribe
                </button>
              </form>
              
              <p className="mt-4 text-white/60 text-sm">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Instagram Feed Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <span className="inline-block py-1 px-3 mb-3 rounded-full bg-secondary text-primary text-sm font-medium">
              #CulinaryMagic
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-culinary-800 mb-4">
              Follow Us on Instagram
            </h2>
            <p className="text-culinary-600 max-w-2xl mx-auto">
              Tag your culinary creations with #CulinaryMagic for a chance to be featured.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {[
              {
                img: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                link: 'https://www.instagram.com/'
              },
              {
                img: 'https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                link: 'https://www.instagram.com/'
              },
              {
                img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                link: 'https://www.instagram.com/'
              },
              {
                img: 'https://images.unsplash.com/photo-1457301353672-324d6d14f471?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                link: 'https://www.instagram.com/'
              },
              {
                img: 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                link: 'https://www.instagram.com/'
              },
              {
                img: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                link: 'https://www.instagram.com/'
              },
            ].map((item, index) => (
              <a 
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block aspect-square overflow-hidden rounded-md"
              >
                <div className="w-full h-full relative">
                  <img 
                    src={item.img}
                    alt="Instagram post"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-medium">View on Instagram</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
