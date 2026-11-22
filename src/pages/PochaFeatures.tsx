import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../contexts/I18nContext';
import PomodoroWheel from './PomodoroWheel';

const features: Array<{
  id: string;
  clip?: string;
  fr: { title: string; text: string };
  en: { title: string; text: string };
}> = [
  {
    id: 'minuteur',
    fr: { title: 'Minuteur Pomodoro', text: 'Fais tourner la roue pour choisir la durée de ta session.' },
    en: { title: 'Pomodoro timer', text: 'Spin the wheel to choose how long to focus.' },
  },
  {
    id: 'blocking',
    clip: 'pocha_angry',
    fr: { title: 'Blocage des apps', text: 'Sur iPhone, mets les apps qui te distraient de côté pendant tes sessions avec Pocha Premium.' },
    en: { title: 'App blocking', text: 'On iPhone, use Pocha Premium to block distracting apps during focus sessions.' },
  },
  {
    id: 'breaks',
    clip: 'pocha-break-meditate',
    fr: { title: 'Pauses guidées', text: 'Respire, médite ou étire-toi entre deux sessions.' },
    en: { title: 'Guided breaks', text: 'Take a breathing, meditation or stretching break between sessions.' },
  },
  {
    id: 'statistiques',
    fr: { title: 'Statistiques et séries', text: 'Retrouve ton temps de concentration et les jours où tu as tenu ta série.' },
    en: { title: 'Stats and streaks', text: 'See how long you focused and which days kept your streak going.' },
  },
  {
    id: 'challenges',
    clip: 'pocha-target',
    fr: { title: 'Défis quotidiens', text: 'Relève de petits défis de concentration et gagne des oranges.' },
    en: { title: 'Daily challenges', text: 'Complete small focus challenges and earn oranges.' },
  },
  {
    id: 'recompenses',
    clip: 'look-down',
    fr: { title: 'Récompenses à collectionner', text: 'Débloque des badges et des trophées à mesure que tu avances.' },
    en: { title: 'Collectible rewards', text: 'Unlock badges and trophies as you make progress.' },
  },
];

export default function PochaFeatures() {
  const { locale } = useI18n();
  const fr = locale === 'fr';
  const gridRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || paused || !('IntersectionObserver' in window)) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const motions = grid.querySelectorAll<HTMLElement>('[data-feature-motion]');
    const visible = new Set<HTMLElement>();

    function sync(element: HTMLElement) {
      const playing = !motion.matches && !document.hidden && visible.has(element);
      element.classList.toggle('is-animating', playing);
      if (!(element instanceof HTMLVideoElement)) return;

      if (!playing) {
        element.pause();
        return;
      }
      const source = element.dataset.src;
      if (!element.hasAttribute('src') && source) element.src = source;
      if (element.paused) void element.play().catch(() => {});
    }

    const syncAll = () => motions.forEach(sync);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const element = entry.target as HTMLElement;
        if (entry.intersectionRatio >= 0.5) visible.add(element);
        else visible.delete(element);
        sync(element);
      }
    }, { threshold: 0.5 });

    motions.forEach((element) => observer.observe(element));
    motion.addEventListener('change', syncAll);
    document.addEventListener('visibilitychange', syncAll);

    return () => {
      observer.disconnect();
      motion.removeEventListener('change', syncAll);
      document.removeEventListener('visibilitychange', syncAll);
      visible.clear();
      syncAll();
    };
  }, [paused]);

  return (
    <section id="features" className="pocha-features" aria-labelledby="pocha-features-title">
      <div className="pocha-features__header">
        <h2 id="pocha-features-title">{fr ? 'Les fonctionnalités de Pocha' : 'Pocha features'}</h2>
        <button
          type="button"
          className="pocha-features__playback"
          aria-controls="pocha-feature-grid"
          onClick={() => setPaused((value) => !value)}
        >
          {paused
            ? (fr ? 'Relancer les animations' : 'Resume animations')
            : (fr ? 'Mettre les animations en pause' : 'Pause animations')}
        </button>
      </div>
      <div className="pocha-features__grid" id="pocha-feature-grid" ref={gridRef}>
        {features.map((feature) => (
          <article className="pocha-feature" id={feature.id} key={feature.id}>
            <div className="pocha-feature__visual">
              {feature.id === 'minuteur' && <PomodoroWheel paused={paused} />}
              {feature.id === 'statistiques' && <StreakWeek french={fr} />}
              {feature.clip && (
                <video
                  data-feature-motion
                  aria-hidden="true"
                  title={feature[locale].title}
                  width="256"
                  height="256"
                  poster={`/assets/pocha/mascot/${feature.clip}-loop.webp`}
                  data-src={`/assets/pocha/mascot/${feature.clip}-loop.webm`}
                  muted
                  loop
                  playsInline
                  preload="none"
                  disablePictureInPicture
                />
              )}
            </div>
            <h3>{feature[locale].title}</h3>
            <p>{feature[locale].text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const weekDays = {
  fr: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
  en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
};

function StreakWeek({ french }: { french: boolean }) {
  return (
    <div
      data-feature-motion
      className="pocha-streak"
      role="img"
      aria-label={french ? 'Exemple de série de sept jours' : 'Example of a seven-day streak'}
    >
      {weekDays[french ? 'fr' : 'en'].map((day, index) => (
        <span className="pocha-streak__day" key={day} aria-hidden="true">
          {day}
          <img
            src="/assets/pocha/mascot/streak.webp"
            alt=""
            width="57"
            height="60"
            loading="lazy"
            style={{ animationDelay: `${index * 110}ms` }}
          />
        </span>
      ))}
    </div>
  );
}
