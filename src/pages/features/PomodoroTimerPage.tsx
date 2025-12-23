import { CTASection } from '../../components/CTASection';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import { useI18n } from '../../contexts/I18nContext';
import './PomodoroTimerPage.css';

export default function PomodoroTimerPage() {
  const { t } = useI18n();
  return (
    <PageLayout
      htmlTitle={t.pages.pomodoroTimer.htmlTitle}
      metaDescription={t.pages.pomodoroTimer.metaDescription}
      h1={t.pages.pomodoroTimer.h1}
      intro={t.pages.pomodoroTimer.intro}
    >
      <section className="page-layout__section">
        <h2>{t.pages.pomodoroTimer.sections.classic.title}</h2>
        <p><strong>{t.pages.pomodoroTimer.sections.classic.subtitle}</strong></p>
        <p>{t.pages.pomodoroTimer.sections.classic.content}</p>
        <ul className="page-layout__list">
          {t.pages.pomodoroTimer.sections.classic.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="page-layout__section">
        <h2>{t.pages.pomodoroTimer.sections.designedToFade.title}</h2>
        <p><strong>{t.pages.pomodoroTimer.sections.designedToFade.subtitle}</strong></p>
        <p>{t.pages.pomodoroTimer.sections.designedToFade.content}</p>
        <ul className="page-layout__list">
          {t.pages.pomodoroTimer.sections.designedToFade.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>{t.pages.pomodoroTimer.sections.designedToFade.closing}</p>
      </section>

      <section className="page-layout__section">
        <h2>{t.pages.pomodoroTimer.sections.projectAndTodo.title}</h2>
        <p><strong>{t.pages.pomodoroTimer.sections.projectAndTodo.subtitle}</strong></p>
        <p>{t.pages.pomodoroTimer.sections.projectAndTodo.content}</p>
        <ul className="page-layout__list">
          {t.pages.pomodoroTimer.sections.projectAndTodo.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>{t.pages.pomodoroTimer.sections.projectAndTodo.closing}</p>
      </section>

      <section className="page-layout__section">
        <div className="pomodoro-visual pomodoro-visual--single">
          <picture>
            <source media="(min-width: 768px)" srcSet="/visuals/expl/home-laptop.png" />
            <img 
              src="/visuals/expl/home-mobile.png" 
              alt="Interface Pomodoro : timer, statistiques, projets et todolist"
              className="pomodoro-visual__image"
              width="390"
              height="844"
            />
          </picture>
        </div>
      </section>

      <section className="page-layout__section">
        <h2>{t.pages.pomodoroTimer.sections.sessionEnd.title}</h2>
        <p><strong>{t.pages.pomodoroTimer.sections.sessionEnd.subtitle}</strong></p>
        <p>{t.pages.pomodoroTimer.sections.sessionEnd.content}</p>
        <ul className="page-layout__list">
          {t.pages.pomodoroTimer.sections.sessionEnd.items.map((item, index) => (
            <li key={index}>
              <strong>{item.title}</strong> — {item.description}
            </li>
          ))}
        </ul>
        <p>{t.pages.pomodoroTimer.sections.sessionEnd.closing}</p>
        <div className="pomodoro-visual" style={{ marginBottom: '5em' }}>
          <img 
            src="/visuals/sessionend.png" 
            alt="Récapitulatif de fin de session avec XP gagné, badges débloqués et suggestions de pause"
            className="pomodoro-visual__image"
            width="1920"
            height="1080"
          />
          <img 
            src="/visuals/break.jpg" 
            alt="suggestions de pause"
            className="pomodoro-visual__image"
            width="1920"
            height="1080"
          />
        </div>
      </section>

      <section className="page-layout__section">
        <p style={{ marginTop: 24 }}>{t.pages.pomodoroTimer.sections.relatedArticles.title}</p>
        {t.pages.pomodoroTimer.sections.relatedArticles.links.map((link, index) => (
          <span key={index}>
            <a href={link.href} style={{ color: '#7e4e4e' }}>
              → {link.text}
            </a>
            {index < t.pages.pomodoroTimer.sections.relatedArticles.links.length - 1 && <br/>}
          </span>
        ))}
      </section>

      <CTASection />
    </PageLayout>
  );
}
