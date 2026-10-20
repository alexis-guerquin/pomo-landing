import { useState } from 'react';
import { CTASection } from '../../components/CTASection';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import { useI18n } from '../../contexts/I18nContext';
import { MobileStoreLinks } from '../../components/MobileStoreLinks/MobileStoreLinks';
import './AppPage.css';

const screenshots = [
  { file: 'focus-session', width: 600, height: 1299 },
  { file: 'session-complete', width: 600, height: 1299 },
  { file: 'break-activities', width: 600, height: 1299 },
  { file: 'break-timer', width: 600, height: 1299 },
  { file: 'streak-calendar', width: 600, height: 1299 },
  { file: 'focus-statistics', width: 600, height: 1299 },
  { file: 'collection', width: 600, height: 1299 },
] as const;

export default function AppPage() {
  const { t } = useI18n();
  const [galleryPaused, setGalleryPaused] = useState(false);
  return (
    <PageLayout
      htmlTitle={t.pages.app.htmlTitle}
      metaDescription={t.pages.app.metaDescription}
      h1={t.pages.app.h1}
      intro={t.pages.app.intro}
      ogImage="https://www.pomocha.fr/assets/pocha/mac/macbook-notch.webp"
    >
      <section id="mac" className="page-layout__section pocha-mac-feature" aria-labelledby="pocha-mac-title">
        <div className="pocha-mac-feature__copy">
          <p className="pocha-mac-feature__eyebrow">{t.pages.app.mac.eyebrow}</p>
          <h2 id="pocha-mac-title">{t.pages.app.mac.title}</h2>
          <p>{t.pages.app.mac.content}</p>
          <p className="pocha-mac-feature__availability">{t.pages.app.mac.availability}</p>
        </div>
        <img
          src="/assets/pocha/mac/macbook-notch.webp"
          alt={t.pages.app.mac.heroAlt}
          width="1714"
          height="996"
          loading="eager"
          fetchPriority="high"
        />
      </section>

      <section className="page-layout__section pocha-notch" aria-labelledby="pocha-notch-title">
        <div className="pocha-notch__heading">
          <p className="pocha-mac-feature__eyebrow">{t.pages.app.mac.notchEyebrow}</p>
          <h2 id="pocha-notch-title">{t.pages.app.mac.notchTitle}</h2>
          <p>{t.pages.app.mac.notchContent}</p>
        </div>
        <div className="pocha-notch__grid">
          <figure className="pocha-notch__card pocha-notch__card--compact">
            <img src="/assets/pocha/mac/notch-collapsed.webp" alt={t.pages.app.mac.notchCollapsedAlt} width="944" height="616" loading="lazy" decoding="async" />
            <figcaption>{t.pages.app.mac.notchCollapsed}</figcaption>
          </figure>
          <figure className="pocha-notch__card">
            <img src="/assets/pocha/mac/notch-timer.webp" alt={t.pages.app.mac.notchTimerAlt} width="698" height="912" loading="lazy" decoding="async" />
            <figcaption>{t.pages.app.mac.notchTimer}</figcaption>
          </figure>
          <figure className="pocha-notch__card">
            <img src="/assets/pocha/mac/notch-session.webp" alt={t.pages.app.mac.notchSessionAlt} width="708" height="856" loading="lazy" decoding="async" />
            <figcaption>{t.pages.app.mac.notchSession}</figcaption>
          </figure>
        </div>
      </section>

      <section className="page-layout__section pocha-mac-desktop" aria-labelledby="pocha-mac-desktop-title">
        <div className="pocha-mac-desktop__heading">
          <h2 id="pocha-mac-desktop-title">{t.pages.app.mac.desktopTitle}</h2>
          <p>{t.pages.app.mac.desktopContent}</p>
        </div>
        <div className="pocha-mac-desktop__grid">
          <figure>
            <img src="/assets/pocha/mac/mac-home.webp" alt={t.pages.app.mac.homeAlt} width="1120" height="1590" loading="lazy" decoding="async" />
            <figcaption>{t.pages.app.mac.homeCaption}</figcaption>
          </figure>
          <figure>
            <img src="/assets/pocha/mac/mac-statistics.webp" alt={t.pages.app.mac.statisticsAlt} width="1120" height="1590" loading="lazy" decoding="async" />
            <figcaption>{t.pages.app.mac.statisticsCaption}</figcaption>
          </figure>
        </div>
      </section>

      <section className="page-layout__section pocha-mobile-feature">
        <div>
          <p className="pocha-mobile-feature__eyebrow">{t.pages.app.mobile.eyebrow}</p>
          <h2>{t.pages.app.mobile.title}</h2>
          <p>{t.pages.app.mobile.content}</p>
          <MobileStoreLinks />
        </div>
        <img className="pocha-mobile-feature__screen" src="/assets/pocha/mobile/daily-missions.webp" alt={t.pages.app.mobile.imageAlt} width="600" height="1299" loading="eager" fetchPriority="high" />
      </section>

      <section className="page-layout__section pocha-gallery" aria-labelledby="pocha-gallery-title">
        <div className="pocha-gallery__heading">
          <div>
            <h2 id="pocha-gallery-title">{t.pages.app.media.galleryTitle}</h2>
            <p>{t.pages.app.media.galleryIntro}</p>
          </div>
          <button
            type="button"
            className="pocha-gallery__control"
            aria-label={galleryPaused ? t.pages.app.media.resumeGallery : t.pages.app.media.pauseGallery}
            aria-pressed={galleryPaused}
            onClick={() => setGalleryPaused((paused) => !paused)}
          >
            <span aria-hidden="true">{galleryPaused ? '▶' : 'Ⅱ'}</span>
          </button>
        </div>
        <div className="pocha-gallery__viewport" tabIndex={0} role="region" aria-label={t.pages.app.media.galleryLabel}>
          <div className={`pocha-gallery__track${galleryPaused ? ' pocha-gallery__track--paused' : ''}`}>
            {[0, 1].map((copy) => (
              <div className="pocha-gallery__sequence" aria-hidden={copy === 1 ? true : undefined} key={copy}>
                {screenshots.map(({ file, width, height }, index) => (
                  <figure className="pocha-gallery__item" key={file}>
                    <img
                      src={`/assets/pocha/mobile/${file}.webp`}
                      alt={copy === 0 ? t.pages.app.media.screenshots[index].alt : ''}
                      width={width}
                      height={height}
                      loading="lazy"
                      decoding="async"
                    />
                    <figcaption>{t.pages.app.media.screenshots[index].caption}</figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-layout__section pocha-demo" aria-labelledby="pocha-demo-title">
        <div className="pocha-demo__copy">
          <h2 id="pocha-demo-title">{t.pages.app.media.demoTitle}</h2>
          <p>{t.pages.app.media.demoIntro}</p>
          <MobileStoreLinks />
        </div>
        <video
          controls
          playsInline
          preload="none"
          poster="/assets/pocha/mobile/focus-session.webp"
          width="540"
          height="1168"
          aria-label={t.pages.app.media.demoLabel}
        >
          <source src="/assets/pocha/mobile/pocha-demo.mp4" type="video/mp4" />
          {t.pages.app.media.videoFallback}
        </video>
      </section>

      <section className="page-layout__section pocha-widget" aria-labelledby="pocha-widget-title">
        <div>
          <h2 id="pocha-widget-title">{t.pages.app.media.widgetTitle}</h2>
          <p>{t.pages.app.media.widgetIntro}</p>
        </div>
        <img src="/assets/pocha/mobile/widget.webp" alt={t.pages.app.media.widgetAlt} width="800" height="378" loading="lazy" decoding="async" />
      </section>
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
