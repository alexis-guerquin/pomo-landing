/**
 * Configuration des features pour Pomocha
 * Permet de facilement modifier le contenu sans toucher au code
 */

export interface FeatureItem {
  name: string;
  icon?: string;
  description: string;
}

export interface Feature {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: FeatureItem[];
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  icon: string;
  image?: string;
}

export const FEATURES_CONFIG: Feature[] = [
  {
    id: 'concept',
    title: 'Concept',
    shortDescription: 'Organisez votre travail avec la méthode Pomodoro.\nAdaptez vos séances de productivité en restant concentré tout du long grâce à ce système.',
    fullDescription: 'La méthode Pomodoro consiste à diviser votre travail en sessions de 25 minutes entrecoupées de courtes pauses. Cette technique est efficace car elle favorise une concentration intense tout en prévenant la fatigue mentale.',
    features: [
      {
        name: 'Timer Pomodoro intelligent',
        icon: '/visuals/timer.png',
        description: 'Lancez un timer personnalisable avec suivi du temps de la journée'
      },
      {
        name: 'Gestion de projets',
        icon: '/visuals/topprojects.png',
        description: 'Organisez vos projets et reliez vos tâches pour un suivi optimal'
      },
      {
        name: 'Liste de tâches',
        icon: '',
        description: 'Créez et gérez vos todos liés à vos différents projets'
      }
    ],
    position: 'top-left',
    icon: '🎯',
    image: '/icons/timer.png'
  },
  {
    id: 'rewards',
    title: 'Récompenses',
    shortDescription: 'Utilisez ce système gamifié pour vous pousser à aller plus loin.\nGagnez des badges et trophées pour rester motivé.\nBattez vos propres records personnels.',
    fullDescription: 'Un système de gamification complet qui vous récompense à chaque étape. Débloquez des badges, complétez des missions quotidiennes et collectionnez des trophées pour célébrer vos accomplissements.',
    features: [
      {
        name: 'Missions Quotidiennes',
        icon: '/visuals/dailymissions.png',
        description: 'Complétez des objectifs journaliers pour maintenir votre motivation'
      },
      {
        name: 'Avancée dans les trophées',
        icon: '/visuals/trophies.png',
        description: 'Progressez à travers différents niveaux de trophées'
      },
      {
        name: 'Badges',
        icon: '/visuals/badges.png',
        description: 'Débloquez des badges en accomplissant des défis spécifiques'
      },
      {
        name: 'Badges Cachés',
        icon: '',
        description: 'Découvrez des badges secrets en fonction des événements tout au long de l\'année'
      },
      {
        name: 'Rapports mensuels et annuels',
        icon: '',
        description: 'Recevez des récapitulatifs détaillés de vos performances'
      }
    ],
    position: 'top-right',
    icon: '🏆',
    image: '/icons/target.svg'
  },
  {
    id: 'statistics',
    title: 'Statistiques',
    shortDescription: 'Suivez votre progression avec des analytics détaillés.\nDécoupez facilement vos sessions par projets, pour un usage professionnel ou personnel.',
    fullDescription: 'Visualisez votre productivité avec des statistiques complètes et des graphiques intuitifs. Analysez vos habitudes, identifiez vos pics de concentration et optimisez votre efficacité.',
    features: [
      {
        name: 'Statistiques de temps de travail',
        icon: '/visuals/graph.png',
        description: 'Analysez vos heures de travail avec des graphiques détaillés'
      },
      {
        name: 'Statistiques par projets',
        icon: '/visuals/topprojects.png',
        description: 'Suivez le temps passé sur chaque projet pour un usage plus professionnel'
      },
      {
        name: 'Visualisation de la progression',
        icon: '/visuals/grid.png',
        description: 'Consultez votre évolution au fil du temps avec des graphiques interactifs'
      }
    ],
    position: 'bottom-left',
    icon: '📊',
    image: '/icons/stats.svg'
  },
  {
    id: 'social',
    title: 'Social & Compétition',
    shortDescription: 'Rejoignez la communauté et défiez vos amis (et explosez leurs records).',
    fullDescription: 'Restez motivé en rejoignant une communauté active. Comparez vos performances avec vos amis, participez à des défis collectifs et gravissez les classements.',
    features: [
      {
        name: 'Battez vos records personnels',
        icon: '',
        description: 'Dépassez-vous en surpassant vos propres performances'
      },
      {
        name: 'Défiez vos amis',
        icon: '',
        description: 'Prochainement : comparez vos performances avec vos amis'
      },
      {
        name: 'Enjeux compétitifs',
        icon: '',
        description: 'D\'autres enjeux compétitifs vont être intégrés prochainement'
      }
    ],
    position: 'bottom-right',
    icon: '👥',
    image: '/icons/grind.svg'
  }
];