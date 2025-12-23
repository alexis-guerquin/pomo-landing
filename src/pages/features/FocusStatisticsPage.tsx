import { CTASection } from '../../components/CTASection';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import { useI18n } from '../../contexts/I18nContext';
import './FocusStatisticsPage.css';

export default function FocusStatisticsPage() {
  const { t } = useI18n();
  return (
    <PageLayout
      htmlTitle={t.pages.focusStatistics.htmlTitle}
      metaDescription={t.pages.focusStatistics.metaDescription}
      h1={t.pages.focusStatistics.h1}
      intro={t.pages.focusStatistics.intro}
    >
      <section className="page-layout__section">
        <h2>{t.pages.focusStatistics.sections.weeklySummary.title}</h2>
        <p>
          <strong>{t.pages.focusStatistics.sections.weeklySummary.subtitle}</strong>
        </p>
        <p>{t.pages.focusStatistics.sections.weeklySummary.content}</p>
        <p>{t.pages.focusStatistics.sections.weeklySummary.billingNote}</p>
        <div className="statistics-visual">
          <img 
            src="/visuals/graph.png" 
            alt="Graphique de temps de travail par projet et par jour de semaine"
            className="statistics-visual__image"
            width="1920"
            height="1080"
          />
        </div>
      </section>

      <section className="page-layout__section">
        <h2>{t.pages.focusStatistics.sections.topProjects.title}</h2>
        <p>
          <strong>{t.pages.focusStatistics.sections.topProjects.subtitle}</strong>
        </p>
        <p>{t.pages.focusStatistics.sections.topProjects.content}</p>
        <p>{t.pages.focusStatistics.sections.topProjects.flexibility}</p>
        <div className="statistics-visual">
          <img 
            src="/visuals/topprojects.png" 
            alt="Classement des projets par temps de travail"
            className="statistics-visual__image"
            width="1920"
            height="1080"
          />
        </div>
      </section>

      <section className="page-layout__section">
        <h2>{t.pages.focusStatistics.sections.recaps.title}</h2>
        <p>
          <strong>{t.pages.focusStatistics.sections.recaps.subtitle}</strong>
        </p>
        <p>{t.pages.focusStatistics.sections.recaps.content}</p>
        <ul className="page-layout__list">
          {t.pages.focusStatistics.sections.recaps.formats.map((format, index) => (
            <li key={index}><strong>{format.name}</strong> : {format.description}</li>
          ))}
        </ul>
        <p>
          <strong>{t.pages.focusStatistics.sections.recaps.dataTitle}</strong>
        </p>
        <ul className="page-layout__list">
          {t.pages.focusStatistics.sections.recaps.dataItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>{t.pages.focusStatistics.sections.recaps.history}</p>
        <p>
          <em>{t.pages.focusStatistics.sections.recaps.note}</em>
        </p>
        <div className="statistics-visual">
          <img 
            src="/visuals/recaps.png" 
            alt="Exemple de récapitulatif hebdomadaire POMOCHA"
            className="statistics-visual__image"
            width="1920"
            height="1080"
          />
        </div>
      </section>

      <section className="page-layout__section">
        <p style={{ marginTop: 24 }}>{t.pages.focusStatistics.sections.relatedArticles.title}</p>
        {t.pages.focusStatistics.sections.relatedArticles.links.map((link, index) => (
          <span key={index}>
            <a href={link.href} style={{ color: '#7e4e4e' }}>
              → {link.text}
            </a>
            {index < t.pages.focusStatistics.sections.relatedArticles.links.length - 1 && <br/>}
          </span>
        ))}
      </section>

      <CTASection />
    </PageLayout>
  );
}
