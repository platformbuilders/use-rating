[![Build Status][check-badge]][workflows]
[![codecov][codecov]](https://codecov.io/gh/platformbuilders/use-rating)
[![npm][npm-badge]][npm]
[![MIT][license-badge]][license]

[npm-badge]: https://img.shields.io/npm/v/@platformbuilders/use-rating.svg
[npm]: https://www.npmjs.com/package/@platformbuilders/use-rating
[license-badge]: https://img.shields.io/dub/l/vibe-d.svg
[license]: https://raw.githubusercontent.com/platformbuilders/use-rating/master/LICENSE.md
[workflows]: https://github.com/platformbuilders/use-rating/actions
[check-badge]: https://github.com/platformbuilders/use-rating/workflows/check/badge.svg
[codecov]: https://codecov.io/gh/platformbuilders/use-rating/branch/master/graph/badge.svg

# @platformbuilders/use-rating

Easily check if user should be asked about rating based on number of uses and last rated version.

## Install

```
yarn add react-native-store-review @platformbuilders/use-rating
```

## Usage

iOS users will be inapp prompted to rate (1 to 5 stars) your app. Android users will be redirected to app's page on Play Store.

```
import { useRating } from '@platformbuilders/use-rating';

const { shouldRate, askRate } = useRating(DeviceInfo.getVersion());

const checkRating = async () => {
  const minUsageNumber = 3;
  const shouldAsk = await shouldRate(minUsageNumber);
  if (shouldAsk) {
    askRate(DeviceInfo.getBundleId());
  }
}
```
