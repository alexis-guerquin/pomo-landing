import { CTASection } from '../../components/CTASection';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import { useI18n } from '../../contexts/I18nContext';
import { Link } from 'react-router-dom';
import './BlogPage.css';

export default function BlogPage() {
  const { t } = useI18n();
  
  // Liste des articles disponibles
  const articles = [
    {
      slug: t.pages.blog.articles.bestPomodoroOnline.slug,
      title: t.pages.blog.articles.bestPomodoroOnline.title,
      description: t.pages.blog.articles.bestPomodoroOnline.description,
      image: t.pages.blog.articles.bestPomodoroOnline.image,
      date: t.pages.blog.articles.bestPomodoroOnline.date,
      readTime: t.pages.blog.articles.bestPomodoroOnline.readTime,
    }
  ];

  return (
    <PageLayout
      htmlTitle={t.pages.blog.htmlTitle}
      metaDescription={t.pages.blog.metaDescription}
      h1={t.pages.blog.h1}
      intro={t.pages.blog.intro}
    >
      <div className="blog-container">
        <section className="blog-articles-section">
          <h2 className="blog-articles-title">{t.pages.blog.articlesList.title}</h2>
          
          {articles.length === 0 ? (
            <p className="blog-empty">{t.pages.blog.articlesList.empty}</p>
          ) : (
            <div className="blog-articles-grid">
              {articles.map((article) => (
                <article key={article.slug} className="blog-card">
                  <Link to={`/blog/${article.slug}`} className="blog-card__link">
                    <div className="blog-card__image-wrapper">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="blog-card__image"
                        loading="lazy"
                      />
                    </div>
                    <div className="blog-card__content">
                      <div className="blog-card__meta">
                        <time dateTime={article.date} className="blog-card__date">
                          {article.date}
                        </time>
                        <span className="blog-card__read-time">{article.readTime}</span>
                      </div>
                      <h3 className="blog-card__title">{article.title}</h3>
                      <p className="blog-card__description">{article.description}</p>
                      <span className="blog-card__cta">
                        {t.pages.blog.articlesList.readMore || 'Lire la suite →'}
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>

        <CTASection />
      </div>
    </PageLayout>
  );
}
