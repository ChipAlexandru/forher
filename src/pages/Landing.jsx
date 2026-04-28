import { useState, useRef, useEffect } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { useLang } from '../context/LanguageContext';
import { quizSteps, getProfile } from '../data/quizData';
import HeaderMain from '../components/HeaderMain';
import SEO from '../components/SEO';
import WaitlistModal from '../components/WaitlistModal';
import Footer from '../components/Footer';

/* ──────────────────── CONTENT DATA ──────────────────── */
const content = {
  de: {
    lang: 'Deutsch',
    hero: {
      headline: 'Wechseljahre. Endlich Fachpersonen, die zuhören.',
      subhead: 'Video-Konsultation mit auf Menopause spezialisierten Fachärztinnen und Fachärzten für Gynäkologie. Diagnose, persönlicher Behandlungsplan und Rezept — in einer ausführlichen Sitzung. Weil Ihre Symptome real sind, Ihre Fragen Antworten verdienen und 20 Minuten nie genug waren.',
      cta: 'Termin buchen — CHF 300',
      note: '45–60 Minuten. Video. Keine Wartezeit.',
    },
    stats: {
      title: 'Ihre Gesundheit verdient mehr als 20 Minuten.',
      items: [
        { number: '78%', text: 'der Frauen in den Wechseljahren haben Beschwerden — Hitzewallungen, Schlafstörungen, Stimmungsschwankungen, Gelenkschmerzen.' },
        { number: '41%', text: 'der Frauen, die wegen Menopause ärztliche Hilfe suchten, fühlten sich nicht ernst genommen oder abgewiesen.' },
        { number: '33%', text: 'der Schweizer Frauen haben wegen Menopause-Symptomen ihre Arbeit reduziert, den Job gewechselt oder eine Auszeit genommen.' },
      ],
      source: 'Quellen: BCG 2025, Bonafide State of Menopause Survey 2024, MenoSupport Suisse / Inselspital Bern 2025',
    },
    howItWorks: {
      title: 'So funktioniert es',
      steps: [
        { icon: 'clipboard', title: 'Fragebogen ausfüllen', text: 'Symptome, Krankengeschichte, aktuelle Medikamente, bisherige Behandlungsversuche — in 5 Minuten online. Ihre Fachperson liest alles vor dem Gespräch, damit Sie Ihre Geschichte nicht noch einmal erzählen müssen.' },
        { icon: 'video', title: 'Video-Konsultation', text: '45–60 Minuten mit einer auf Menopause spezialisierten Fachperson für Gynäkologie. Ihr Profil wurde gelesen. Die richtigen Fragen werden gestellt. Keine Hektik. Kein Abwimmeln. Sie werden gehört.' },
        { icon: 'document', title: 'Ihr Behandlungsplan', text: 'Persönliche Diagnose, evidenzbasierte Therapieempfehlung (HRT, nicht-hormonelle Alternativen oder Lebensstiländerungen) und Rezept — direkt an Ihre Apotheke. PDF-Zusammenfassung per E-Mail innerhalb von 24 Stunden.' },
      ],
    },
    doctor: {
      tag: 'Unser Anspruch',
      title: 'Was Sie von Ihrer Fachperson erwarten dürfen',
      points: [
        'FMH-zertifizierte Fachärztin/Facharzt für Gynäkologie & Geburtshilfe',
        'Zusätzliche Menopause-spezifische Zertifizierung',
        '45–60 Minuten pro Konsultation — keine Hektik, kein Abwimmeln',
        'Vorab-Review Ihres gesamten Gesundheitsprofils',
        'Auf dem neuesten Stand der Evidenz zur Hormontherapie',
        'Telemedizin aus Zürich — sicher, verschlüsselt, bequem von zu Hause',
      ],
      note: 'In der Schweiz haben die wenigsten Gynäkologinnen und Gynäkologen eine spezialisierte Menopause-Ausbildung erhalten — sie ist nicht Teil des FMH-Kerncurriculums. Wir arbeiten ausschliesslich mit Fachpersonen, die diese Lücke geschlossen haben.',
    },
    symptoms: {
      title: 'Was wir behandeln',
      items: ['Hitzewallungen', 'Schlafstörungen', 'Stimmungsschwankungen', 'Vaginale Trockenheit', 'Gelenkschmerzen', 'Gewichtsveränderungen', 'Gehirnnebel', 'Libidoverlust'],
      note: 'Hormontherapie (HRT), nicht-hormonelle Alternativen und Lebensstil-Empfehlungen — evidenzbasiert und individuell auf Ihre Bedürfnisse, Ihr Risikoprofil und Ihre Präferenzen abgestimmt.',
    },
    pricing: {
      title: 'Ihre Konsultation',
      price: 'CHF 300',
      included: [
        '45–60 Min. Video-Konsultation mit Menopause-Fachperson',
        'Vorab-Review Ihres Gesundheitsprofils',
        'Persönlicher Behandlungsplan (PDF)',
        'Rezept an Ihre Apotheke',
        'Symptom-Fragebogen vorab',
        'Rückfragen per E-Mail für 7 Tage',
      ],
      notIncluded: ['Medikamente (über Ihre Apotheke / Krankenkasse)', 'Laboruntersuchungen bei Bedarf (über Ihre Hausärztin/Ihren Hausarzt oder Walk-in-Labor)'],
      cta: 'Termin buchen',
      note: 'Bezahlung mit Kreditkarte oder TWINT. Keine Versicherungsabrechnung nötig.',
    },
    faq: [
      { q: 'Brauche ich eine Überweisung?', a: 'Nein. In der Schweiz können Sie direkt zu einer gynäkologischen Fachperson gehen, ohne Überweisung.' },
      { q: 'Wird die Konsultation von der Krankenkasse übernommen?', a: 'Die Konsultationsgebühr ist eine Selbstzahlerleistung. Die verschriebenen Medikamente (HRT, Progesteron etc.) werden jedoch von der Grundversicherung übernommen, sofern sie auf der Spezialitätenliste stehen. Einige Zusatzversicherungen decken auch Präventions- und Komplementärkonsultationen ab — erkundigen Sie sich bei Ihrer Versicherung.' },
      { q: 'Ist eine Hormontherapie die einzige Option?', a: 'Nein. Ihre Fachperson bespricht alle evidenzbasierten Optionen mit Ihnen — hormonell, nicht-hormonell und lebensstilbasiert — und gemeinsam entscheiden Sie, was für Ihre Situation richtig ist. Es gibt keinen Einheitsansatz.' },
      { q: 'Meine Estradot-Pflaster werden nicht mehr von der Versicherung gedeckt. Was nun?', a: 'Sandoz hat Estradot im September 2025 aufgrund eines Preisstreits von der Spezialitätenliste genommen. Mehrere alternative HRT-Produkte bleiben vollständig gedeckt, darunter transdermale Östradiol-Gele (Oestrogel, Estreva), orale Formulierungen und vaginale Präparate.' },
      { q: 'Was unterscheidet eine Menopause-Fachperson von einer regulären Gynäkologin?', a: 'Die meisten Gynäkologinnen und Gynäkologen in der Schweiz haben keine spezialisierte Menopause-Ausbildung erhalten — sie ist nicht Teil des FMH-Kerncurriculums. Menopause-Fachpersonen haben eine zusätzliche Zertifizierung abgeschlossen und sind auf dem neuesten Stand der Evidenz zur Hormontherapie.' },
      { q: 'Welche Beschwerden werden behandelt?', a: 'Hitzewallungen, Nachtschweiss, Schlafstörungen, Stimmungsschwankungen, Angst, Gehirnnebel, Gelenkschmerzen, vaginale Trockenheit, Libidoverlust, Gewichtsveränderungen, Herzrasen und Erschöpfung. Wenn Ihre Symptome mit der Perimenopause oder Menopause zusammenhängen, können wir helfen.' },
    ],
    footerCta: 'Bereit? Ihre Wechseljahre verdienen mehr als Abwarten.',
    footer: {
      tagline: 'Telemedizin aus Zürich',
      contact: 'kontakt@equivie.ch',
      medical: 'Spezialisierte Menopause-Versorgung durch FMH-zertifizierte Fachpersonen',
    },
  },
  fr: {
    lang: 'Français',
    hero: {
      headline: 'Ménopause. Enfin une spécialiste qui vous écoute.',
      subhead: 'Consultation vidéo avec une gynécologue spécialisée en ménopause. Diagnostic, plan de traitement personnalisé et ordonnance — en une seule séance approfondie. Parce que vos symptômes sont réels, vos questions méritent des réponses, et 20 minutes n\'ont jamais suffi.',
      cta: 'Réserver votre consultation — CHF 300',
      note: '45–60 minutes. Vidéo. Sans liste d\'attente.',
    },
    stats: {
      title: 'Votre santé mérite plus que 20 minutes.',
      items: [
        { number: '78%', text: 'des femmes ménopausées présentent des symptômes — bouffées de chaleur, troubles du sommeil, sautes d\'humeur, douleurs articulaires.' },
        { number: '41%', text: 'des femmes ayant consulté un médecin pour la ménopause se sont senties ignorées ou pas prises au sérieux.' },
        { number: '33%', text: 'des femmes suisses ont réduit leur activité professionnelle, changé d\'emploi ou pris un congé à cause des symptômes de la ménopause.' },
      ],
      source: 'Sources : BCG 2025, Bonafide State of Menopause Survey 2024, MenoSupport Suisse / Inselspital Berne 2025',
    },
    howItWorks: {
      title: 'Comment ça marche',
      steps: [
        { icon: 'clipboard', title: 'Remplissez votre profil de santé', text: 'Symptômes, antécédents médicaux, médicaments actuels, traitements déjà essayés — 5 minutes en ligne. Votre médecin examine tout avant la séance afin que vous n\'ayez pas à répéter votre histoire.' },
        { icon: 'video', title: 'Consultation vidéo', text: '45–60 minutes avec une gynécologue spécialisée en ménopause. Votre profil a été lu. Les bonnes questions seront posées. Pas de précipitation. Pas de banalisation. Vous serez écoutée.' },
        { icon: 'document', title: 'Votre plan de traitement', text: 'Diagnostic personnalisé, recommandation thérapeutique fondée sur les preuves (THS, alternatives non hormonales ou changements de mode de vie) et ordonnance — envoyée directement à votre pharmacie. Résumé PDF par e-mail sous 24 heures.' },
      ],
    },
    doctor: {
      tag: 'Notre exigence',
      title: 'Ce que vous pouvez attendre de votre spécialiste',
      points: [
        'Gynécologue certifiée FMH en gynécologie et obstétrique',
        'Certification complémentaire spécifique à la ménopause',
        '45–60 minutes par consultation — sans précipitation, sans banalisation',
        'Examen préalable de l\'intégralité de votre profil de santé',
        'À jour des dernières données probantes sur la thérapie hormonale',
        'Télémédecine depuis Zurich — sécurisée, chiffrée, depuis chez vous',
      ],
      note: 'En Suisse, la plupart des gynécologues n\'ont pas reçu de formation spécialisée en ménopause — elle ne fait pas partie du cursus FMH de base. Nous collaborons exclusivement avec des spécialistes qui ont comblé cette lacune.',
    },
    symptoms: {
      title: 'Ce que nous traitons',
      items: ['Bouffées de chaleur', 'Troubles du sommeil', 'Sautes d\'humeur', 'Sécheresse vaginale', 'Douleurs articulaires', 'Variations de poids', 'Brouillard mental', 'Baisse de libido'],
      note: 'Thérapie hormonale (THS), alternatives non hormonales et recommandations de mode de vie — fondées sur les preuves et personnalisées selon vos besoins, votre profil de risque et vos préférences.',
    },
    pricing: {
      title: 'Votre consultation',
      price: 'CHF 300',
      included: [
        '45–60 min de consultation vidéo avec une spécialiste de la ménopause',
        'Examen préalable de votre profil de santé par votre médecin',
        'Plan de traitement personnalisé (PDF)',
        'Ordonnance envoyée à votre pharmacie',
        'Questionnaire de symptômes en amont',
        'Questions de suivi par e-mail pendant 7 jours',
      ],
      notIncluded: ['Médicaments (via votre pharmacie / assurance maladie)', 'Analyses de laboratoire si nécessaire (prescrites via votre médecin traitant ou laboratoire sans rendez-vous)'],
      cta: 'Réserver votre consultation',
      note: 'Paiement par carte de crédit ou TWINT. Aucune démarche d\'assurance requise.',
    },
    faq: [
      { q: 'Ai-je besoin d\'une ordonnance de mon médecin ?', a: 'Non. En Suisse, vous pouvez consulter directement une gynécologue sans ordonnance de votre médecin traitant.' },
      { q: 'La consultation est-elle prise en charge par l\'assurance maladie ?', a: 'Les honoraires de consultation sont à votre charge. Cependant, les médicaments prescrits (THS, progestérone, etc.) sont couverts par l\'assurance de base s\'ils figurent sur la liste des spécialités. Certaines assurances complémentaires couvrent également les consultations de prévention — renseignez-vous auprès de votre assureur.' },
      { q: 'L\'hormonothérapie est-elle la seule option ?', a: 'Non. Votre médecin discutera avec vous de toutes les options fondées sur les preuves — hormonales, non hormonales et basées sur le mode de vie — et ensemble, vous déciderez ce qui convient le mieux à votre situation.' },
      { q: 'Mes patchs Estradot ne sont plus remboursés. Que faire ?', a: 'Sandoz a retiré Estradot de la liste des spécialités en septembre 2025 en raison d\'un litige tarifaire. Plusieurs alternatives de THS restent entièrement couvertes, notamment les gels d\'œstradiol transdermiques (Oestrogel, Estreva), les formulations orales et les préparations vaginales.' },
      { q: 'Qu\'est-ce qui distingue une spécialiste de la ménopause d\'une gynécologue habituelle ?', a: 'La plupart des gynécologues en Suisse n\'ont pas reçu de formation spécialisée en ménopause — elle ne fait pas partie du cursus FMH de base. Les spécialistes de la ménopause ont obtenu une certification complémentaire et se tiennent à jour des dernières données probantes sur la thérapie hormonale.' },
      { q: 'Quels symptômes traitez-vous ?', a: 'Bouffées de chaleur, sueurs nocturnes, troubles du sommeil, sautes d\'humeur, anxiété, brouillard mental, douleurs articulaires, sécheresse vaginale, baisse de libido, variations de poids, palpitations cardiaques et fatigue. Si vos symptômes sont liés à la périménopause ou à la ménopause, nous pouvons vous aider.' },
    ],
    footerCta: 'Prête ? Votre ménopause mérite mieux que l\'attente.',
    footer: {
      tagline: 'Télémédecine depuis Zurich',
      contact: 'contact@equivie.ch',
      medical: 'Soins spécialisés de la ménopause par des gynécologues certifiées FMH',
    },
  },
  en: {
    lang: 'English',
    hero: {
      headline: 'Menopause. Finally, a specialist who listens.',
      subhead: 'Video consultation with a gynaecologist specialised in menopause. Diagnosis, personalised treatment plan and prescription — in one unhurried session. Because your symptoms are real, your questions deserve answers, and 20 minutes was never enough.',
      cta: 'Book your consultation — CHF 300',
      note: '45–60 minutes. Video. No waiting list.',
    },
    stats: {
      title: 'Your health deserves more than 20 minutes.',
      items: [
        { number: '78%', text: 'of menopausal women experience symptoms — hot flashes, sleep disruption, mood changes, joint pain.' },
        { number: '41%', text: 'of women who consulted a doctor about menopause felt dismissed or not taken seriously.' },
        { number: '33%', text: 'of Swiss women reduced work, changed jobs, or took leave because of menopause symptoms.' },
      ],
      source: 'Sources: BCG 2025, Bonafide State of Menopause Survey 2024, MenoSupport Suisse / Inselspital Bern 2025',
    },
    howItWorks: {
      title: 'How it works',
      steps: [
        { icon: 'clipboard', title: 'Complete your health profile', text: 'Symptoms, medical history, current medications, what you\u2019ve already tried — 5 minutes online. Your doctor reviews everything before your session so you don\u2019t have to repeat your story again.' },
        { icon: 'video', title: 'Video consultation', text: '45–60 minutes with a gynaecologist specialised in menopause. Your profile has been read. The right questions will be asked. No rush. No dismissal. You will be heard.' },
        { icon: 'document', title: 'Your treatment plan', text: 'Personal diagnosis, evidence-based treatment recommendation (HRT, non-hormonal alternatives, or lifestyle changes), and prescription — sent directly to your pharmacy. PDF summary by email within 24 hours.' },
      ],
    },
    doctor: {
      tag: 'Our standard',
      title: 'What you can expect from your specialist',
      points: [
        'FMH board-certified gynaecologist',
        'Additional menopause-specific certification',
        '45–60 minutes per consultation — no rush, no dismissal',
        'Full health profile review before your session',
        'Up to date with the latest evidence on hormone therapy',
        'Telehealth from Zürich — secure, encrypted, from the comfort of home',
      ],
      note: 'Most gynaecologists in Switzerland have not received specialist menopause training — it is not part of the core FMH curriculum. We work exclusively with specialists who have closed that gap.',
    },
    symptoms: {
      title: 'What we treat',
      items: ['Hot flashes', 'Sleep disruption', 'Mood changes', 'Vaginal dryness', 'Joint pain', 'Weight changes', 'Brain fog', 'Low libido'],
      note: 'Hormone therapy (HRT), non-hormonal alternatives, and lifestyle recommendations — evidence-based and personalised to your needs, your risk profile, and your preferences.',
    },
    pricing: {
      title: 'Your consultation',
      price: 'CHF 300',
      included: [
        '45–60 min video consultation with menopause specialist',
        'Your doctor reviews your health profile before the session',
        'Personal treatment plan (PDF)',
        'Prescription sent to your pharmacy',
        'Symptom questionnaire in advance',
        'Follow-up questions via email for 7 days',
      ],
      notIncluded: ['Medications (via your pharmacy / health insurance)', 'Lab work if needed (ordered through your GP or walk-in lab)'],
      cta: 'Book your consultation',
      note: 'Pay by credit card or TWINT. No insurance paperwork needed.',
    },
    faq: [
      { q: 'Do I need a referral?', a: 'No. In Switzerland, you can see a gynaecologist directly without a GP referral.' },
      { q: 'Is the consultation covered by health insurance?', a: 'The consultation fee is self-pay. However, any medications prescribed (HRT, progesterone, etc.) are covered by your Grundversicherung if they are on the Spezialitätenliste. Some Zusatzversicherung plans also cover prevention and complementary consultations — check with your insurer.' },
      { q: 'Is hormone therapy the only option?', a: 'No. Your specialist will discuss all evidence-based options with you — hormonal, non-hormonal, and lifestyle-based — and together you\u2019ll decide what\u2019s right for your situation. There is no one-size-fits-all approach.' },
      { q: 'My Estradot patches are no longer covered by insurance. What now?', a: 'Sandoz removed Estradot from the Spezialitätenliste in September 2025 due to a price dispute. Several alternative HRT products remain fully covered, including transdermal estradiol gels (Oestrogel, Estreva), oral formulations, and vaginal preparations.' },
      { q: 'What makes a menopause specialist different from a regular gynaecologist?', a: 'Most gynaecologists in Switzerland have not received specialist menopause training — it is not part of the core FMH curriculum. Menopause specialists have completed additional certification and stay current with the latest evidence on hormone therapy.' },
      { q: 'What symptoms do you treat?', a: 'Hot flashes, night sweats, sleep disruption, mood changes, anxiety, brain fog, joint pain, vaginal dryness, low libido, weight changes, heart palpitations, and fatigue. If your symptoms are related to perimenopause or menopause, we can help.' },
    ],
    footerCta: 'Ready? Your menopause deserves more than waiting it out.',
    footer: {
      tagline: 'Telehealth from Zürich',
      contact: 'contact@equivie.ch',
      medical: 'Specialist menopause care by FMH board-certified gynaecologists',
    },
  },
};

