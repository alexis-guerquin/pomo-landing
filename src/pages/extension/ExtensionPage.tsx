import { CTASection } from '../../components/CTASection';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import { useI18n } from '../../contexts/I18nContext';

export default function ExtensionPage() {
  const { t } = useI18n();
  return (
    <PageLayout
      htmlTitle={t.pages.extension.htmlTitle}
      metaDescription={t.pages.extension.metaDescription}
      h1={t.pages.extension.h1}
      intro={t.pages.extension.intro}
    >
      <section className="page-layout__section">
        <h2>{t.pages.extension.sections.what.title}</h2>
        <p>{t.pages.extension.sections.what.content}</p>
      </section>

      <section className="page-layout__section">
        <h2>{t.pages.extension.sections.features.title}</h2>
        <ul className="page-layout__list">
          {t.pages.extension.sections.features.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="page-layout__section">
        <h2>{t.pages.extension.sections.install.title}</h2>
        <p>{t.pages.extension.sections.install.content}</p>
        <p style={{ marginTop: 16 }}>
          <a
            href="https://www.pomocha.io/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#7e4e4e', fontWeight: 600 }}
          >
            → {t.pages.extension.sections.install.cta}
          </a>
        </p>
      </section>

      <CTASection />
    </PageLayout>
  );
}
