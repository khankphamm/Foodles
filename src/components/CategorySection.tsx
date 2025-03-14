import React from 'react';
import { Link } from 'react-router-dom';
import { useGetCategoriesQuery } from '@/services/mealService';
import { Skeleton } from "@/components/ui/skeleton";
// Remove CategoryMeals import since it doesn't exist yet

const CategorySection = () => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  // Hiển thị skeleton trong khi đang tải
  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <Skeleton className="h-6 w-48 mx-auto mb-3" />
            <Skeleton className="h-10 w-72 mx-auto mb-4" />
            <Skeleton className="h-4 w-full max-w-2xl mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className="h-64 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Hiển thị thông báo lỗi nếu có
  if (error) {
    console.error('Error fetching categories:', error);
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-culinary-800 mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-culinary-600 mb-6">
            We couldn't load the categories. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="inline-block py-1 px-3 mb-3 rounded-full bg-secondary text-primary text-sm font-medium">
            Find what you're looking for
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-culinary-800 mb-4">
            Browse by Category
          </h2>
          <p className="text-culinary-600 max-w-2xl mx-auto">
            Explore our diverse collection of recipes, meticulously organized to help you discover your next culinary adventure.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories?.map((category) => (
            <Link 
              key={category.id}
              to="/recipes?type=all"
              className="group relative h-64 rounded-lg overflow-hidden"
            >
              <div className="absolute inset-0">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>
              
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-white font-serif text-xl font-bold mb-1 text-shadow">
                  {category.name}
                </h3>
                <p className="text-white/80 text-sm">
                  View recipes
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
