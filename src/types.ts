export interface useRatingInterface {
  shouldRate(usesToRate?: number): Promise<boolean>;
  askRate(): void;
  isAvailable: boolean;
}

export interface useRatingProps {
  iosAppId: string;
  alertTitle?: string;
  alertMsg?: string;
  okButton?: string;
  cancelButton?: string;
}
export interface Rated {
  rated: boolean;
  appVersion: string;
}
