import { useCallback } from 'react';
import { useAppState } from '../context/AppContext';
import { FoodEntry, FoodItem, MealType } from '../types';
import { XP_REWARDS } from '../constants/gamification';
import { checkNewAchievements, getTodayStr } from '../services/gamification';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

export function useFoodLog() {
  const { state, dispatch } = useAppState();

  const addEntry = useCallback((food: FoodItem, mealType: MealType, quantity: number = 1) => {
    const entry: FoodEntry = {
      id: generateId(),
      date: getTodayStr(),
      mealType,
      food,
      quantity,
    };
    dispatch({ type: 'ADD_FOOD_ENTRY', payload: entry });
    dispatch({ type: 'ADD_XP', payload: XP_REWARDS.LOG_FOOD });

    // Check achievements
    const updatedState = {
      ...state,
      foodEntries: [entry, ...state.foodEntries],
    };
    const newAchievements = checkNewAchievements(updatedState);
    if (newAchievements.length > 0) {
      dispatch({ type: 'UNLOCK_ACHIEVEMENTS', payload: newAchievements });
    }

    return entry;
  }, [state, dispatch]);

  const deleteEntry = useCallback((id: string) => {
    dispatch({ type: 'DELETE_FOOD_ENTRY', payload: id });
  }, [dispatch]);

  const getTodayEntries = useCallback(() => {
    const today = getTodayStr();
    return state.foodEntries.filter(e => e.date === today);
  }, [state.foodEntries]);

  const getTodayCalories = useCallback(() => {
    const todayEntries = getTodayEntries();
    return todayEntries.reduce((sum, e) => sum + (e.food.calories * e.quantity), 0);
  }, [getTodayEntries]);

  const getTodayMacros = useCallback(() => {
    const todayEntries = getTodayEntries();
    return {
      protein: todayEntries.reduce((sum, e) => sum + ((e.food.protein || 0) * e.quantity), 0),
      carbs: todayEntries.reduce((sum, e) => sum + ((e.food.carbs || 0) * e.quantity), 0),
      fat: todayEntries.reduce((sum, e) => sum + ((e.food.fat || 0) * e.quantity), 0),
    };
  }, [getTodayEntries]);

  const getTodayByMeal = useCallback((mealType: MealType) => {
    return getTodayEntries().filter(e => e.mealType === mealType);
  }, [getTodayEntries]);

  const getMealCalories = useCallback((mealType: MealType) => {
    return getTodayByMeal(mealType).reduce((sum, e) => sum + (e.food.calories * e.quantity), 0);
  }, [getTodayByMeal]);

  return {
    entries: state.foodEntries,
    addEntry,
    deleteEntry,
    getTodayEntries,
    getTodayCalories,
    getTodayMacros,
    getTodayByMeal,
    getMealCalories,
    calorieGoal: state.settings.dailyCalorieGoal,
  };
}
