import SeoTopicPage from '../SeoTopicPage';
import { seoTopicMetadata } from '../../lib/seo-topic-metadata';

export const metadata = seoTopicMetadata('political-spectrum');

export default function Page() {
  return <SeoTopicPage slug="political-spectrum" />;
}
