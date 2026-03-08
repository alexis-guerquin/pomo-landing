import { useI18n } from '../../../contexts/I18nContext';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ThreeDButton from '../../../components/ui/3DButton/3dbutton';
import './Article.css';

interface TableOfContentItem {
  id: string;
  title: string;
  level: number;
}

function FeatureImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="changelog-feature-img">
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
}

export function PomochaNouveautesArticle() {
  const { t } = useI18n();
  const article = t.pages.blog.articles.pomochaNouveautes;
  const [activeSection, setActiveSection] = useState<string>('');
  const [tocItems, setTocItems] = useState<TableOfContentItem[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const items: TableOfContentItem[] = [
      { id: 'stackable-badges', title: article.sections.stackableBadges.title, level: 2 },
      { id: 'daily-summary', title: article.sections.dailySummary.title, level: 2 },
      { id: 'daily-goal', title: article.sections.dailyGoal.title, level: 2 },
      { id: 'recaps', title: article.sections.recaps.title, level: 2 },
      { id: 'bugfixes', title: article.sections.bugfixes.title, level: 2 },
      { id: 'in-progress', title: article.sections.inProgress.title, level: 2 },
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
          <time dateTime="2026-03-08">{article.date}</time>
        </div>

        <div className="blog-article__content">

          <section id="stackable-badges" className="blog-section">
            <h2>{article.sections.stackableBadges.title}</h2>
            <FeatureImage src="/changelog/2026-03/2.png" alt="Badges cumulables dans Pomocha" />
            <p>{article.sections.stackableBadges.content1}</p>
            <p>{article.sections.stackableBadges.content2}</p>
            <div className="blog-cta-inline">
              <ThreeDButton
                text={article.sections.stackableBadges.cta}
                onClick={() => window.open(article.sections.stackableBadges.ctaUrl, '_blank', 'noopener,noreferrer')}
                type="button"
              />
            </div>
          </section>

          <section id="daily-summary" className="blog-section">
            <h2>{article.sections.dailySummary.title}</h2>
            <FeatureImage src="/changelog/2026-03/3.png" alt="Résumé de journée Pomocha" />
            <p>{article.sections.dailySummary.content}</p>
            <ul className="blog-list">
              {article.sections.dailySummary.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <div className="blog-cta-inline">
              <ThreeDButton
                text={article.sections.dailySummary.cta}
                onClick={() => window.open(article.sections.dailySummary.ctaUrl, '_blank', 'noopener,noreferrer')}
                type="button"
              />
            </div>
          </section>

          <section id="daily-goal" className="blog-section">
            <h2>{article.sections.dailyGoal.title}</h2>
            <FeatureImage src="/changelog/2026-03/4.png" alt="Objectif journalier Pomocha" />
            <p>{article.sections.dailyGoal.content1}</p>
            <p>{article.sections.dailyGoal.content2}</p>
            <div className="blog-cta-inline">
              <ThreeDButton
                text={article.sections.dailyGoal.cta}
                onClick={() => window.open(article.sections.dailyGoal.ctaUrl, '_blank', 'noopener,noreferrer')}
                type="button"
              />
            </div>
          </section>

          <section id="recaps" className="blog-section">
            <h2>{article.sections.recaps.title}</h2>
            <FeatureImage src="/changelog/2026-03/5.png" alt="Récaps hebdomadaires et mensuels Pomocha" />
            <p>{article.sections.recaps.content1}</p>
            <p>{article.sections.recaps.content2}</p>
            <div className="blog-cta-inline">
              <ThreeDButton
                text={article.sections.recaps.cta}
                onClick={() => window.open(article.sections.recaps.ctaUrl, '_blank', 'noopener,noreferrer')}
                type="button"
              />
            </div>
          </section>

          <section id="bugfixes" className="blog-section">
            <h2>{article.sections.bugfixes.title}</h2>
            <ul className="blog-list">
              {article.sections.bugfixes.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="in-progress" className="blog-section">
            <h2>{article.sections.inProgress.title}</h2>
            <p>{article.sections.inProgress.content}</p>
            <ul className="blog-list">
              {article.sections.inProgress.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="conclusion" className="blog-section">
            <h2>{article.sections.conclusion.title}</h2>
            <p>{article.sections.conclusion.content}</p>
            <div className="blog-cta-inline">
              <ThreeDButton
                text={article.sections.conclusion.cta}
                onClick={() => window.open(article.sections.conclusion.ctaUrl, '_blank', 'noopener,noreferrer')}
                type="button"
              />
            </div>
            <p>
              <Link to="/blog">← Blog</Link>
            </p>
          </section>

        </div>
      </article>
    </div>
  );
}
