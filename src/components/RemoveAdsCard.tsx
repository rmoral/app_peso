import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import { useAds } from '../context/AdsContext';

interface RemoveAdsCardProps {
  onPress: () => void;
  compact?: boolean;
}

export function RemoveAdsCard({ onPress, compact }: RemoveAdsCardProps) {
  const { showAds } = useAds();

  if (!showAds) return null;

  if (compact) {
    return (
      <TouchableOpacity style={styles.compactContainer} onPress={onPress}>
        <Text style={styles.compactEmoji}>🚫</Text>
        <View style={styles.compactText}>
          <Text style={styles.compactTitle}>Eliminar anuncios</Text>
          <Text style={styles.compactSub}>Disfruta sin interrupciones</Text>
        </View>
        <Text style={styles.compactArrow}>→</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>OFERTA</Text>
      </View>
      <Text style={styles.emoji}>⭐</Text>
      <Text style={styles.title}>¡Elimina la publicidad!</Text>
      <Text style={styles.subtitle}>
        Pago único para disfrutar de PesoFit sin anuncios ni interrupciones.
        Sin banners, sin esperas, sin distracciones.
      </Text>
      <View style={styles.button}>
        <Text style={styles.buttonText}>Comprar ahora</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryDark,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  badge: {
    position: 'absolute',
    top: -1,
    right: 20,
    backgroundColor: Colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.primaryLight,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  button: {
    backgroundColor: Colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  // Compact version
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryDark,
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  compactEmoji: {
    fontSize: 24,
  },
  compactText: {
    flex: 1,
  },
  compactTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  compactSub: {
    fontSize: 12,
    color: Colors.primaryLight,
  },
  compactArrow: {
    fontSize: 20,
    color: Colors.accent,
    fontWeight: '700',
  },
});
