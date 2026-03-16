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

export function PomochaExtensionArticle() {
  const { t } = useI18n();
  const article = t.pages.blog.articles.pomochaExtension;
  const [activeSection, setActiveSection] = useState<string>('');
  const [tocItems, setTocItems] = useState<TableOfContentItem[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const items: TableOfContentItem[] = [
      { id: 'why-extension', title: article.sections.whyExtension.title, level: 2 },
      { id: 'pomodoro-timer', title: article.sections.pomodoroTimer.title, level: 2 },
      { id: 'incrust-timer', title: article.sections.incrustTimer.title, level: 2 },
      { id: 'session-tracking', title: article.sections.sessionTracking.title, level: 2 },
      { id: 'project-management', title: article.sections.projectManagement.title, level: 2 },
      { id: 'todo-list', title: article.sections.todoList.title, level: 2 },
      { id: 'notifications', title: article.sections.notifications.title, level: 2 },
      { id: 'session-recap', title: article.sections.sessionRecap.title, level: 2 },
      { id: 'sync', title: article.sections.sync.title, level: 2 },
      { id: 'how-it-works', title: article.sections.howItWorks.title, level: 2 },
      { id: 'privacy', title: article.sections.privacy.title, level: 2 },
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
          <time dateTime="2026-03-16">{article.date}</time>
        </div>

        <div className="blog-article__content">

          <section id="why-extension" className="blog-section">
            <h2>{article.sections.whyExtension.title}</h2>
            <p>{article.sections.whyExtension.content1}</p>
            <p>{article.sections.whyExtension.content2}</p>
            <p>{article.sections.whyExtension.content3}</p>
          </section>

          <section id="pomodoro-timer" className="blog-section">
            <h2>{article.sections.pomodoroTimer.title}</h2>
            <FeatureImage src="/blog/extension/ext1.png" alt="Minuteur Pomodoro extension Chrome Pomocha" />
            <p>{article.sections.pomodoroTimer.content1}</p>
            <p>{article.sections.pomodoroTimer.content2}</p>
            <div className="blog-cta-inline">
              <ThreeDButton
                text={article.sections.pomodoroTimer.cta}
                onClick={() => window.open(article.sections.pomodoroTimer.ctaUrl, '_blank', 'noopener,noreferrer')}
                type="button"
              />
            </div>
          </section>

          <section id="incrust-timer" className="blog-section">
            <h2>{article.sections.incrustTimer.title}</h2>
            <FeatureImage src="/blog/extension/incrust-full.png" alt="Minuteur Pomodoro incrusté dans la page web" />
            <p>{article.sections.incrustTimer.content1}</p>
            <p>{article.sections.incrustTimer.content2}</p>
            <FeatureImage src="/blog/extension/incrust.png" alt="Widget minuteur Pomodoro incrusté" />
            <p>{article.sections.incrustTimer.content3}</p>
          </section>

          <section id="session-tracking" className="blog-section">
            <h2>{article.sections.sessionTracking.title}</h2>
            <FeatureImage src="/blog/extension/ext2.png" alt="Suivi de sessions Pomodoro extension Pomocha" />
            <p>{article.sections.sessionTracking.content1}</p>
            <p>{article.sections.sessionTracking.content2}</p>
          </section>

          <section id="project-management" className="blog-section">
            <h2>{article.sections.projectManagement.title}</h2>
            <p>{article.sections.projectManagement.content1}</p>
            <p>{article.sections.projectManagement.content2}</p>
          </section>

          <section id="todo-list" className="blog-section">
            <h2>{article.sections.todoList.title}</h2>
            <p>{article.sections.todoList.content1}</p>
            <p>{article.sections.todoList.content2}</p>
          </section>

          <section id="notifications" className="blog-section">
            <h2>{article.sections.notifications.title}</h2>
            <p>{article.sections.notifications.content1}</p>
            <p>{article.sections.notifications.content2}</p>
          </section>

          <section id="session-recap" className="blog-section">
            <h2>{article.sections.sessionRecap.title}</h2>
            <p>{article.sections.sessionRecap.content1}</p>
            <p>{article.sections.sessionRecap.content2}</p>
          </section>

          <section id="sync" className="blog-section">
            <h2>{article.sections.sync.title}</h2>
            <FeatureImage src="/blog/extension/login.png" alt="Connexion Pomocha extension Chrome" />
            <p>{article.sections.sync.content1}</p>
            <p>{article.sections.sync.content2}</p>
            <div className="blog-cta-inline">
              <ThreeDButton
                text={article.sections.sync.cta}
                onClick={() => window.open(article.sections.sync.ctaUrl, '_blank', 'noopener,noreferrer')}
                type="button"
              />
            </div>
          </section>

          <section id="how-it-works" className="blog-section">
            <h2>{article.sections.howItWorks.title}</h2>
            <ol className="blog-list blog-list--numbered">
              {article.sections.howItWorks.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
            <p>{article.sections.howItWorks.content}</p>
          </section>

          <section id="privacy" className="blog-section">
            <h2>{article.sections.privacy.title}</h2>
            <p>{article.sections.privacy.content1}</p>
            <p>{article.sections.privacy.content2}</p>
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
              <Link to="/blog">&larr; Blog</Link>
            </p>
          </section>

        </div>
      </article>
    </div>
  );
}
