
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RecipeCard from '@/components/RecipeCard';
import { Search, Filter } from 'lucide-react';
import { useGetCategoriesQuery, useSearchMealsQuery } from '@/services/mealService';
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from '@/hooks/useDebounce';

const Recipes = () => {
  const [searchParams] = useSearchParams();
  const urlSearchTerm = searchParams.get('search') || '';
  const urlCategoryTerm = searchParams.get('category') || '';
  const [searchTerm, setSearchTerm] = useState(urlSearchTerm);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [selectedCategory, setSelectedCategory] = useState(urlCategoryTerm || 'All');
  
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: searchResults = [], isLoading: isSearching } = useSearchMealsQuery(
    debouncedSearchTerm || 'a', // Send 'a' to get results when there's no keyword
    { skip: !debouncedSearchTerm && selectedCategory !== 'All' }
  );
  
  // Set search term and category from URL params when component mounts or URL changes
  useEffect(() => {
    if (urlSearchTerm) {
      setSearchTerm(urlSearchTerm);
    }
    
    if (urlCategoryTerm) {
      setSelectedCategory(urlCategoryTerm);
    }
  }, [urlSearchTerm, urlCategoryTerm]);
  
  // Filter results by category if needed
  const filteredRecipes = selectedCategory === 'All' 
    ? searchResults 
    : searchResults.filter(recipe => recipe.category === selectedCategory);

  // Create category list from API and add "All" at the beginning
  const categoryOptions = ['All', ...(categories?.map(cat => cat.name) || [])];

  return (
    <div className="min-h-screen flex flex-col bg-culinary-50">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <span className="inline-block py-1 px-3 mb-3 rounded-full bg-secondary text-primary text-sm font-medium">
              Discover
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-culinary-800 mb-4">
              Our Recipes
            </h1>
            <p className="max-w-2xl mx-auto text-culinary-600">
              Explore our collection of delicious recipes, from quick weeknight dinners to impressive party dishes
            </p>
          </div>
          
          <div className="mb-10 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="w-full md:w-80 relative">
              <input
                type="text"
                placeholder="Search recipes..."
                className="w-full py-3 pl-4 pr-12 rounded-md border border-culinary-200 focus:outline-none focus:ring-1 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-culinary-400" />
            </div>
            
            <div className="w-full md:w-auto flex flex-wrap justify-center gap-2">
              {categoryOptions.map(category => (
                <button
                  key={category}
                  className={`px-4 py-2 text-sm rounded-full transition-colors ${
                    selectedCategory === category 
                      ? 'bg-primary text-white' 
                      : 'bg-white text-culinary-600 hover:bg-culinary-100'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {isSearching ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <Skeleton className="w-full h-48" />
                  <div className="p-5">
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map(recipe => (
                <RecipeCard
                  key={recipe.id}
                  {...recipe}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-serif font-semibold text-culinary-800 mb-2">
                No recipes found
              </h3>
              <p className="text-culinary-600">
                Try adjusting your search or filter to find what you're looking for
              </p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Recipes;
