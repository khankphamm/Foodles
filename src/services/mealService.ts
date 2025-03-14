
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
}

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface MealResponse {
  meals: Meal[];
}

export interface CategoriesResponse {
  categories: Category[];
}

// Create a recipe from Meal API data
export const convertMealToRecipe = (meal: Meal) => {
  // Get difficulty based on number of ingredients
  const ingredientsCount = Object.keys(meal)
    .filter(key => key.startsWith('strIngredient') && meal[key as keyof Meal])
    .length;
  
  let difficulty = 'Easy';
  if (ingredientsCount > 10) {
    difficulty = 'Hard';
  } else if (ingredientsCount > 5) {
    difficulty = 'Medium';
  }

  // Estimate cooking time based on difficulty
  let time = '30 min';
  if (difficulty === 'Hard') {
    time = '60 min';
  } else if (difficulty === 'Medium') {
    time = '45 min';
  }

  // Process tags if present
  const tags = meal.strTags ? meal.strTags.split(',').map(tag => tag.trim()) : [];

  return {
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory,
    time,
    difficulty,
    servings: 4,
    chef: 'MealDB Chef',
    instructions: meal.strInstructions,
    area: meal.strArea,
    tags,
    youtube: meal.strYoutube
  };
};

// Các hàm trực tiếp để fetching dữ liệu
export const fetchRandom = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const data = await response.json();
  return data.meals.map(convertMealToRecipe);
};

export const fetchCategories = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
  const data = await response.json();
  return data.categories.map((category: Category) => ({
    id: category.strCategory.toLowerCase(),
    name: category.strCategory,
    image: category.strCategoryThumb,
    count: 0, // API không cung cấp số lượng món ăn trong mỗi danh mục
    description: category.strCategoryDescription
  }));
};

export const fetchMealsByCategory = async (category: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  
  if (!data.meals) return [];
  
  // Vì filter API chỉ trả về thông tin cơ bản, ta cần lấy thêm chi tiết cho mỗi món ăn
  const detailedMeals = await Promise.all(
    data.meals.map(async (meal: { idMeal: string, strMeal: string, strMealThumb: string }) => {
      const detailResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
      const detailData = await detailResponse.json();
      if (detailData.meals && detailData.meals.length > 0) {
        return convertMealToRecipe(detailData.meals[0]);
      }
      // Nếu không lấy được chi tiết, tạo một recipe đơn giản từ thông tin cơ bản
      return {
        id: meal.idMeal,
        title: meal.strMeal,
        image: meal.strMealThumb,
        category,
        time: '30 min',
        difficulty: 'Medium',
        servings: 4,
        chef: 'MealDB Chef'
      };
    })
  );
  
  return detailedMeals;
};

export const searchMeals = async (term: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
  const data = await response.json();
  
  if (!data.meals) return [];
  
  return data.meals.map(convertMealToRecipe);
};

export const fetchMealById = async (id: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  
  if (!data.meals) return null;
  
  return convertMealToRecipe(data.meals[0]);
};

// Sử dụng RTK Query để quản lý cache và loading states
export const mealApi = createApi({
  reducerPath: 'mealApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.themealdb.com/api/json/v1/1/' }),
  endpoints: (builder) => ({
    getRandomMeals: builder.query<any[], number>({
      queryFn: async (count) => {
        try {
          // Vì API random chỉ trả về 1 món ăn mỗi lần, ta cần gọi nhiều lần
          const promises = Array(count).fill(0).map(() => fetchRandom());
          const results = await Promise.all(promises);
          // Làm phẳng mảng kết quả
          return { data: results.flat() };
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } };
        }
      }
    }),
    getCategories: builder.query<any[], void>({
      queryFn: async () => {
        try {
          const categories = await fetchCategories();
          return { data: categories };
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } };
        }
      }
    }),
    getMealsByCategory: builder.query<any[], string>({
      queryFn: async (category) => {
        try {
          const meals = await fetchMealsByCategory(category);
          return { data: meals };
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } };
        }
      }
    }),
    searchMeals: builder.query<any[], string>({
      queryFn: async (term) => {
        try {
          const meals = await searchMeals(term);
          return { data: meals };
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } };
        }
      }
    }),
    getMealById: builder.query<any, string>({
      queryFn: async (id) => {
        try {
          const meal = await fetchMealById(id);
          return { data: meal };
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } };
        }
      }
    })
  })
});


export const { 
  useGetRandomMealsQuery, 
  useGetCategoriesQuery, 
  useGetMealsByCategoryQuery, 
  useSearchMealsQuery,
  useGetMealByIdQuery
} = mealApi;
