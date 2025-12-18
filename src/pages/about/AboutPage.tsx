import { CTASection } from '../../components/CTASection';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';

export default function AboutPage() {
  return (
    <PageLayout
      htmlTitle="À propos de Pomocha – Un Pomodoro simple pour le deep work"
      metaDescription="Découvrez pourquoi nous avons créé Pomocha : un minuteur Pomodoro minimaliste avec motivation & récompenses, et des statistiques de focus — pensé pour une productivité sans distraction."
      h1="À propos de Pomocha"
      intro="Nous pensons que la concentration doit rester simple. Pomocha est une app Pomodoro conçue pour vous aider à faire du deep work, construire des habitudes, et voir votre progression — sans surcharge."
    >
      <section className="page-layout__section">
        <h2>Notre philosophie</h2>
        <p><strong>Design minimal, résultats maximum</strong></p>
        <p>
          Les outils de productivité finissent souvent par devenir des distractions. On a construit
          Pomocha autour d’un principe : pendant que vous travaillez, le minuteur doit “s’effacer”.
          Tout existe pour soutenir votre attention, pas pour la voler.
        </p>
      </section>

      <section className="page-layout__section">
        <h2>Ce qu’on construit</h2>
        <p>
          Pomocha combine un minuteur Pomodoro propre avec des mécaniques qui renforcent la
          régularité :
        </p>
        <ul className="page-layout__list">
          <li>Sessions Pomodoro avec intervalles flexibles (focus + pauses)</li>
          <li>Motivation &amp; récompenses (quêtes, XP, niveaux, succès)</li>
          <li>Récompenses à débloquer avec votre temps de focus</li>
          <li>Statistiques de focus pour visualiser habitudes et progression</li>
        </ul>
      </section>

      <section className="page-layout__section">
        <h2>Pour qui ?</h2>
        <p>
          Étudiants, freelances, créateurs… et toute personne qui veut un workflow sans distraction.
          Si vous avez déjà “essayé la discipline” sans que ça tienne, le problème n’est pas vous :
          c’est le système.
        </p>
      </section>

      <section className="page-layout__section">
      <p style={{ marginTop: 24 }}>Articles qui pourraient vous intéresser :</p>
        <a href="/use-cases/students" style={{ color: '#7e4e4e' }}>
        → Utiliser Pomocha en tant qu'étudiant
        </a>
        <br/>
        <a href="/features/freelancers" style={{ color: '#7e4e4e' }}>
        → Utiliser Pomocha en tant que freelancer
        </a>
        <br/>
        <a href="/features/pomodoro-timer" style={{ color: '#7e4e4e' }}>
        → Comment utiliser Pomocha
        </a>
        <br/>
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
