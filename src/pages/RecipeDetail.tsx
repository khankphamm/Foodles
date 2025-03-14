
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetMealByIdQuery } from '@/services/mealService';
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Clock, Flame, Users, ChefHat, ArrowLeft, Bookmark, Share2, ThumbsUp } from 'lucide-react';

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: recipe, isLoading, error } = useGetMealByIdQuery(id || '');

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, [id]);

  // Parse ingredients and measures into a combined array
  const getIngredients = () => {
    if (!recipe) return [];
    
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}` as keyof typeof recipe];
      const measure = recipe[`strMeasure${i}` as keyof typeof recipe];
      
      if (ingredient && ingredient.trim() !== '') {
        ingredients.push({
          name: ingredient,
          measure: measure || 'To taste'
        });
      }
    }
    
    return ingredients;
  };

  // Split instructions into steps
  const getInstructionSteps = () => {
    if (!recipe?.instructions) return [];
    return recipe.instructions
      .split(/\r\n|\n|\r/)
      .filter(step => step.trim() !== '')
      .map(step => step.trim());
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-culinary-50">
        <Navbar />
        <div className="pt-24 pb-16 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="mb-6">
              <Skeleton className="h-8 w-40" />
            </div>
            <Skeleton className="h-12 w-3/4 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Skeleton className="aspect-video w-full rounded-xl mb-8" />
                <Skeleton className="h-10 w-1/2 mb-6" />
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-6 w-full" />
                  ))}
                </div>
              </div>
              <div>
                <Skeleton className="h-10 w-2/3 mb-6" />
                <div className="space-y-4">
                  {[...Array(8)].map((_, i) => (
                    <Skeleton key={i} className="h-6 w-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen flex flex-col bg-culinary-50">
        <Navbar />
        <div className="pt-24 pb-16 px-4 md:px-6">
          <div className="container mx-auto text-center py-16">
            <h2 className="text-3xl font-serif font-bold text-culinary-800 mb-4">
              Recipe Not Found
            </h2>
            <p className="text-culinary-600 mb-8">
              We couldn't find the recipe you're looking for. It may have been removed or doesn't exist.
            </p>
            <Link 
              to="/recipes" 
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Recipes
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const ingredients = getIngredients();
  const instructionSteps = getInstructionSteps();

  return (
    <div className="min-h-screen flex flex-col bg-culinary-50">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 md:px-6">
        <div className="container mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-culinary-500">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link to="/recipes" className="hover:text-primary transition-colors">Recipes</Link>
              <span>/</span>
              <Link to={`/category/${recipe.category}`} className="hover:text-primary transition-colors">{recipe.category}</Link>
              <span>/</span>
              <span className="text-culinary-900 font-medium truncate max-w-[150px] sm:max-w-xs">{recipe.title}</span>
            </div>
          </div>
          
          {/* Recipe Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-culinary-800 mb-8">
            {recipe.title}
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Recipe Image */}
              <div className="rounded-xl overflow-hidden mb-8">
                <img 
                  src={recipe.image} 
                  alt={recipe.title}
                  className="w-full aspect-video object-cover"
                />
              </div>
              
              {/* Recipe Info */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-primary" />
                  <span className="text-culinary-700">{recipe.time}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Flame 
                    size={20} 
                    className={recipe.difficulty === 'Easy' ? 'text-green-500' : recipe.difficulty === 'Medium' ? 'text-amber-500' : 'text-red-500'} 
                  />
                  <span className="text-culinary-700">{recipe.difficulty}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Users size={20} className="text-primary" />
                  <span className="text-culinary-700">{recipe.servings} servings</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <ChefHat size={20} className="text-primary" />
                  <span className="text-culinary-700">By {recipe.chef}</span>
                </div>
                
                {recipe.area && (
                  <div className="flex items-center gap-2">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-primary rounded-full">
                      {recipe.area} Cuisine
                    </span>
                  </div>
                )}
              </div>
              
              {/* Recipe Actions */}
              <div className="flex flex-wrap gap-4 mb-8">
                <button className="flex items-center gap-2 bg-white border border-culinary-200 text-culinary-700 px-4 py-2 rounded-md hover:bg-culinary-50 transition-colors">
                  <Bookmark size={18} />
                  <span>Save Recipe</span>
                </button>
                
                <button className="flex items-center gap-2 bg-white border border-culinary-200 text-culinary-700 px-4 py-2 rounded-md hover:bg-culinary-50 transition-colors">
                  <Share2 size={18} />
                  <span>Share</span>
                </button>
                
                <button className="flex items-center gap-2 bg-white border border-culinary-200 text-culinary-700 px-4 py-2 rounded-md hover:bg-culinary-50 transition-colors">
                  <ThumbsUp size={18} />
                  <span>Like</span>
                </button>
              </div>
              
              {/* Instructions */}
              <div className="mb-10">
                <h2 className="text-2xl font-serif font-bold text-culinary-800 mb-6">
                  Instructions
                </h2>
                
                <div className="space-y-6">
                  {instructionSteps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-culinary-700">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Tags */}
              {recipe.tags && recipe.tags.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-serif font-semibold text-culinary-800 mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {recipe.tags.map((tag, index) => (
                      <span key={index} className="bg-culinary-100 text-culinary-700 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="lg:sticky lg:top-24 self-start">
              {/* Ingredients */}
              <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                <h2 className="text-xl font-serif font-bold text-culinary-800 mb-6">
                  Ingredients
                  <span className="text-sm font-normal text-culinary-500 ml-2">
                    ({ingredients.length} items)
                  </span>
                </h2>
                
                <ul className="space-y-3">
                  {ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-3 pb-3 border-b border-culinary-100 last:border-0">
                      <div className="w-10 h-10 rounded-full bg-culinary-100 flex items-center justify-center overflow-hidden">
                        <img 
                          src={`https://www.themealdb.com/images/ingredients/${ingredient.name}.png`} 
                          alt={ingredient.name}
                          className="w-6 h-6 object-contain"
                          onError={(e) => {
                            // If image fails to load, show a fallback
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <span className="text-culinary-800 font-medium">{ingredient.name}</span>
                      </div>
                      <div className="text-culinary-600 text-sm">
                        {ingredient.measure}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* YouTube Video */}
              {recipe.youtube && (
                <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                  <h3 className="text-xl font-serif font-bold text-culinary-800 mb-4">
                    Watch Video Tutorial
                  </h3>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${recipe.youtube.split('v=')[1]}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
              
              {/* Source */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-serif font-bold text-culinary-800 mb-4">
                  Recipe from TheMealDB
                </h3>
                <p className="text-culinary-600 mb-4">
                  This recipe is sourced from TheMealDB, a community-driven recipe database.
                </p>
                <Link 
                  to="/recipes" 
                  className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/90 transition-colors"
                >
                  <ArrowLeft size={18} />
                  Back to Recipes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RecipeDetail;
