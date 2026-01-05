import { useEffect, useState, useRef } from 'react';
import './Article.css';
import ThreeDButton from '../../../components/ui/3DButton/3dbutton';

interface TableOfContentItem {
  id: string;
  title: string;
  level: number;
}

interface ArticleSection {
  id: string;
  title: string;
  content?: string | string[];
  intro?: string;
  subsections?: ArticleSection[];
  type?: 'text' | 'list' | 'apps' | 'faq' | 'table' | 'comparison-table' | 'apps-with-table' | 'text-with-recommendations';
  data?: any;
}

interface DynamicArticleProps {
  articleData: any;
  sectionConfig: ArticleSection[];
}

export function DynamicArticle({ articleData, sectionConfig }: DynamicArticleProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [tocItems, setTocItems] = useState<TableOfContentItem[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    // Générer la table des matières à partir de la configuration
    const items: TableOfContentItem[] = sectionConfig.map(section => ({
      id: section.id,
      title: section.title,
      level: 2
    }));

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
  }, [sectionConfig]);

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

  const renderContent = (content: string | string[]) => {
    if (Array.isArray(content)) {
      return content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ));
    }
    return <p>{content}</p>;
  };

  const renderSubsection = (subsection: ArticleSection, parentId?: string) => {
    const sectionId = parentId ? `${parentId}-${subsection.id}` : subsection.id;
    
    return (
      <section key={sectionId} id={sectionId} className="blog-subsection">
        <h3>{subsection.title}</h3>
        {subsection.content && renderContent(subsection.content)}
        {subsection.subsections && subsection.subsections.map(sub => renderSubsection(sub, sectionId))}
      </section>
    );
  };

  const renderAppsList = (apps: any[], appDetails: any) => {
    return apps.map((app, index) => (
      <section key={index} id={`app-${index + 1}`} className="blog-app-section">
        <h3>
          {index + 1}. {app.name}
        </h3>
        <p className="blog-app__tagline">{app.tagline}</p>
        
        {app.images && app.images.length > 0 && (
          <div className="blog-app__images">
            {app.images.map((image: any, imgIndex: number) => (
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
              <strong>{appDetails.whoItsFor}:</strong> {app.whoItsFor}
            </div>
            
            <div className="blog-app__pros-cons">
              <div className="blog-app__pros">
                <strong>{appDetails.pros}:</strong>
                <ul>
                  {app.pros.map((pro: string, proIndex: number) => (
                    <li key={proIndex}>{pro}</li>
                  ))}
                </ul>
              </div>
              
              <div className="blog-app__cons">
                <strong>{appDetails.cons}:</strong>
                <ul>
                  {app.cons.map((con: string, conIndex: number) => (
                    <li key={conIndex}>{con}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="blog-app__pricing">
              <strong>{appDetails.pricing}:</strong> {app.pricing}
            </div>

            {app.cta && app.ctaLink && (
              <div className="blog-app__cta">
                <ThreeDButton
                  text={app.cta}
                  variant="rectangle"
                  color="primary"
                  theme="light"
                  type="button"
                  onClick={() => {
                    window.open(app.ctaLink, '_blank', 'noopener,noreferrer');
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    ));
  };

  const renderFAQ = (faqData: any) => {
    const faqKeys = Object.keys(faqData).filter(key => key.startsWith('q'));
    
    return (
      <div className="blog-faq">
        {faqKeys.map((key) => (
          <div key={key} className="blog-faq__item">
            <h3 className="blog-faq__question">{faqData[key].question}</h3>
            <p className="blog-faq__answer">{faqData[key].answer}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderComparisonTable = (apps: any[], tableHeaders: any, tableLabels: any) => {
    return (
      <div className="blog-apps-table">
        <table>
          <thead>
            <tr>
              <th>{tableLabels.tool}</th>
              <th>{tableHeaders.free}</th>
              <th>{tableHeaders.gamification}</th>
              <th>{tableHeaders.statistics}</th>
              <th>{tableHeaders.platform}</th>
              <th>{tableHeaders.target}</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app, index) => {
              // Déterminer la gamification
              let gamification = 'Partiel';
              if (app.name === 'Pomocha') gamification = 'Oui';
              else if (['Pomofocus', 'Marinara Timer', 'TomatoTimer'].includes(app.name)) gamification = 'Non';

              // Déterminer les statistiques
              let statistics = 'Basiques';
              if (['Pomocha', 'Focus To-Do', 'Toggl Track'].includes(app.name)) statistics = 'Avancées';
              else if (['Pomofocus', 'Marinara Timer', 'TomatoTimer'].includes(app.name)) statistics = 'Non';

              return (
                <tr key={index}>
                  <td><strong>{app.name}</strong></td>
                  <td>{app.free ? 'Gratuit' : 'Payant'}</td>
                  <td>{gamification}</td>
                  <td>{statistics}</td>
                  <td>{app.platform}</td>
                  <td>{app.bestFor}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const renderAppsTable = (apps: any[], tableLabels: any) => {
    return (
      <div className="blog-apps-table">
        <table>
          <thead>
            <tr>
              <th>{tableLabels.rank}</th>
              <th>{tableLabels.tool}</th>
              <th>{tableLabels.bestFor}</th>
              <th>{tableLabels.platform}</th>
              <th>{tableLabels.free}</th>
              <th>{tableLabels.standout}</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app, index) => (
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
    );
  };

  const renderSection = (section: ArticleSection) => {
    return (
      <section key={section.id} id={section.id} className="blog-section">
        <h2>{section.title}</h2>
        
        {section.intro && <p>{section.intro}</p>}
        
        {section.type === 'apps' && section.data && (
          <>
            {renderAppsList(section.data.apps, section.data.appDetails)}
          </>
        )}
        
        {section.type === 'apps-with-table' && section.data && (
          <>
            {renderAppsTable(section.data.apps, section.data.tableLabels)}
            {renderAppsList(section.data.apps, section.data.appDetails)}
          </>
        )}
        
        {section.type === 'list' && section.data && (
          <ul className="blog-list">
            {section.data.criteria.map((criterion: string, index: number) => (
              <li key={index}>{criterion}</li>
            ))}
          </ul>
        )}
        
        {section.type === 'text-with-recommendations' && (
          <>
            {section.content && renderContent(section.content)}
            {section.data && section.data.recommendations && (
              <ul className="blog-list">
                {section.data.recommendations.map((rec: any, index: number) => (
                  <li key={index}>
                    <strong>{rec.situation}:</strong> {rec.recommendation}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
        
        {section.type === 'faq' && section.data && renderFAQ(section.data)}
        
        {section.type === 'comparison-table' && section.data && (
          renderComparisonTable(section.data.apps, section.data.headers, section.data.tableLabels)
        )}
        
        {section.type === 'text' && section.content && renderContent(section.content)}
        
        {section.subsections && section.subsections.map(subsection => renderSubsection(subsection, section.id))}
      </section>
    );
  };

  return (
    <div className="blog-article-container">
      <aside className="blog-toc">
        <div className="blog-toc__sticky">
          <h3 className="blog-toc__title">{articleData.tocTitle}</h3>
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
          <time dateTime={articleData.date} className="blog-article__date">
            {articleData.date}
          </time>
        </div>

        <div className="blog-article__content">
          <p className="blog-article__intro">
            {articleData.intro}
          </p>

          {sectionConfig.map(section => renderSection(section))}
        </div>
      </article>
    </div>
  );
}

