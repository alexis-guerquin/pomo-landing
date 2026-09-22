import { useI18n } from '../../../contexts/I18nContext';
import { useEffect, useState, useRef } from 'react';
import './Article.css';

interface TableOfContentItem {
  id: string;
  title: string;
  level: number;
}

export function PomodoroTechniqueGuideArticle() {
  const { t } = useI18n();
  const [activeSection, setActiveSection] = useState<string>('');
  const [tocItems, setTocItems] = useState<TableOfContentItem[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const article = t.pages.blog.articles.pomodoroTechniqueGuide;

  useEffect(() => {
    const items: TableOfContentItem[] = [
      { id: 'what-is-pomodoro', title: article.sections.whatIsPomodoro.title, level: 2 },
      { id: 'how-to-use', title: article.sections.howToUse.title, level: 2 },
      { id: 'best-settings', title: article.sections.bestSettings.title, level: 2 },
      { id: 'pomodoro-for-different-uses', title: article.sections.pomodoroForDifferentUses.title, level: 2 },
      { id: 'mistakes', title: article.sections.mistakes.title, level: 2 },
      { id: 'vs-other-methods', title: article.sections.vsOtherMethods.title, level: 2 },
      { id: 'best-apps', title: article.sections.bestApps.title, level: 2 },
      { id: 'adhd', title: article.sections.adhd.title, level: 2 },
      { id: 'faq', title: article.faq.title, level: 2 },
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
        </div>

        <div className="blog-article__content">
          <p className="blog-article__intro">
            {article.intro}
          </p>

          {/* Section 1: What Is the Pomodoro Technique? */}
          <section id="what-is-pomodoro" className="blog-section">
            <h2>{article.sections.whatIsPomodoro.title}</h2>
            <p>{article.sections.whatIsPomodoro.content1}</p>
            <p>{article.sections.whatIsPomodoro.content2}</p>
            <p>{article.sections.whatIsPomodoro.content3}</p>
            <p>{article.sections.whatIsPomodoro.content4}</p>
            <div className="blog-highlight">
              <p><strong>Pomocha:</strong> {article.sections.whatIsPomodoro.pomochaTip}</p>
            </div>
          </section>

          {/* Section 2: How to Use Step-by-Step */}
          <section id="how-to-use" className="blog-section">
            <h2>{article.sections.howToUse.title}</h2>
            <p>{article.sections.howToUse.content1}</p>
            {article.sections.howToUse.steps.map((step, index) => (
              <div key={index} className="blog-subsection">
                <h3>{step.title}</h3>
                <p>{step.content}</p>
              </div>
            ))}
            <div className="blog-highlight">
              <p><strong>Pomocha:</strong> {article.sections.howToUse.pomochaTip}</p>
            </div>
          </section>

          {/* Section 3: Best Settings */}
          <section id="best-settings" className="blog-section">
            <h2>{article.sections.bestSettings.title}</h2>
            <p>{article.sections.bestSettings.content1}</p>
            {article.sections.bestSettings.durations.map((duration, index) => (
              <div key={index} className="blog-subsection">
                <h3>{duration.name}</h3>
                <p>{duration.description}</p>
                <div className="blog-app__pros-cons">
                  <div className="blog-app__pros">
                    <strong>Pros:</strong>
                    <ul>
                      {duration.pros.map((pro, proIndex) => (
                        <li key={proIndex}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="blog-app__cons">
                    <strong>Cons:</strong>
                    <ul>
                      {duration.cons.map((con, conIndex) => (
                        <li key={conIndex}>{con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p><strong>Best for:</strong> {duration.bestFor}</p>
              </div>
            ))}
            <p>{article.sections.bestSettings.content2}</p>
            <div className="blog-highlight">
              <p><strong>Pomocha:</strong> {article.sections.bestSettings.pomochaTip}</p>
            </div>
          </section>

          {/* Section 4: Pomodoro for Different Uses */}
          <section id="pomodoro-for-different-uses" className="blog-section">
            <h2>{article.sections.pomodoroForDifferentUses.title}</h2>
            <p>{article.sections.pomodoroForDifferentUses.content}</p>

            {/* Studying */}
            <div className="blog-subsection">
              <h3>{article.sections.pomodoroForDifferentUses.studying.title}</h3>
              <p>{article.sections.pomodoroForDifferentUses.studying.content1}</p>
              <p>{article.sections.pomodoroForDifferentUses.studying.content2}</p>
              <ul className="blog-list">
                {article.sections.pomodoroForDifferentUses.studying.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
              <div className="blog-highlight">
                <p><strong>Pomocha:</strong> {article.sections.pomodoroForDifferentUses.studying.pomochaTip}</p>
              </div>
            </div>

            {/* Work */}
            <div className="blog-subsection">
              <h3>{article.sections.pomodoroForDifferentUses.work.title}</h3>
              <p>{article.sections.pomodoroForDifferentUses.work.content1}</p>
              <p>{article.sections.pomodoroForDifferentUses.work.content2}</p>
              <ul className="blog-list">
                {article.sections.pomodoroForDifferentUses.work.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
              <div className="blog-highlight">
                <p><strong>Pomocha:</strong> {article.sections.pomodoroForDifferentUses.work.pomochaTip}</p>
              </div>
            </div>

            {/* Coding */}
            <div className="blog-subsection">
              <h3>{article.sections.pomodoroForDifferentUses.coding.title}</h3>
              <p>{article.sections.pomodoroForDifferentUses.coding.content1}</p>
              <p>{article.sections.pomodoroForDifferentUses.coding.content2}</p>
              <ul className="blog-list">
                {article.sections.pomodoroForDifferentUses.coding.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
              <div className="blog-highlight">
                <p><strong>Pomocha:</strong> {article.sections.pomodoroForDifferentUses.coding.pomochaTip}</p>
              </div>
            </div>
          </section>

          {/* Section 5: Mistakes */}
          <section id="mistakes" className="blog-section">
            <h2>{article.sections.mistakes.title}</h2>
            <p>{article.sections.mistakes.content}</p>
            {article.sections.mistakes.items.map((mistake, index) => (
              <div key={index} className="blog-subsection">
                <h3>{mistake.title}</h3>
                <p>{mistake.content}</p>
                <div className="blog-highlight">
                  <p><strong>Solution:</strong> {mistake.solution}</p>
                </div>
              </div>
            ))}
          </section>

          {/* Section 6: vs Other Methods */}
          <section id="vs-other-methods" className="blog-section">
            <h2>{article.sections.vsOtherMethods.title}</h2>
            <p>{article.sections.vsOtherMethods.content}</p>
            {article.sections.vsOtherMethods.methods.map((method, index) => (
              <div key={index} className="blog-subsection">
                <h3>{method.name}</h3>
                <p>{method.approach}</p>
                <div className="blog-app__pros-cons">
                  <div className="blog-app__pros">
                    <strong>Strengths:</strong>
                    <ul>
                      {method.strengths.map((strength, sIndex) => (
                        <li key={sIndex}>{strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="blog-app__cons">
                    <strong>Weaknesses:</strong>
                    <ul>
                      {method.weaknesses.map((weakness, wIndex) => (
                        <li key={wIndex}>{weakness}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p><strong>Best for:</strong> {method.bestFor}</p>
              </div>
            ))}

            <div className="blog-subsection">
              <h3>{article.sections.vsOtherMethods.combining.title}</h3>
              <p>{article.sections.vsOtherMethods.combining.content1}</p>
              <p>{article.sections.vsOtherMethods.combining.content2}</p>
              <div className="blog-highlight">
                <p><strong>Pomocha:</strong> {article.sections.vsOtherMethods.combining.pomochaTip}</p>
              </div>
            </div>
          </section>

          {/* Section 7: Best Apps */}
          <section id="best-apps" className="blog-section">
            <h2>{article.sections.bestApps.title}</h2>
            <p>{article.sections.bestApps.content}</p>
            {article.sections.bestApps.apps.map((app, index) => (
              <div key={index} className="blog-app-section">
                <h3>{index + 1}. {app.name}</h3>
                <p className="blog-app__tagline">{app.tagline}</p>
                <div className="blog-app__content">
                  <p>{app.description}</p>
                  <ul className="blog-list">
                    {app.features.map((feature, fIndex) => (
                      <li key={fIndex}>{feature}</li>
                    ))}
                  </ul>
                  <div className="blog-highlight">
                    <p><strong>Verdict:</strong> {app.verdict}</p>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Section 8: ADHD */}
          <section id="adhd" className="blog-section">
            <h2>{article.sections.adhd.title}</h2>
            <p>{article.sections.adhd.content1}</p>
            <p>{article.sections.adhd.content2}</p>
            <p>{article.sections.adhd.content3}</p>

            <div className="blog-subsection">
              <h3>{article.sections.adhd.adaptations.title}</h3>
              {article.sections.adhd.adaptations.items.map((item, index) => (
                <div key={index} style={{ marginBottom: '24px' }}>
                  <p><strong>{item.tip}</strong></p>
                  <p>{item.explanation}</p>
                </div>
              ))}
            </div>

            <p>{article.sections.adhd.content4}</p>
            <div className="blog-highlight">
              <p><strong>Pomocha:</strong> {article.sections.adhd.pomochaTip}</p>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="blog-section">
            <h2>{article.faq.title}</h2>
            <div className="blog-faq">
              {article.faq.items.map((faqItem, index) => (
                <div key={index} className="blog-faq__item">
                  <h3 className="blog-faq__question">{faqItem.question}</h3>
                  <p className="blog-faq__answer">{faqItem.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
