import { CTASection } from '../../components/CTASection';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import { useI18n } from '../../contexts/I18nContext';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import './BlogPage.css';

export default function BlogPage() {
  const { t, locale } = useI18n();
  const a = t.pages.blog.articles;
  const c = t.pages.blog.categories;
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  const allLabel = locale === 'fr' ? 'Tout' : 'All';

  const categories = [
    {
      key: 'pomodoro',
      ...c.pomodoro,
      articles: [
        a.pomodoroTechniqueGuide,
        a.howToStayFocused,
        a.techniquePomodoro,
        a.bestPomodoroOnline,
        a.bestPomodoroApps,
      ],
    },
    {
      key: 'productivity',
      ...c.productivity,
      articles: [
        a.productivityUltimateGuide,
        a.comparatifProductivite,
        a.guideProductiviteFrance,
        a.appPomodoroGamifiee,
      ],
    },
    {
      key: 'sideProject',
      ...c.sideProject,
      articles: [
        a.sideProjectIdeas,
        a.productiviteSideProject2025,
        a.pomodoroEtudiantFreelance,
      ],
    },
    {
      key: 'pomocha',
      ...c.pomocha,
      articles: [
        a.pomochaExtension,
        a.pomochaNouveautes,
      ],
    },
  ];

  const totalArticles = categories.reduce((sum, cat) => sum + cat.articles.length, 0);
  const visibleCategories = activeFilter
    ? categories.filter((cat) => cat.key === activeFilter)
    : categories;

  const handleFilter = (key: string | null) => {
    setActiveFilter(key);
    if (categoriesRef.current) {
      const offset = 100;
      const top = categoriesRef.current.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <PageLayout
      htmlTitle={t.pages.blog.htmlTitle}
      metaDescription={t.pages.blog.metaDescription}
      h1={t.pages.blog.h1}
      intro={t.pages.blog.intro}
    >
      <div className="blog-container">
        <nav className="blog-filters" ref={categoriesRef}>
          <button
            className={`blog-filters__btn ${activeFilter === null ? 'blog-filters__btn--active' : ''}`}
            onClick={() => handleFilter(null)}
            type="button"
          >
            {allLabel}
            <span className="blog-filters__count">{totalArticles}</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`blog-filters__btn ${activeFilter === cat.key ? 'blog-filters__btn--active' : ''}`}
              onClick={() => handleFilter(cat.key)}
              type="button"
            >
              {cat.title}
              <span className="blog-filters__count">{cat.articles.length}</span>
            </button>
          ))}
        </nav>

        {visibleCategories.map((category) => (
          <section key={category.key} className="blog-category">
            <h2 className="blog-category__title">{category.title}</h2>
            <p className="blog-category__description">{category.description}</p>

            <div className="blog-articles-grid">
              {category.articles.map((article) => (
                <article key={article.slug} className="blog-card">
                  <Link to={`/blog/${article.slug}`} className="blog-card__link">
                    <div className="blog-card__content">
                      <div className="blog-card__meta">
                        <time dateTime={article.date} className="blog-card__date">
                          {article.date}
                        </time>
                      </div>
                      <h3 className="blog-card__title">{article.title}</h3>
                      <p className="blog-card__description">{article.description}</p>
                      <span className="blog-card__cta">
                        {t.pages.blog.articlesList.readMore}
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ))}

        <CTASection />
      </div>
    </PageLayout>
  );
}
