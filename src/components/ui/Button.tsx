import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import { Colors } from '../../constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  small?: boolean;
}

export function Button({ title, onPress, variant = 'primary', disabled, loading, style, small }: ButtonProps) {
  const buttonStyles = [
    styles.button,
    small && styles.small,
    variant === 'primary' && styles.primary,
    variant === 'secondary' && styles.secondary,
    variant === 'outline' && styles.outline,
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    small && styles.smallText,
    variant === 'outline' && styles.outlineText,
    disabled && styles.disabledText,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? Colors.primary : Colors.textLight} />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.accent,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.disabled,
  },
  text: {
    color: Colors.textLight,
    fontSize: 16,
    fontWeight: '600',
  },
  smallText: {
    fontSize: 14,
  },
  outlineText: {
    color: Colors.primary,
  },
  disabledText: {
    color: Colors.textSecondary,
  },
});
