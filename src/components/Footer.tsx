import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  const currentYear = new Date().getFullYear();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const mailtoLink = `mailto:${email}?subject=Subscribe to Culinary Magic Newsletter&body=Hello,%0D%0A%0D%0AI would like to subscribe to the Culinary Magic newsletter.%0D%0A%0D%0AThank you!`;
    
    window.location.href = mailtoLink;
    
    toast({
      title: "Opening email application",
      description: "Please send the email to complete your subscription",
    });
    
    setEmail('');
  };

  return (
    <footer className="bg-culinary-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <h2 className="text-2xl font-serif font-bold tracking-tight">
                <span className="text-white">Culinary</span>
                <span className="text-secondary ml-1">Magic</span>
              </h2>
            </Link>
            <p className="text-culinary-300 mb-6">
              Discover the art of cooking with our curated collection of recipes, cooking tips, and culinary adventures.
            </p>
            <div className="flex items-center space-x-4">
              <a href="https://www.facebook.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook" 
                className="text-culinary-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com/ " 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Twitter" 
                className="text-culinary-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram" 
                className="text-culinary-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="YouTube" 
                className="text-culinary-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-culinary-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/recipes" className="text-culinary-300 hover:text-white transition-colors">
                  Recipes
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-culinary-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-5">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/recipes?type=all" className="text-culinary-300 hover:text-white transition-colors">
                  Breakfast
                </Link>
              </li>
              <li>
                <Link to="/recipes?type=all" className="text-culinary-300 hover:text-white transition-colors">
                  Lunch & Dinner
                </Link>
              </li>
              <li>
                <Link to="/recipes?type=all" className="text-culinary-300 hover:text-white transition-colors">
                  Desserts
                </Link>
              </li>
              <li>
                <Link to="/recipes?type=all" className="text-culinary-300 hover:text-white transition-colors">
                  Vegetarian
                </Link>
              </li>
              <li>
                <Link to="/recipes?type=all" className="text-culinary-300 hover:text-white transition-colors">
                  Quick & Easy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-5">Subscribe</h3>
            <p className="text-culinary-300 mb-4">
              Join our newsletter to receive the latest recipes and tips.
            </p>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-culinary-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-culinary-700 text-white placeholder-culinary-400 border-culinary-600 rounded-md py-2 pl-10 pr-3 focus:ring-1 focus:ring-secondary focus:border-secondary"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-secondary text-primary hover:bg-secondary/90 transition-colors py-2 px-4 rounded-md font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-culinary-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-culinary-400 text-sm mb-4 md:mb-0">
              © {currentYear} Culinary Magic. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link to="/terms" className="text-culinary-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-culinary-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/sitemap" className="text-culinary-400 hover:text-white text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
