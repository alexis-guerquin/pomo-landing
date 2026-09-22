import { useI18n } from '../../../contexts/I18nContext';
import { useEffect, useState, useRef } from 'react';
import './Article.css';

interface TableOfContentItem {
  id: string;
  title: string;
  level: number;
}

export function SideProjectIdeasArticle() {
  const { t } = useI18n();
  const [activeSection, setActiveSection] = useState<string>('');
  const [tocItems, setTocItems] = useState<TableOfContentItem[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const article = t.pages.blog.articles.sideProjectIdeas;

  useEffect(() => {
    const items: TableOfContentItem[] = [
      { id: 'what-is-side-project', title: article.sections.whatIsSideProject.title, level: 2 },
      { id: 'how-to-choose', title: article.sections.howToChoose.title, level: 2 },
      { id: 'ideas', title: article.sections.ideas.title, level: 2 },
      { id: 'build-in-30-days', title: article.sections.buildIn30Days.title, level: 2 },
      { id: 'make-money', title: article.sections.makeMoney.title, level: 2 },
      { id: 'common-mistakes', title: article.sections.commonMistakes.title, level: 2 },
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

          {/* Section 1: What Is a Side Project */}
          <section id="what-is-side-project" className="blog-section">
            <h2>{article.sections.whatIsSideProject.title}</h2>
            <p>{article.sections.whatIsSideProject.content1}</p>
            <p>{article.sections.whatIsSideProject.content2}</p>
            <p>{article.sections.whatIsSideProject.content3}</p>
            <p>{article.sections.whatIsSideProject.content4}</p>
          </section>

          {/* Section 2: How to Choose */}
          <section id="how-to-choose" className="blog-section">
            <h2>{article.sections.howToChoose.title}</h2>
            <p>{article.sections.howToChoose.content1}</p>
            <p>{article.sections.howToChoose.content2}</p>

            <div className="blog-highlight">
              <ul className="blog-list">
                {article.sections.howToChoose.framework.map((item, index) => (
                  <li key={index}>
                    <strong>{item.criterion}:</strong> {item.description}
                  </li>
                ))}
              </ul>
            </div>

            <p>{article.sections.howToChoose.content3}</p>
            <p>{article.sections.howToChoose.content4}</p>
            <p>{article.sections.howToChoose.content5}</p>
          </section>

          {/* Section 3: 50 Ideas */}
          <section id="ideas" className="blog-section">
            <h2>{article.sections.ideas.title}</h2>
            <p>{article.sections.ideas.content1}</p>

            {/* Tech Ideas */}
            <section className="blog-subsection">
              <h3>{article.sections.ideas.techIdeas.title}</h3>
              <ol className="blog-list">
                {article.sections.ideas.techIdeas.items.map((idea, index) => (
                  <li key={index}>
                    <strong>{idea.name}</strong> — {idea.description}
                    <br />
                    <em>Time to MVP: {idea.timeToMvp} | Monetization: {idea.monetization}</em>
                  </li>
                ))}
              </ol>
            </section>

            {/* No-Code Ideas */}
            <section className="blog-subsection">
              <h3>{article.sections.ideas.noCodeIdeas.title}</h3>
              <ol className="blog-list" start={16}>
                {article.sections.ideas.noCodeIdeas.items.map((idea, index) => (
                  <li key={index}>
                    <strong>{idea.name}</strong> — {idea.description}
                    <br />
                    <em>Time to MVP: {idea.timeToMvp} | Monetization: {idea.monetization}</em>
                  </li>
                ))}
              </ol>
            </section>

            {/* Content Ideas */}
            <section className="blog-subsection">
              <h3>{article.sections.ideas.contentIdeas.title}</h3>
              <ol className="blog-list" start={31}>
                {article.sections.ideas.contentIdeas.items.map((idea, index) => (
                  <li key={index}>
                    <strong>{idea.name}</strong> — {idea.description}
                    <br />
                    <em>Time to MVP: {idea.timeToMvp} | Monetization: {idea.monetization}</em>
                  </li>
                ))}
              </ol>
            </section>
          </section>

          {/* Section 4: Build in 30 Days */}
          <section id="build-in-30-days" className="blog-section">
            <h2>{article.sections.buildIn30Days.title}</h2>
            <p>{article.sections.buildIn30Days.content1}</p>
            <p>{article.sections.buildIn30Days.content2}</p>

            <section className="blog-subsection">
              <h3>{article.sections.buildIn30Days.week1.title}</h3>
              <ul className="blog-list">
                {article.sections.buildIn30Days.week1.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="blog-subsection">
              <h3>{article.sections.buildIn30Days.week2.title}</h3>
              <ul className="blog-list">
                {article.sections.buildIn30Days.week2.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="blog-subsection">
              <h3>{article.sections.buildIn30Days.week3.title}</h3>
              <ul className="blog-list">
                {article.sections.buildIn30Days.week3.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="blog-subsection">
              <h3>{article.sections.buildIn30Days.week4.title}</h3>
              <ul className="blog-list">
                {article.sections.buildIn30Days.week4.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <p>{article.sections.buildIn30Days.content3}</p>
          </section>

          {/* Section 5: Make Money */}
          <section id="make-money" className="blog-section">
            <h2>{article.sections.makeMoney.title}</h2>
            <p>{article.sections.makeMoney.content1}</p>

            {article.sections.makeMoney.strategies.map((strategy, index) => (
              <section key={index} className="blog-subsection">
                <h3>{index + 1}. {strategy.name}</h3>
                <p>{strategy.description}</p>
                <p>
                  <em>
                    Difficulty: {strategy.difficulty} | {strategy.revenueTimeline}
                  </em>
                </p>
              </section>
            ))}

            <p>{article.sections.makeMoney.content2}</p>
            <p>{article.sections.makeMoney.content3}</p>
          </section>

          {/* Section 6: Common Mistakes */}
          <section id="common-mistakes" className="blog-section">
            <h2>{article.sections.commonMistakes.title}</h2>
            <p>{article.sections.commonMistakes.content1}</p>

            {article.sections.commonMistakes.mistakes.map((item, index) => (
              <section key={index} className="blog-subsection">
                <h3>{index + 1}. {item.mistake}</h3>
                <p>{item.description}</p>
                <div className="blog-highlight">
                  <p><strong>Solution:</strong> {item.solution}</p>
                </div>
              </section>
            ))}
          </section>

          {/* Section 7: FAQ */}
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
