import { useParams, Navigate } from 'react-router-dom';
import { CTASection } from '../../components/CTASection';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import { useI18n } from '../../contexts/I18nContext';
import { BestPomodoroOnlineArticle } from './articles/BestPomodoroOnlineArticle';
import { TechniquePomodoroArticle } from './articles/TechniquePomodoroArticle';
import { AppPomodoroGamifieeArticle } from './articles/AppPomodoroGamifieeArticle';
import { PomodoroEtudiantFreelanceArticle } from './articles/PomodoroEtudiantFreelanceArticle';
import { PomochaNouveautesArticle } from './articles/PomochaNouveautesArticle';
import { PomochaExtensionArticle } from './articles/PomochaExtensionArticle';
import { GuideProductiviteFranceArticle } from './articles/GuideProductiviteFranceArticle';
import { ProductiviteSideProject2025Article } from './articles/ProductiviteSideProject2025Article';
import { ComparatifProductiviteArticle } from './articles/ComparatifProductiviteArticle';
import { ProductivityUltimateGuideArticle } from './articles/ProductivityUltimateGuideArticle';
import { PomodoroTechniqueGuideArticle } from './articles/PomodoroTechniqueGuideArticle';
import { SideProjectIdeasArticle } from './articles/SideProjectIdeasArticle';
import { HowToStayFocusedArticle } from './articles/HowToStayFocusedArticle';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useI18n();

  // Mapper les clés d'articles aux composants
  const articleComponents: { [key: string]: React.ComponentType } = {
    bestPomodoroOnline: BestPomodoroOnlineArticle,
    techniquePomodoro: TechniquePomodoroArticle,
    appPomodoroGamifiee: AppPomodoroGamifieeArticle,
    pomodoroEtudiantFreelance: PomodoroEtudiantFreelanceArticle,
    pomochaNouveautes: PomochaNouveautesArticle,
    pomochaExtension: PomochaExtensionArticle,
    guideProductiviteFrance: GuideProductiviteFranceArticle,
    productiviteSideProject2025: ProductiviteSideProject2025Article,
    comparatifProductivite: ComparatifProductiviteArticle,
    productivityUltimateGuide: ProductivityUltimateGuideArticle,
    pomodoroTechniqueGuide: PomodoroTechniqueGuideArticle,
    sideProjectIdeas: SideProjectIdeasArticle,
    howToStayFocused: HowToStayFocusedArticle,
  };

  // Trouver l'article correspondant au slug depuis les traductions
  let articleKey: string | null = null;
  let articleMeta: any = null;

  // Vérifier tous les articles pour trouver celui qui correspond au slug
  const articles = t.pages.blog.articles;
  for (const key in articles) {
    if (articles[key as keyof typeof articles]?.slug === slug) {
      articleKey = key;
      articleMeta = articles[key as keyof typeof articles];
      break;
    }
  }

  if (!articleKey || !articleMeta) {
    return <Navigate to="/blog" replace />;
  }

  const ArticleComponent = articleComponents[articleKey];

  if (!ArticleComponent) {
    return <Navigate to="/blog" replace />;
  }

  const metaTitle = articleMeta.title;
  const metaDescription = articleMeta.description;

  return (
    <PageLayout
      htmlTitle={`${metaTitle} | Pomocha`}
      metaDescription={metaDescription}
      h1={metaTitle}
      intro={articleMeta.intro}
    >
      <div className="blog-container">
        <ArticleComponent />
        <CTASection />
      </div>
    </PageLayout>
  );
}

