import SeoTopicPage from '../SeoTopicPage';
import { seoTopicMetadata } from '../../lib/seo-topic-metadata';

export const metadata = seoTopicMetadata('political-ideologies');

export default function Page() {
  return <SeoTopicPage slug="political-ideologies" />;
}
