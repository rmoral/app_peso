import { useState, useCallback } from 'react';
import { Alert, Platform } from 'react-native';
import { useAppState } from '../context/AppContext';
import { IAP_PRODUCTS } from '../constants/ads';

/**
 * In-app purchase hook for removing ads.
 *
 * In production, integrate with react-native-iap:
 * ```
 * import { requestPurchase, getProducts, finishTransaction } from 'react-native-iap';
 * const products = await getProducts({ skus: [IAP_PRODUCTS.REMOVE_ADS] });
 * await requestPurchase({ sku: IAP_PRODUCTS.REMOVE_ADS });
 * ```
 */
export function usePurchase() {
  const { state, dispatch } = useAppState();
  const [loading, setLoading] = useState(false);

  const purchaseRemoveAds = useCallback(async () => {
    if (state.adsRemoved) {
      Alert.alert('Info', 'Ya has eliminado la publicidad.');
      return;
    }

    setLoading(true);

    try {
      // === PRODUCTION CODE ===
      // Uncomment and use react-native-iap for real purchases:
      //
      // import { requestPurchase, finishTransaction } from 'react-native-iap';
      // const purchase = await requestPurchase({ sku: IAP_PRODUCTS.REMOVE_ADS });
      // await finishTransaction({ purchase, isConsumable: false });
      // dispatch({ type: 'REMOVE_ADS' });

      // === DEVELOPMENT PLACEHOLDER ===
      // Simulates the purchase flow for testing
      await new Promise(resolve => setTimeout(resolve, 1500));

      Alert.alert(
        '🛒 Compra simulada',
        `En producción, aquí se procesaría la compra del producto "${IAP_PRODUCTS.REMOVE_ADS}" a través de ${Platform.OS === 'ios' ? 'App Store' : 'Google Play'}.\n\n¿Simular compra exitosa?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Simular compra',
            onPress: () => {
              dispatch({ type: 'REMOVE_ADS' });
              Alert.alert('✅ ¡Compra completada!', 'La publicidad ha sido eliminada. ¡Disfruta de PesoFit sin anuncios!');
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo completar la compra. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  }, [state.adsRemoved, dispatch]);

  const restorePurchases = useCallback(async () => {
    setLoading(true);
    try {
      // === PRODUCTION CODE ===
      // import { getAvailablePurchases } from 'react-native-iap';
      // const purchases = await getAvailablePurchases();
      // const hasRemoveAds = purchases.some(p => p.productId === IAP_PRODUCTS.REMOVE_ADS);
      // if (hasRemoveAds) dispatch({ type: 'REMOVE_ADS' });

      await new Promise(resolve => setTimeout(resolve, 1000));

      if (state.adsRemoved) {
        Alert.alert('✅ Restaurado', 'Tu compra ya está activa.');
      } else {
        Alert.alert('Info', 'No se encontraron compras anteriores.');
      }
    } catch {
      Alert.alert('Error', 'No se pudieron restaurar las compras.');
    } finally {
      setLoading(false);
    }
  }, [state.adsRemoved, dispatch]);

  return {
    adsRemoved: state.adsRemoved,
    loading,
    purchaseRemoveAds,
    restorePurchases,
  };
}
