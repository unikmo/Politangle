import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteHeader } from '../../../../../SiteChrome';
import { PartyDetail } from '../../../../../countries/CountryDetail';
import { countryBySlug } from '../../../../../../lib/countries';
import { localizeCountryProfile } from '../../../../../../lib/country-localization';
import { countryPartyNames,partySlug } from '../../../../../../lib/country-parties';
import type { Locale } from '../../../../../LocaleProvider';

const supported=new Set(['de','es','fr','pt-br']);
export const dynamicParams=true;
type Props={params:Promise<{locale:string;slug:string;party:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {locale,slug,party}=await params,base=countryBySlug(slug);
 const country=supported.has(locale)&&base?localizeCountryProfile(base,locale as Locale):null;
 const name=(countryPartyNames[slug]??[]).find(x=>partySlug(x)===party);
 return country&&name?{title:`${name} · ${country.name} | Politangle`,robots:{index:false,follow:true},alternates:{canonical:`/${locale}/countries/${slug}/parties/${party}`}}:{robots:{index:false,follow:false}};
}
export default async function Page({params}:Props){
 const {locale,slug,party}=await params,base=countryBySlug(slug),name=(countryPartyNames[slug]??[]).find(x=>partySlug(x)===party);
 if(!supported.has(locale)||!base||!name)notFound();
 const country=localizeCountryProfile(base,locale as Locale);
 if(!country)notFound();
 return <><SiteHeader/><PartyDetail country={country} name={name} partyKey={party} locale={locale as Locale}/></>;
}