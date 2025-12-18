import { CTASection } from '../../components/CTASection';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import './FocusStatisticsPage.css';

export default function FocusStatisticsPage() {
  return (
    <PageLayout
      htmlTitle="Statistiques de focus – Visualisez votre progression"
      metaDescription="Des graphiques et des insights pour comprendre vos habitudes : heures productives, séries, progression et tendances. Une productivité pilotée par les données."
      h1="Voyez votre focus, comprenez vos habitudes"
      intro="On n'améliore pas ce qu'on ne mesure pas. Le tableau de bord transforme vos sessions Pomodoro en informations actionnables : clair, lisible, et réellement utile au quotidien."
    >
      <section className="page-layout__section">
        <h2>Résumé semaine par semaine</h2>
        <p>
          <strong>Suivez votre temps avec précision</strong>
        </p>
        <p>
          Visualisez votre activité semaine par semaine avec un découpage détaillé par projet. 
          Ces statistiques vous permettent de tracker votre temps et vos progressions de manière 
          claire et efficace. Utilisez-les pour optimiser votre productivité et mieux comprendre 
          vos habitudes de travail.
        </p>
        <p>
          <strong>Idéal pour facturer vos clients</strong> si vous utilisez POMOCHA pour du travail 
          professionnel. Chaque projet est clairement identifié avec son temps de travail associé, 
          facilitant la création de factures précises et transparentes.
        </p>
        <div className="statistics-visual">
          <img 
            src="/visuals/graph.png" 
            alt="Graphique de temps de travail par projet et par jour de semaine"
            className="statistics-visual__image"
          />
        </div>
      </section>

      <section className="page-layout__section">
        <h2>Top Projets</h2>
        <p>
          <strong>Votre avancée projet par projet</strong>
        </p>
        <p>
          La section Top Projets vous donne une vue d'ensemble du temps passé à travailler sur 
          chacun de vos projets. Visualisez rapidement quels projets occupent le plus de votre 
          temps et suivez votre progression au fil des semaines.
        </p>
        <p>
          Choisissez la durée qui vous convient : 7 derniers jours, 30 derniers jours, ou toute 
          autre période. Cette flexibilité vous permet d'analyser vos tendances à court et long 
          terme, et d'identifier les projets qui méritent plus d'attention.
        </p>
        <div className="statistics-visual">
          <img 
            src="/visuals/topprojects.png" 
            alt="Classement des projets par temps de travail"
            className="statistics-visual__image"
          />
        </div>
      </section>

      <section className="page-layout__section">
        <h2>Les Recaps : récompensez votre travail</h2>
        <p>
          <strong>Une des fonctionnalités majeures de POMOCHA</strong>
        </p>
        <p>
          Recevez automatiquement un récapitulatif de votre activité pour vous récompenser du temps 
          passé à travailler aux côtés de POMOCHA. Ces rapports sont disponibles en plusieurs formats :
        </p>
        <ul className="page-layout__list">
          <li><strong>Récapitulatifs hebdomadaires</strong> : un résumé de votre semaine de travail</li>
          <li><strong>Récapitulatifs mensuels</strong> : un bilan complet de votre mois</li>
          <li><strong>Récapitulatifs annuels</strong> : une vue d'ensemble de votre année</li>
        </ul>
        <p>
          Chaque récapitulatif contient plusieurs données essentielles :
        </p>
        <ul className="page-layout__list">
          <li>Votre <strong>temps total</strong> de travail</li>
          <li>Votre <strong>meilleur projet</strong> de la période</li>
          <li>Votre <strong>évolution par rapport au dernier rapport</strong> pour suivre votre progression</li>
          <li>Et bien d'autres métriques pour célébrer vos accomplissements</li>
        </ul>
        <p>
          <strong>Accédez à votre historique complet</strong> : tous vos rapports sont archivés et 
          accessibles dans la page Profil → Recaps. Consultez vos anciens récapitulatifs à tout moment 
          pour voir votre évolution sur le long terme.
        </p>
        <p>
          <em>Note : Les rapports hebdomadaires et mensuels sont inclus dans l'abonnement payant. 
          Consultez la page abonnement pour plus de détails.</em>
        </p>
        <div className="statistics-visual">
          <img 
            src="/visuals/recaps.png" 
            alt="Exemple de récapitulatif hebdomadaire POMOCHA"
            className="statistics-visual__image"
          />
        </div>
      </section>

      <CTASection />
    </PageLayout>
  );
}
