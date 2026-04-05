import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAds } from '../context/AdsContext';
import { Colors } from '../constants/colors';

interface AdBannerProps {
  position?: 'top' | 'bottom' | 'inline';
}

/**
 * Banner ad component that shows in all screens.
 * Uses a placeholder in development; replace with real AdMob BannerAd in production.
 *
 * Production usage:
 * ```
 * import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
 * <BannerAd unitId={bannerId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
 * ```
 */
export function AdBanner({ position = 'bottom' }: AdBannerProps) {
  const { showAds, bannerId } = useAds();

  if (!showAds) return null;

  // In production, replace this View with:
  // <BannerAd unitId={bannerId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
  return (
    <View style={[
      styles.container,
      position === 'top' && styles.top,
      position === 'bottom' && styles.bottom,
      position === 'inline' && styles.inline,
    ]}>
      <View style={styles.banner}>
        <Text style={styles.adLabel}>PUBLICIDAD</Text>
        <Text style={styles.adText}>Espacio publicitario - Banner Ad</Text>
        <Text style={styles.adId}>{bannerId}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    zIndex: 100,
  },
  top: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  bottom: {
    // Will be positioned by parent
  },
  inline: {
    marginVertical: 12,
  },
  banner: {
    width: '100%',
    backgroundColor: '#FFF3CD',
    borderWidth: 1,
    borderColor: '#FBBF24',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    minHeight: 60,
    justifyContent: 'center',
  },
  adLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#92400E',
    letterSpacing: 1,
    marginBottom: 2,
  },
  adText: {
    fontSize: 13,
    color: '#78350F',
    fontWeight: '600',
  },
  adId: {
    fontSize: 8,
    color: '#A16207',
    marginTop: 2,
  },
});
