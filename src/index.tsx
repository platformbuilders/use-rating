import { Linking, Platform } from 'react-native';
import * as StoreReview from 'react-native-store-review';
import { Storage } from './services';
import { useRatingInterface, Rated } from './types';

export const useRating = (appVersion: string): useRatingInterface => {
  const shouldRate = async (usesToRate = 5): Promise<boolean> => {
    const uses = await Storage.getUses();
    const usedEnough = uses >= usesToRate;
    const rated = await Storage.getRated();
    Storage.setUses(uses + 1);
    if (appVersion != rated.appVersion && usedEnough) {
      return true;
    }
    return false;
  };

  const askRate = (androidBundleId: string): void => {
    const rateObject: Rated = {
      rated: true,
      appVersion,
    };
    if (StoreReview.isAvailable) {
      StoreReview.requestReview();
    } else if (Platform.OS === 'android') {
      const link = `https://play.google.com/store/apps/details?${androidBundleId}`;
      Linking.openURL(link);
    }
    Storage.setRated(rateObject);
  };

  return {
    shouldRate,
    askRate,
  };
};
