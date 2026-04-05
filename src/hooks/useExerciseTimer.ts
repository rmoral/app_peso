import { useState, useRef, useCallback, useEffect } from 'react';
import { Exercise } from '../types';

export type TimerPhase = 'idle' | 'work' | 'rest' | 'done';

interface TimerState {
  phase: TimerPhase;
  currentExerciseIndex: number;
  secondsRemaining: number;
  isRunning: boolean;
  totalExercises: number;
}

export function useExerciseTimer(exercises: Exercise[]) {
  const [timerState, setTimerState] = useState<TimerState>({
    phase: 'idle',
    currentExerciseIndex: 0,
    secondsRemaining: exercises.length > 0 ? exercises[0].durationSeconds : 0,
    isRunning: false,
    totalExercises: exercises.length,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stateRef = useRef(timerState);
  stateRef.current = timerState;

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);

  const tick = useCallback(() => {
    setTimerState(prev => {
      if (prev.secondsRemaining > 1) {
        return { ...prev, secondsRemaining: prev.secondsRemaining - 1 };
      }

      // Time's up for current phase
      if (prev.phase === 'work') {
        const currentExercise = exercises[prev.currentExerciseIndex];
        if (currentExercise.restSeconds > 0) {
          return { ...prev, phase: 'rest', secondsRemaining: currentExercise.restSeconds };
        }
        // No rest, move to next exercise
        const nextIndex = prev.currentExerciseIndex + 1;
        if (nextIndex >= exercises.length) {
          return { ...prev, phase: 'done', isRunning: false, secondsRemaining: 0 };
        }
        return {
          ...prev,
          phase: 'work',
          currentExerciseIndex: nextIndex,
          secondsRemaining: exercises[nextIndex].durationSeconds,
        };
      }

      if (prev.phase === 'rest') {
        const nextIndex = prev.currentExerciseIndex + 1;
        if (nextIndex >= exercises.length) {
          return { ...prev, phase: 'done', isRunning: false, secondsRemaining: 0 };
        }
        return {
          ...prev,
          phase: 'work',
          currentExerciseIndex: nextIndex,
          secondsRemaining: exercises[nextIndex].durationSeconds,
        };
      }

      return prev;
    });
  }, [exercises]);

  const start = useCallback(() => {
    if (exercises.length === 0) return;
    clearTimer();
    setTimerState({
      phase: 'work',
      currentExerciseIndex: 0,
      secondsRemaining: exercises[0].durationSeconds,
      isRunning: true,
      totalExercises: exercises.length,
    });
    intervalRef.current = setInterval(tick, 1000);
  }, [exercises, tick, clearTimer]);

  const pause = useCallback(() => {
    clearTimer();
    setTimerState(prev => ({ ...prev, isRunning: false }));
  }, [clearTimer]);

  const resume = useCallback(() => {
    if (stateRef.current.phase === 'done' || stateRef.current.phase === 'idle') return;
    clearTimer();
    setTimerState(prev => ({ ...prev, isRunning: true }));
    intervalRef.current = setInterval(tick, 1000);
  }, [tick, clearTimer]);

  const skip = useCallback(() => {
    clearTimer();
    setTimerState(prev => {
      const nextIndex = prev.currentExerciseIndex + 1;
      if (nextIndex >= exercises.length) {
        return { ...prev, phase: 'done', isRunning: false, secondsRemaining: 0 };
      }
      const newState = {
        ...prev,
        phase: 'work' as TimerPhase,
        currentExerciseIndex: nextIndex,
        secondsRemaining: exercises[nextIndex].durationSeconds,
      };
      if (prev.isRunning) {
        intervalRef.current = setInterval(tick, 1000);
      }
      return newState;
    });
  }, [exercises, tick, clearTimer]);

  const reset = useCallback(() => {
    clearTimer();
    setTimerState({
      phase: 'idle',
      currentExerciseIndex: 0,
      secondsRemaining: exercises.length > 0 ? exercises[0].durationSeconds : 0,
      isRunning: false,
      totalExercises: exercises.length,
    });
  }, [exercises, clearTimer]);

  const currentExercise = exercises[timerState.currentExerciseIndex] || null;

  return {
    ...timerState,
    currentExercise,
    start,
    pause,
    resume,
    skip,
    reset,
  };
}
