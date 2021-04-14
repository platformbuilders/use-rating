import { Alert, Linking, Platform } from 'react-native';
import { isAvailable, requestReview } from 'react-native-store-review';
import VersionNumber from 'react-native-version-number';
import { Storage } from './services';
import { useRatingInterface, useRatingProps, Rated } from './types';

export const useRating = ({
  iosAppId,
  alertTitle,
  alertMsg,
  okButton,
  cancelButton,
}: useRatingProps): useRatingInterface => {

  const APP_STORE_LINK = `itms-apps://apps.apple.com/app/id${iosAppId}?action=write-review`;
  const PLAY_STORE_LINK = `market://details?id=${VersionNumber.bundleIdentifier}`;

  const STORE_LINK = Platform.select({
    ios: APP_STORE_LINK,
    android: PLAY_STORE_LINK,
  });

  const createAlert = () => Alert.alert(
      alertTitle || "Avalie este app",
      alertMsg || "Clique em 'Avaliar' para ser redirecionado para a loja e avaliar nosso aplicativo!",
      [
        {
          text: cancelButton || "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
        },
        { text: okButton || "Avaliar",
          onPress: () => Linking.openURL(STORE_LINK as string),
        }
      ]
    );
    
  const shouldRate = async (usesToRate = 5): Promise<boolean> => {
    const rated = await Storage.getRated();
    if ( rated.rated && rated.appVersion === VersionNumber.appVersion ) return false;
    const uses = await Storage.getUses();
    const usedEnough = uses >= usesToRate;
    await Storage.setUses(uses + 1);
    if (VersionNumber.appVersion !== rated.appVersion && usedEnough) {
      return true;
    }
    return false;
  };

  const askRate = (): void => {
    const rateObject: Rated = {
      rated: true,
      appVersion: VersionNumber.appVersion,
    };
    if (isAvailable) {
      requestReview();
    } else {
      createAlert();
    }
    Storage.setRated(rateObject);
  };

  return {
    shouldRate,
    askRate,
    isAvailable,
  };
};
