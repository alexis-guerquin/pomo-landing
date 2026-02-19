import { useI18n } from '../../../contexts/I18nContext';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Article.css';

interface TableOfContentItem {
  id: string;
  title: string;
  level: number;
}

export function AppPomodoroGamifieeArticle() {
  const { t } = useI18n();
  const article = t.pages.blog.articles.appPomodoroGamifiee;
  const [activeSection, setActiveSection] = useState<string>('');
  const [tocItems, setTocItems] = useState<TableOfContentItem[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const items: TableOfContentItem[] = [
      { id: 'what-is-gamification', title: article.sections.whatIsGamification.title, level: 2 },
      { id: 'why-it-works', title: article.sections.whyItWorks.title, level: 2 },
      { id: 'key-features', title: article.sections.keyFeatures.title, level: 2 },
      { id: 'pomocha', title: article.sections.pomocha.title, level: 2 },
      { id: 'comparison', title: article.sections.comparison.title, level: 2 },
      { id: 'conclusion', title: article.sections.conclusion.title, level: 2 },
    ];
    setTocItems(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { root: null, rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

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
  }, [article]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
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
                <li key={item.id} className={`blog-toc__item blog-toc__item--level-${item.level}`}>
                  <button
                    className={`blog-toc__link ${activeSection === item.id ? 'blog-toc__link--active' : ''}`}
                    onClick={() => scrollToSection(item.id)}
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
          <time dateTime="2026-02-19">{article.date}</time>
          <span className="blog-article__read-time">{article.readTime}</span>
        </div>

        <div className="blog-article__content">

          <section id="what-is-gamification" className="blog-section">
            <h2>{article.sections.whatIsGamification.title}</h2>
            <p>{article.sections.whatIsGamification.content1}</p>
            <p>{article.sections.whatIsGamification.content2}</p>
          </section>

          <section id="why-it-works" className="blog-section">
            <h2>{article.sections.whyItWorks.title}</h2>
            <p>{article.sections.whyItWorks.content}</p>
            <ul className="blog-list">
              {article.sections.whyItWorks.reasons.map((reason, i) => (
                <li key={i}>{reason}</li>
              ))}
            </ul>
          </section>

          <section id="key-features" className="blog-section">
            <h2>{article.sections.keyFeatures.title}</h2>
            <p>{article.sections.keyFeatures.content}</p>
            <h3>{article.sections.keyFeatures.feature1Title}</h3>
            <p>{article.sections.keyFeatures.feature1}</p>
            <h3>{article.sections.keyFeatures.feature2Title}</h3>
            <p>{article.sections.keyFeatures.feature2}</p>
            <h3>{article.sections.keyFeatures.feature3Title}</h3>
            <p>{article.sections.keyFeatures.feature3}</p>
            <h3>{article.sections.keyFeatures.feature4Title}</h3>
            <p>{article.sections.keyFeatures.feature4}</p>
          </section>

          <section id="pomocha" className="blog-section">
            <h2>{article.sections.pomocha.title}</h2>
            <p>{article.sections.pomocha.content}</p>
            <p className="blog-cta-inline">
              <a href={article.sections.pomocha.ctaUrl} className="blog-cta-link" target="_blank" rel="noopener noreferrer">
                {article.sections.pomocha.ctaText}
              </a>
            </p>
          </section>

          <section id="comparison" className="blog-section">
            <h2>{article.sections.comparison.title}</h2>
            <p>{article.sections.comparison.content}</p>
          </section>

          <section id="conclusion" className="blog-section">
            <h2>{article.sections.conclusion.title}</h2>
            <p>{article.sections.conclusion.content}</p>
            <p>
              <Link to="/">← {t.components.navbar.home}</Link>
            </p>
          </section>

        </div>
      </article>
    </div>
  );
}
