import { useI18n } from '../../../contexts/I18nContext';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Article.css';

interface TableOfContentItem {
  id: string;
  title: string;
  level: number;
}

export function PomodoroEtudiantFreelanceArticle() {
  const { t } = useI18n();
  const article = t.pages.blog.articles.pomodoroEtudiantFreelance;
  const [activeSection, setActiveSection] = useState<string>('');
  const [tocItems, setTocItems] = useState<TableOfContentItem[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const items: TableOfContentItem[] = [
      { id: 'common-challenges', title: article.sections.commonChallenges.title, level: 2 },
      { id: 'for-students', title: article.sections.forStudents.title, level: 2 },
      { id: 'for-freelancers', title: article.sections.forFreelancers.title, level: 2 },
      { id: 'best-practices', title: article.sections.bestPractices.title, level: 2 },
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

          <section id="common-challenges" className="blog-section">
            <h2>{article.sections.commonChallenges.title}</h2>
            <p>{article.sections.commonChallenges.content}</p>
            <ul className="blog-list">
              {article.sections.commonChallenges.challenges.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </section>

          <section id="for-students" className="blog-section">
            <h2>{article.sections.forStudents.title}</h2>
            <p>{article.sections.forStudents.content}</p>
            <h3>{article.sections.forStudents.tip1Title}</h3>
            <p>{article.sections.forStudents.tip1}</p>
            <h3>{article.sections.forStudents.tip2Title}</h3>
            <p>{article.sections.forStudents.tip2}</p>
            <h3>{article.sections.forStudents.tip3Title}</h3>
            <p>{article.sections.forStudents.tip3}</p>
          </section>

          <section id="for-freelancers" className="blog-section">
            <h2>{article.sections.forFreelancers.title}</h2>
            <p>{article.sections.forFreelancers.content}</p>
            <h3>{article.sections.forFreelancers.tip1Title}</h3>
            <p>{article.sections.forFreelancers.tip1}</p>
            <h3>{article.sections.forFreelancers.tip2Title}</h3>
            <p>{article.sections.forFreelancers.tip2}</p>
            <h3>{article.sections.forFreelancers.tip3Title}</h3>
            <p>{article.sections.forFreelancers.tip3}</p>
            <h3>{article.sections.forFreelancers.tip4Title}</h3>
            <p>{article.sections.forFreelancers.tip4}</p>
          </section>

          <section id="best-practices" className="blog-section">
            <h2>{article.sections.bestPractices.title}</h2>
            <ul className="blog-list">
              {article.sections.bestPractices.practices.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
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
