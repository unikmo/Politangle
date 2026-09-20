import type { CountryProfile } from './countries';
import { wave4A } from './countries-wave4-a';
import { wave4B } from './countries-wave4-b';
import { wave4C } from './countries-wave4-c';
import { wave4D } from './countries-wave4-d';

export const wave4CountryProfiles: readonly CountryProfile[] = [
  ...wave4A,
  ...wave4B,
  ...wave4C,
  ...wave4D,
];
