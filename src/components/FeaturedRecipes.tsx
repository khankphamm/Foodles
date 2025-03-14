
import React from 'react';
import RecipeCard from './RecipeCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetRandomMealsQuery } from '@/services/mealService';
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedRecipes = () => {
  const { data: recipes, isLoading, error } = useGetRandomMealsQuery(5);

  // Hiển thị skeleton trong khi đang tải
  if (isLoading) {
    return (
      <section className="py-16 bg-culinary-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap items-center justify-between mb-10">
            <div>
              <Skeleton className="h-6 w-48 mb-3" />
              <Skeleton className="h-10 w-72" />
            </div>
            <Skeleton className="h-8 w-36 mt-4 md:mt-0" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(5)].map((_, index) => (
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
        </div>
      </section>
    );
  }

  // Hiển thị thông báo lỗi nếu có
  if (error) {
    console.error('Error fetching recipes:', error);
    return (
      <section className="py-16 bg-culinary-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-serif font-bold text-culinary-800 mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-culinary-600 mb-6">
            We couldn't load the featured recipes. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-culinary-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-wrap items-center justify-between mb-10">
          <div>
            <span className="inline-block py-1 px-3 mb-3 rounded-full bg-secondary text-primary text-sm font-medium">
              Hand-picked by our chefs
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-culinary-800">
              Featured Recipes
            </h2>
          </div>
          
          <Link to="/recipes" className="inline-flex items-center gap-2 font-medium text-primary hover:text-culinary-700 transition-colors mt-4 md:mt-0">
            View all recipes
            <ArrowRight size={18} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes?.map((recipe, index) => (
            <RecipeCard 
              key={recipe.id}
              {...recipe}
              featured={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecipes;
