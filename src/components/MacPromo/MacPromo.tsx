import { MacScreenshot } from '../MacScreenshot/MacScreenshot';
import { Link } from 'react-router-dom';
import { useI18n } from '../../contexts/I18nContext';
import './MacPromo.css';

export function MacPromo() {
  const { t } = useI18n();
  const mac = t.pages.app.mac;

  return (
    <section className="mac-promo" aria-labelledby="mac-promo-title">
      <div className="mac-promo__copy">
        <span className="mac-promo__eyebrow">{mac.eyebrow}</span>
        <h2 id="mac-promo-title">{mac.title}</h2>
        <p>{mac.content}</p>
        <p className="mac-promo__availability">{mac.availability}</p>
        <Link className="mac-promo__link" to="/app">
          {mac.homeCta} <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <MacScreenshot scene="macbook-focus" className="mac-promo__image" />
    </section>
  );
}
