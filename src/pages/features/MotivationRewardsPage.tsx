import { CTASection } from '../../components/CTASection';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import { useI18n } from '../../contexts/I18nContext';
import './MotivationRewardsPage.css';

export default function MotivationRewardsPage() {
  const { t } = useI18n();
  return (
    <PageLayout
      htmlTitle={t.pages.motivationRewards.htmlTitle}
      metaDescription={t.pages.motivationRewards.metaDescription}
      h1={t.pages.motivationRewards.h1}
      intro={t.pages.motivationRewards.intro}
    >
      <section className="page-layout__section">
        <h2>{t.pages.motivationRewards.sections.dailyMissions.title}</h2>
        <p><strong>{t.pages.motivationRewards.sections.dailyMissions.subtitle}</strong></p>
        <p>{t.pages.motivationRewards.sections.dailyMissions.content}</p>
        <p style={{ marginTop: 16, fontStyle: 'italic', color: '#666' }}>
          <strong>{t.pages.motivationRewards.sections.dailyMissions.reminder}</strong>
        </p>

        {t.pages.motivationRewards.sections.dailyMissions.missions.map((mission, index) => (
          <ul key={index} className="page-layout__list">
            <li><strong>{mission.title}</strong> — {mission.description}</li>
          </ul>
        ))}

        <div className="motivation-visual">
          <img 
            src="/visuals/dailymissions.png" 
            alt="Interface des missions quotidiennes avec progression et récompenses"
            className="motivation-visual__image"
            width="1920"
            height="1080"
          />
        </div>
      </section>

      <section className="page-layout__section">
        <h2>{t.pages.motivationRewards.sections.trophies.title}</h2>
        <p><strong>{t.pages.motivationRewards.sections.trophies.subtitle}</strong></p>
        <p>{t.pages.motivationRewards.sections.trophies.content}</p>

        <p style={{ marginTop: 16 }}><strong>{t.pages.motivationRewards.sections.trophies.typesTitle}</strong></p>
        <ul className="page-layout__list">
          {t.pages.motivationRewards.sections.trophies.types.map((type, index) => (
            <li key={index}><strong>{type.name}</strong> — {type.description}</li>
          ))}
        </ul>

        <p style={{ marginTop: 16 }}>{t.pages.motivationRewards.sections.trophies.closing}</p>

        <div className="motivation-visual">
          <img 
            src="/visuals/trophies.png" 
            alt="Système de trophées avec différents types et paliers"
            className="motivation-visual__image"
            width="1920"
            height="1080"
          />
        </div>
      </section>

      <section className="page-layout__section">
        <h2>{t.pages.motivationRewards.sections.badges.title}</h2>
        <p><strong>{t.pages.motivationRewards.sections.badges.subtitle}</strong></p>
        <p>{t.pages.motivationRewards.sections.badges.content}</p>

        <p style={{ marginTop: 16 }}><strong>{t.pages.motivationRewards.sections.badges.commonTitle}</strong></p>
        <p>{t.pages.motivationRewards.sections.badges.commonDescription}</p>
        <ul className="page-layout__list">
          {t.pages.motivationRewards.sections.badges.commonExamples.map((example, index) => (
            <li key={index}>{example}</li>
          ))}
        </ul>

        <p style={{ marginTop: 16 }}><strong>{t.pages.motivationRewards.sections.badges.eventTitle}</strong></p>
        <p>{t.pages.motivationRewards.sections.badges.eventDescription}</p>
        <ul className="page-layout__list">
          {t.pages.motivationRewards.sections.badges.eventExamples.map((example, index) => (
            <li key={index}>{example}</li>
          ))}
        </ul>

        <p style={{ marginTop: 16 }}><strong>{t.pages.motivationRewards.sections.badges.rarityTitle}</strong></p>
        <p>{t.pages.motivationRewards.sections.badges.rarityContent}</p>
        <ul className="page-layout__list">
          {t.pages.motivationRewards.sections.badges.rarityItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>{t.pages.motivationRewards.sections.badges.rarityClosing}</p>

        <div className="motivation-visual">
          <img 
            src="/visuals/badges.png" 
            alt="Système de badges communs et événementiels avec exemples de badges débloqués"
            className="motivation-visual__image"
            width="1920"
            height="1080"
          />
        </div>
      </section>

      <section className="page-layout__section">
        <h2>{t.pages.motivationRewards.sections.regularity.title}</h2>
        <p><strong>{t.pages.motivationRewards.sections.regularity.subtitle}</strong></p>
        <p>{t.pages.motivationRewards.sections.regularity.content1}</p>
        <p>{t.pages.motivationRewards.sections.regularity.content2}</p>
      </section>

      <section className="page-layout__section">
        <p style={{ marginTop: 24 }}>{t.pages.motivationRewards.sections.relatedArticles.title}</p>
        {t.pages.motivationRewards.sections.relatedArticles.links.map((link, index) => (
          <span key={index}>
            <a href={link.href} style={{ color: '#7e4e4e' }}>
              → {link.text}
            </a>
            {index < t.pages.motivationRewards.sections.relatedArticles.links.length - 1 && <br/>}
          </span>
        ))}
      </section>
      
      <CTASection />
    </PageLayout>
  );
}
