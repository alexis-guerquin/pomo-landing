import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import { useI18n } from '../../contexts/I18nContext';

export default function ContactPage() {
  const { t } = useI18n();
  return (
    <PageLayout
      htmlTitle={t.pages.contact.htmlTitle}
      metaDescription={t.pages.contact.metaDescription}
      h1={t.pages.contact.h1}
      intro={t.pages.contact.intro}
    >
      <section className="page-layout__section">
        <h2>{t.pages.contact.sections.email.title}</h2>
        <p>{t.pages.contact.sections.email.content}</p>
        <p style={{ marginTop: 8 }}>
          <a
            href={`mailto:${t.pages.contact.sections.email.address}`}
            style={{ color: '#7e4e4e', fontWeight: 600 }}
          >
            {t.pages.contact.sections.email.address}
          </a>
        </p>
      </section>

      <section className="page-layout__section">
        <h2>{t.pages.contact.sections.social.title}</h2>
        <p>{t.pages.contact.sections.social.content}</p>
        <p style={{ marginTop: 8 }}>
          <a
            href="https://x.com/Team_Pomocha"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#7e4e4e', fontWeight: 600 }}
          >
            {t.pages.contact.sections.social.handle}
          </a>
        </p>
      </section>

      <section className="page-layout__section">
        <h2>{t.pages.contact.sections.response.title}</h2>
        <p>{t.pages.contact.sections.response.content}</p>
      </section>
    </PageLayout>
  );
}
