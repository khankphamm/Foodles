
import React, { useState } from 'react';
import { Clock, Flame, Users, ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RecipeCardProps {
  id: string;
  title: string;
  image: string;
  category: string;
  time: string;
  difficulty: string;
  servings: number;
  chef: string;
  featured?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  id,
  title,
  image,
  category,
  time,
  difficulty,
  servings,
  chef,
  featured = false
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link 
      to={`/recipe/${id}`}
      className={`recipe-card group block overflow-hidden rounded-lg bg-white shadow-sm transition-all ${
        featured ? 'md:col-span-2 lg:col-span-2 h-full' : ''
      }`}
    >
      <div className={`relative ${featured ? 'aspect-[16/9]' : 'aspect-[3/2]'} overflow-hidden`}>
        <div className={`lazy-image w-full h-full bg-culinary-100 ${imageLoaded ? 'loaded' : ''}`}>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-white/90 backdrop-blur-xs rounded-full">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-serif text-xl font-semibold text-culinary-800 mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center gap-4 text-culinary-600 text-sm mb-4">
          <div className="flex items-center gap-1.5">
            <Clock size={16} />
            <span>{time}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <Flame size={16} className={difficulty === 'Easy' ? 'text-green-500' : difficulty === 'Medium' ? 'text-amber-500' : 'text-red-500'} />
            <span>{difficulty}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <Users size={16} />
            <span>{servings}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-culinary-100 flex items-center justify-center">
            <ChefHat size={14} className="text-culinary-600" />
          </div>
          <span className="text-sm text-culinary-600">By {chef}</span>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
