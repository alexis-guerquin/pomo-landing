import { CTASection } from '../../components/CTASection';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import { useI18n } from '../../contexts/I18nContext';

export default function AppPage() {
  const { t } = useI18n();
  return (
    <PageLayout
      htmlTitle={t.pages.app.htmlTitle}
      metaDescription={t.pages.app.metaDescription}
      h1={t.pages.app.h1}
      intro={t.pages.app.intro}
    >
      <section className="page-layout__section">
        <h2>{t.pages.app.sections.access.title}</h2>
        <p>{t.pages.app.sections.access.content}</p>
        <p style={{ marginTop: 16 }}>
          <a
            href="https://www.pomocha.io/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#7e4e4e', fontWeight: 600 }}
          >
            → {t.pages.app.sections.access.cta}
          </a>
        </p>
      </section>

      <section className="page-layout__section">
        <h2>{t.pages.app.sections.features.title}</h2>
        <ul className="page-layout__list">
          {t.pages.app.sections.features.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="page-layout__section">
        <h2>{t.pages.app.sections.platforms.title}</h2>
        <p>{t.pages.app.sections.platforms.content}</p>
      </section>

      <CTASection />
    </PageLayout>
  );
}
