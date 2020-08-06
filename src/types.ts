export interface useRatingInterface {
  shouldRate(usesToRate?: number): Promise<boolean>;
  askRate(androidBundleId: string): void;
}

export interface Rated {
  rated: boolean;
  appVersion: string;
}
