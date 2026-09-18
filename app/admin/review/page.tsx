import type { Metadata } from 'next';
import LiteracyReviewClient from './LiteracyReviewClient';

export const metadata: Metadata = { title: 'Founder literacy review', robots: { index: false, follow: false, nocache: true } };
export default function LiteracyReviewPage() { return <LiteracyReviewClient />; }
