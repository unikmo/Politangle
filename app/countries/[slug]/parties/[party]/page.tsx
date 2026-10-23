import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteHeader } from '../../../../SiteChrome';
import { PartyDetail } from '../../../CountryDetail';
import { countryBySlug } from '../../../../../lib/countries';
import { countryPartyNames, partySlug } from '../../../../../lib/country-parties';

export const dynamicParams = true;
type Props={params:Promise<{slug:string;party:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {slug,party}=await params,country=countryBySlug(slug),name=(countryPartyNames[slug]??[]).find(x=>partySlug(x)===party);
 return name&&country?{title:`${name} · ${country.name} | Politangle`,description:`${name}: national political context and sources in ${country.name}.`,robots:{index:false,follow:true},alternates:{canonical:`/countries/${slug}/parties/${party}`}}:{robots:{index:false,follow:false}};
}
export default async function Page({params}:Props){
 const {slug,party}=await params,country=countryBySlug(slug),name=(countryPartyNames[slug]??[]).find(x=>partySlug(x)===party);
 if(!country||!name) notFound();
 return <><SiteHeader/><PartyDetail country={country} name={name} partyKey={party} locale="en"/></>;
}