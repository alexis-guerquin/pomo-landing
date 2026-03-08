import { useI18n } from '../../../contexts/I18nContext';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Article.css';

interface TableOfContentItem {
  id: string;
  title: string;
  level: number;
}

export function TechniquePomodoroArticle() {
  const { t } = useI18n();
  const article = t.pages.blog.articles.techniquePomodoro;
  const [activeSection, setActiveSection] = useState<string>('');
  const [tocItems, setTocItems] = useState<TableOfContentItem[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const items: TableOfContentItem[] = [
      { id: 'what-is', title: article.sections.whatIs.title, level: 2 },
      { id: 'how-it-works', title: article.sections.howItWorks.title, level: 2 },
      { id: 'benefits', title: article.sections.benefits.title, level: 2 },
      { id: 'tips', title: article.sections.tips.title, level: 2 },
      { id: 'tools', title: article.sections.tools.title, level: 2 },
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
        </div>

        <div className="blog-article__content">

          <section id="what-is" className="blog-section">
            <h2>{article.sections.whatIs.title}</h2>
            <p>{article.sections.whatIs.content1}</p>
            <p>{article.sections.whatIs.content2}</p>
          </section>

          <section id="how-it-works" className="blog-section">
            <h2>{article.sections.howItWorks.title}</h2>
            <ol className="blog-list blog-list--ordered">
              {article.sections.howItWorks.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
            <p>{article.sections.howItWorks.content}</p>
          </section>

          <section id="benefits" className="blog-section">
            <h2>{article.sections.benefits.title}</h2>
            <p>{article.sections.benefits.content}</p>
            <ul className="blog-list">
              {article.sections.benefits.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="tips" className="blog-section">
            <h2>{article.sections.tips.title}</h2>
            <p>{article.sections.tips.content}</p>
            <h3>{article.sections.tips.tip1Title}</h3>
            <p>{article.sections.tips.tip1}</p>
            <h3>{article.sections.tips.tip2Title}</h3>
            <p>{article.sections.tips.tip2}</p>
            <h3>{article.sections.tips.tip3Title}</h3>
            <p>{article.sections.tips.tip3}</p>
          </section>

          <section id="tools" className="blog-section">
            <h2>{article.sections.tools.title}</h2>
            <p>{article.sections.tools.content}</p>
            <p className="blog-cta-inline">
              <a href={article.sections.tools.ctaUrl} className="blog-cta-link" target="_blank" rel="noopener noreferrer">
                {article.sections.tools.ctaText}
              </a>
            </p>
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
