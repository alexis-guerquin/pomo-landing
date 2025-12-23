import { CTASection } from '../../components/CTASection';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import { useI18n } from '../../contexts/I18nContext';

export default function AboutPage() {
  const { t } = useI18n();
  return (
    <PageLayout
      htmlTitle={t.pages.about.htmlTitle}
      metaDescription={t.pages.about.metaDescription}
      h1={t.pages.about.h1}
      intro={t.pages.about.intro}
    >
      <section className="page-layout__section">
        <h2>{t.pages.about.sections.philosophy.title}</h2>
        <p><strong>{t.pages.about.sections.philosophy.subtitle}</strong></p>
        <p>{t.pages.about.sections.philosophy.content}</p>
      </section>

      <section className="page-layout__section">
        <h2>{t.pages.about.sections.whatWeBuild.title}</h2>
        <p>{t.pages.about.sections.whatWeBuild.intro}</p>
        <ul className="page-layout__list">
          {t.pages.about.sections.whatWeBuild.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="page-layout__section">
        <h2>{t.pages.about.sections.forWhom.title}</h2>
        <p>{t.pages.about.sections.forWhom.content}</p>
      </section>

      <section className="page-layout__section">
        <p style={{ marginTop: 24 }}>{t.pages.about.sections.relatedArticles.title}</p>
        {t.pages.about.sections.relatedArticles.links.map((link, index) => (
          <span key={index}>
            <a href={link.href} style={{ color: '#7e4e4e' }}>
              → {link.text}
            </a>
            {index < t.pages.about.sections.relatedArticles.links.length - 1 && <br/>}
          </span>
        ))}
      </section>

      <CTASection />
    </PageLayout>
  );
}
