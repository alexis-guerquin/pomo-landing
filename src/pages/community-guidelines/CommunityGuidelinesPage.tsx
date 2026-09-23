import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import { useI18n } from '../../contexts/I18nContext';

export default function CommunityGuidelinesPage() {
  const { locale } = useI18n();
  const fr = locale === 'fr';
  const copy = fr ? {
    title: 'Règles de la communauté POCHA',
    description: 'Règles de sécurité, signalement et modération de la communauté POCHA.',
    intro: 'Dernière mise à jour : 23 septembre 2026. Vous devez accepter ces règles avant de publier une réussite dans l’espace social.',
    sections: [
      ['Un espace positif', 'POCHA permet de partager uniquement des réussites prédéfinies par l’application, comme un badge, une série ou un record de concentration. Respectez les autres membres et encouragez leurs progrès.'],
      ['Contenus et comportements interdits', 'Sont interdits : harcèlement, intimidation, haine, discrimination, menaces, contenu sexuel ou violent, usurpation d’identité, fraude, spam, contournement d’un blocage, exploitation de mineurs et toute activité illégale.'],
      ['Protéger vos informations', 'Ne partagez jamais de mot de passe, donnée bancaire ou autre information sensible. Les profils et réussites visibles peuvent révéler votre nom ou pseudonyme, votre identifiant et certaines statistiques de progression.'],
      ['Signaler', 'Depuis le menu ⋮ d’une publication ou d’un profil, choisissez Signaler. Le signalement est transmis à l’équipe POCHA pour examen. En cas de danger immédiat, contactez les services d’urgence compétents.'],
      ['Bloquer', 'Vous pouvez bloquer un membre depuis son profil ou une publication. Vos profils, publications, relations et notifications ne seront alors plus visibles l’un pour l’autre.'],
      ['Modération', 'Nous pouvons masquer ou supprimer un contenu, limiter une fonction sociale, suspendre ou fermer un compte qui enfreint ces règles. La gravité, la répétition et le contexte sont pris en compte.'],
      ['Contestation et contact', 'Pour contester une décision ou poser une question, écrivez à team@pomocha.fr en indiquant l’adresse de votre compte et les éléments utiles.'],
    ],
  } : {
    title: 'POCHA Community Guidelines',
    description: 'Safety, reporting, and moderation rules for the POCHA community.',
    intro: 'Last updated: September 23, 2026. You must accept these rules before publishing an achievement to the social space.',
    sections: [
      ['A positive space', 'POCHA only lets people share achievements predefined by the app, such as a badge, streak, or focus record. Respect other members and encourage their progress.'],
      ['Prohibited content and conduct', 'Harassment, bullying, hate, discrimination, threats, sexual or violent content, impersonation, fraud, spam, bypassing a block, child exploitation, and illegal activity are prohibited.'],
      ['Protect your information', 'Never share passwords, payment details, or other sensitive information. Visible profiles and achievements may reveal your name or nickname, identifier, and selected progress statistics.'],
      ['Report', 'From the ⋮ menu on a post or profile, choose Report. Reports are sent to the POCHA team for review. If there is immediate danger, contact the appropriate emergency services.'],
      ['Block', 'You can block a member from their profile or a post. Your profiles, posts, connections, and notifications will no longer be visible to one another.'],
      ['Moderation', 'We may hide or remove content, restrict social features, suspend, or close an account that breaks these rules. We consider severity, repetition, and context.'],
      ['Appeals and contact', 'To appeal a decision or ask a question, email team@pomocha.fr with your account email and relevant details.'],
    ],
  };
  return <PageLayout htmlTitle={copy.title} metaDescription={copy.description} h1={copy.title} intro={copy.intro}>
    {copy.sections.map(([title, body]) => <section className="page-layout__section" key={title}><h2>{title}</h2><p>{body}</p></section>)}
  </PageLayout>;
}
