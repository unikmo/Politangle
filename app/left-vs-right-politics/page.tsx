import SeoTopicPage from '../SeoTopicPage';
import { seoTopicMetadata } from '../../lib/seo-topic-metadata';

export const metadata = seoTopicMetadata('left-vs-right-politics');

export default function Page() {
  return <SeoTopicPage slug="left-vs-right-politics" />;
}
