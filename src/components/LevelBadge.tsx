import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { LEVEL_TITLES } from '../constants/gamification';

interface Props {
  level: number;
  size?: number;
}

export function LevelBadge({ level, size = 60 }: Props) {
  const title = LEVEL_TITLES[level] || `Nivel ${level}`;

  return (
    <View style={styles.wrapper}>
      <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }]}>
        <Text style={[styles.level, { fontSize: size * 0.4 }]}>{level}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  circle: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.accent,
  },
  level: {
    color: Colors.textLight,
    fontWeight: '800',
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
    marginTop: 4,
  },
});
