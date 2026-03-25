import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../constants/colors';
import { useWeightLog } from '../hooks/useWeightLog';
import { WeightChart } from '../components/WeightChart';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export function WeightScreen() {
  const { entries, addEntry, deleteEntry, getChartData, targetWeight } = useWeightLog();
  const [weightInput, setWeightInput] = useState('');
  const chartData = getChartData(30);

  const handleAdd = () => {
    const weight = parseFloat(weightInput);
    if (isNaN(weight) || weight <= 0 || weight > 500) {
      Alert.alert('Error', 'Introduce un peso válido');
      return;
    }
    addEntry(weight);
    setWeightInput('');
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Eliminar entrada',
      '¿Estás seguro de que quieres eliminar este registro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => deleteEntry(id) },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Control de Peso</Text>

      <Card>
        <WeightChart
          labels={chartData.labels}
          data={chartData.data}
          targetWeight={targetWeight}
        />
      </Card>

      <Card style={styles.inputCard}>
        <Text style={styles.inputLabel}>Registrar peso de hoy</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Ej: 72.5"
            placeholderTextColor={Colors.disabled}
            value={weightInput}
            onChangeText={setWeightInput}
            keyboardType="decimal-pad"
          />
          <Text style={styles.unit}>kg</Text>
          <Button title="Registrar" onPress={handleAdd} small style={styles.addButton} />
        </View>
        <Text style={styles.xpHint}>+10 XP por registrar</Text>
      </Card>

      <Text style={styles.sectionTitle}>Historial</Text>
      {entries.length === 0 ? (
        <Text style={styles.emptyText}>Aún no hay registros de peso</Text>
      ) : (
        entries.slice(0, 20).map(entry => (
          <TouchableOpacity
            key={entry.id}
            style={styles.entryRow}
            onLongPress={() => handleDelete(entry.id)}
          >
            <View>
              <Text style={styles.entryWeight}>{entry.weight.toFixed(1)} kg</Text>
              <Text style={styles.entryDate}>{entry.date}</Text>
            </View>
            <Text style={styles.deleteHint}>Mantén para eliminar</Text>
          </TouchableOpacity>
        ))
      )}
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
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
  },
  inputCard: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 18,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  unit: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  addButton: {
    minWidth: 90,
  },
  xpHint: {
    fontSize: 12,
    color: Colors.accent,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 8,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    padding: 20,
  },
  entryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
  },
  entryWeight: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  entryDate: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  deleteHint: {
    fontSize: 10,
    color: Colors.disabled,
  },
});
