import React, { useEffect, useState, useCallback } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAds } from '../context/AdsContext';
import { Colors } from '../constants/colors';

interface InterstitialAdTriggerProps {
  visible: boolean;
  onClose: () => void;
}

/**
 * Interstitial ad component displayed between user actions.
 * Uses a placeholder in development; replace with real AdMob InterstitialAd in production.
 *
 * Production usage:
 * ```
 * import { InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';
 * const interstitial = InterstitialAd.createForAdRequest(interstitialId);
 * interstitial.load();
 * interstitial.show();
 * ```
 */
export function InterstitialAdTrigger({ visible, onClose }: InterstitialAdTriggerProps) {
  const { showAds, interstitialId } = useAds();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!visible) {
      setCountdown(5);
      return;
    }

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [visible]);

  if (!showAds || !visible) return null;

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.adLabel}>PUBLICIDAD</Text>

          <View style={styles.adContent}>
            <Text style={styles.adEmoji}>📢</Text>
            <Text style={styles.adTitle}>Anuncio a pantalla completa</Text>
            <Text style={styles.adSubtitle}>Interstitial Ad - {interstitialId}</Text>
          </View>

          <View style={styles.promoBox}>
            <Text style={styles.promoEmoji}>✨</Text>
            <Text style={styles.promoTitle}>¿Cansado de los anuncios?</Text>
            <Text style={styles.promoText}>
              Elimina TODA la publicidad con una sola compra
            </Text>
          </View>

          {countdown > 0 ? (
            <View style={styles.countdownBtn}>
              <Text style={styles.countdownText}>
                Puedes cerrar en {countdown}s
              </Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeBtnText}>✕ Cerrar anuncio</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
  },
  adLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 2,
    backgroundColor: '#92400E',
    textAlign: 'center',
    paddingVertical: 6,
  },
  adContent: {
    backgroundColor: '#FFF3CD',
    paddingVertical: 40,
    alignItems: 'center',
  },
  adEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  adTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#78350F',
  },
  adSubtitle: {
    fontSize: 11,
    color: '#A16207',
    marginTop: 4,
  },
  promoBox: {
    backgroundColor: Colors.primaryDark,
    padding: 20,
    alignItems: 'center',
  },
  promoEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  promoText: {
    fontSize: 13,
    color: Colors.primaryLight,
    textAlign: 'center',
  },
  countdownBtn: {
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#E2E8F0',
  },
  countdownText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
  closeBtn: {
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  closeBtnText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '700',
  },
});
