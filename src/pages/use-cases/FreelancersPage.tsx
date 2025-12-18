import { CTASection } from '../../components/CTASection';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';

export default function FreelancersPage() {
  return (
    <PageLayout
      htmlTitle="App Pomodoro pour freelances – Focus, suivi du temps, livrer plus"
      metaDescription="Une app Pomodoro pensée pour les freelances : sessions de deep work, suivi du temps prêt pour les clients, séries de focus et productivité sans distraction."
      h1="L’app Pomodoro pensée pour les freelances"
      intro="Être freelance, c’est la liberté… jusqu’au jour où votre temps disparaît entre les changements de contexte, les emails et 30 onglets ouverts. Pomodoro vous donne une structure sans tuer la flexibilité : des sprints de focus, des pauses claires, et une progression mesurable."
    >
      <section className="page-layout__section">
        <h2>Pourquoi c’est dur de rester focus en freelance</h2>
        <p><strong>Client, admin, marketing : tout est en concurrence</strong></p>
        <p>
          Une journée type mélange du deep work (design, écriture, code) et du travail “superficiel”
          (factures, messages, devis). Le problème n’est pas la motivation : c’est la fragmentation.
          Le timeboxing Pomodoro transforme le chaos en blocs que vous pouvez réellement terminer.
        </p>
        <ul className="page-layout__list">
          <li>Réduisez le changement de contexte avec des sessions de 25–45 minutes</li>
          <li>Protégez votre énergie avec des pauses planifiées</li>
          <li>Créez de l’élan avec séries, quêtes et récompenses</li>
        </ul>
      </section>

      <section className="page-layout__section">
        <h2>Pomodoro + suivi du temps (sans stress)</h2>
        <p><strong>Transformez vos sessions en preuves “facturables”</strong></p>
        <p>
          Au lieu de deviner le temps passé sur un projet, enregistrez votre travail sous forme de sessions Pomodoro.
          Avec le temps, vous obtenez des estimations réalistes, de meilleurs prix, et moins de burn-out.
        </p>
        <ul className="page-layout__list">
          <li>Suivez le temps de focus par client et par projet</li>
          <li>Visualisez les totaux hebdo et votre rythme de livraison</li>
          <li>Récaps faciles à exporter pour vos bilans</li>
        </ul>
      </section>

      <section className="page-layout__section">
        <h2>Mode deep work pour les créatifs (prochainement disponible)</h2>
        <p><strong>Une productivité sans distraction, qui reste calme</strong></p>
        <p>
          Le meilleur minuteur Pomodoro est “invisible” : un grand compte à rebours, une tâche, des contrôles simples.
          Pas de bruit, pas de clutter — juste du flow.
        </p>
        <ul className="page-layout__list">
          <li>Interface minimale, clarté maximale</li>
          <li>Notifications douces pour les pauses et fins de session</li>
          <li>Mode hors ligne quand vous voulez un environnement “propre”</li>
        </ul>
      </section>

      <section className="page-layout__section">
        <h2>Motivation gamifiée (vraiment utile)</h2>
        <p><strong>XP, succès, séries : une progression qu’on ressent</strong></p>
        <p>
          Les freelances n’ont pas de manager. La motivation doit venir de l’intérieur. La gamification
          ajoute une boucle de feedback stable : chaque Pomodoro terminé est une victoire, et les victoires s’empilent.
        </p>
        <ul className="page-layout__list">
          <li>Quêtes quotidiennes pour choisir vos priorités et éviter la procrastination</li>
          <li>Système de récompenses pour débloquer thèmes et outils avancés</li>
          <li>Statistiques pour comprendre vos heures les plus productives</li>
        </ul>

        <p style={{ marginTop: 24 }}>Articles qui pourraient vous intéresser :</p>
        <a href="/features/pomodoro-timer" style={{ color: '#7e4e4e' }}>
        → Méthode Pomodoro
        </a>
        <br/>
        <a href="/features/rewards-system" style={{ color: '#7e4e4e' }}>
        → Système de récompenses
        </a>
        <br/>
        <a href="/features/statistics" style={{ color: '#7e4e4e' }}>
        → Statistiques dans l'application
        </a>
      </section>

      <CTASection />
    </PageLayout>
  );
}
