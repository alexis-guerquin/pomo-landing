import { Link } from 'react-router-dom';
import { useI18n } from '../../contexts/I18nContext';
import ThreeDButton from '../ui/3DButton/3dbutton';
import './ExtensionCTA.css';

const CHROME_STORE_URL = 'https://chromewebstore.google.com/detail/pomocha-%E2%80%94-pomodoro-timer/fcaefgilphmnhhbjjeailgnklfnhcmpc';

export function ExtensionCTA() {
  const { t } = useI18n();
  const ext = t.components.extensionCta;
  const articleSlug = t.pages.blog.articles.pomochaExtension.slug;

  return (
    <section className="extension-cta">
      <div className="extension-cta__content">
        <div className="extension-cta__text">
          <span className="extension-cta__badge">{ext.badge}</span>
          <h2 className="extension-cta__title">{ext.title}</h2>
          <p className="extension-cta__subtitle">{ext.subtitle}</p>
          <div className="extension-cta__actions">
            <ThreeDButton
              text={ext.installButton}
              onClick={() => window.open(CHROME_STORE_URL, '_blank', 'noopener,noreferrer')}
              variant="rectangle"
              color="secondary"
              theme="dark"
            />
            <Link to={`/blog/${articleSlug}`} className="extension-cta__learn-more">
              {ext.learnMoreButton}
            </Link>
          </div>
        </div>
        <div className="extension-cta__visual">
          <img
            src="/blog/extension/pomodoro-ic-128.png"
            alt="Pomocha Chrome Extension"
            className="extension-cta__icon"
            width="128"
            height="128"
          />
          <img
            src="/blog/extension/incrust.png"
            alt="Pomocha timer widget"
            className="extension-cta__preview"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
