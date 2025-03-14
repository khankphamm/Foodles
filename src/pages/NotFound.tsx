
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-culinary-50">
      <Navbar />
      
      <div className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center max-w-md">
          <h1 className="text-8xl font-serif font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-serif font-semibold text-culinary-800 mb-6">Page Not Found</h2>
          <p className="text-culinary-600 mb-8">
            We couldn't find the page you're looking for. Perhaps you'd like to explore our delicious recipes instead?
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-primary text-white hover:bg-primary/90 transition-colors py-3 px-6 rounded-md font-medium"
          >
            <Home size={18} />
            Back to Homepage
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
