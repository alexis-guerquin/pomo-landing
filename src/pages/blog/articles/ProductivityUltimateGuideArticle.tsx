import { useI18n } from '../../../contexts/I18nContext';
import { useEffect, useState, useRef } from 'react';
import './Article.css';

interface TableOfContentItem {
  id: string;
  title: string;
  level: number;
}

export function ProductivityUltimateGuideArticle() {
  const { t } = useI18n();
  const [activeSection, setActiveSection] = useState<string>('');
  const [tocItems, setTocItems] = useState<TableOfContentItem[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const article = t.pages.blog.articles.productivityUltimateGuide;

  useEffect(() => {
    const items: TableOfContentItem[] = [
      { id: 'what-is-productivity', title: article.sections.whatIsProductivity.title, level: 2 },
      { id: 'three-pillars', title: article.sections.threePillars.title, level: 2 },
      { id: 'best-techniques', title: article.sections.bestTechniques.title, level: 2 },
      { id: 'daily-routine', title: article.sections.dailyRoutine.title, level: 2 },
      { id: 'best-tools', title: article.sections.bestTools.title, level: 2 },
      { id: 'common-mistakes', title: article.sections.commonMistakes.title, level: 2 },
      { id: 'conclusion', title: article.sections.conclusion.title, level: 2 },
      { id: 'faq', title: article.sections.faq.title, level: 2 },
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

          {/* Section 1: What Is Productivity */}
          <section id="what-is-productivity" className="blog-section">
            <h2>{article.sections.whatIsProductivity.title}</h2>
            <p>{article.sections.whatIsProductivity.content1}</p>
            <p>{article.sections.whatIsProductivity.content2}</p>
            <p>{article.sections.whatIsProductivity.content3}</p>
          </section>

          {/* Section 2: The 3 Core Pillars */}
          <section id="three-pillars" className="blog-section">
            <h2>{article.sections.threePillars.title}</h2>
            <p>{article.sections.threePillars.intro}</p>

            <div className="blog-subsection">
              <h3>{article.sections.threePillars.energy.title}</h3>
              <p>{article.sections.threePillars.energy.content}</p>
            </div>

            <div className="blog-subsection">
              <h3>{article.sections.threePillars.systems.title}</h3>
              <p>{article.sections.threePillars.systems.content}</p>
            </div>

            <div className="blog-subsection">
              <h3>{article.sections.threePillars.environment.title}</h3>
              <p>{article.sections.threePillars.environment.content}</p>
            </div>
          </section>

          {/* Section 3: Best Productivity Techniques */}
          <section id="best-techniques" className="blog-section">
            <h2>{article.sections.bestTechniques.title}</h2>
            <p>{article.sections.bestTechniques.intro}</p>

            <div className="blog-subsection">
              <h3>{article.sections.bestTechniques.pomodoro.title}</h3>
              <p>{article.sections.bestTechniques.pomodoro.content1}</p>
              <p>{article.sections.bestTechniques.pomodoro.content2}</p>
              <p>{article.sections.bestTechniques.pomodoro.content3}</p>
              <p>{article.sections.bestTechniques.pomodoro.content4}</p>
              <p>{article.sections.bestTechniques.pomodoro.content5}</p>
            </div>

            <div className="blog-subsection">
              <h3>{article.sections.bestTechniques.deepWork.title}</h3>
              <p>{article.sections.bestTechniques.deepWork.content1}</p>
              <p>{article.sections.bestTechniques.deepWork.content2}</p>
              <p>{article.sections.bestTechniques.deepWork.content3}</p>
              <p>{article.sections.bestTechniques.deepWork.content4}</p>
            </div>

            <div className="blog-subsection">
              <h3>{article.sections.bestTechniques.timeBlocking.title}</h3>
              <p>{article.sections.bestTechniques.timeBlocking.content1}</p>
              <p>{article.sections.bestTechniques.timeBlocking.content2}</p>
              <p>{article.sections.bestTechniques.timeBlocking.content3}</p>
            </div>

            <div className="blog-subsection">
              <h3>{article.sections.bestTechniques.twoMinuteRule.title}</h3>
              <p>{article.sections.bestTechniques.twoMinuteRule.content}</p>
            </div>

            <div className="blog-subsection">
              <h3>{article.sections.bestTechniques.eisenhower.title}</h3>
              <p>{article.sections.bestTechniques.eisenhower.content}</p>
            </div>
          </section>

          {/* Section 4: Daily Routine */}
          <section id="daily-routine" className="blog-section">
            <h2>{article.sections.dailyRoutine.title}</h2>
            <p>{article.sections.dailyRoutine.intro}</p>

            <div className="blog-subsection">
              <h3>{article.sections.dailyRoutine.morning.title}</h3>
              <p>{article.sections.dailyRoutine.morning.content1}</p>
              <p>{article.sections.dailyRoutine.morning.content2}</p>
              <p>{article.sections.dailyRoutine.morning.content3}</p>
            </div>

            <div className="blog-subsection">
              <h3>{article.sections.dailyRoutine.deepWorkBlock.title}</h3>
              <p>{article.sections.dailyRoutine.deepWorkBlock.content}</p>
            </div>

            <div className="blog-subsection">
              <h3>{article.sections.dailyRoutine.breaks.title}</h3>
              <p>{article.sections.dailyRoutine.breaks.content}</p>
            </div>

            <div className="blog-subsection">
              <h3>{article.sections.dailyRoutine.evening.title}</h3>
              <p>{article.sections.dailyRoutine.evening.content}</p>
            </div>
          </section>

          {/* Section 5: Best Tools */}
          <section id="best-tools" className="blog-section">
            <h2>{article.sections.bestTools.title}</h2>
            <p>{article.sections.bestTools.intro}</p>

            <div className="blog-subsection">
              <h3>{article.sections.bestTools.pomocha.title}</h3>
              <p>{article.sections.bestTools.pomocha.content1}</p>
              <p>{article.sections.bestTools.pomocha.content2}</p>
              <p>{article.sections.bestTools.pomocha.content3}</p>
              <p>{article.sections.bestTools.pomocha.content4}</p>
              <p>{article.sections.bestTools.pomocha.content5}</p>
              <p>{article.sections.bestTools.pomocha.content6}</p>
              <p>{article.sections.bestTools.pomocha.content7}</p>
              <p>{article.sections.bestTools.pomocha.content8}</p>
            </div>

            <div className="blog-subsection">
              <h3>{article.sections.bestTools.taskManagers.title}</h3>
              <p>{article.sections.bestTools.taskManagers.content}</p>
            </div>

            <div className="blog-subsection">
              <h3>{article.sections.bestTools.calendar.title}</h3>
              <p>{article.sections.bestTools.calendar.content}</p>
            </div>

            <div className="blog-subsection">
              <h3>{article.sections.bestTools.notes.title}</h3>
              <p>{article.sections.bestTools.notes.content}</p>
            </div>
          </section>

          {/* Section 6: Common Mistakes */}
          <section id="common-mistakes" className="blog-section">
            <h2>{article.sections.commonMistakes.title}</h2>
            <p>{article.sections.commonMistakes.intro}</p>

            <div className="blog-subsection">
              <h3>{article.sections.commonMistakes.multitasking.title}</h3>
              <p>{article.sections.commonMistakes.multitasking.content}</p>
            </div>

            <div className="blog-subsection">
              <h3>{article.sections.commonMistakes.noBreaks.title}</h3>
              <p>{article.sections.commonMistakes.noBreaks.content}</p>
            </div>

            <div className="blog-subsection">
              <h3>{article.sections.commonMistakes.toolHopping.title}</h3>
              <p>{article.sections.commonMistakes.toolHopping.content}</p>
            </div>

            <div className="blog-subsection">
              <h3>{article.sections.commonMistakes.noTracking.title}</h3>
              <p>{article.sections.commonMistakes.noTracking.content}</p>
            </div>

            <div className="blog-subsection">
              <h3>{article.sections.commonMistakes.perfectionism.title}</h3>
              <p>{article.sections.commonMistakes.perfectionism.content}</p>
            </div>

            <div className="blog-subsection">
              <h3>{article.sections.commonMistakes.ignoreEnergy.title}</h3>
              <p>{article.sections.commonMistakes.ignoreEnergy.content}</p>
            </div>
          </section>

          {/* Section 7: Conclusion */}
          <section id="conclusion" className="blog-section">
            <h2>{article.sections.conclusion.title}</h2>
            <p>{article.sections.conclusion.content1}</p>
            <p>{article.sections.conclusion.content2}</p>
            <div className="blog-highlight">
              <p>{article.sections.conclusion.content3}</p>
            </div>
          </section>

          {/* Section 8: FAQ */}
          <section id="faq" className="blog-section">
            <h2>{article.sections.faq.title}</h2>
            <div className="blog-faq">
              <div className="blog-faq__item">
                <h3 className="blog-faq__question">{article.sections.faq.q1.question}</h3>
                <p className="blog-faq__answer">{article.sections.faq.q1.answer}</p>
              </div>
              <div className="blog-faq__item">
                <h3 className="blog-faq__question">{article.sections.faq.q2.question}</h3>
                <p className="blog-faq__answer">{article.sections.faq.q2.answer}</p>
              </div>
              <div className="blog-faq__item">
                <h3 className="blog-faq__question">{article.sections.faq.q3.question}</h3>
                <p className="blog-faq__answer">{article.sections.faq.q3.answer}</p>
              </div>
              <div className="blog-faq__item">
                <h3 className="blog-faq__question">{article.sections.faq.q4.question}</h3>
                <p className="blog-faq__answer">{article.sections.faq.q4.answer}</p>
              </div>
              <div className="blog-faq__item">
                <h3 className="blog-faq__question">{article.sections.faq.q5.question}</h3>
                <p className="blog-faq__answer">{article.sections.faq.q5.answer}</p>
              </div>
              <div className="blog-faq__item">
                <h3 className="blog-faq__question">{article.sections.faq.q6.question}</h3>
                <p className="blog-faq__answer">{article.sections.faq.q6.answer}</p>
              </div>
              <div className="blog-faq__item">
                <h3 className="blog-faq__question">{article.sections.faq.q7.question}</h3>
                <p className="blog-faq__answer">{article.sections.faq.q7.answer}</p>
              </div>
              <div className="blog-faq__item">
                <h3 className="blog-faq__question">{article.sections.faq.q8.question}</h3>
                <p className="blog-faq__answer">{article.sections.faq.q8.answer}</p>
              </div>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
