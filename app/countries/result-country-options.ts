import { countryProfiles } from '../../lib/countries';
import { localizeCountryProfile } from '../../lib/country-localization';
import { countryPartyNames } from '../../lib/country-parties';
import type { Locale } from '../LocaleProvider';

export type CountrySelectionOption={
  slug:string;
  names:Record<Locale,string>;
  summaries:Record<Locale,string>;
  parties:readonly string[];
  sourceUrl:string|null;
};
export function countrySelectionOptions():CountrySelectionOption[]{
 return countryProfiles.map(country=>{
  const locales:Locale[]=['en','de','es','fr','pt-br'];
  const names={} as Record<Locale,string>;
  const summaries={} as Record<Locale,string>;
  for(const locale of locales){
   const c=locale==='en'?country:localizeCountryProfile(country,locale)??country;
   names[locale]=c.name;
   summaries[locale]=c.globalLabels?.summary??'';
  }
  return {
    slug:country.slug,names,summaries,
    parties:countryPartyNames[country.slug]??[],
    sourceUrl:country.sources[0]?.url??null
  };
 }).sort((a,b)=>a.names.en.localeCompare(b.names.en));
}
