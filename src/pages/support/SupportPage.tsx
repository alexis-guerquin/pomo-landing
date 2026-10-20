import { Link } from 'react-router-dom';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import { useI18n } from '../../contexts/I18nContext';
import './SupportPage.css';

export default function SupportPage() {
  const { locale } = useI18n();
  const fr = locale === 'fr';
  const copy = fr ? {
    title: 'Aide et support — Pocha sur Mac',
    intro: 'Une question sur Pocha ? Retrouvez les réponses pour votre compte, vos sessions et votre abonnement, ou contactez directement notre équipe.',
    contact: 'Contacter le support',
    details: 'Indiquez la version de Pocha, votre version de macOS et les étapes du problème. Vous pouvez joindre une capture sans information sensible. Ne transmettez jamais votre mot de passe.',
    response: 'Nous faisons de notre mieux pour répondre sous 48 h à team@pomocha.fr.',
    faqs: [
      ['Comment commencer une session sur Mac ?', 'Ouvrez Pocha depuis la barre des menus ou la fenêtre de l’app. Choisissez votre durée et votre projet, puis commencez votre session. Le minuteur reste accessible dans l’encoche pendant votre travail.'],
      ['Mon Mac n’a pas d’encoche. Puis-je utiliser Pocha ?', 'Oui. La fenêtre complète de Pocha et son accès dans la barre des menus permettent de lancer et suivre vos sessions. Le panneau de session se place en haut de l’écran.'],
      ['Comment réduire ou désactiver Pocha Notch ?', 'Dans Réglages, désactivez « Pocha Notch » pour masquer le panneau. Activez « Notch compact » pour garder le minuteur dans la zone de l’encoche et n’agrandir le panneau qu’à la demande ou en fin de session.'],
      ['Je ne reçois pas les notifications de fin de session.', 'Vérifiez les autorisations de Pocha dans Réglages Système → Notifications. Un mode de concentration macOS peut aussi masquer les alertes.'],
      ['La connexion avec Apple ou Google ne fonctionne pas.', 'Vérifiez votre connexion Internet et terminez la connexion dans la fenêtre Apple ou Google qui s’ouvre. Si le problème persiste, envoyez-nous le message d’erreur et votre version de Pocha. Ne nous envoyez aucun code de connexion.'],
      ['Comment retrouver mes progrès ?', 'Connectez-vous avec le même compte Pocha. Vos sessions, projets et progrès liés à ce compte se synchronisent lorsque vous êtes connecté à Internet.'],
      ['Où restaurer un achat Premium ?', 'Ouvrez l’écran Premium depuis les réglages, puis choisissez « Restaurer les achats ». Utilisez le compte Apple ayant effectué l’achat. Si l’accès manque toujours, contactez-nous avec la référence de commande, sans donnée bancaire.'],
      ['Comment gérer ou résilier un abonnement ?', 'Pour un achat App Store, utilisez les réglages d’abonnement de votre compte Apple. Pour un achat Google Play, utilisez Google Play. Désinstaller Pocha ou supprimer votre compte ne résilie pas votre abonnement.'],
      ['Comment supprimer mon compte et mes données ?', 'Dans Pocha, ouvrez Réglages → Compte → Supprimer mon compte. Si vous n’avez plus accès à l’app, la page de suppression ci-dessous vous permet de nous envoyer une demande.'],
    ],
    account: 'Compte et données', privacy: 'Confidentialité', terms: 'Conditions d’utilisation', deletion: 'Supprimer mon compte', subscriptions: 'Gérer mes abonnements Apple', faq: 'Questions fréquentes',
  } : {
    title: 'Help and support — Pocha for Mac',
    intro: 'Need help with Pocha? Find answers about your account, sessions and subscription, or contact our team directly.',
    contact: 'Contact support',
    details: 'Include your Pocha version, macOS version and steps to reproduce the issue. You can attach a screenshot without sensitive information. Never share your password.',
    response: 'We do our best to reply within 48 hours at team@pomocha.fr.',
    faqs: [
      ['How do I start a session on Mac?', 'Open Pocha from the menu bar or app window. Choose your duration and project, then start your session. The timer stays accessible in the notch while you work.'],
      ['Can I use Pocha on a Mac without a notch?', 'Yes. Use the full Pocha window and menu bar access to start and track sessions. The session panel appears at the top of the display.'],
      ['How do I shrink or disable Pocha Notch?', 'In Settings, turn off “Pocha Notch” to hide the panel. Enable “Compact notch” to keep the timer in the notch area and expand the panel only on demand or when a session ends.'],
      ['I am not receiving session notifications.', 'Check Pocha permissions in System Settings → Notifications. A macOS Focus mode may also hide alerts.'],
      ['Sign in with Apple or Google is not working.', 'Check your Internet connection and finish signing in in the Apple or Google window. If the issue persists, send us the error message and Pocha version. Do not share any sign-in codes.'],
      ['How do I recover my progress?', 'Sign in with the same Pocha account. Sessions, projects and progress associated with that account sync when you are connected to the Internet.'],
      ['How do I restore a Premium purchase?', 'Open the Premium screen from Settings and choose “Restore purchases”. Use the Apple account that made the purchase. If access is still missing, contact us with your order reference and no payment details.'],
      ['How do I manage or cancel a subscription?', 'For App Store purchases, use your Apple account subscription settings. For Google Play purchases, use Google Play. Uninstalling Pocha or deleting your account does not cancel your subscription.'],
      ['How do I delete my account and data?', 'In Pocha, open Settings → Account → Delete my account. If you can no longer access the app, use the account deletion page linked below to contact us.'],
    ],
    account: 'Account and data', privacy: 'Privacy policy', terms: 'Terms of use', deletion: 'Delete my account', subscriptions: 'Manage Apple subscriptions', faq: 'Frequently asked questions',
  };
  const subject = encodeURIComponent(fr ? 'Aide Pocha Mac' : 'Pocha Mac support');
  return <PageLayout htmlTitle={copy.title} h1={copy.title} intro={copy.intro} metaDescription={copy.intro}>
    <section className="support-contact page-layout__section">
      <h2>{copy.contact}</h2><p>{copy.response}</p><p>{copy.details}</p>
      <a className="support-email" href={`mailto:team@pomocha.fr?subject=${subject}`}>team@pomocha.fr <span aria-hidden="true">↗</span></a>
    </section>
    <section className="page-layout__section"><h2>{copy.faq}</h2>
      <div className="support-faq">{copy.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </section>
    <section className="page-layout__section"><h2>{copy.account}</h2><div className="support-resources">
      <Link to="/privacy">{copy.privacy}</Link><Link to="/terms">{copy.terms}</Link><Link to="/delete-account">{copy.deletion}</Link>
      <a href="https://apps.apple.com/account/subscriptions" target="_blank" rel="noopener noreferrer">{copy.subscriptions}</a>
    </div></section>
  </PageLayout>;
}
