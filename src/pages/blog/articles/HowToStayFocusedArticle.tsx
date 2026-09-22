import { useI18n } from '../../../contexts/I18nContext';
import { useEffect, useState, useRef } from 'react';
import './Article.css';

interface TableOfContentItem {
  id: string;
  title: string;
  level: number;
}

export function HowToStayFocusedArticle() {
  const { t } = useI18n();
  const [activeSection, setActiveSection] = useState<string>('');
  const [tocItems, setTocItems] = useState<TableOfContentItem[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const article = t.pages.blog.articles.howToStayFocused;

  useEffect(() => {
    const items: TableOfContentItem[] = [
      { id: 'why-cant-focus', title: article.sections.whyCantFocus.title, level: 2 },
      { id: 'eliminate-distractions', title: article.sections.eliminateDistractions.title, level: 2 },
      { id: 'ten-techniques', title: article.sections.tenTechniques.title, level: 2 },
      { id: 'best-apps', title: article.sections.bestApps.title, level: 2 },
      { id: 'focus-long-hours', title: article.sections.focusLongHours.title, level: 2 },
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
        </div>

        <div className="blog-article__content">
          <p className="blog-article__intro">
            {article.intro}
          </p>

          {/* Section 1: Why You Can't Focus */}
          <section id="why-cant-focus" className="blog-section">
            <h2>{article.sections.whyCantFocus.title}</h2>
            <p>{article.sections.whyCantFocus.content1}</p>
            <p>{article.sections.whyCantFocus.content2}</p>
            <p>{article.sections.whyCantFocus.content3}</p>
            <p>{article.sections.whyCantFocus.content4}</p>
            <p>{article.sections.whyCantFocus.content5}</p>
          </section>

          {/* Section 2: How to Eliminate Distractions */}
          <section id="eliminate-distractions" className="blog-section">
            <h2>{article.sections.eliminateDistractions.title}</h2>
            <p>{article.sections.eliminateDistractions.content1}</p>
            <p>{article.sections.eliminateDistractions.content2}</p>
            <p>{article.sections.eliminateDistractions.content3}</p>
            <p>{article.sections.eliminateDistractions.content4}</p>
            <p>{article.sections.eliminateDistractions.content5}</p>
            <p>{article.sections.eliminateDistractions.content6}</p>
            <p>{article.sections.eliminateDistractions.content7}</p>
          </section>

          {/* Section 3: 10 Focus Techniques */}
          <section id="ten-techniques" className="blog-section">
            <h2>{article.sections.tenTechniques.title}</h2>
            <p>{article.sections.tenTechniques.intro}</p>

            {/* Technique 1: Pomodoro */}
            <div className="blog-subsection">
              <h3>{article.sections.tenTechniques.techniques.pomodoroTechnique.title}</h3>
              <p>{article.sections.tenTechniques.techniques.pomodoroTechnique.content1}</p>
              <p>{article.sections.tenTechniques.techniques.pomodoroTechnique.content2}</p>
              <p>{article.sections.tenTechniques.techniques.pomodoroTechnique.content3}</p>
              <p>{article.sections.tenTechniques.techniques.pomodoroTechnique.content4}</p>
              <p>{article.sections.tenTechniques.techniques.pomodoroTechnique.content5}</p>
            </div>

            {/* Technique 2: Deep Work */}
            <div className="blog-subsection">
              <h3>{article.sections.tenTechniques.techniques.deepWork.title}</h3>
              <p>{article.sections.tenTechniques.techniques.deepWork.content1}</p>
              <p>{article.sections.tenTechniques.techniques.deepWork.content2}</p>
              <p>{article.sections.tenTechniques.techniques.deepWork.content3}</p>
              <p>{article.sections.tenTechniques.techniques.deepWork.content4}</p>
              <p>{article.sections.tenTechniques.techniques.deepWork.content5}</p>
            </div>

            {/* Technique 3: Environment Design */}
            <div className="blog-subsection">
              <h3>{article.sections.tenTechniques.techniques.environmentDesign.title}</h3>
              <p>{article.sections.tenTechniques.techniques.environmentDesign.content}</p>
            </div>

            {/* Technique 4: Single-Tasking */}
            <div className="blog-subsection">
              <h3>{article.sections.tenTechniques.techniques.singleTasking.title}</h3>
              <p>{article.sections.tenTechniques.techniques.singleTasking.content}</p>
            </div>

            {/* Technique 5: Time Blocking */}
            <div className="blog-subsection">
              <h3>{article.sections.tenTechniques.techniques.timeBlocking.title}</h3>
              <p>{article.sections.tenTechniques.techniques.timeBlocking.content}</p>
            </div>

            {/* Technique 6: 2-Minute Rule */}
            <div className="blog-subsection">
              <h3>{article.sections.tenTechniques.techniques.twoMinuteRule.title}</h3>
              <p>{article.sections.tenTechniques.techniques.twoMinuteRule.content}</p>
            </div>

            {/* Technique 7: Body Doubling */}
            <div className="blog-subsection">
              <h3>{article.sections.tenTechniques.techniques.bodyDoubling.title}</h3>
              <p>{article.sections.tenTechniques.techniques.bodyDoubling.content}</p>
            </div>

            {/* Technique 8: Music and Silence */}
            <div className="blog-subsection">
              <h3>{article.sections.tenTechniques.techniques.musicAndSilence.title}</h3>
              <p>{article.sections.tenTechniques.techniques.musicAndSilence.content}</p>
            </div>

            {/* Technique 9: Energy Management */}
            <div className="blog-subsection">
              <h3>{article.sections.tenTechniques.techniques.energyManagement.title}</h3>
              <p>{article.sections.tenTechniques.techniques.energyManagement.content}</p>
            </div>

            {/* Technique 10: Digital Minimalism */}
            <div className="blog-subsection">
              <h3>{article.sections.tenTechniques.techniques.digitalMinimalism.title}</h3>
              <p>{article.sections.tenTechniques.techniques.digitalMinimalism.content}</p>
            </div>
          </section>

          {/* Section 4: Best Apps */}
          <section id="best-apps" className="blog-section">
            <h2>{article.sections.bestApps.title}</h2>
            <p>{article.sections.bestApps.content1}</p>
            <p>{article.sections.bestApps.content2}</p>

            <ul className="blog-list">
              {article.sections.bestApps.apps.map((app, index) => (
                <li key={index}>
                  <strong>{app.name}:</strong> {app.description}
                </li>
              ))}
            </ul>

            <p>{article.sections.bestApps.content3}</p>
          </section>

          {/* Section 5: Focus for Long Hours */}
          <section id="focus-long-hours" className="blog-section">
            <h2>{article.sections.focusLongHours.title}</h2>
            <p>{article.sections.focusLongHours.content1}</p>
            <p>{article.sections.focusLongHours.content2}</p>
            <p>{article.sections.focusLongHours.content3}</p>

            <ul className="blog-list">
              {article.sections.focusLongHours.schedule.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <p>{article.sections.focusLongHours.content4}</p>
            <p>{article.sections.focusLongHours.content5}</p>
            <p>{article.sections.focusLongHours.content6}</p>
            <p>{article.sections.focusLongHours.content7}</p>
          </section>

          {/* Section 6: FAQ */}
          <section id="faq" className="blog-section">
            <h2>{article.sections.faq.title}</h2>
            <div className="blog-faq">
              {article.sections.faq.items.map((faqItem, index) => (
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
