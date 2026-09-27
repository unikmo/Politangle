import type { Metadata } from 'next';
import MiddleClassTrapClient from './MiddleClassTrapClient';

export const metadata: Metadata = {
  title: 'The Middle Class Trap',
  description: 'A free 20-question political-literacy quiz about tax burdens, public services, wealth, influence and misleading distributional claims.',
  alternates: { canonical: '/en/middle-class-trap' },
};

export default function MiddleClassTrapPage() {
  return <MiddleClassTrapClient/>;
}
