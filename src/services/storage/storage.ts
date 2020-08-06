import AsyncStorage from '@react-native-community/async-storage';
import { Rated } from '../../types';
import Keys from './keys';

export default class Storage {
  static async setRated(rated: Rated): Promise<void> {
    const item = JSON.stringify(rated);
    AsyncStorage.setItem(Keys.IS_RATED, item);
  }

  static async getRated(): Promise<Rated> {
    const rawValue = await AsyncStorage.getItem(Keys.IS_RATED);
    if (rawValue) {
      return JSON.parse(rawValue);
    }
    return {
      rated: false,
      appVersion: '',
    };
  }

  static async setUses(uses: number): Promise<void> {
    const item = uses.toString();
    AsyncStorage.setItem(Keys.USES, item);
  }

  static async getUses(): Promise<number> {
    const uses: string = (await AsyncStorage.getItem(Keys.USES)) || '0';
    return parseInt(uses, 10);
  }
}
