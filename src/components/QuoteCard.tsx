import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

interface Props {
  text: string;
  author: string;
}

export function QuoteCard({ text, author }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.quote}>"{text}"</Text>
      <Text style={styles.author}>— {author}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryDark,
    borderRadius: 16,
    padding: 16,
  },
  quote: {
    fontSize: 15,
    color: Colors.textLight,
    fontStyle: 'italic',
    lineHeight: 22,
  },
  author: {
    fontSize: 12,
    color: Colors.primaryLight,
    marginTop: 8,
    textAlign: 'right',
  },
});
