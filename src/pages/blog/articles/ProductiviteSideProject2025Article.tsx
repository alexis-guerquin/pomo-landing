import { useI18n } from '../../../contexts/I18nContext';
import { useEffect, useState, useRef } from 'react';
import './Article.css';

interface TableOfContentItem {
  id: string;
  title: string;
  level: number;
}

export function ProductiviteSideProject2025Article() {
  const { t } = useI18n();
  const [activeSection, setActiveSection] = useState<string>('');
  const [tocItems, setTocItems] = useState<TableOfContentItem[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const article = t.pages.blog.articles.productiviteSideProject2025;

  useEffect(() => {
    const items: TableOfContentItem[] = [
      { id: 'market-state', title: article.sections.marketState.title, level: 2 },
      { id: 'trends', title: article.sections.trends.title, level: 2 },
      { id: 'mistakes', title: article.sections.mistakes.title, level: 2 },
      { id: 'recommendations', title: article.sections.recommendations.title, level: 2 },
    ];

    setTocItems(items);

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        sectionRefs.current[item.id] = element;
        observer.observe(element);
      }
    });

    return () => {
      Object.values(sectionRefs.current).forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [t]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="blog-article-container">
      <aside className="blog-toc">
        <div className="blog-toc__sticky">
          <h3 className="blog-toc__title">{article.tocTitle}</h3>
          <nav className="blog-toc__nav">
            <ul className="blog-toc__list">
              {tocItems.map((item) => (
                <li
                  key={item.id}
                  className={`blog-toc__item blog-toc__item--level-${item.level} ${
                    activeSection === item.id ? 'blog-toc__item--active' : ''
                  }`}
                >
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="blog-toc__link"
                    type="button"
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      <article className="blog-article">
        <div className="blog-article__meta">
          <time dateTime="2026-03-19" className="blog-article__date">
            {article.date}
          </time>
          <span className="blog-article__read-time">{article.readTime}</span>
        </div>

        <div className="blog-article__content">
          <p className="blog-article__intro">{article.intro}</p>

          {/* Section 1: État du marché */}
          <section id="market-state" className="blog-section">
            <h2>{article.sections.marketState.title}</h2>
            <p>{article.sections.marketState.content1}</p>
            <p>{article.sections.marketState.content2}</p>

            {article.sections.marketState.dynamics.map((dynamic, index) => (
              <div key={index} className="blog-subsection">
                <h3>{dynamic.title}</h3>
                <p>{dynamic.content}</p>
              </div>
            ))}

            <div className="blog-highlight">
              <h3>{article.sections.marketState.stats.title}</h3>
              <ul className="blog-list">
                {article.sections.marketState.stats.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 2: Tendances */}
          <section id="trends" className="blog-section">
            <h2>{article.sections.trends.title}</h2>
            <p>{article.sections.trends.content}</p>

            {article.sections.trends.trendsList.map((trend, index) => (
              <div key={index} className="blog-subsection">
                <h3>{trend.title}</h3>
                <p>{trend.content}</p>
              </div>
            ))}
          </section>

          {/* Section 3: Erreurs à éviter */}
          <section id="mistakes" className="blog-section">
            <h2>{article.sections.mistakes.title}</h2>
            <p>{article.sections.mistakes.content}</p>

            {article.sections.mistakes.mistakesList.map((mistake, index) => (
              <div key={index} className="blog-subsection">
                <h3>{mistake.title}</h3>
                <p className="blog-problem"><strong>Le problème :</strong> {mistake.problem}</p>
                <p className="blog-solution"><strong>La solution :</strong> {mistake.solution}</p>
              </div>
            ))}
          </section>

          {/* Section 4: Recommandations */}
          <section id="recommendations" className="blog-section">
            <h2>{article.sections.recommendations.title}</h2>
            <p>{article.sections.recommendations.content}</p>

            {article.sections.recommendations.recommendationsList.map((rec, index) => (
              <div key={index} className="blog-subsection">
                <h3>{rec.title}</h3>
                <p>{rec.content}</p>
              </div>
            ))}

            <div className="blog-highlight">
              <p><strong>{article.sections.recommendations.conclusion}</strong></p>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
