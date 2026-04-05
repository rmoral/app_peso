import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Colors } from '../constants/colors';
import { Button } from '../components/ui/Button';
import { useAppState } from '../context/AppContext';

export function OnboardingScreen() {
  const { dispatch } = useAppState();
  const [name, setName] = useState('');
  const [targetWeight, setTargetWeight] = useState('');

  const handleStart = () => {
    const weight = parseFloat(targetWeight);
    if (!name.trim() || isNaN(weight) || weight <= 0) return;

    dispatch({
      type: 'SET_ONBOARDED',
      payload: { name: name.trim(), targetWeight: weight },
    });
  };

  const isValid = name.trim().length > 0 && !isNaN(parseFloat(targetWeight)) && parseFloat(targetWeight) > 0;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={styles.emoji}>💪</Text>
        <Text style={styles.title}>¡Bienvenido a PesoFit!</Text>
        <Text style={styles.subtitle}>
          Tu compañero para alcanzar tu peso ideal con ejercicio, motivación y gamificación.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>¿Cómo te llamas?</Text>
          <TextInput
            style={styles.input}
            placeholder="Tu nombre"
            placeholderTextColor={Colors.disabled}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

          <Text style={styles.label}>¿Cuál es tu peso objetivo? (kg)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 70"
            placeholderTextColor={Colors.disabled}
            value={targetWeight}
            onChangeText={setTargetWeight}
            keyboardType="decimal-pad"
          />
        </View>

        <Button
          title="¡Empezar!"
          onPress={handleStart}
          disabled={!isValid}
          style={styles.button}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emoji: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  form: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  button: {
    marginTop: 8,
  },
});
