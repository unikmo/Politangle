import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteHeader } from '../../../../SiteChrome';
import { TopicDetail } from '../../../../countries/CountryDetail';
import { countryBySlug } from '../../../../../lib/countries';
import { localizeCountryProfile } from '../../../../../lib/country-localization';
import type { Locale } from '../../../../LocaleProvider';

const supported=new Set(['de','es','fr','pt-br']);
export const dynamicParams=true;
type Props={params:Promise<{locale:string;slug:string;topic:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {locale,slug,topic}=await params,base=countryBySlug(slug);
 const country=supported.has(locale)&&base?localizeCountryProfile(base,locale as Locale):null;
 const index=Number(topic)-1,label=Number.isInteger(index)&&index>=0?country?.globalLabels?.localDimensions[index]:undefined;
 return label?{title:`${label} · ${country!.name} | Politangle`,description:`${country!.name} · ${label}`,robots:{index:false,follow:true},alternates:{canonical:`/${locale}/countries/${slug}/${topic}`}}:{robots:{index:false,follow:false}};
}
export default async function Page({params}:Props){
 const {locale,slug,topic}=await params,base=countryBySlug(slug),index=Number(topic)-1;
 if(!supported.has(locale)||!base||!Number.isInteger(index)||index<0) notFound();
 const country=localizeCountryProfile(base,locale as Locale);
 if(!country?.globalLabels?.localDimensions[index])notFound();
 return <><SiteHeader/><TopicDetail country={country} index={index} locale={locale as Locale}/></>;
}