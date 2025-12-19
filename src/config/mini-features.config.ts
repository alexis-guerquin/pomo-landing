/**
 * Configuration des mini-features pour Pomocha
 * Exemples de données pour démontrer les différents layouts
 */

import type { MiniFeatureData } from '../components/MiniFeature';

export const MINI_FEATURES_CONFIG: MiniFeatureData[] = [
  {
    id: 'mini-concept',
    title: 'Concept',
    description: 'Organisez votre travail avec la méthode Pomodoro. Adaptez vos séances de productivité en restant concentré tout du long grâce à ce système.',
    visual: '/visuals/concept.png',
    visualAlt: 'Interface du timer Pomodoro',
    features: [
      'Timer Pomodoro personnalisable avec sessions de travail et pauses',
      'Gestion de projets pour organiser vos tâches',
      'Liste de tâches intégrée pour suivre vos objectifs',
      'Suivi du temps en temps réel'
    ],
    cta: {
      text: "Découvrir l'app",
      link: '#'
    },
    moreInfoLink: '/features/pomodoro-timer'
  },
  {
    id: 'mini-rewards',
    title: 'Récompenses',
    description: 'Utilisez ce système gamifié pour vous pousser à aller plus loin. Gagnez des badges et trophées pour rester motivé.',
    visual: '/visuals/rec.png',
    visualAlt: 'Badges et récompenses',
    features: [
      'Missions quotidiennes pour maintenir votre motivation',
      'Badges à débloquer en accomplissant des défis',
      'Trophées pour célébrer vos accomplissements',
      'Badges cachés tout au long de l\'année'
    ],
    cta: {
      text: 'Tester Pomocha',
      link: '#rewards'
    },
    moreInfoLink: '/features/rewards-system'
  },
  {
    id: 'mini-stats',
    title: 'Statistiques',
    description: 'Suivez votre progression avec des analytics détaillés. Découpez facilement vos sessions par projets, pour un usage professionnel ou personnel.',
    visual: '/visuals/stats.png',
    visualAlt: 'Graphiques de statistiques',
    features: [
      'Graphiques détaillés de votre temps de travail',
      'Statistiques par projets pour un usage professionnel',
      'Visualisation de la progression au fil du temps',
      'Rapports mensuels et annuels'
    ],
    cta: {
      text: 'Tester Pomocha',
      link: '#stats'
    },
    moreInfoLink: '/features/statistics'
  },
  {
    id: 'mini-more',
    title: 'Bien plus',
    description: 'Découvrez encore plus de fonctionnalités pour optimiser votre productivité au quotidien.',
    visual: '',
    visualAlt: '',
    features: [
      'Écran de fin de session avec récapitulatif détaillé',
      'Suggestions de pauses personnalisées',
      'Historique complet de vos sessions',
      'Et bien d\'autres fonctionnalités à découvrir'
    ],
    cta: {
      text: "Tester Pomocha",
      link: '#download'
    }
  }
];

