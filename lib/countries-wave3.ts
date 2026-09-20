import type { CountryProfile } from './countries';
import { wave3A } from './countries-wave3-a';
import { wave3B } from './countries-wave3-b';
import { wave3C } from './countries-wave3-c';
import { wave3D } from './countries-wave3-d';

export const wave3CountryProfiles: readonly CountryProfile[] = [
  ...wave3A,
  ...wave3B,
  ...wave3C,
  ...wave3D,
];
