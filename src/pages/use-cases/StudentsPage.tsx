import { CTASection } from '../../components/CTASection';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';

export default function StudentsPage() {
  return (
    <PageLayout
      htmlTitle="App Pomodoro pour étudiants – Étudier mieux, pas plus dur"
      metaDescription="Une app Pomodoro gamifiée pensée pour les étudiants. Construisez des séries d’étude, complétez des quêtes quotidiennes et rendez la préparation aux exams vraiment motivante."
      h1="L’app d’étude qui vous donne envie de réviser"
      intro="Soyons honnêtes : réviser, c’est difficile. Entre les réseaux sociaux, Netflix et les messages, rester concentré paraît impossible. Les apps d’étude classiques sont ennuyeuses. Et la discipline ne tient qu’un temps."
    >
      <section className="page-layout__section">
        <p>
          Et si réviser ressemblait plus à un jeu ? Chaque chapitre terminé vous fait monter de niveau,
          chaque session débloque des récompenses, et chaque série vous rend plus fort.
        </p>
        <p>C’est exactement ce qu’on a construit pour des étudiants comme vous.</p>
      </section>

      <section className="page-layout__section">
        <h2>Le défi de concentration des étudiants</h2>
        <p><strong>Pourquoi les révisions “classiques” échouent</strong></p>
        <p>Vous vous installez pour réviser. Vous ouvrez votre cours. Puis :</p>
        <ul className="page-layout__list">
          <li>Votre téléphone vibre (notification Instagram)</li>
          <li>Vous “regardez vite fait” un truc sur YouTube</li>
          <li>30 minutes ont passé… et vous n’avez rien fait</li>
        </ul>
        <p>
          Ça vous parle ? Vous n’êtes pas paresseux. Votre cerveau est câblé pour des récompenses immédiates —
          et un polycopié n’en donne pas.
        </p>

        <p style={{ marginTop: 16 }}><strong>Quelques chiffres</strong></p>
        <ul className="page-layout__list">
          <li>Attention moyenne : 8–12 minutes (avant distraction)</li>
          <li>Temps “perdu” par session : 35–40 minutes</li>
          <li>Étudiants qui abandonnent un planning : 78 %</li>
        </ul>
        <p>Vous avez besoin d’un système qui marche avec votre cerveau, pas contre lui.</p>
      </section>

      <section className="page-layout__section">
        <h2>Comment un Pomodoro gamifié transforme les révisions</h2>

        <p><strong>1) Des blocs courts = du focus profond</strong></p>
        <p>
          Au lieu du flou “réviser 3 heures”, vous vous concentrez 25 minutes à la fois.
          Ce n’est pas intimidant. On peut tout faire pendant 25 minutes.
        </p>
        <p>
          Après chaque session, vous avez une pause de 5 minutes sans culpabilité. Téléphone, snack, étirements.
          Puis vous repartez frais pour le tour suivant.
        </p>

        <p style={{ marginTop: 16 }}><strong>2) Du feedback immédiat</strong></p>
        <p>Chaque Pomodoro d’étude terminé :</p>
        <ul className="page-layout__list">
          <li>Vous rapporte de l'XP</li>
          <li>Ajoute à votre progression du jour</li>
          <li>Construit votre série d’étude</li>
          <li>Débloque des succès</li>
        </ul>
        <p>
          Votre cerveau obtient la petite dose de dopamine qu’il cherche… mais grâce aux révisions, pas au scroll.
        </p>
        <p style={{ marginTop: 24 }}>Articles qui pourraient vous intéresser :</p>
        <a href="/features/pomodoro-timer" style={{ color: '#7e4e4e' }}>
        →  Méthode Pomodoro
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
