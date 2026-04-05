import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from '../../constants/colors';

interface ProgressBarProps {
  progress: number; // 0-1
  label?: string;
  color?: string;
  height?: number;
  showPercentage?: boolean;
}

export function ProgressBar({ progress, label, color = Colors.primary, height = 10, showPercentage }: ProgressBarProps) {
  const clampedProgress = Math.min(1, Math.max(0, progress));

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.track, { height }]}>
        <View
          style={[
            styles.fill,
            {
              width: `${clampedProgress * 100}%`,
              backgroundColor: color,
              height,
            },
          ]}
        />
      </View>
      {showPercentage && (
        <Text style={styles.percentage}>{Math.round(clampedProgress * 100)}%</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  track: {
    backgroundColor: Colors.border,
    borderRadius: 5,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 5,
  },
  percentage: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
    textAlign: 'right',
  },
});
