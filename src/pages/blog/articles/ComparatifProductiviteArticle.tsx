import { useI18n } from '../../../contexts/I18nContext';
import { useEffect, useState, useRef } from 'react';
import './Article.css';

interface TableOfContentItem {
  id: string;
  title: string;
  level: number;
}

export function ComparatifProductiviteArticle() {
  const { t } = useI18n();
  const [activeSection, setActiveSection] = useState<string>('');
  const [tocItems, setTocItems] = useState<TableOfContentItem[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const article = t.pages.blog.articles.comparatifProductivite;

  useEffect(() => {
    const items: TableOfContentItem[] = [
      { id: 'approaches', title: article.sections.approaches.title, level: 2 },
      { id: 'proscons', title: article.sections.proscons.title, level: 2 },
      { id: 'budget', title: article.sections.budget.title, level: 2 },
      { id: 'recommendation', title: article.sections.recommendation.title, level: 2 },
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

          {/* Section 1: Les différentes approches */}
          <section id="approaches" className="blog-section">
            <h2>{article.sections.approaches.title}</h2>
            <p>{article.sections.approaches.content}</p>

            {article.sections.approaches.approachesList.map((approach, index) => (
              <div key={index} className="blog-subsection">
                <h3>{approach.title}</h3>
                <p>{approach.content}</p>
                <p><strong>Exemples :</strong> {approach.examples}</p>
                <div className="blog-highlight">
                  <p><em>{approach.philosophy}</em></p>
                </div>
              </div>
            ))}
          </section>

          {/* Section 2: Avantages et inconvénients */}
          <section id="proscons" className="blog-section">
            <h2>{article.sections.proscons.title}</h2>
            <p>{article.sections.proscons.content}</p>

            {article.sections.proscons.solutions.map((solution, index) => (
              <div key={index} className="blog-subsection">
                <h3>{solution.name}</h3>

                <div className="blog-app__pros-cons">
                  <div className="blog-app__pros">
                    <strong>Avantages :</strong>
                    <ul>
                      {solution.pros.map((pro, i) => (
                        <li key={i}>{pro}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="blog-app__cons">
                    <strong>Inconvénients :</strong>
                    <ul>
                      {solution.cons.map((con, i) => (
                        <li key={i}>{con}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="blog-highlight">
                  <p><strong>Verdict :</strong> {solution.verdict}</p>
                </div>
              </div>
            ))}
          </section>

          {/* Section 3: Budget */}
          <section id="budget" className="blog-section">
            <h2>{article.sections.budget.title}</h2>
            <p>{article.sections.budget.content}</p>

            {article.sections.budget.tiers.map((tier, index) => (
              <div key={index} className="blog-subsection">
                <h3>{tier.budget}</h3>
                <p><em>{tier.title}</em></p>

                <div className="blog-apps-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Solution</th>
                        <th>Détail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tier.options.map((option, i) => (
                        <tr key={i}>
                          <td><strong>{option.name}</strong></td>
                          <td>{option.detail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="blog-highlight">
                  <p><strong>{tier.recommendation}</strong></p>
                </div>
              </div>
            ))}

            <div className="blog-highlight">
              <p><strong>{article.sections.budget.summary}</strong></p>
            </div>
          </section>

          {/* Section 4: Recommandation */}
          <section id="recommendation" className="blog-section">
            <h2>{article.sections.recommendation.title}</h2>
            <p>{article.sections.recommendation.content}</p>

            {article.sections.recommendation.profiles.map((profile, index) => (
              <div key={index} className="blog-subsection">
                <h3>{profile.title}</h3>
                <p>{profile.recommendation}</p>
              </div>
            ))}

            <div className="blog-highlight">
              <p><strong>{article.sections.recommendation.conclusion}</strong></p>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
