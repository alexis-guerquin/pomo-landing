import { useI18n } from '../../../contexts/I18nContext';
import { useEffect, useState, useRef } from 'react';
import './Article.css';

interface TableOfContentItem {
  id: string;
  title: string;
  level: number;
}

export function GuideProductiviteFranceArticle() {
  const { t } = useI18n();
  const [activeSection, setActiveSection] = useState<string>('');
  const [tocItems, setTocItems] = useState<TableOfContentItem[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const article = t.pages.blog.articles.guideProductiviteFrance;

  useEffect(() => {
    const items: TableOfContentItem[] = [
      { id: 'what-is', title: article.sections.whatIs.title, level: 2 },
      { id: 'why-professional', title: article.sections.whyProfessional.title, level: 2 },
      { id: 'key-steps', title: article.sections.keySteps.title, level: 2 },
      { id: 'cost', title: article.sections.cost.title, level: 2 },
      { id: 'choose-provider', title: article.sections.chooseProvider.title, level: 2 },
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

          {/* Section 1: Qu'est-ce que... */}
          <section id="what-is" className="blog-section">
            <h2>{article.sections.whatIs.title}</h2>
            <p>{article.sections.whatIs.content1}</p>
            <p>{article.sections.whatIs.content2}</p>
            <p>{article.sections.whatIs.content3}</p>
            <div className="blog-highlight">
              <p><strong>Pomocha</strong> — {article.sections.whatIs.pomocha}</p>
            </div>
          </section>

          {/* Section 2: Pourquoi utiliser un outil professionnel */}
          <section id="why-professional" className="blog-section">
            <h2>{article.sections.whyProfessional.title}</h2>
            <p>{article.sections.whyProfessional.content1}</p>
            {article.sections.whyProfessional.reasons.map((reason, index) => (
              <div key={index} className="blog-subsection">
                <h3>{reason.title}</h3>
                <p>{reason.content}</p>
              </div>
            ))}
          </section>

          {/* Section 3: Les étapes clés */}
          <section id="key-steps" className="blog-section">
            <h2>{article.sections.keySteps.title}</h2>
            <p>{article.sections.keySteps.content}</p>
            {article.sections.keySteps.steps.map((step, index) => (
              <div key={index} className="blog-subsection">
                <h3>{step.title}</h3>
                <p>{step.content}</p>
              </div>
            ))}
          </section>

          {/* Section 4: Combien coûte... */}
          <section id="cost" className="blog-section">
            <h2>{article.sections.cost.title}</h2>
            <p>{article.sections.cost.content1}</p>

            <div className="blog-apps-table">
              <table>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Prix</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {article.sections.cost.comparison.map((item, index) => (
                    <tr key={index}>
                      <td><strong>{item.category}</strong></td>
                      <td>{item.price}</td>
                      <td>{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>{article.sections.cost.content2}</p>
            <div className="blog-highlight">
              <p><strong>💡 {article.sections.cost.tip}</strong></p>
            </div>
          </section>

          {/* Section 5: Comment choisir */}
          <section id="choose-provider" className="blog-section">
            <h2>{article.sections.chooseProvider.title}</h2>
            <p>{article.sections.chooseProvider.content}</p>
            {article.sections.chooseProvider.criteria.map((criterion, index) => (
              <div key={index} className="blog-subsection">
                <h3>{criterion.title}</h3>
                <p>{criterion.content}</p>
              </div>
            ))}
            <div className="blog-highlight">
              <p><strong>{article.sections.chooseProvider.conclusion}</strong></p>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
