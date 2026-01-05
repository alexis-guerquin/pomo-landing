import { useI18n } from '../../../contexts/I18nContext';
import { useEffect, useState, useRef } from 'react';
import './Article.css';

interface TableOfContentItem {
  id: string;
  title: string;
  level: number;
}

export function BestPomodoroAppsArticle() {
  const { t } = useI18n();
  const [activeSection, setActiveSection] = useState<string>('');
  const [tocItems, setTocItems] = useState<TableOfContentItem[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    // Générer la table des matières à partir des sections (uniquement les titres principaux - niveau 2)
    const items: TableOfContentItem[] = [
      { id: 'what-is-pomodoro', title: t.pages.blog.articles.bestPomodoroApps.sections.whatIsPomodoro.title, level: 2 },
      { id: 'what-makes-great', title: t.pages.blog.articles.bestPomodoroApps.sections.whatMakesGreat.title, level: 2 },
      { id: 'how-we-evaluated', title: t.pages.blog.articles.bestPomodoroApps.sections.howWeEvaluated.title, level: 2 },
      { id: 'apps-list', title: t.pages.blog.articles.bestPomodoroApps.sections.appsList.title, level: 2 },
      { id: 'which-is-best', title: t.pages.blog.articles.bestPomodoroApps.sections.whichIsBest.title, level: 2 }
    ];

    setTocItems(items);

    // Observer pour détecter la section active
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

    // Observer toutes les sections
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
          <h3 className="blog-toc__title">{t.pages.blog.articles.bestPomodoroApps.tocTitle}</h3>
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
          <time dateTime="2025-10-22" className="blog-article__date">
            {t.pages.blog.articles.bestPomodoroApps.date}
          </time>
        </div>

        <div className="blog-article__content">
          <p className="blog-article__intro">
            {t.pages.blog.articles.bestPomodoroApps.intro}
          </p>

          <section id="what-is-pomodoro" className="blog-section">
            <h2>{t.pages.blog.articles.bestPomodoroApps.sections.whatIsPomodoro.title}</h2>
            <p>{t.pages.blog.articles.bestPomodoroApps.sections.whatIsPomodoro.content1}</p>
            <p>{t.pages.blog.articles.bestPomodoroApps.sections.whatIsPomodoro.content2}</p>
            <p>{t.pages.blog.articles.bestPomodoroApps.sections.whatIsPomodoro.content3}</p>
          </section>

          <section id="what-makes-great" className="blog-section">
            <h2>{t.pages.blog.articles.bestPomodoroApps.sections.whatMakesGreat.title}</h2>
            <p>{t.pages.blog.articles.bestPomodoroApps.sections.whatMakesGreat.content}</p>
          </section>

          <section id="how-we-evaluated" className="blog-section">
            <h2>{t.pages.blog.articles.bestPomodoroApps.sections.howWeEvaluated.title}</h2>
            <ul className="blog-list">
              {t.pages.blog.articles.bestPomodoroApps.sections.howWeEvaluated.criteria.map((criterion, index) => (
                <li key={index}>{criterion}</li>
              ))}
            </ul>
          </section>

          <section id="apps-list" className="blog-section">
            <h2>{t.pages.blog.articles.bestPomodoroApps.sections.appsList.title}</h2>
            
            <div className="blog-apps-table">
              <table>
                <thead>
                  <tr>
                    <th>{t.pages.blog.articles.bestPomodoroApps.table.rank}</th>
                    <th>{t.pages.blog.articles.bestPomodoroApps.table.tool}</th>
                    <th>{t.pages.blog.articles.bestPomodoroApps.table.bestFor}</th>
                    <th>{t.pages.blog.articles.bestPomodoroApps.table.platform}</th>
                    <th>{t.pages.blog.articles.bestPomodoroApps.table.free}</th>
                    <th>{t.pages.blog.articles.bestPomodoroApps.table.standout}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.pages.blog.articles.bestPomodoroApps.apps.map((app, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td><strong>{app.name}</strong></td>
                      <td>{app.bestFor}</td>
                      <td>{app.platform}</td>
                      <td>{app.free ? '✅' : '❌'}</td>
                      <td>{app.standoutFeature}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {t.pages.blog.articles.bestPomodoroApps.apps.map((app, index) => (
              <section key={index} id={`app-${index + 1}`} className="blog-app-section">
                <h3>
                  {index + 1}. {app.name}
                </h3>
                <p className="blog-app__tagline">{app.tagline}</p>
                
                {app.images && app.images.length > 0 && (
                  <div className="blog-app__images">
                    {app.images.map((image, imgIndex) => (
                      <div key={imgIndex} className="blog-app__image-wrapper">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="blog-app__image"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="blog-app__content">
                  <p>{app.description}</p>
                  
                  <div className="blog-app__details">
                    <div className="blog-app__detail-item">
                      <strong>{t.pages.blog.articles.bestPomodoroApps.appDetails.whoItsFor}:</strong> {app.whoItsFor}
                    </div>
                    
                    <div className="blog-app__pros-cons">
                      <div className="blog-app__pros">
                        <strong>{t.pages.blog.articles.bestPomodoroApps.appDetails.pros}:</strong>
                        <ul>
                          {app.pros.map((pro, proIndex) => (
                            <li key={proIndex}>{pro}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="blog-app__cons">
                        <strong>{t.pages.blog.articles.bestPomodoroApps.appDetails.cons}:</strong>
                        <ul>
                          {app.cons.map((con, conIndex) => (
                            <li key={conIndex}>{con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="blog-app__pricing">
                      <strong>{t.pages.blog.articles.bestPomodoroApps.appDetails.pricing}:</strong> {app.pricing}
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </section>

          <section id="which-is-best" className="blog-section">
            <h2>{t.pages.blog.articles.bestPomodoroApps.sections.whichIsBest.title}</h2>
            <p>{t.pages.blog.articles.bestPomodoroApps.sections.whichIsBest.content}</p>
            <ul className="blog-list">
              {t.pages.blog.articles.bestPomodoroApps.sections.whichIsBest.recommendations.map((rec, index) => (
                <li key={index}>
                  <strong>{rec.situation}:</strong> {rec.recommendation}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </div>
  );
}

