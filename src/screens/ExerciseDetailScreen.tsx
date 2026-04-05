import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Colors } from '../constants/colors';
import { EXERCISE_ROUTINES } from '../constants/exercises';
import { useExerciseTimer } from '../hooks/useExerciseTimer';
import { useGamification } from '../hooks/useGamification';
import { useAppState } from '../context/AppContext';
import { ExerciseTimerDisplay } from '../components/ExerciseTimer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { getTodayStr } from '../services/gamification';
import { AdBanner } from '../components/AdBanner';
import { InterstitialAdTrigger } from '../components/InterstitialAdTrigger';
import { useAds } from '../context/AdsContext';

export function ExerciseDetailScreen({ route, navigation }: any) {
  const routine = EXERCISE_ROUTINES.find((r: any) => r.id === route.params.routineId);
  const { dispatch } = useAppState();
  const { addWorkoutXP, checkAchievements, markActive } = useGamification();
  const [showInterstitial, setShowInterstitial] = useState(false);
  const { trackAction } = useAds();

  if (!routine) {
    return (
      <View style={styles.container}>
        <Text>Rutina no encontrada</Text>
      </View>
    );
  }

  const timer = useExerciseTimer(routine.exercises);

  const handleComplete = useCallback(() => {
    dispatch({
      type: 'LOG_WORKOUT',
      payload: {
        routineId: routine.id,
        routineName: routine.name,
        completedAt: new Date().toISOString(),
        durationSeconds: routine.estimatedMinutes * 60,
        xpEarned: routine.xpReward,
      },
    });
    addWorkoutXP(routine.difficulty);
    markActive();

    setTimeout(() => {
      const newAchievements = checkAchievements();
      if (newAchievements.length > 0) {
        Alert.alert(
          '🏆 ¡Logro desbloqueado!',
          `Has desbloqueado ${newAchievements.length} nuevo(s) logro(s). ¡Mira tu perfil!`
        );
      }
    }, 100);

    if (trackAction()) setShowInterstitial(true);

    Alert.alert(
      '🎉 ¡Rutina completada!',
      `Has ganado +${routine.xpReward} XP`,
      [{ text: '¡Genial!', onPress: () => navigation.goBack() }]
    );
  }, [routine, dispatch, addWorkoutXP, markActive, checkAchievements, navigation]);

  React.useEffect(() => {
    if (timer.phase === 'done') {
      handleComplete();
    }
  }, [timer.phase]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{routine.name}</Text>
      <Text style={styles.subtitle}>
        {routine.estimatedMinutes} min · {routine.exercises.length} ejercicios · +{routine.xpReward} XP
      </Text>

      <ExerciseTimerDisplay
        phase={timer.phase}
        secondsRemaining={timer.secondsRemaining}
        exerciseName={timer.currentExercise?.name || ''}
        currentIndex={timer.currentExerciseIndex}
        totalExercises={timer.totalExercises}
      />

      {timer.currentExercise && timer.phase !== 'idle' && timer.phase !== 'done' && (
        <Card style={styles.descCard}>
          <Text style={styles.descText}>{timer.currentExercise.description}</Text>
        </Card>
      )}

      <View style={styles.controls}>
        {timer.phase === 'idle' && (
          <Button title="▶ Empezar" onPress={timer.start} />
        )}
        {timer.isRunning && (
          <Button title="⏸ Pausar" onPress={timer.pause} variant="outline" />
        )}
        {!timer.isRunning && timer.phase !== 'idle' && timer.phase !== 'done' && (
          <Button title="▶ Continuar" onPress={timer.resume} />
        )}
        {timer.phase !== 'idle' && timer.phase !== 'done' && (
          <>
            <Button title="⏭ Siguiente" onPress={timer.skip} variant="outline" style={styles.mt} />
            <Button title="↺ Reiniciar" onPress={timer.reset} variant="outline" style={styles.mt} />
          </>
        )}
      </View>

      <Text style={styles.exercisesTitle}>Ejercicios de la rutina</Text>
      <AdBanner position="inline" />

      {routine.exercises.map((ex, i) => (
        <View
          key={ex.id}
          style={[
            styles.exerciseItem,
            timer.currentExerciseIndex === i && timer.phase !== 'idle' && timer.phase !== 'done' && styles.exerciseActive,
          ]}
        >
          <View style={styles.exerciseNum}>
            <Text style={styles.exerciseNumText}>{i + 1}</Text>
          </View>
          <View style={styles.exerciseInfo}>
            <Text style={styles.exerciseName}>{ex.name}</Text>
            <Text style={styles.exerciseTime}>
              {ex.durationSeconds}s trabajo · {ex.restSeconds}s descanso
            </Text>
          </View>
        </View>
      ))}
      <InterstitialAdTrigger
        visible={showInterstitial}
        onClose={() => setShowInterstitial(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
    marginBottom: 8,
  },
  descCard: {
    marginBottom: 12,
  },
  descText: {
    fontSize: 15,
    color: Colors.text,
    lineHeight: 22,
    textAlign: 'center',
  },
  controls: {
    marginVertical: 16,
    gap: 8,
  },
  mt: {
    marginTop: 0,
  },
  exercisesTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 12,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  exerciseActive: {
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight + '15',
  },
  exerciseNum: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.primaryLight + '30',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  exerciseNumText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  exerciseTime: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
