import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react';
import { AppState, WeightEntry, WorkoutLogEntry, DailyChallenge, FoodEntry } from '../types';
import { loadState, saveState } from '../services/storage';
import { calculateLevel } from '../constants/gamification';
import { getTodayStr } from '../services/gamification';

const initialState: AppState = {
  profile: {
    name: '',
    targetWeight: 70,
    currentXP: 0,
    currentLevel: 1,
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: '',
    createdAt: getTodayStr(),
  },
  weightEntries: [],
  workoutLog: [],
  foodEntries: [],
  unlockedAchievements: [],
  dailyChallenges: [],
  settings: {
    reminderEnabled: false,
    reminderHour: 9,
    reminderMinute: 0,
    weightUnit: 'kg',
    dailyCalorieGoal: 2000,
  },
  onboarded: false,
  adsRemoved: false,
};

type Action =
  | { type: 'HYDRATE'; payload: AppState }
  | { type: 'SET_ONBOARDED'; payload: { name: string; targetWeight: number } }
  | { type: 'UPDATE_PROFILE'; payload: Partial<AppState['profile']> }
  | { type: 'ADD_WEIGHT_ENTRY'; payload: WeightEntry }
  | { type: 'DELETE_WEIGHT_ENTRY'; payload: string }
  | { type: 'LOG_WORKOUT'; payload: WorkoutLogEntry }
  | { type: 'ADD_FOOD_ENTRY'; payload: FoodEntry }
  | { type: 'DELETE_FOOD_ENTRY'; payload: string }
  | { type: 'ADD_XP'; payload: number }
  | { type: 'UNLOCK_ACHIEVEMENTS'; payload: string[] }
  | { type: 'SET_DAILY_CHALLENGE'; payload: DailyChallenge }
  | { type: 'COMPLETE_DAILY_CHALLENGE'; payload: string }
  | { type: 'UPDATE_STREAK'; payload: { streak: number; date: string } }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<AppState['settings']> }
  | { type: 'REMOVE_ADS' };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'HYDRATE':
      return action.payload;

    case 'SET_ONBOARDED':
      return {
        ...state,
        onboarded: true,
        profile: {
          ...state.profile,
          name: action.payload.name,
          targetWeight: action.payload.targetWeight,
          createdAt: getTodayStr(),
          lastActiveDate: getTodayStr(),
        },
      };

    case 'UPDATE_PROFILE':
      return { ...state, profile: { ...state.profile, ...action.payload } };

    case 'ADD_WEIGHT_ENTRY':
      return { ...state, weightEntries: [action.payload, ...state.weightEntries] };

    case 'DELETE_WEIGHT_ENTRY':
      return { ...state, weightEntries: state.weightEntries.filter(e => e.id !== action.payload) };

    case 'LOG_WORKOUT':
      return { ...state, workoutLog: [action.payload, ...state.workoutLog] };

    case 'ADD_FOOD_ENTRY':
      return { ...state, foodEntries: [action.payload, ...state.foodEntries] };

    case 'DELETE_FOOD_ENTRY':
      return { ...state, foodEntries: state.foodEntries.filter(e => e.id !== action.payload) };

    case 'ADD_XP': {
      const newXP = state.profile.currentXP + action.payload;
      const newLevel = calculateLevel(newXP);
      return {
        ...state,
        profile: { ...state.profile, currentXP: newXP, currentLevel: newLevel },
      };
    }

    case 'UNLOCK_ACHIEVEMENTS':
      return {
        ...state,
        unlockedAchievements: [...state.unlockedAchievements, ...action.payload],
      };

    case 'SET_DAILY_CHALLENGE': {
      const existing = state.dailyChallenges.find(c => c.date === action.payload.date);
      if (existing) return state;
      return { ...state, dailyChallenges: [action.payload, ...state.dailyChallenges].slice(0, 30) };
    }

    case 'COMPLETE_DAILY_CHALLENGE':
      return {
        ...state,
        dailyChallenges: state.dailyChallenges.map(c =>
          c.id === action.payload ? { ...c, completed: true } : c
        ),
      };

    case 'UPDATE_STREAK': {
      const longestStreak = Math.max(state.profile.longestStreak, action.payload.streak);
      return {
        ...state,
        profile: {
          ...state.profile,
          currentStreak: action.payload.streak,
          longestStreak,
          lastActiveDate: action.payload.date,
        },
      };
    }

    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };

    case 'REMOVE_ADS':
      return { ...state, adsRemoved: true };

    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType>({
  state: initialState,
  dispatch: () => {},
  isLoading: true,
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = React.useState(true);
  const isHydrated = useRef(false);

  useEffect(() => {
    (async () => {
      const saved = await loadState<AppState>();
      if (saved) {
        dispatch({ type: 'HYDRATE', payload: saved });
      }
      isHydrated.current = true;
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (isHydrated.current) {
      saveState(state);
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch, isLoading }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  return useContext(AppContext);
}
