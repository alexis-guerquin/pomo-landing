import { useI18n } from '../../../contexts/I18nContext';
import { DynamicArticle } from './DynamicArticle';
import { getBestPomodoroOnlineConfig } from './configs/bestPomodoroOnlineConfig';

export function BestPomodoroOnlineArticle() {
  const { t } = useI18n();
  const article = t.pages.blog.articles.bestPomodoroOnline;
  const sectionConfig = getBestPomodoroOnlineConfig(article);

  return <DynamicArticle articleData={article} sectionConfig={sectionConfig} />;
}