/* ──────────────────── ICONS ──────────────────── */
function StepIcon({ type }) {
  const cls = "w-10 h-10 text-rose";
  if (type === 'clipboard') return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 14l2 2 4-4" />
    </svg>
  );
  if (type === 'video') return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="14" height="12" rx="2" />
      <path d="M16 10l4.6-2.7a1 1 0 0 1 1.4.9v7.6a1 1 0 0 1-1.4.9L16 14" />
    </svg>
  );
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

/* Symptom icon set */
const symptomIcons = {
  0: ( // Hot flashes / Hitzewallungen
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M4.93 4.93l2.83 2.83M2 12h4M4.93 19.07l2.83-2.83M12 18v4M16.24 16.24l2.83 2.83M18 12h4M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  1: ( // Sleep
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  2: ( // Mood
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  ),
  3: ( // Vaginal dryness
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  4: ( // Joint pain
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v1a4 4 0 0 0 2 3.46V16a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-3.54A4 4 0 0 0 18 9V8z" />
    </svg>
  ),
  5: ( // Weight
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 18L18 6M6 6l12 12" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
  6: ( // Brain fog
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A5.5 5.5 0 0 0 5 9a5.5 5.5 0 0 0 4.5 5.4V22h5v-7.6A5.5 5.5 0 0 0 19 9a5.5 5.5 0 0 0-5.5-7H9.5z" />
    </svg>
  ),
  7: ( // Libido
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
};

/* ──────────────────── COMPONENT ──────────────────── */
export default function Landing() {
  const containerRef = useFadeIn();
  const { lang, langPath, t: i18n } = useLang();
  const [openFaq, setOpenFaq] = useState(null);
  const t = content[lang];

  /* Nuggets bar — rotate on mobile */
  const [activeNugget, setActiveNugget] = useState(0);
  const nuggets = i18n.nuggets;
  useEffect(() => {
    const id = setInterval(() => setActiveNugget((i) => (i + 1) % 3), 5000);
    return () => clearInterval(id);
  }, []);

  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  /* Waitlist modal state */
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  /* Quiz state */
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizScreen, setQuizScreen] = useState('questions');
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedValue, setSelectedValue] = useState(null);
  const [showEmpathy, setShowEmpathy] = useState(false);
  const quizRef = useRef(null);

  const currentStep = quizSteps[stepIndex];
  const progress = quizSteps.length > 0 ? ((stepIndex) / quizSteps.length) * 100 : 0;
  const progressWithCurrent = quizSteps.length > 0 ? ((stepIndex + 1) / quizSteps.length) * 100 : 0;

  function handleOptionSelect(value) {
    setSelectedValue(value);
    setShowEmpathy(true);
    const newAnswers = { ...answers, [currentStep.id]: value };
    setAnswers(newAnswers);
    const empathyMsg = currentStep.empathy[value];
    const delay = empathyMsg ? 3500 : 800;
    setTimeout(() => {
      if (stepIndex < quizSteps.length - 1) {
        setStepIndex(stepIndex + 1);
        setSelectedValue(null);
        setShowEmpathy(false);
      } else {
        setQuizScreen('results');
      }
    }, delay);
  }

  const profile = quizScreen === 'results' ? getProfile(answers, lang) : null;

  function severityColor(pct) {
    if (pct <= 20) return 'bg-sage';
    if (pct <= 45) return 'bg-rose/70';
    if (pct <= 70) return 'bg-rose';
    return 'bg-red-700';
  }

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col">
      <SEO
        title={t.seo?.homeTitle || `Equivie MED — ${t.hero.headline.split('.')[0]}`}
        description={t.seo?.homeDescription || (t.hero.subHeadline || '').slice(0, 155)}
        pagePath="/"
        ogImage="/og-image.png"
      />

      {/* ════════════════════════════════════════════
          HEADER
          ════════════════════════════════════════════ */}
      <HeaderMain onBookClick={() => setWaitlistOpen(true)} />

      {/* ════════════════════════════════════════════
          QUIZ BAR (collapsible)
          ════════════════════════════════════════════ */}
      <section ref={quizRef} className="bg-rose-pale border-y border-rose/20" aria-label="Menopause symptom check-in quiz">
        {!quizOpen && quizScreen !== 'results' && (
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">🩺</span>
              <div>
                <p className="font-serif font-bold text-forest text-lg leading-tight">
                  {lang === 'de' ? 'Wie geht es Ihnen wirklich?' : 'How are you really doing?'}
                </p>
                <p className="font-sans text-stone/60 text-xs mt-0.5">
                  {lang === 'de' ? '6 Fragen · 2 Minuten · Anonym' : '6 questions · 2 min · Anonymous'}
                </p>
              </div>
            </div>
            <button
              onClick={() => { setQuizOpen(true); setTimeout(() => quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100); }}
              className="inline-block bg-rose text-cream font-sans font-medium text-xs uppercase tracking-wider px-6 py-3 rounded-[2px] hover:bg-rose/90 transition-colors border-0 cursor-pointer whitespace-nowrap"
            >
              {lang === 'de' ? 'Check-in starten' : 'Start my check-in'}
            </button>
          </div>
        )}

        {(quizOpen || quizScreen === 'results') && (
          <div className="max-w-3xl mx-auto px-6 lg:px-10 py-12 lg:py-16">
            {quizScreen === 'questions' && (
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => { setQuizOpen(false); setStepIndex(0); setAnswers({}); setSelectedValue(null); setShowEmpathy(false); }}
                  className="font-sans text-stone/40 text-xs bg-transparent border-0 cursor-pointer hover:text-stone transition-colors"
                  aria-label="Close quiz"
                >
                  ✕ {lang === 'de' ? 'Schliessen' : 'Close'}
                </button>
              </div>
            )}

            {quizScreen === 'questions' && currentStep && (
              <div>
                <div className="w-full h-1.5 bg-white/60 rounded-full mb-8 overflow-hidden">
                  <div
                    className="h-full bg-rose rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${showEmpathy ? progressWithCurrent : progress}%` }}
                  />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl" role="img" aria-label={currentStep.domain}>{currentStep.icon}</span>
                  <span className="font-sans text-rose text-sm font-medium uppercase tracking-wider">{currentStep.domain}</span>
                </div>
                <h2 className="font-serif font-bold text-forest text-2xl md:text-3xl leading-snug mb-3">{currentStep.question[lang]}</h2>
                <p className="font-sans text-stone/70 text-sm leading-relaxed mb-8 max-w-xl">{currentStep.context[lang]}</p>
                <div className="space-y-3">
                  {currentStep.options.map((option, i) => {
                    const isSelected = selectedValue === option.value;
                    return (
                      <button
                        key={i}
                        onClick={() => !showEmpathy && handleOptionSelect(option.value)}
                        disabled={showEmpathy}
                        className={`w-full text-left flex items-center gap-4 border rounded-[2px] p-5 transition-all cursor-pointer bg-white ${
                          isSelected ? 'border-forest bg-forest/5 ring-1 ring-forest/20' : showEmpathy ? 'border-border opacity-50 cursor-default' : 'border-border hover:border-sage hover:shadow-sm'
                        }`}
                      >
                        <span className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-forest' : 'border-stone/30'}`}>
                          {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-forest" />}
                        </span>
                        <span className={`font-sans text-sm leading-relaxed ${isSelected ? 'text-forest font-medium' : 'text-stone'}`}>{option.label[lang]}</span>
                      </button>
                    );
                  })}
                </div>
                {showEmpathy && selectedValue !== null && currentStep.empathy[selectedValue] && (
                  <div className="mt-6 bg-sage/10 border border-sage/30 rounded-[2px] p-5">
                    <p className="font-sans text-forest text-sm leading-relaxed">{currentStep.empathy[selectedValue][lang]}</p>
                  </div>
                )}
                <p className="font-sans text-stone/40 text-xs mt-8 text-center">{stepIndex + 1} / {quizSteps.length}</p>
              </div>
            )}

            {quizScreen === 'results' && profile && (
              <div>
                <div className="text-center mb-10">
                  <hr className="rule mb-8 mx-auto" />
                  <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl leading-tight mb-3">{lang === 'de' ? 'Ihre Ergebnisse' : 'Your results'}</h2>
                  <p className="font-sans text-stone text-base">{lang === 'de' ? 'Basierend auf Ihren Antworten, hier ist eine Einschätzung.' : 'Based on your answers, here\u2019s a snapshot.'}</p>
                </div>
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-sans font-medium text-forest text-lg">{profile.level}</span>
                    <span className="font-sans text-stone/60 text-sm">{profile.pct}%</span>
                  </div>
                  <div className="w-full h-3 bg-white/60 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ease-out ${severityColor(profile.pct)}`} style={{ width: `${profile.pct}%` }} />
                  </div>
                  <p className="font-sans text-stone text-sm mt-3">{profile.message}</p>
                </div>
                {profile.topConcerns.length > 0 && (
                  <div className="mb-8">
                    <h3 className="font-sans font-medium text-forest text-sm uppercase tracking-wider mb-3">{lang === 'de' ? 'Ihre Hauptbereiche' : 'Your top areas of concern'}</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.topConcerns.map((concern) => (
                        <span key={concern.id} className="inline-flex items-center gap-1.5 tag border-rose/30 text-forest text-sm"><span>{concern.icon}</span> {concern.domain}</span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="bg-sage/10 border-l-4 border-sage rounded-r-[2px] p-6 mb-10">
                  <p className="font-sans text-forest text-sm leading-relaxed">{profile.detail}</p>
                </div>
                <div className="bg-forest rounded-[2px] p-8 md:p-10 text-center mb-8">
                  <h3 className="font-serif font-bold text-cream text-2xl md:text-3xl mb-3">{lang === 'de' ? 'Sprechen Sie mit einer Menopause-Fachperson' : 'Talk to a menopause specialist'}</h3>
                  <p className="font-sans text-cream/70 text-sm leading-relaxed mb-6 max-w-md mx-auto">{lang === 'de' ? '45–60 Minuten Video-Konsultation. Diagnose, Behandlungsplan und Rezept — in einer Sitzung.' : '45–60 min video consultation. Diagnosis, treatment plan, and prescription — in one session.'}</p>
                  <button onClick={() => setWaitlistOpen(true)} className="inline-block bg-rose text-cream font-sans font-medium text-sm uppercase tracking-wider px-10 py-4 rounded-[2px] hover:bg-rose/90 transition-colors border-0 cursor-pointer">{lang === 'de' ? 'Termin buchen — CHF 300' : 'Book your consultation — CHF 300'}</button>
                </div>
                <div className="text-center">
                  <button onClick={() => { setQuizScreen('questions'); setStepIndex(0); setAnswers({}); setSelectedValue(null); setShowEmpathy(false); }} className="font-sans text-stone/50 text-xs underline bg-transparent border-0 cursor-pointer hover:text-stone transition-colors">{lang === 'de' ? 'Check-in wiederholen' : 'Retake check-in'}</button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ════════════════════════════════════════════
          CONTENT NUGGETS BAR
          ════════════════════════════════════════════ */}
      <div className="bg-cream-dark border-y border-sage/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3 flex items-center gap-6">
          <span className="font-sans text-xs uppercase tracking-wider text-forest font-medium shrink-0 hidden md:block">
            {nuggets.label}
          </span>

          {/* Desktop: show all 3 */}
          <div className="hidden md:flex items-center gap-5 flex-1">
            {nuggets.items.map((item, i) => (
              <div key={i} className="contents">
                {i > 0 && <span className="w-px h-4 bg-sage/30 shrink-0" />}
                <a
                  href={langPath(item.href)}
                  className="flex items-center gap-2 no-underline group"
                >
                  <span className="w-[26px] h-[26px] shrink-0 rounded-full bg-forest flex items-center justify-center">
                    {i === 0 && (
                      <svg className="w-[13px] h-[13px] text-cream" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.5 2A5.5 5.5 0 0 0 5 9a5.5 5.5 0 0 0 4.5 5.4V22h5v-7.6A5.5 5.5 0 0 0 19 9a5.5 5.5 0 0 0-5.5-7H9.5z" />
                      </svg>
                    )}
                    {i === 1 && (
                      <svg className="w-[13px] h-[13px] text-cream" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    )}
                    {i === 2 && (
                      <svg className="w-[13px] h-[13px] text-cream" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                    )}
                  </span>
                  <span className="font-sans text-sm text-stone group-hover:text-forest transition-colors">{item.text}</span>
                  <span className="font-sans text-sm text-rose group-hover:ml-0.5 transition-all">&#8594;</span>
                </a>
              </div>
            ))}
          </div>

          {/* Mobile: one nugget at a time, rotating */}
          <div className="flex md:hidden items-center gap-2 flex-1 min-w-0">
            <span className="font-sans text-xs uppercase tracking-wider text-forest font-medium shrink-0">
              {nuggets.label}
            </span>
            <a
              href={langPath(nuggets.items[activeNugget].href)}
              className="flex items-center gap-2 no-underline min-w-0"
            >
              <span className="w-[24px] h-[24px] shrink-0 rounded-full bg-forest flex items-center justify-center">
                {activeNugget === 0 && (
                  <svg className="w-[12px] h-[12px] text-cream" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.5 2A5.5 5.5 0 0 0 5 9a5.5 5.5 0 0 0 4.5 5.4V22h5v-7.6A5.5 5.5 0 0 0 19 9a5.5 5.5 0 0 0-5.5-7H9.5z" />
                  </svg>
                )}
                {activeNugget === 1 && (
                  <svg className="w-[12px] h-[12px] text-cream" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                )}
                {activeNugget === 2 && (
                  <svg className="w-[12px] h-[12px] text-cream" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </span>
              <span className="font-sans text-sm text-stone truncate">{nuggets.items[activeNugget].text}</span>
              <span className="font-sans text-sm text-rose shrink-0">&#8594;</span>
            </a>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          1. HERO
          ════════════════════════════════════════════ */}
      <section className="fade-in-section bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <hr className="rule mb-8" />
              <h1 className="font-serif font-bold text-forest text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-tight mb-6">
                {t.hero.headline}
              </h1>
              <p className="font-sans text-stone text-lg leading-relaxed mb-10 max-w-lg">
                {t.hero.subhead}
              </p>
              <button
                onClick={() => setWaitlistOpen(true)}
                className="inline-block bg-forest text-cream font-sans font-medium text-sm uppercase tracking-wider px-8 py-4 rounded-[2px] hover:bg-forest-mid transition-colors border-0 cursor-pointer"
              >
                {t.hero.cta}
              </button>
              <p className="font-sans text-stone text-sm mt-4">{t.hero.note}</p>
            </div>

            {/* Right — hero image */}
            <div className="relative rounded-lg min-h-[420px] overflow-hidden">
              <img
                src="/hero.jpg"
                alt={lang === 'de' ? 'Frau geniesst einen ruhigen Moment bei einer Tasse Tee' : lang === 'fr' ? 'Femme savourant un moment calme avec une tasse de thé' : 'Woman enjoying a calm moment with a cup of tea'}
                className="w-full h-full min-h-[420px] object-cover object-top rounded-lg"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-forest/70 backdrop-blur-sm px-8 py-5 rounded-b-lg">
                <p className="font-body italic text-cream/80 text-sm leading-relaxed">
                  {lang === 'de'
                    ? 'Ihre Gesundheit verdient mehr als 20 Minuten.'
                    : lang === 'fr'
                    ? 'Votre santé mérite plus que 20 minutes.'
                    : 'Your health deserves more than 20 minutes.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          2. STATS
          ════════════════════════════════════════════ */}
      <section className="fade-in-section bg-cream-dark border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <h2 className="font-serif font-bold text-forest text-2xl md:text-3xl mb-10 text-center md:text-left">
            {t.stats.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {t.stats.items.map((stat, i) => (
              <div key={i} className="text-center md:text-left">
                <p className="font-serif font-bold text-forest text-5xl lg:text-6xl leading-none mb-3">
                  {stat.number}
                </p>
                <p className="font-sans text-stone text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                  {stat.text}
                </p>
              </div>
            ))}
          </div>
          <p className="font-sans text-stone-light text-xs mt-10 text-center md:text-left">
            {t.stats.source}
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          3. HOW IT WORKS
          ════════════════════════════════════════════ */}
      <section id="how-it-works" className="fade-in-section bg-forest">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <span className="tag border-cream/30 text-cream/60">
            {lang === 'de' ? '3 Schritte' : '3 Steps'}
          </span>
          <h2 className="font-serif font-bold text-cream text-3xl md:text-4xl lg:text-5xl mt-5 mb-16">
            {t.howItWorks.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {t.howItWorks.steps.map((step, i) => (
              <div key={i} className="border border-cream/15 rounded-[2px] p-8">
                <div className="mb-5">
                  <StepIcon type={step.icon} />
                </div>
                <span className="font-serif font-bold text-rose text-2xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif font-bold text-cream text-lg mt-3 mb-3">
                  {step.title}
                </h3>
                <p className="font-sans text-cream/60 text-sm leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          4. OUR STANDARD
          ════════════════════════════════════════════ */}
      <section className="fade-in-section bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="max-w-3xl mx-auto">
            <span className="tag">{t.doctor.tag}</span>
            <hr className="rule mt-5 mb-6" />
            <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl lg:text-5xl mb-10">
              {t.doctor.title}
            </h2>
            <ul className="space-y-4 mb-10">
              {t.doctor.points.map((point, i) => (
                <li key={i} className="flex items-start gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B8F6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-1" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="font-sans text-stone text-base leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
            <div className="bg-cream-dark border-l-4 border-sage rounded-r-[2px] p-6">
              <p className="font-sans text-stone text-sm leading-relaxed">{t.doctor.note}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          5. WHAT WE TREAT
          ════════════════════════════════════════════ */}
      <section className="fade-in-section bg-cream-dark border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="text-center mb-14">
            <span className="tag">{lang === 'de' ? 'Symptome' : 'Symptoms'}</span>
            <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl lg:text-5xl mt-5 mb-4">
              {t.symptoms.title}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {t.symptoms.items.map((item, i) => (
              <div key={i} className="bg-white border border-border rounded-[2px] p-5 flex flex-col items-center text-center hover:border-sage-light hover:shadow-sm transition-all">
                <div className="text-rose mb-3">{symptomIcons[i]}</div>
                <p className="font-sans font-medium text-forest text-sm">{item}</p>
              </div>
            ))}
          </div>
          <p className="font-sans text-stone text-sm text-center mt-10 max-w-2xl mx-auto leading-relaxed">
            {t.symptoms.note}
          </p>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          7. PRICING — Single card
          ════════════════════════════════════════════ */}
      <section id="pricing" className="fade-in-section bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="max-w-lg mx-auto">
            <div className="border border-rose bg-white rounded-[2px] p-10 shadow-md ring-1 ring-rose/30 text-center">
              <h2 className="font-serif font-bold text-forest text-2xl mb-2">
                {t.pricing.title}
              </h2>
              <p className="font-serif font-bold text-forest text-5xl mt-4 mb-8">
                {t.pricing.price}
              </p>
              <ul className="space-y-3 text-left mb-8">
                {t.pricing.included.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B8F6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="font-sans text-stone text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-border pt-4 mb-8 space-y-1">
                {t.pricing.notIncluded.map((item, i) => (
                  <p key={i} className="font-sans text-stone-light text-xs flex items-start gap-2">
                    <span className="text-stone-light mt-px">—</span>
                    {item}
                  </p>
                ))}
              </div>
              <button
                onClick={() => setWaitlistOpen(true)}
                className="block w-full bg-forest text-cream font-sans font-medium text-sm uppercase tracking-wider px-8 py-4 rounded-[2px] hover:bg-forest-mid transition-colors text-center border-0 cursor-pointer"
              >
                {t.pricing.cta}
              </button>
              <p className="font-sans text-stone-light text-xs mt-4">
                {t.pricing.note}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          8. FAQ
          ════════════════════════════════════════════ */}
      <section className="fade-in-section bg-cream-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="text-center mb-14">
            <span className="tag">FAQ</span>
            <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl lg:text-5xl mt-5">
              {lang === 'de' ? 'Häufig gestellte Fragen' : 'Frequently asked questions'}
            </h2>
          </div>
          <div className="max-w-3xl mx-auto divide-y divide-border border-t border-border">
            {t.faq.map((item, i) => (
              <div key={i}>
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group bg-transparent border-0 cursor-pointer"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-sans font-medium text-forest text-base md:text-lg group-hover:text-sage transition-colors leading-snug">
                    {item.q}
                  </span>
                  <span className="shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center text-stone group-hover:border-sage transition-colors" aria-hidden="true">
                    <span className="font-sans text-lg leading-none select-none">
                      {openFaq === i ? '\u2212' : '+'}
                    </span>
                  </span>
                </button>
                <div hidden={openFaq !== i} className={openFaq === i ? 'block' : 'hidden'}>
                  <p className="font-sans text-stone text-base leading-relaxed pb-6 pr-14">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════════ */}
      <Footer />

      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
