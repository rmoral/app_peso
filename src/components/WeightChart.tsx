import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Colors } from '../constants/colors';

interface WeightChartProps {
  labels: string[];
  data: number[];
  targetWeight: number;
}

export function WeightChart({ labels, data, targetWeight }: WeightChartProps) {
  if (data.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyIcon}>📊</Text>
        <Text style={styles.emptyText}>Registra tu peso para ver el gráfico</Text>
      </View>
    );
  }

  const screenWidth = Dimensions.get('window').width - 40;
  const maxLabels = 7;
  const step = Math.max(1, Math.floor(labels.length / maxLabels));
  const displayLabels = labels.map((l, i) => (i % step === 0 ? l : ''));

  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: displayLabels,
          datasets: [
            { data, color: () => Colors.primary, strokeWidth: 2 },
            {
              data: Array(Math.max(data.length, 2)).fill(targetWeight),
              color: () => Colors.accent,
              strokeWidth: 1,
              withDots: false,
            },
          ],
          legend: ['Peso', 'Objetivo'],
        }}
        width={screenWidth}
        height={200}
        yAxisSuffix=" kg"
        chartConfig={{
          backgroundColor: Colors.surface,
          backgroundGradientFrom: Colors.surface,
          backgroundGradientTo: Colors.surface,
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(13, 148, 136, ${opacity})`,
          labelColor: () => Colors.textSecondary,
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: Colors.primaryDark,
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  chart: {
    borderRadius: 12,
  },
  empty: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
