import { useCallback, useEffect } from 'react';
import { useAppState } from '../context/AppContext';
import { XP_REWARDS } from '../constants/gamification';
import { checkNewAchievements, generateDailyChallenge, updateStreak, getTodayStr } from '../services/gamification';
import { Difficulty } from '../types';

export function useGamification() {
  const { state, dispatch } = useAppState();

  // Update streak and daily challenge on mount / day change
  useEffect(() => {
    if (!state.onboarded) return;

    const today = getTodayStr();

    // Update streak
    if (state.profile.lastActiveDate && state.profile.lastActiveDate !== today) {
      const { newStreak } = updateStreak(state.profile.lastActiveDate, state.profile.currentStreak);
      dispatch({ type: 'UPDATE_STREAK', payload: { streak: newStreak, date: today } });

      if (newStreak > 1) {
        dispatch({ type: 'ADD_XP', payload: XP_REWARDS.STREAK_BONUS });
      }
    }

    // Generate daily challenge if needed
    const todayChallenge = state.dailyChallenges.find(c => c.date === today);
    if (!todayChallenge) {
      const challenge = generateDailyChallenge(today);
      dispatch({ type: 'SET_DAILY_CHALLENGE', payload: challenge });
    }
  }, [state.onboarded, state.profile.lastActiveDate]);

  const markActive = useCallback(() => {
    const today = getTodayStr();
    if (state.profile.lastActiveDate !== today) {
      const { newStreak } = updateStreak(
        state.profile.lastActiveDate || today,
        state.profile.currentStreak
      );
      dispatch({ type: 'UPDATE_STREAK', payload: { streak: newStreak, date: today } });
    }
  }, [state.profile.lastActiveDate, state.profile.currentStreak, dispatch]);

  const addWorkoutXP = useCallback((difficulty: Difficulty) => {
    const xpMap: Record<Difficulty, number> = {
      beginner: XP_REWARDS.WORKOUT_BEGINNER,
      intermediate: XP_REWARDS.WORKOUT_INTERMEDIATE,
      advanced: XP_REWARDS.WORKOUT_ADVANCED,
    };
    dispatch({ type: 'ADD_XP', payload: xpMap[difficulty] });
  }, [dispatch]);

  const completeDailyChallenge = useCallback((challengeId: string) => {
    dispatch({ type: 'COMPLETE_DAILY_CHALLENGE', payload: challengeId });
    dispatch({ type: 'ADD_XP', payload: XP_REWARDS.DAILY_CHALLENGE });

    // Check achievements
    const newAchievements = checkNewAchievements(state);
    if (newAchievements.length > 0) {
      dispatch({ type: 'UNLOCK_ACHIEVEMENTS', payload: newAchievements });
    }
  }, [state, dispatch]);

  const checkAchievements = useCallback(() => {
    const newAchievements = checkNewAchievements(state);
    if (newAchievements.length > 0) {
      dispatch({ type: 'UNLOCK_ACHIEVEMENTS', payload: newAchievements });
    }
    return newAchievements;
  }, [state, dispatch]);

  const getTodayChallenge = useCallback(() => {
    const today = getTodayStr();
    return state.dailyChallenges.find(c => c.date === today) || null;
  }, [state.dailyChallenges]);

  return {
    profile: state.profile,
    unlockedAchievements: state.unlockedAchievements,
    markActive,
    addWorkoutXP,
    completeDailyChallenge,
    checkAchievements,
    getTodayChallenge,
  };
}
