import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { Platform } from 'react-native';
import { useAppState } from './AppContext';
import { AD_CONFIG, INTERSTITIAL_FREQUENCY } from '../constants/ads';

interface AdsContextType {
  showAds: boolean;
  bannerId: string;
  interstitialId: string;
  trackAction: () => boolean; // returns true if interstitial should show
  interstitialReady: boolean;
  setInterstitialReady: (ready: boolean) => void;
}

const AdsContext = createContext<AdsContextType>({
  showAds: true,
  bannerId: '',
  interstitialId: '',
  trackAction: () => false,
  interstitialReady: false,
  setInterstitialReady: () => {},
});

export function AdsProvider({ children }: { children: React.ReactNode }) {
  const { state } = useAppState();
  const actionCount = useRef(0);
  const [interstitialReady, setInterstitialReady] = useState(false);

  const showAds = !state.adsRemoved;

  const bannerId = Platform.select({
    android: AD_CONFIG.BANNER_ID_ANDROID,
    ios: AD_CONFIG.BANNER_ID_IOS,
    default: AD_CONFIG.BANNER_ID_ANDROID,
  });

  const interstitialId = Platform.select({
    android: AD_CONFIG.INTERSTITIAL_ID_ANDROID,
    ios: AD_CONFIG.INTERSTITIAL_ID_IOS,
    default: AD_CONFIG.INTERSTITIAL_ID_ANDROID,
  });

  const trackAction = useCallback(() => {
    if (!showAds) return false;
    actionCount.current += 1;
    if (actionCount.current >= INTERSTITIAL_FREQUENCY) {
      actionCount.current = 0;
      return true;
    }
    return false;
  }, [showAds]);

  return (
    <AdsContext.Provider value={{
      showAds,
      bannerId,
      interstitialId,
      trackAction,
      interstitialReady,
      setInterstitialReady,
    }}>
      {children}
    </AdsContext.Provider>
  );
}

export function useAds() {
  return useContext(AdsContext);
}
