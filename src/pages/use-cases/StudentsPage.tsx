import { CTASection } from '../../components/CTASection';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import { useI18n } from '../../contexts/I18nContext';

export default function StudentsPage() {
  const { t } = useI18n();
  return (
    <PageLayout
      htmlTitle={t.pages.students.htmlTitle}
      metaDescription={t.pages.students.metaDescription}
      h1={t.pages.students.h1}
      intro={t.pages.students.intro}
    >
      <section className="page-layout__section">
        <p>{t.pages.students.sections.opening.content1}</p>
        <p>{t.pages.students.sections.opening.content2}</p>
      </section>

      <section className="page-layout__section">
        <h2>{t.pages.students.sections.challenge.title}</h2>
        <p><strong>{t.pages.students.sections.challenge.subtitle}</strong></p>
        <p>{t.pages.students.sections.challenge.scenario}</p>
        <ul className="page-layout__list">
          {t.pages.students.sections.challenge.distractions.map((distraction, index) => (
            <li key={index}>{distraction}</li>
          ))}
        </ul>
        <p>{t.pages.students.sections.challenge.conclusion}</p>

        <p style={{ marginTop: 16 }}><strong>{t.pages.students.sections.challenge.statsTitle}</strong></p>
        <ul className="page-layout__list">
          {t.pages.students.sections.challenge.stats.map((stat, index) => (
            <li key={index}>{stat}</li>
          ))}
        </ul>
        <p>{t.pages.students.sections.challenge.closing}</p>
      </section>

      <section className="page-layout__section">
        <h2>{t.pages.students.sections.howItWorks.title}</h2>

        <p><strong>{t.pages.students.sections.howItWorks.block1.title}</strong></p>
        <p>{t.pages.students.sections.howItWorks.block1.content1}</p>
        <p>{t.pages.students.sections.howItWorks.block1.content2}</p>

        <p style={{ marginTop: 16 }}><strong>{t.pages.students.sections.howItWorks.feedback.title}</strong></p>
        <p>{t.pages.students.sections.howItWorks.feedback.intro}</p>
        <ul className="page-layout__list">
          {t.pages.students.sections.howItWorks.feedback.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>{t.pages.students.sections.howItWorks.feedback.closing}</p>
        <p style={{ marginTop: 24 }}>{t.pages.students.sections.relatedArticles.title}</p>
        {t.pages.students.sections.relatedArticles.links.map((link, index) => (
          <span key={index}>
            <a href={link.href} style={{ color: '#7e4e4e' }}>
              → {link.text}
            </a>
            {index < t.pages.students.sections.relatedArticles.links.length - 1 && <br/>}
          </span>
        ))}
      </section>
      <CTASection />
    </PageLayout>
  );
}
