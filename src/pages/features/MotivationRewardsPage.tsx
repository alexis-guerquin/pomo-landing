import { CTASection } from '../../components/CTASection';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import './MotivationRewardsPage.css';

export default function MotivationRewardsPage() {
  return (
    <PageLayout
      htmlTitle="Motivation & Récompenses – Quêtes, trophées et badges"
      metaDescription="Transformez vos sessions Pomodoro en progression : missions quotidiennes, trophées avec paliers, badges communs et événementiels. La régularité est la clé de la réussite."
      h1="Motivation & Récompenses : restez constant, sans forcer"
      intro="La partie la plus difficile, ce n'est pas de travailler : c'est d'y revenir tous les jours. Pomocha transforme la concentration en progression concrète grâce à trois piliers : des missions quotidiennes, un système de trophées avec paliers, et des badges qui récompensent votre régularité."
    >
      <section className="page-layout__section">
        <h2>1) Missions quotidiennes</h2>
        <p><strong>Un plan simple, chaque matin</strong></p>
        <p>
          Chaque jour, vous recevez 4 missions adaptées à votre rythme. Objectif : vous aider à
          démarrer, garder l'élan, et terminer la journée avec une vraie sensation d'avancement.
        </p>
        <p style={{ marginTop: 16, fontStyle: 'italic', color: '#666' }}>
          <strong>N'oubliez pas :</strong> la régularité est la clé de la réussite.
        </p>

        <ul className="page-layout__list">
          <li><strong>Mission 1 : Se connecter</strong> — Connectez-vous à l'application pour démarrer votre journée</li>
          <li><strong>Récompense :</strong> +50 XP, 25 pièces</li>
        </ul>
        <ul className="page-layout__list">
          <li><strong>Mission 2 : Lancer un pomodoro</strong> — Démarrez votre première session de travail</li>
          <li><strong>Récompense :</strong> +100 XP, 50 pièces</li>
        </ul>
        <ul className="page-layout__list">
          <li><strong>Mission 3 : Lancer un deuxième pomodoro</strong> — Continuez votre élan de productivité</li>
          <li><strong>Récompense :</strong> +150 XP, 75 pièces</li>
        </ul>
        <ul className="page-layout__list">
          <li><strong>Mission 4 : Cocher une tâche</strong> — Terminez une tâche de votre liste</li>
          <li><strong>Récompense :</strong> +200 XP, 100 pièces</li>
        </ul>

        <div className="motivation-visual">
          <img 
            src="/visuals/dailymissions.png" 
            alt="Interface des missions quotidiennes avec progression et récompenses"
            className="motivation-visual__image"
          />
        </div>
      </section>

      <section className="page-layout__section">
        <h2>2) Système de trophées</h2>
        <p><strong>Des indicateurs concrets sur votre travail</strong></p>
        <p>
          Chaque trophée correspond à une action spécifique et possède plusieurs paliers, 
          de plus en plus difficiles à atteindre. Ils donnent un vrai indicateur sur votre travail 
          et votre progression au fil du temps.
        </p>

        <p style={{ marginTop: 16 }}><strong>Types de trophées</strong></p>
        <ul className="page-layout__list">
          <li><strong>Todos accomplis</strong> — Nombre de tâches complétées (paliers : 10, 50, 100, 500, 1000)</li>
          <li><strong>Temps de travail</strong> — Heures cumulées de focus (paliers : 10h, 50h, 100h, 500h, 1000h)</li>
          <li><strong>Nombre de pomodoros</strong> — Sessions complétées (paliers : 25, 100, 500, 1000, 5000)</li>
          <li><strong>Nombre de jours de travail</strong> — Régularité et assiduité (paliers : 7, 30, 100, 365 jours)</li>
        </ul>

        <p style={{ marginTop: 16 }}>
          Chaque palier débloqué vous rapporte des récompenses supplémentaires et vous montre 
          clairement votre progression. Plus vous avancez, plus les paliers deviennent exigeants, 
          mais ils reflètent fidèlement votre engagement et votre régularité.
        </p>

        <div className="motivation-visual">
          <img 
            src="/visuals/trophies.png" 
            alt="Système de trophées avec différents types et paliers"
            className="motivation-visual__image"
          />
        </div>
      </section>

      <section className="page-layout__section">
        <h2>3) Système de badges</h2>
        <p><strong>Des récompenses qui surprennent et motivent</strong></p>
        <p>
          Vous recevrez des badges selon votre travail et votre régularité. Il existe deux 
          catégories de badges pour varier les plaisirs et maintenir votre motivation.
        </p>

        <p style={{ marginTop: 16 }}><strong>Badges communs (fixes)</strong></p>
        <p>
          Ces badges sont toujours disponibles et récompensent des actions régulières. 
          Ils sont fixes dans le système et vous pouvez les débloquer à tout moment en 
          accomplissant les objectifs correspondants.
        </p>
        <ul className="page-layout__list">
          <li><strong>"Rush du Matin"</strong> — Démarrez votre première session avant 8h</li>
          <li><strong>"Café de Midi"</strong> — Complétez un pomodoro entre 12h et 14h</li>
          <li><strong>"Barista du Jour"</strong> — Terminez 5 pomodoros en une journée</li>
          <li>Et bien d'autres à découvrir...</li>
        </ul>

        <p style={{ marginTop: 16 }}><strong>Badges événementiels</strong></p>
        <p>
          Ces badges arrivent tout au long de l'année pour vous surprendre et récompenser 
          votre régularité ! Ils sont limités dans le temps et créent des moments spéciaux 
          qui renforcent votre motivation.
        </p>
        <ul className="page-layout__list">
          <li>Badges saisonniers (été, automne, hiver, printemps)</li>
          <li>Badges d'événements spéciaux (anniversaires, challenges communautaires)</li>
          <li>Badges de régularité surprise (débloqués après X jours consécutifs)</li>
          <li>Badges collaboratifs (partagés avec d'autres utilisateurs actifs)</li>
        </ul>

        <p style={{ marginTop: 16 }}><strong>Indicateur de rareté</strong></p>
        <p>
          Chaque badge débloqué affiche un indicateur important : <strong>le pourcentage d'utilisateurs 
          ayant débloqué ce badge</strong>. Cet indicateur vous permet de :
        </p>
        <ul className="page-layout__list">
          <li>Voir votre progression par rapport à la communauté</li>
          <li>Mesurer la rareté de vos accomplissements</li>
          <li>Vous motiver à débloquer des badges moins communs</li>
          <li>Comprendre la difficulté relative de chaque badge</li>
        </ul>
        <p>
          Par exemple, un badge obtenu par 100% des utilisateurs est accessible à tous, tandis 
          qu'un badge obtenu par seulement 5% des utilisateurs représente un accomplissement rare 
          et valorisant. La date d'obtention est également affichée pour chaque badge débloqué.
        </p>

        <div className="motivation-visual">
          <img 
            src="/visuals/badges.png" 
            alt="Système de badges communs et événementiels avec exemples de badges débloqués"
            className="motivation-visual__image"
          />
        </div>
      </section>

      <section className="page-layout__section">
        <h2>La régularité, votre meilleur allié</h2>
        <p><strong>Constance et progression</strong></p>
        <p>
          Que ce soit à travers les missions quotidiennes, les paliers de trophées ou les badges 
          événementiels, Pomocha met l'accent sur la régularité. C'est en revenant chaque jour 
          que vous construisez des habitudes durables et que vous voyez les résultats s'accumuler.
        </p>
        <p>
          Les systèmes de récompenses sont conçus pour vous encourager sans créer de pression. 
          Chaque petit pas compte, et chaque jour est une nouvelle opportunité de progresser.
        </p>
      </section>

      <CTASection />
    </PageLayout>
  );
}
