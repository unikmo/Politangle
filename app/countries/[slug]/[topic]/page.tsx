import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteHeader } from '../../../SiteChrome';
import { TopicDetail } from '../../CountryDetail';
import { countryBySlug } from '../../../../lib/countries';

export const dynamicParams = true;
type Props = {params:Promise<{slug:string;topic:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {slug,topic}=await params,country=countryBySlug(slug),index=Number(topic)-1;
 const label=Number.isInteger(index)&&index>=0?country?.globalLabels?.localDimensions[index]:undefined;
 return label?{title:`${label} · ${country!.name} | Politangle`,description:`${label}: institutions, background and primary sources in ${country!.name}.`,robots:{index:false,follow:true},alternates:{canonical:`/countries/${slug}/${topic}`}}:{robots:{index:false,follow:false}};
}
export default async function Page({params}:Props){
 const {slug,topic}=await params,country=countryBySlug(slug),index=Number(topic)-1;
 if(!country||!Number.isInteger(index)||index<0||!country.globalLabels?.localDimensions[index]) notFound();
 return <><SiteHeader/><TopicDetail country={country} index={index} locale="en"/></>;
}