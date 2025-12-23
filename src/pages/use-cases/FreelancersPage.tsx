import { CTASection } from '../../components/CTASection';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import { useI18n } from '../../contexts/I18nContext';

export default function FreelancersPage() {
  const { t } = useI18n();
  return (
    <PageLayout
      htmlTitle={t.pages.freelancers.htmlTitle}
      metaDescription={t.pages.freelancers.metaDescription}
      h1={t.pages.freelancers.h1}
      intro={t.pages.freelancers.intro}
    >
      <section className="page-layout__section">
        <h2>{t.pages.freelancers.sections.whyHard.title}</h2>
        <p><strong>{t.pages.freelancers.sections.whyHard.subtitle}</strong></p>
        <p>{t.pages.freelancers.sections.whyHard.content}</p>
        <ul className="page-layout__list">
          {t.pages.freelancers.sections.whyHard.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="page-layout__section">
        <h2>{t.pages.freelancers.sections.timeTracking.title}</h2>
        <p><strong>{t.pages.freelancers.sections.timeTracking.subtitle}</strong></p>
        <p>{t.pages.freelancers.sections.timeTracking.content}</p>
        <ul className="page-layout__list">
          {t.pages.freelancers.sections.timeTracking.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="page-layout__section">
        <h2>{t.pages.freelancers.sections.deepWork.title}</h2>
        <p><strong>{t.pages.freelancers.sections.deepWork.subtitle}</strong></p>
        <p>{t.pages.freelancers.sections.deepWork.content}</p>
        <ul className="page-layout__list">
          {t.pages.freelancers.sections.deepWork.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="page-layout__section">
        <h2>{t.pages.freelancers.sections.gamification.title}</h2>
        <p><strong>{t.pages.freelancers.sections.gamification.subtitle}</strong></p>
        <p>{t.pages.freelancers.sections.gamification.content}</p>
        <ul className="page-layout__list">
          {t.pages.freelancers.sections.gamification.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <p style={{ marginTop: 24 }}>{t.pages.freelancers.sections.relatedArticles.title}</p>
        {t.pages.freelancers.sections.relatedArticles.links.map((link, index) => (
          <span key={index}>
            <a href={link.href} style={{ color: '#7e4e4e' }}>
              → {link.text}
            </a>
            {index < t.pages.freelancers.sections.relatedArticles.links.length - 1 && <br/>}
          </span>
        ))}
      </section>

      <CTASection />
    </PageLayout>
  );
}
