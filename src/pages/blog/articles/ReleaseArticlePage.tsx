import { Link } from 'react-router-dom';
import { releaseArticles } from '../../../content/releases';
import { useI18n } from '../../../contexts/I18nContext';
import { PageLayout } from '../../../layouts/PageLayout/PageLayout';
import { MobileStoreLinks } from '../../../components/MobileStoreLinks/MobileStoreLinks';
import { PhoneScreenshot } from '../../../components/DevicePair/DevicePair';
import { MacScreenshot } from '../../../components/MacScreenshot/MacScreenshot';
import './ReleaseArticlePage.css';

type ReleaseArticle = typeof releaseArticles[number];
export default function ReleaseArticlePage({ article }: { article: ReleaseArticle }) {
  const { locale } = useI18n();
  const copy = article[locale];
  return <PageLayout htmlTitle={`${copy.title} | Pomocha`} h1={copy.title} intro={copy.intro} metaDescription={copy.description} ogImage={`https://www.pomocha.fr${article.image}`} ogType="article">
    <article className="release-article">
      <div className="release-article__meta"><span>{article.period[locale]}</span><p>{locale === 'fr' ? 'Publié le ' : 'Published on '}<time dateTime={article.publishedAt}>{new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(article.publishedAt))}</time> · {locale === 'fr' ? 'Équipe Pocha' : 'Pocha team'}</p></div>
      <div className="release-article__visual">{article.key === 'mac' ? <MacScreenshot scene="macbook-focus" priority /> : article.key === 'android' ? <img src={article.image} alt={locale === 'fr' ? 'Illustration de Pocha sur Google Play' : 'Pocha Google Play illustration'} width="1024" height="500" /> : <PhoneScreenshot scene="focus" priority />}</div>
      <nav className="release-article__toc" aria-label={locale === 'fr' ? 'Sommaire' : 'Contents'}>{copy.sections.map((section, index) => <a key={section.title} href={`#release-section-${index}`}>{section.title}</a>)}</nav>
      {copy.sections.map((section, index) => <section key={section.title} id={`release-section-${index}`}><h2>{section.title}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}
      <MobileStoreLinks />
      <p className="release-article__links"><Link to="/app#mac">{locale === 'fr' ? 'Découvrir Pocha sur tous les écrans' : 'Explore Pocha on every screen'}</Link><Link to="/support">{locale === 'fr' ? 'Aide et support' : 'Help and support'}</Link></p>
      <aside><h2>{locale === 'fr' ? 'Les autres étapes de Pocha' : 'More Pocha releases'}</h2>{releaseArticles.filter(other => other.key !== article.key).map(other => <p key={other.slug}><Link to={`/blog/${other.slug}`}>{other[locale].title}</Link></p>)}</aside>
    </article>
  </PageLayout>;
}
