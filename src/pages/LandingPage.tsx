import { SiteFooter, SiteHeader } from '../components/SiteChrome/SiteChrome';
import PageMetadata from '../components/SEO/PageMetadata';
import { landingImages, landingMeta, landingSchema, platforms, siteUrl } from '../config/landing';
import { localizedPath } from '../config/routes';
import { useI18n } from '../contexts/I18nContext';
import PochaAnswers from './PochaAnswers';
import PochaFeatures from './PochaFeatures';
import './LandingPage.css';

const appleFrance = platforms.ios.fr;
export default function LandingPage() {
  const { locale } = useI18n();
  const fr = locale === 'fr';
  const meta = landingMeta[locale];
  const canonical = `${siteUrl}${localizedPath('/', locale)}`;
  const media = landingImages(locale);
  const schema = landingSchema(locale, canonical);

  return (
    <>
      <PageMetadata {...meta} />
      <SiteHeader />
      <main className="pocha-home">
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <section className="pocha-hero" aria-labelledby="pocha-title">
          <div className="pocha-hero__copy">
            <h1 id="pocha-title">
              {fr ? 'Minuteur Pomodoro' : 'Pomodoro timer'}
              <br />
              <span>{fr ? 'avec Pocha.' : 'with Pocha.'}</span>
            </h1>
            <p className="pocha-hero__intro">
              {fr
                ? 'Pocha est une application de concentration pour étudier et travailler. Lance une session avec ton capybara, suis tes progrès et débloque des récompenses.'
                : 'Pocha is a focus app for study and work. Start a session with your capybara, track your progress, and unlock rewards.'}
            </p>
            <div className="pocha-hero__actions">
              <a className="pocha-button pocha-button--primary" href="#telecharger">
                {fr ? 'Télécharger Pocha' : 'Get Pocha'} <span aria-hidden="true">↓</span>
              </a>
              <a className="pocha-button pocha-button--secondary" href={platforms.web}>
                {fr ? 'Essayer le minuteur en ligne' : 'Try the online timer'} <span aria-hidden="true">↗</span>
              </a>
            </div>
            <ul className="pocha-stats" aria-label={fr ? 'Pocha en chiffres' : 'Pocha in numbers'}>
              <li>
                <a href={platforms.android}>
                  <strong>10+</strong>
                  <span>{fr ? 'téléchargements Google Play' : 'Google Play downloads'}</span>
                </a>
              </li>
              <li>
                <a href={appleFrance}>
                  <strong>{fr ? '4,5/5' : '4.5/5'} <span aria-hidden="true">★</span></strong>
                  <span>{fr ? 'App Store France · 2 notes' : 'French App Store · 2 ratings'}</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="pocha-hero__visual">
            {media.store.map(({ id, ...image }) => (
              <img
                key={id}
                className="pocha-store-shot"
                {...image}
                fetchPriority={id === 1 ? 'high' : undefined}
              />
            ))}
          </div>
        </section>

        <PochaFeatures />

        <section id="telecharger" className="pocha-platforms" aria-labelledby="pocha-platforms-title">
          <h2 id="pocha-platforms-title">{fr ? 'Où veux-tu te concentrer ?' : 'Where do you want to focus?'}</h2>
          <div className="pocha-platforms__grid">
            <article className="pocha-platform">
              <h3>{fr ? 'Sur mobile' : 'On mobile'}</h3>
              <p>iPhone, iPad &amp; Android</p>
              <StoreLink href={platforms.ios[locale]}>App Store</StoreLink>
              <StoreLink href={platforms.android}>Google Play</StoreLink>
              <div className="pocha-platform__preview pocha-platform__preview--mobile">
                {media.mobile.map((image) => (
                  <img key={image.src} {...image} loading="lazy" decoding="async" />
                ))}
              </div>
            </article>
            <article id="mac" className="pocha-platform">
              <h3>{fr ? 'Sur Mac' : 'On Mac'}</h3>
              <p>{fr ? 'Version iPad compatible Mac Apple Silicon' : 'iPad app for Apple silicon Macs'}</p>
              <StoreLink href={platforms.mac[locale]}>{fr ? 'App Store sur Mac' : 'App Store on Mac'}</StoreLink>
              <small>{fr ? 'Version native en préparation' : 'Native Mac app in development'}</small>
              <PlatformPreview {...media.mac} />
            </article>
            <article className="pocha-platform">
              <h3>{fr ? 'Dans le navigateur' : 'In your browser'}</h3>
              <p>{fr ? 'Pomocha Web et extension Chrome' : 'Pomocha Web and Chrome extension'}</p>
              <StoreLink href={platforms.web}>{fr ? 'Ouvrir Pomocha' : 'Open Pomocha'}</StoreLink>
              <StoreLink href={platforms.chrome}>{fr ? 'Extension Chrome' : 'Chrome extension'}</StoreLink>
              <PlatformPreview {...media.web} />
            </article>
          </div>
        </section>
        <PochaAnswers />
      </main>
      <SiteFooter />
    </>
  );
}

function PlatformPreview({ src, alt, width, height }: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <div className="pocha-platform__preview">
      <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
    </div>
  );
}

function StoreLink({ href, children }: {
  href: string;
  children: string;
}) {
  return (
    <a className="pocha-platform__link" href={href}>
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}
