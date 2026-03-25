import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

interface BadgeProps {
  icon: string;
  name: string;
  unlocked: boolean;
  small?: boolean;
}

export function Badge({ icon, name, unlocked, small }: BadgeProps) {
  return (
    <View style={[styles.container, !unlocked && styles.locked, small && styles.small]}>
      <Text style={[styles.icon, small && styles.smallIcon, !unlocked && styles.lockedIcon]}>
        {unlocked ? icon : '🔒'}
      </Text>
      <Text style={[styles.name, small && styles.smallName, !unlocked && styles.lockedName]} numberOfLines={2}>
        {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 12,
    width: 90,
    height: 90,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  small: {
    width: 70,
    height: 70,
    padding: 8,
  },
  locked: {
    opacity: 0.5,
  },
  icon: {
    fontSize: 32,
  },
  smallIcon: {
    fontSize: 24,
  },
  lockedIcon: {
    fontSize: 20,
  },
  name: {
    fontSize: 10,
    color: Colors.text,
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '500',
  },
  smallName: {
    fontSize: 9,
  },
  lockedName: {
    color: Colors.textSecondary,
  },
});
