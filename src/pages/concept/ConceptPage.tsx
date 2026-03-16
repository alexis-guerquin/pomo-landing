import { CTASection } from '../../components/CTASection';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import { useI18n } from '../../contexts/I18nContext';

export default function ConceptPage() {
  const { t } = useI18n();
  return (
    <PageLayout
      htmlTitle={t.pages.concept.htmlTitle}
      metaDescription={t.pages.concept.metaDescription}
      h1={t.pages.concept.h1}
      intro={t.pages.concept.intro}
    >
      <section className="page-layout__section">
        <h2>{t.pages.concept.sections.pomodoro.title}</h2>
        <p>{t.pages.concept.sections.pomodoro.content}</p>
      </section>

      <section className="page-layout__section">
        <h2>{t.pages.concept.sections.gamification.title}</h2>
        <p>{t.pages.concept.sections.gamification.content}</p>
      </section>

      <section className="page-layout__section">
        <h2>{t.pages.concept.sections.features.title}</h2>
        <ul className="page-layout__list">
          {t.pages.concept.sections.features.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="page-layout__section">
        <h2>{t.pages.concept.sections.philosophy.title}</h2>
        <p>{t.pages.concept.sections.philosophy.content}</p>
      </section>

      <CTASection />
    </PageLayout>
  );
}
