import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { TimerPhase } from '../hooks/useExerciseTimer';

interface ExerciseTimerProps {
  phase: TimerPhase;
  secondsRemaining: number;
  exerciseName: string;
  currentIndex: number;
  totalExercises: number;
}

export function ExerciseTimerDisplay({ phase, secondsRemaining, exerciseName, currentIndex, totalExercises }: ExerciseTimerProps) {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  const phaseColors: Record<TimerPhase, string> = {
    idle: Colors.textSecondary,
    work: Colors.primary,
    rest: Colors.accent,
    done: Colors.success,
  };

  const phaseLabels: Record<TimerPhase, string> = {
    idle: 'Listo para empezar',
    work: 'EJERCICIO',
    rest: 'DESCANSO',
    done: '¡COMPLETADO!',
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.phaseLabel, { color: phaseColors[phase] }]}>
        {phaseLabels[phase]}
      </Text>

      {phase !== 'done' && phase !== 'idle' && (
        <Text style={styles.exerciseName}>{exerciseName}</Text>
      )}

      <View style={[styles.timerCircle, { borderColor: phaseColors[phase] }]}>
        <Text style={[styles.timer, { color: phaseColors[phase] }]}>
          {phase === 'done' ? '✓' : timeStr}
        </Text>
      </View>

      {phase !== 'idle' && (
        <Text style={styles.progress}>
          {phase === 'done'
            ? `${totalExercises} ejercicios completados`
            : `Ejercicio ${currentIndex + 1} de ${totalExercises}`}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  phaseLabel: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  timerCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  timer: {
    fontSize: 44,
    fontWeight: '700',
  },
  progress: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 8,
  },
});
