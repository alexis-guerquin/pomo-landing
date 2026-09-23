import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import { useI18n } from '../../contexts/I18nContext';
import { Link } from 'react-router-dom';

export default function LegalPage() {
  const { t, locale } = useI18n();
  return (
    <PageLayout
      htmlTitle={t.pages.legal.htmlTitle}
      metaDescription={t.pages.legal.metaDescription}
      h1={t.pages.legal.h1}
      intro={t.pages.legal.intro}
    >
      <section className="page-layout__section">
        <h2>{t.pages.legal.sections.editor.title}</h2>
        <p>{t.pages.legal.sections.editor.content}</p>
        <ul className="page-layout__list">
          {t.pages.legal.sections.editor.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="page-layout__section">
        <h2>{t.pages.legal.sections.hosting.title}</h2>
        <p>{t.pages.legal.sections.hosting.content}</p>
      </section>

      <section className="page-layout__section">
        <h2>{t.pages.legal.sections.intellectual.title}</h2>
        <p>{t.pages.legal.sections.intellectual.content}</p>
      </section>

      <section className="page-layout__section">
        <h2>{t.pages.legal.sections.data.title}</h2>
        <p>{t.pages.legal.sections.data.content}</p>
        <p style={{ marginTop: 12 }}>
          <Link to="/privacy">
            {locale === 'fr' ? 'Consulter la politique de confidentialité' : 'Read the privacy policy'}
          </Link>
          {' · '}
          <Link to="/delete-account">
            {locale === 'fr' ? 'Demander la suppression de votre compte et de vos données' : 'Request deletion of your account and data'}
          </Link>
        </p>
      </section>

      <section className="page-layout__section">
        <h2>{locale === 'fr' ? 'Communauté POCHA' : 'POCHA community'}</h2>
        <p>
          <Link to="/community-guidelines">
            {locale === 'fr' ? 'Consulter les règles de la communauté' : 'Read the community guidelines'}
          </Link>
        </p>
      </section>

      <section className="page-layout__section">
        <h2>{t.pages.legal.sections.cookies.title}</h2>
        <p>{t.pages.legal.sections.cookies.content}</p>
      </section>
    </PageLayout>
  );
}
