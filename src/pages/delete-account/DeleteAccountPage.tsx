import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import { useI18n } from '../../contexts/I18nContext';

const supportEmail = 'team@pomocha.fr';

export default function DeleteAccountPage() {
  const { locale } = useI18n();
  const isFrench = locale === 'fr';
  const mailto = isFrench
    ? `mailto:${supportEmail}?subject=${encodeURIComponent('Demande de suppression de compte Pomocha')}&body=${encodeURIComponent('Bonjour,\n\nJe souhaite demander la suppression de mon compte Pomocha et des données associées.\n\nAdresse e-mail du compte :\n\nMerci.')}`
    : `mailto:${supportEmail}?subject=${encodeURIComponent('Pomocha account deletion request')}&body=${encodeURIComponent('Hello,\n\nI would like to request deletion of my Pomocha account and associated data.\n\nAccount email address:\n\nThank you.')}`;

  const copy = isFrench
    ? {
        title: 'Supprimer votre compte Pomocha',
        description: 'Demandez la suppression de votre compte Pomocha et des données associées.',
        intro: 'Vous pouvez demander la suppression de votre compte Pomocha, même si vous n’avez plus accès à l’application.',
        howTitle: 'Faire une demande',
        how: 'Envoyez-nous un e-mail depuis l’adresse liée à votre compte, ou indiquez cette adresse dans votre message. Nous pourrons vous demander une vérification raisonnable de votre identité avant de traiter la demande.',
        action: 'Demander la suppression par e-mail',
        dataTitle: 'Données concernées',
        data: 'La suppression retire les données directement associées à votre compte, notamment votre profil, vos projets, sessions, statistiques, réglages, progression, portefeuille de récompenses, publications, réactions, notifications, relations, signalements et blocages. Des agrégats anonymes qui ne permettent plus de vous identifier peuvent subsister. Certaines informations strictement nécessaires peuvent être conservées lorsque la loi l’impose ou pour prévenir la fraude et les abus.',
        subscriptionTitle: 'Abonnement Google Play',
        subscription: 'La suppression du compte ne résilie pas automatiquement un abonnement Google Play. Si vous avez un abonnement actif, annulez-le dans Google Play avant ou après votre demande afin d’éviter tout renouvellement.',
        appTitle: 'Depuis l’application',
        app: 'Vous pouvez aussi supprimer votre compte directement dans POCHA : Réglages → Compte → Supprimer mon compte.',
        contactTitle: 'Besoin d’aide ?',
        contact: 'Pour toute question sur vos données personnelles ou votre demande, écrivez à',
      }
    : {
        title: 'Delete your Pomocha account',
        description: 'Request deletion of your Pomocha account and associated data.',
        intro: 'You can request deletion of your Pomocha account even if you no longer have access to the app.',
        howTitle: 'Make a request',
        how: 'Email us from the address associated with your account, or include that address in your message. We may ask for reasonable identity verification before processing the request.',
        action: 'Request deletion by email',
        dataTitle: 'Data covered',
        data: 'Deletion removes data directly associated with your account, including your profile, projects, sessions, statistics, settings, progress, reward wallet, posts, reactions, notifications, connections, reports, and blocks. Anonymous aggregates that can no longer identify you may remain. Strictly necessary information may be retained where required by law or to prevent fraud and abuse.',
        subscriptionTitle: 'Google Play subscription',
        subscription: 'Deleting your account does not automatically cancel a Google Play subscription. If you have an active subscription, cancel it in Google Play before or after your request to avoid renewal.',
        appTitle: 'From the app',
        app: 'You can also delete your account directly in POCHA: Settings → Account → Delete my account.',
        contactTitle: 'Need help?',
        contact: 'For questions about your personal data or request, email',
      };

  return (
    <PageLayout
      htmlTitle={copy.title}
      metaDescription={copy.description}
      h1={copy.title}
      intro={copy.intro}
    >
      <section className="page-layout__section">
        <h2>{copy.howTitle}</h2>
        <p>{copy.how}</p>
        <p style={{ marginTop: 20 }}>
          <a className="delete-account__action" href={mailto}>{copy.action}</a>
        </p>
      </section>

      <section className="page-layout__section">
        <h2>{copy.dataTitle}</h2>
        <p>{copy.data}</p>
      </section>

      <section className="page-layout__section">
        <h2>{copy.subscriptionTitle}</h2>
        <p>{copy.subscription}</p>
      </section>

      <section className="page-layout__section">
        <h2>{copy.appTitle}</h2>
        <p>{copy.app}</p>
      </section>

      <section className="page-layout__section">
        <h2>{copy.contactTitle}</h2>
        <p>{copy.contact} <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.</p>
      </section>
    </PageLayout>
  );
}
