import { platforms } from '../config/landing';
import { useI18n } from '../contexts/I18nContext';

export default function PochaAnswers() {
  const { locale } = useI18n();
  const fr = locale === 'fr';

  return (
    <section className="pocha-answers" aria-labelledby="pocha-answers-title">
      <h2 id="pocha-answers-title">{fr ? 'Questions sur Pocha et le Pomodoro' : 'Questions about Pocha and the Pomodoro technique'}</h2>
      <details id="methode" open>
        <summary>{fr ? 'Comment fonctionne la méthode Pomodoro ?' : 'How does the Pomodoro technique work?'}</summary>
        <p>{fr
          ? 'La méthode Pomodoro alterne généralement 25 minutes de concentration et 5 minutes de pause. Après quatre sessions, prends une pause plus longue. Dans Pocha, tu peux choisir la durée de ta session.'
          : 'The Pomodoro technique typically alternates 25 minutes of focus with a 5-minute break. Take a longer break after four sessions. In Pocha, you can choose your session length.'}</p>
      </details>
      <details id="etudes" open>
        <summary>{fr ? 'Comment utiliser Pocha pour étudier ?' : 'How can I use Pocha to study?'}</summary>
        <p>{fr
          ? 'Choisis une tâche précise, comme réviser un chapitre. Lance le minuteur, puis fais une pause quand la session se termine. Tes statistiques de concentration t’aident à suivre ta régularité.'
          : 'Pick a specific task, such as reviewing one chapter. Start the timer and take a break when the session ends. Your focus stats help you track how regularly you study.'}</p>
      </details>
      <details>
        <summary>{fr ? 'Où trouver le minuteur Pomodoro en ligne ?' : 'Where can I use the online Pomodoro timer?'}</summary>
        <p>{fr ? 'Pocha est disponible dans ton navigateur sur ' : 'Pocha is available in your browser at '}
          <a href={platforms.web}>pomocha.io</a>.
          {' '}{fr ? 'L’app mobile se télécharge depuis l’App Store ou Google Play.' : 'The mobile app is available on the App Store and Google Play.'}</p>
      </details>
    </section>
  );
}
