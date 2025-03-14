import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Award, Users, Heart, Utensils, ChefHat, Clock } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-culinary-50">
      <Navbar />

      <div className="pt-24 pb-16 px-4 md:px-6">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="mb-16 text-center">
            <span className="inline-block py-1 px-3 mb-3 rounded-full bg-secondary text-primary text-sm font-medium">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-culinary-800 mb-4">
              Our Culinary Journey
            </h1>
            <p className="max-w-3xl mx-auto text-culinary-600">
              Discover the passionate team behind Culinary Magic and our mission to bring delicious,
              accessible recipes to food lovers around the world.
            </p>
          </div>

          {/* Story Section with Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-primary font-medium">Our Story</span>
              <h2 className="text-3xl font-serif font-bold text-culinary-800 mb-6 mt-2">
                From Home Kitchen to Your Screens
              </h2>
              <p className="text-culinary-600 mb-4">
                Culinary Magic started in 2015 as a small personal blog by Emma Green, sharing family recipes
                and kitchen experiments. What began as a passion project quickly grew into a community of
                food enthusiasts sharing techniques, tips, and culinary traditions from around the world.
              </p>
              <p className="text-culinary-600 mb-4">
                Today, our team of professional chefs, food photographers, and passionate home cooks work
                together to create reliable, tested recipes that inspire people to discover the joy of cooking.
              </p>
              <p className="text-culinary-600">
                Every recipe on Culinary Magic is carefully developed, tested multiple times, and
                photographed in-house to ensure you get consistently delicious results in your own kitchen.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="rounded-lg overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Our team cooking together"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <span className="text-primary font-medium">Our Values</span>
              <h2 className="text-3xl font-serif font-bold text-culinary-800 mt-2">
                What Drives Our Culinary Passion
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                  <Utensils size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-culinary-800 mb-3">
                  Culinary Excellence
                </h3>
                <p className="text-culinary-600">
                  We believe in creating recipes that not only taste delicious but are also
                  approachable for cooks of all skill levels.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                  <Users size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-culinary-800 mb-3">
                  Community Connection
                </h3>
                <p className="text-culinary-600">
                  Food brings people together. We foster a supportive community where cooks can
                  share experiences and learn from each other.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                  <Heart size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-culinary-800 mb-3">
                  Passion for Ingredients
                </h3>
                <p className="text-culinary-600">
                  We celebrate quality ingredients and sustainable food practices, encouraging
                  mindful cooking and eating.
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <div className="text-center">
              <span className="text-primary font-medium">About Me</span>
              <h2 className="text-3xl font-serif font-bold text-culinary-800 mt-2">
                The Chef Behind The Recipes
              </h2>
              <p className="text-culinary-600 mt-4 max-w-2xl mx-auto">
                Hi, I'm Khanh Pham. I'm passionate about creating and sharing delicious recipes
                that bring joy to people's kitchens. With years of culinary experience,
                I'm here to help you discover the magic of cooking.
              </p>
            </div>

            <div className="flex justify-center items-center mt-4">
              <div className="text-center max-w-sm">
                <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                  <img
                    src="https://res.cloudinary.com/dfhpxjibw/image/upload/v1741866590/4292a322574c8ee7e2e7da880741666f_rokbaw.jpg"
                    alt="Khanh Pham"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-serif font-semibold text-culinary-800">Khanh Pham</h3>
                <p className="text-primary">Founder & Head Chef</p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white p-10 rounded-xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Award size={24} className="text-primary" />
                </div>
                <h3 className="text-4xl font-serif font-bold text-culinary-800 mb-2">5+</h3>
                <p className="text-culinary-600">Years of Experience</p>
              </div>

              <div>
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Utensils size={24} className="text-primary" />
                </div>
                <h3 className="text-4xl font-serif font-bold text-culinary-800 mb-2">500+</h3>
                <p className="text-culinary-600">Tested Recipes</p>
              </div>

              <div>
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <ChefHat size={24} className="text-primary" />
                </div>
                <h3 className="text-4xl font-serif font-bold text-culinary-800 mb-2">15</h3>
                <p className="text-culinary-600">Professional Chefs</p>
              </div>

              <div>
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Clock size={24} className="text-primary" />
                </div>
                <h3 className="text-4xl font-serif font-bold text-culinary-800 mb-2">10k+</h3>
                <p className="text-culinary-600">Cooking Hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
