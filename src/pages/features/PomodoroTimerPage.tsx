import { CTASection } from '../../components/CTASection';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import './PomodoroTimerPage.css';

export default function PomodoroTimerPage() {
  return (
    <PageLayout
      htmlTitle="Minuteur Pomodoro – Simple, épuré, sans distraction"
      metaDescription="Un minuteur Pomodoro minimaliste pensé pour le deep work. Intervalles personnalisables, rappels de pause et notifications sonores. Le focus, en toute simplicité."
      h1="Un minuteur Pomodoro qui respecte votre concentration"
      intro="Le meilleur minuteur, c’est celui auquel vous n’avez pas à penser. Le nôtre démarre quand vous êtes prêt, vous garde sur les rails, et n’interrompt jamais votre flow avec une complexité inutile."
    >
      <section className="page-layout__section">
        <h2>Le Pomodoro classique, optimisé</h2>
        <p><strong>Le 25/5, comme il faut</strong></p>
        <p>
          La technique Pomodoro repose sur des sessions de focus de 25 minutes suivies de
          5 minutes de pause. On garde cette formule efficace, en ajoutant la flexibilité dont vous avez besoin :
        </p>
        <ul className="page-layout__list">
          <li>Personnalisez la durée des sessions (15, 25, 45 ou 90 minutes)</li>
          <li>Ajustez la durée des pauses (5, 10 ou 15 minutes)</li>
          <li>Définissez une pause longue toutes les 4 sessions</li>
          <li>Mettez en pause et reprenez sans perdre votre progression</li>
        </ul>
      </section>

      <section className="page-layout__section">
        <h2>Conçu pour s’effacer</h2>
        <p><strong>Interface minimale, focus maximal</strong></p>
        <p>
          Quand vous travaillez, la dernière chose dont vous avez besoin, c’est d’un écran encombré.
          Le minuteur affiche uniquement l’essentiel :
        </p>
        <ul className="page-layout__list">
          <li>Un compte à rebours grand et lisible</li>
          <li>Le nom de la tâche en cours</li>
          <li>Temps total du jour</li>
          <li>Des contrôles simples (pause / passer)</li>
        </ul>
        <p>Tout le reste se met de côté.</p>
      </section>

      <section className="page-layout__section">
        <h2>Projet en cours et todolist</h2>
        <p><strong>Organisez vos tâches par projet</strong></p>
        <p>
          Chaque session Pomodoro est associée à un projet et une tâche spécifique. Organisez votre travail
          en créant des projets (travail, études, personnel) et assignez des tâches à chacun d'eux.
        </p>
        <ul className="page-layout__list">
          <li>Sélectionnez un projet avant de démarrer une session</li>
          <li>Ajoutez des tâches directement depuis l'interface du minuteur</li>
          <li>Suivez votre progression avec les tâches actives et terminées</li>
          <li>Filtrez vos tâches par statut (toutes, actives, terminées)</li>
          <li>Le projet en cours s'affiche dans vos statistiques quotidiennes</li>
        </ul>
        <p>
          Plus besoin de jongler entre plusieurs outils : votre minuteur, vos projets et vos tâches sont
          regroupés dans une seule interface, pensée pour la concentration.
        </p>
      </section>

      <section className="page-layout__section">
        <div className="pomodoro-visual pomodoro-visual--single">
          <picture>
            <source media="(min-width: 768px)" srcSet="/visuals/expl/home-laptop.png" />
            <img 
              src="/visuals/expl/home-mobile.png" 
              alt="Interface Pomodoro : timer, statistiques, projets et todolist"
              className="pomodoro-visual__image"
            />
          </picture>
        </div>
      </section>

      <section className="page-layout__section">
        <h2>Récapitulatif de fin de session</h2>
        <p><strong>Votre progression, célébrée à chaque étape</strong></p>
        <p>
          Chaque session terminée est l'occasion de célébrer votre effort et de voir votre progression
          concrète. Le récapitulatif de fin de session vous montre instantanément ce que vous avez accompli.
        </p>
        <ul className="page-layout__list">
          <li><strong>Résumé de l'XP gagné</strong> — Voyez immédiatement les points d'expérience accumulés pour cette session</li>
          <li><strong>Badges débloqués</strong> — Découvrez les nouveaux succès et réalisations obtenus</li>
          <li><strong>Suggestions de pause</strong> — Recevez des recommandations pour une pause efficace qui vous aidera à récupérer et à maintenir votre productivité</li>
        </ul>
        <p>
          Ces moments de célébration renforcent votre motivation et transforment chaque session en une petite
          victoire concrète. La pause devient elle aussi un moment utile grâce aux suggestions personnalisées.
        </p>
        <div className="pomodoro-visual" style={{ marginBottom: '5em' }}>
          <img 
            src="/visuals/sessionend.png" 
            alt="Récapitulatif de fin de session avec XP gagné, badges débloqués et suggestions de pause"
            className="pomodoro-visual__image"
          />
          <img 
            src="/visuals/break.jpg" 
            alt="suggestions de pause"
            className="pomodoro-visual__image"
          />
        </div>
      </section>

      <section className="page-layout__section">
      <p style={{ marginTop: 24 }}>Articles qui pourraient vous intéresser :</p>
        <a href="/features/rewards-system" style={{ color: '#7e4e4e' }}>
        → Comment utiliser le système de récompenses
        </a>
        <br/>
        <a href="/features/statistics" style={{ color: '#7e4e4e' }}>
        → Comment utiliser les statistiques
        </a>
      </section>

      <CTASection />
    </PageLayout>
  );
}
