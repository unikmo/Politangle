import SeoTopicPage from '../SeoTopicPage';
import { seoTopicMetadata } from '../../lib/seo-topic-metadata';

export const metadata = seoTopicMetadata('political-literacy');

export default function Page() {
  return <SeoTopicPage slug="political-literacy" />;
}
