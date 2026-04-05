import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import { EXERCISE_ROUTINES } from '../constants/exercises';
import { Card } from '../components/ui/Card';
import { Difficulty } from '../types';
import { AdBanner } from '../components/AdBanner';

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
};

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  beginner: Colors.success,
  intermediate: Colors.accent,
  advanced: Colors.error,
};

export function ExerciseListScreen({ navigation }: any) {
  const [filter, setFilter] = useState<Difficulty | 'all'>('all');

  const filteredRoutines = filter === 'all'
    ? EXERCISE_ROUTINES
    : EXERCISE_ROUTINES.filter(r => r.difficulty === filter);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Rutinas de Ejercicio</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
        {(['all', 'beginner', 'intermediate', 'advanced'] as const).map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterChip, filter === f && styles.filterActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f === 'all' ? 'Todas' : DIFFICULTY_LABELS[f]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filteredRoutines.map(routine => (
        <TouchableOpacity
          key={routine.id}
          onPress={() => navigation.navigate('ExerciseDetail', { routineId: routine.id })}
        >
          <Card style={styles.routineCard}>
            <View style={styles.routineHeader}>
              <Text style={styles.routineName}>{routine.name}</Text>
              <View style={[styles.diffBadge, { backgroundColor: DIFFICULTY_COLORS[routine.difficulty] + '20' }]}>
                <Text style={[styles.diffText, { color: DIFFICULTY_COLORS[routine.difficulty] }]}>
                  {DIFFICULTY_LABELS[routine.difficulty]}
                </Text>
              </View>
            </View>
            <View style={styles.routineInfo}>
              <Text style={styles.routineDetail}>🕐 {routine.estimatedMinutes} min</Text>
              <Text style={styles.routineDetail}>💪 {routine.exercises.length} ejercicios</Text>
              <Text style={styles.routineXP}>⭐ +{routine.xpReward} XP</Text>
            </View>
          </Card>
        </TouchableOpacity>
      ))}

      <AdBanner position="inline" />
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
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  filterTextActive: {
    color: Colors.textLight,
  },
  routineCard: {
    gap: 8,
  },
  routineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routineName: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
    flex: 1,
  },
  diffBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  diffText: {
    fontSize: 12,
    fontWeight: '600',
  },
  routineInfo: {
    flexDirection: 'row',
    gap: 12,
  },
  routineDetail: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  routineXP: {
    fontSize: 13,
    color: Colors.accent,
    fontWeight: '600',
  },
});
