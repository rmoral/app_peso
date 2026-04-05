import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Colors } from '../constants/colors';
import { DailyChallenge } from '../types';

interface Props {
  challenge: DailyChallenge | null;
  onComplete: (id: string) => void;
}

export function DailyChallengeCard({ challenge, onComplete }: Props) {
  if (!challenge) return null;

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerIcon}>🎯</Text>
        <Text style={styles.headerText}>Reto del Día</Text>
        <View style={styles.xpBadge}>
          <Text style={styles.xpText}>+{challenge.xpReward} XP</Text>
        </View>
      </View>
      <Text style={styles.title}>{challenge.title}</Text>
      <Text style={styles.description}>{challenge.description}</Text>
      {challenge.completed ? (
        <View style={styles.completedBadge}>
          <Text style={styles.completedText}>✓ Completado</Text>
        </View>
      ) : (
        <Button
          title="Marcar como completado"
          onPress={() => onComplete(challenge.id)}
          small
          style={styles.button}
        />
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.accent,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  headerText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    flex: 1,
  },
  xpBadge: {
    backgroundColor: Colors.accentLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  xpText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.accent,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  button: {
    alignSelf: 'flex-start',
  },
  completedBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  completedText: {
    color: Colors.success,
    fontWeight: '600',
    fontSize: 14,
  },
});
