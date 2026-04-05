import { useCallback } from 'react';
import { useAppState } from '../context/AppContext';
import { WeightEntry } from '../types';
import { XP_REWARDS } from '../constants/gamification';
import { checkNewAchievements, getTodayStr } from '../services/gamification';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

export function useWeightLog() {
  const { state, dispatch } = useAppState();

  const addEntry = useCallback((weight: number, note?: string) => {
    const entry: WeightEntry = {
      id: generateId(),
      date: getTodayStr(),
      weight,
      note,
    };
    dispatch({ type: 'ADD_WEIGHT_ENTRY', payload: entry });
    dispatch({ type: 'ADD_XP', payload: XP_REWARDS.LOG_WEIGHT });

    // Check achievements after adding
    const updatedState = {
      ...state,
      weightEntries: [entry, ...state.weightEntries],
      profile: { ...state.profile, currentXP: state.profile.currentXP + XP_REWARDS.LOG_WEIGHT },
    };
    const newAchievements = checkNewAchievements(updatedState);
    if (newAchievements.length > 0) {
      dispatch({ type: 'UNLOCK_ACHIEVEMENTS', payload: newAchievements });
    }

    return entry;
  }, [state, dispatch]);

  const deleteEntry = useCallback((id: string) => {
    dispatch({ type: 'DELETE_WEIGHT_ENTRY', payload: id });
  }, [dispatch]);

  const getLatestWeight = useCallback((): number | null => {
    if (state.weightEntries.length === 0) return null;
    return state.weightEntries[0].weight;
  }, [state.weightEntries]);

  const getWeightChange = useCallback((): number | null => {
    if (state.weightEntries.length < 2) return null;
    return state.weightEntries[0].weight - state.weightEntries[1].weight;
  }, [state.weightEntries]);

  const getChartData = useCallback((days: number = 30) => {
    const entries = [...state.weightEntries]
      .reverse()
      .slice(-days);
    return {
      labels: entries.map(e => {
        const parts = e.date.split('-');
        return `${parts[2]}/${parts[1]}`;
      }),
      data: entries.map(e => e.weight),
    };
  }, [state.weightEntries]);

  return {
    entries: state.weightEntries,
    addEntry,
    deleteEntry,
    getLatestWeight,
    getWeightChange,
    getChartData,
    targetWeight: state.profile.targetWeight,
  };
}
