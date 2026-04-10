import { useState, useEffect, useRef } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { quizSteps, getProfile } from '../data/quizData';

/* ──────────────────── CONTENT DATA (V2 sections) ──────────────────── */
const content = {
  de: {
    lang: 'Deutsch',
    hero: {
      headline: 'Wechseljahre. Endlich Fachpersonen, die zuhören.',
      subhead: 'Video-Konsultation mit auf Menopause spezialisierten Fachärztinnen und Fachärzten für Gynäkologie. Diagnose, persönlicher Behandlungsplan und Rezept — in einer ausführlichen Sitzung. Weil Ihre Symptome real sind, Ihre Fragen Antworten verdienen und 10 Minuten nie genug waren.',
      cta: 'Termin buchen — CHF 300',
      note: '45–60 Minuten. Video. Keine Wartezeit.',
    },
    stats: {
      title: 'Ihre Gesundheit verdient mehr als 10 Minuten.',
      items: [
        { number: '78%', text: 'der Frauen in den Wechseljahren haben Beschwerden \u2014 Hitzewallungen, Schlafst\u00F6rungen, Stimmungsschwankungen, Gelenkschmerzen.' },
        { number: '41%', text: 'der Frauen, die wegen Menopause \u00E4rztliche Hilfe suchten, f\u00FChlten sich nicht ernst genommen oder abgewiesen.' },
        { number: '33%', text: 'der Schweizer Frauen haben wegen Menopause-Symptomen ihre Arbeit reduziert, den Job gewechselt oder eine Auszeit genommen.' },
      ],
      source: 'Quellen: BCG 2025, Bonafide State of Menopause Survey 2024, MenoSupport Suisse / Inselspital Bern 2025',
    },
    howItWorks: {
      title: 'So funktioniert es',
      steps: [
        { icon: 'clipboard', title: 'Fragebogen ausf\u00FCllen', text: 'Symptome, Krankengeschichte, aktuelle Medikamente, bisherige Behandlungsversuche \u2014 in 5 Minuten online. Ihre Fachperson liest alles vor dem Gespr\u00E4ch, damit Sie Ihre Geschichte nicht noch einmal erz\u00E4hlen m\u00FCssen.' },
        { icon: 'video', title: 'Video-Konsultation', text: '45\u201360 Minuten mit einer auf Menopause spezialisierten Fachperson f\u00FCr Gyn\u00E4kologie. Ihr Profil wurde gelesen. Die richtigen Fragen werden gestellt. Keine Hektik. Kein Abwimmeln. Sie werden geh\u00F6rt.' },
        { icon: 'document', title: 'Ihr Behandlungsplan', text: 'Pers\u00F6nliche Diagnose, evidenzbasierte Therapieempfehlung (HRT, nicht-hormonelle Alternativen oder Lebensstil\u00E4nderungen) und Rezept \u2014 direkt an Ihre Apotheke. PDF-Zusammenfassung per E-Mail innerhalb von 24 Stunden.' },
      ],
    },
    doctor: {
      name: 'Dr. med. [Name]',
      title: 'Facharzt/Fach\u00E4rztin f\u00FCr Gyn\u00E4kologie & Geburtshilfe (FMH) | Menopause-Spezialisierung',
      bio: 'Dr. [Name] geh\u00F6rt zu den wenigen Fachpersonen in der Schweiz mit einer spezialisierten Menopause-Zertifizierung. Mit [X] Jahren klinischer Erfahrung in Perimenopause, Menopause und Hormontherapie bringt Dr. [Name] die Expertise, die den meisten \u00C4rztinnen und \u00C4rzten in der Ausbildung schlicht nicht vermittelt wurde. 45\u201360 Minuten pro Konsultation, weil Menopause kein 10-Minuten-Gespr\u00E4ch ist. Vorab-Review Ihres gesamten Gesundheitsprofils, weil Ihre Geschichte nicht noch einmal erz\u00E4hlt werden sollte.',
      badges: ['FMH-zertifiziert', 'Menopause-Spezialisierung', 'Evidenzbasierte Medizin', 'Telemedizin aus Z\u00FCrich'],
    },
    testimonials: {
      title: 'Was unsere Patientinnen sagen',
      items: [
        { quote: 'Meine Gyn\u00E4kologin sagte mir, ich solle einfach abwarten. Hier hat mir zum ersten Mal jemand wirklich zugeh\u00F6rt \u2014 und nach 45 Minuten hatte ich einen konkreten Plan.', attribution: 'K., 48, Z\u00FCrich' },
        { quote: 'In 45 Minuten hatte ich mehr Klarheit als in drei Jahren bei verschiedenen \u00C4rzten. Ich wusste endlich, was mit mir los ist.', attribution: 'S., 52, Winterthur' },
        { quote: 'Das Rezept war noch am selben Tag in meiner Apotheke. Mein Hausarzt hatte mich monatelang auf Antidepressiva gesetzt, ohne je \u00FCber die Wechseljahre zu sprechen.', attribution: 'M., 46, Z\u00FCrich' },
      ],
    },
    pricing: {
      title: 'Ihre Konsultation',
      price: 'CHF 300',
      included: [
        '45\u201360 Min. Video-Konsultation mit Menopause-Fachperson',
        'Vorab-Review Ihres Gesundheitsprofils',
        'Pers\u00F6nlicher Behandlungsplan (PDF)',
        'Rezept an Ihre Apotheke',
        'Symptom-Fragebogen vorab',
        'R\u00FCckfragen per E-Mail f\u00FCr 7 Tage',
      ],
      notIncluded: ['Medikamente (\u00FCber Ihre Apotheke / Krankenkasse)', 'Laboruntersuchungen bei Bedarf (\u00FCber Ihre Haus\u00E4rztin/Ihren Hausarzt oder Walk-in-Labor)'],
      cta: 'Termin buchen',
      note: 'Bezahlung mit Kreditkarte oder TWINT. Keine Versicherungsabrechnung n\u00F6tig.',
    },
    faq: [
      { q: 'Brauche ich eine \u00DCberweisung?', a: 'Nein. In der Schweiz k\u00F6nnen Sie direkt zu einer gyn\u00E4kologischen Fachperson gehen, ohne \u00DCberweisung. Sie buchen einfach und bezahlen.' },
      { q: 'Wird die Konsultation von der Krankenkasse \u00FCbernommen?', a: 'Die Konsultationsgeb\u00FChr von CHF 300 ist eine Selbstzahlerleistung. Die verschriebenen Medikamente (HRT, Progesteron etc.) werden jedoch von der Grundversicherung \u00FCbernommen, sofern sie auf der Spezialit\u00E4tenliste stehen. Einige Zusatzversicherungen decken auch Pr\u00E4ventions- und Komplement\u00E4rkonsultationen ab \u2014 erkundigen Sie sich bei Ihrer Versicherung.' },
      { q: 'Werde ich Hormone verschrieben bekommen?', a: 'Das h\u00E4ngt ganz von Ihren Symptomen, Ihrer Krankengeschichte und Ihren Pr\u00E4ferenzen ab. Ihre Fachperson bespricht alle evidenzbasierten Optionen mit Ihnen \u2014 hormonell, nicht-hormonell und lebensstilbasiert \u2014 und gemeinsam entscheiden Sie, was f\u00FCr Ihre Situation richtig ist. Es gibt keinen Einheitsansatz. Genau daf\u00FCr gibt es die Spezialkonsultation.' },
      { q: 'Meine Estradot-Pflaster werden nicht mehr von der Versicherung gedeckt. K\u00F6nnen Sie helfen?', a: 'Ja. Sandoz hat Estradot im September 2025 aufgrund eines Preisstreits von der Spezialit\u00E4tenliste genommen. Mehrere alternative HRT-Produkte bleiben vollst\u00E4ndig gedeckt, darunter transdermale \u00D6stradiol-Gele (Oestrogel, Estreva), orale Formulierungen und vaginale Pr\u00E4parate. Ihre Fachperson hilft Ihnen, die beste gedeckte Alternative f\u00FCr Ihre Situation zu finden.' },
      { q: 'Was unterscheidet Equivie von meiner regul\u00E4ren Gyn\u00E4kologin oder meinem Gyn\u00E4kologen?', a: 'Die meisten Gyn\u00E4kologinnen und Gyn\u00E4kologen in der Schweiz haben keine spezialisierte Menopause-Ausbildung erhalten \u2014 sie ist nicht Teil des FMH-Kerncurriculums. Unsere Fachpersonen haben eine zus\u00E4tzliche Menopause-spezifische Zertifizierung abgeschlossen und sind auf dem neuesten Stand der Evidenz zur Hormontherapie. 45\u201360 Minuten pro Konsultation (statt der \u00FCblichen 15\u201320 Minuten), vorab-Review Ihrer gesamten Krankengeschichte und ein schriftlicher Behandlungsplan. Das ist spezialisierte Menopause-Versorgung, kein allgemeiner Wellness-Check.' },
      { q: 'Was passiert nach der Konsultation?', a: 'Sie erhalten Ihren Behandlungsplan und Ihr Rezept innerhalb von 24 Stunden. Das Rezept wird elektronisch an Ihre gew\u00E4hlte Apotheke gesendet. Sie k\u00F6nnen 7 Tage lang R\u00FCckfragen per E-Mail stellen. Wenn Sie fortlaufende Betreuung ben\u00F6tigen, bieten wir ein Abonnement-Betreuungsprogramm an (demn\u00E4chst verf\u00FCgbar).' },
      { q: 'Welche Beschwerden werden behandelt?', a: 'Hitzewallungen, Nachtschweiss, Schlafst\u00F6rungen, Stimmungsschwankungen, Angst, Gehirnnebel, Gelenkschmerzen, vaginale Trockenheit, Libidoverlust, Gewichtsver\u00E4nderungen, Herzrasen und Ersch\u00F6pfung. Wenn Ihre Symptome mit der Perimenopause oder Menopause zusammenh\u00E4ngen, k\u00F6nnen wir helfen.' },
      { q: 'Wie funktioniert die Video-Konsultation?', a: 'Nach der Buchung erhalten Sie einen Link f\u00FCr einen sicheren Videoanruf (verschl\u00FCsselt, auf Schweizer Servern gehostet). Sie verbinden sich von Ihrem Smartphone, Tablet oder Computer. Keine Software-Installation n\u00F6tig. Ihre Fachperson ist in Z\u00FCrich ans\u00E4ssig und im Kanton Z\u00FCrich zugelassen.' },
    ],
    footer: {
      tagline: 'Telemedizin aus Z\u00FCrich',
      contact: 'kontakt@equivie.ch',
      medical: '\u00C4rztliche Leitung: Dr. med. [Name], FMH Gyn\u00E4kologie & Geburtshilfe',
    },
  },
  en: {
    lang: 'English',
    hero: {
      headline: 'Menopause. Finally, a specialist who listens.',
      subhead: 'Video consultation with a gynaecologist specialised in menopause. Diagnosis, personalised treatment plan and prescription — in one unhurried session. Because your symptoms are real, your questions deserve answers, and 10 minutes was never enough.',
      cta: 'Book your consultation — CHF 300',
      note: '45–60 minutes. Video. No waiting list.',
    },
    stats: {
      title: 'Your health deserves more than 10 minutes.',
      items: [
        { number: '78%', text: 'of menopausal women experience symptoms \u2014 hot flashes, sleep disruption, mood changes, joint pain.' },
        { number: '41%', text: 'of women who consulted a doctor about menopause felt dismissed or not taken seriously.' },
        { number: '33%', text: 'of Swiss women reduced work, changed jobs, or took leave because of menopause symptoms.' },
      ],
      source: 'Sources: BCG 2025, Bonafide State of Menopause Survey 2024, MenoSupport Suisse / Inselspital Bern 2025',
    },
    howItWorks: {
      title: 'How it works',
      steps: [
        { icon: 'clipboard', title: 'Complete your health profile', text: 'Symptoms, medical history, current medications, what you\u2019ve already tried \u2014 5 minutes online. Your doctor reviews everything before your session so you don\u2019t have to repeat your story again.' },
        { icon: 'video', title: 'Video consultation', text: '45\u201360 minutes with a gynaecologist specialised in menopause. Your profile has been read. The right questions will be asked. No rush. No dismissal. You will be heard.' },
        { icon: 'document', title: 'Your treatment plan', text: 'Personal diagnosis, evidence-based treatment recommendation (HRT, non-hormonal alternatives, or lifestyle changes), and prescription \u2014 sent directly to your pharmacy. PDF summary by email within 24 hours.' },
      ],
    },
    doctor: {
      name: 'Dr. med. [Name]',
      title: 'Specialist in Gynaecology & Obstetrics (FMH Board Certified) | Menopause Specialist',
      bio: 'Dr. [Name] is one of fewer than [X] physicians in Switzerland with specialist menopause certification. With [X] years of clinical experience in perimenopause, menopause, and hormone therapy, Dr. [Name] brings the expertise that most doctors simply were not trained to provide. 45\u201360 minutes per consultation because menopause is not a 10-minute conversation. Full health profile review before your session because repeating your story to yet another doctor who doesn\u2019t listen is part of the problem we\u2019re solving.',
      badges: ['FMH Board Certified', 'Menopause Specialist', 'Evidence-Based Medicine', 'Telehealth from Z\u00FCrich'],
    },
    testimonials: {
      title: 'What our patients say',
      items: [
        { quote: 'My gynaecologist told me to just wait it out. Here, for the first time, someone actually listened \u2014 and after 45 minutes I had a concrete plan.', attribution: 'K., 48, Z\u00FCrich' },
        { quote: 'In 45 minutes I had more clarity than in three years with different doctors. I finally knew what was happening to me.', attribution: 'S., 52, Winterthur' },
        { quote: 'The prescription was at my pharmacy the same day. My GP had put me on antidepressants for months without ever discussing menopause.', attribution: 'M., 46, Z\u00FCrich' },
      ],
    },
    pricing: {
      title: 'Your consultation',
      price: 'CHF 300',
      included: [
        '45\u201360 min video consultation with menopause specialist',
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
      { q: 'Do I need a referral?', a: 'No. In Switzerland, you can see a gynaecologist directly without a GP referral. You simply book and pay.' },
      { q: 'Is the consultation covered by health insurance?', a: 'The CHF 300 consultation fee is self-pay. However, any medications prescribed (HRT, progesterone, etc.) are covered by your Grundversicherung if they are on the Spezialit\u00E4tenliste. Some Zusatzversicherung plans also cover prevention and complementary consultations \u2014 check with your insurer.' },
      { q: 'Will I be prescribed hormones?', a: 'That depends entirely on your symptoms, medical history, and preferences. Our doctor will discuss all evidence-based options with you \u2014 hormonal, non-hormonal, and lifestyle-based \u2014 and together you\u2019ll decide what\u2019s right for your situation. There is no one-size-fits-all approach. That\u2019s exactly why a specialist consultation exists.' },
      { q: 'My Estradot patches are no longer covered by insurance. Can you help?', a: 'Yes. Sandoz removed Estradot from the Spezialit\u00E4tenliste in September 2025 due to a price dispute. Several alternative HRT products remain fully covered, including transdermal estradiol gels (Oestrogel, Estreva), oral formulations, and vaginal preparations. Our doctor will help you find the best covered alternative for your situation.' },
      { q: 'What makes this different from seeing my regular gynaecologist?', a: 'Most gynaecologists in Switzerland have not received specialist menopause training \u2014 it is not part of the core FMH curriculum. Our doctors have completed additional menopause-specific certification and stay current with the latest evidence on hormone therapy. 45\u201360 minutes per consultation (versus the typical 15\u201320 minutes), full medical history reviewed in advance, and a written treatment plan. This is specialist menopause care, not a general wellness check.' },
      { q: 'What happens after the consultation?', a: 'You receive your treatment plan and prescription within 24 hours. The prescription is sent electronically to your chosen pharmacy. You can email follow-up questions for 7 days. If you need ongoing support, we offer a subscription care programme (coming soon).' },
      { q: 'What symptoms do you treat?', a: 'Hot flashes, night sweats, sleep disruption, mood changes, anxiety, brain fog, joint pain, vaginal dryness, low libido, weight changes, heart palpitations, and fatigue. If your symptoms are related to perimenopause or menopause, we can help.' },
      { q: 'How does the video consultation work?', a: 'After booking you receive a link for a secure video call (encrypted, Swiss-hosted). You connect from your phone, tablet, or computer. No software to install. Your doctor is based in Z\u00FCrich and licensed to practise in Kanton Z\u00FCrich.' },
    ],
    footer: {
      tagline: 'Telehealth from Z\u00FCrich',
      contact: 'contact@equivie.ch',
      medical: 'Medical Director: Dr. med. [Name], FMH Board Certified Gynaecology & Obstetrics',
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

/* ──────────────────── COMPONENT ──────────────────── */
export default function LandingV3() {
  const containerRef = useFadeIn();
  const [lang, setLang] = useState('en');
  const [openFaq, setOpenFaq] = useState(null);

  /* Quiz state */
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizScreen, setQuizScreen] = useState('questions');
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedValue, setSelectedValue] = useState(null);
  const [showEmpathy, setShowEmpathy] = useState(false);
  const [email, setEmail] = useState('');
  const quizRef = useRef(null);

  const t = content[lang];
  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  /* Current quiz step */
  const currentStep = quizSteps[stepIndex];
  const progress = quizSteps.length > 0 ? ((stepIndex) / quizSteps.length) * 100 : 0;
  const progressWithCurrent = quizSteps.length > 0 ? ((stepIndex + 1) / quizSteps.length) * 100 : 0;

  /* Handle option selection */
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

  /* Results profile */
  const profile = quizScreen === 'results' ? getProfile(answers, lang) : null;

  /* Severity bar color */
  function severityColor(pct) {
    if (pct <= 20) return 'bg-sage';
    if (pct <= 45) return 'bg-rose/70';
    if (pct <= 70) return 'bg-rose';
    return 'bg-red-700';
  }

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col">

      {/* ════════════════════════════════════════════
          HEADER
          ════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16">
          <a href="#" className="font-serif text-xl tracking-tight">
            <span className="text-forest">Equi</span><span className="text-sage font-bold">vie</span>
          </a>
          <div className="flex items-center gap-6">
            <div className="flex gap-1">
              <button
                onClick={() => setLang('de')}
                className={`font-sans text-xs px-2 py-1 rounded-[2px] border-0 cursor-pointer transition-colors ${lang === 'de' ? 'bg-forest text-cream' : 'bg-transparent text-stone hover:text-forest'}`}
              >
                DE
              </button>
              <button
                onClick={() => setLang('en')}
                className={`font-sans text-xs px-2 py-1 rounded-[2px] border-0 cursor-pointer transition-colors ${lang === 'en' ? 'bg-forest text-cream' : 'bg-transparent text-stone hover:text-forest'}`}
              >
                EN
              </button>
            </div>
            <a
              href="#pricing"
              className="hidden sm:inline-block bg-forest text-cream font-sans font-medium text-xs uppercase tracking-wider px-5 py-2.5 rounded-[2px] hover:bg-forest-mid transition-colors"
            >
              {lang === 'de' ? 'Termin buchen' : 'Book now'}
            </a>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════ */}
      <section className="fade-in-section bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <hr className="rule mb-8" />
              <h2 className="font-serif font-bold text-forest text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-tight mb-6">
                {t.hero.headline}
              </h2>
              <p className="font-sans text-stone text-lg leading-relaxed mb-10 max-w-lg">
                {t.hero.subhead}
              </p>
              <a
                href="#pricing"
                className="inline-block bg-forest text-cream font-sans font-medium text-sm uppercase tracking-wider px-8 py-4 rounded-[2px] hover:bg-forest-mid transition-colors"
              >
                {t.hero.cta}
              </a>
              <p className="font-sans text-stone text-sm mt-4">{t.hero.note}</p>
            </div>

            {/* Right — placeholder image area */}
            <div className="relative bg-forest rounded-lg min-h-[420px] flex items-center justify-center overflow-hidden">
              <div className="w-56 h-56 rounded-full bg-forest-mid/60 flex items-center justify-center">
                <span className="font-sans text-cream/40 text-sm text-center px-6">Foto</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-forest-mid/80 backdrop-blur-sm px-8 py-5 rounded-b-lg">
                <p className="font-body italic text-cream/80 text-sm leading-relaxed">
                  {lang === 'de'
                    ? 'Ihre Gesundheit verdient mehr als 10 Minuten.'
                    : 'Your health deserves more than 10 minutes.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          QUIZ BAR (collapsible)
          ════════════════════════════════════════════ */}
      <section ref={quizRef} className="bg-rose-pale border-y border-rose/20">
        {/* Collapsed bar */}
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

        {/* Expanded quiz */}
        {(quizOpen || quizScreen === 'results') && (
          <div className="max-w-3xl mx-auto px-6 lg:px-10 py-12 lg:py-16">

            {/* Close button (only while answering) */}
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

            {/* ── QUESTION SCREEN ── */}
            {quizScreen === 'questions' && currentStep && (
              <div>
                {/* Progress bar */}
                <div className="w-full h-1.5 bg-white/60 rounded-full mb-8 overflow-hidden">
                  <div
                    className="h-full bg-rose rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${showEmpathy ? progressWithCurrent : progress}%` }}
                  />
                </div>

                {/* Domain label */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl" role="img" aria-label={currentStep.domain}>{currentStep.icon}</span>
                  <span className="font-sans text-rose text-sm font-medium uppercase tracking-wider">
                    {currentStep.domain}
                  </span>
                </div>

                {/* Question */}
                <h2 className="font-serif font-bold text-forest text-2xl md:text-3xl leading-snug mb-3">
                  {currentStep.question[lang]}
                </h2>
                <p className="font-sans text-stone/70 text-sm leading-relaxed mb-8 max-w-xl">
                  {currentStep.context[lang]}
                </p>

                {/* Options */}
                <div className="space-y-3">
                  {currentStep.options.map((option, i) => {
                    const isSelected = selectedValue === option.value;
                    return (
                      <button
                        key={i}
                        onClick={() => !showEmpathy && handleOptionSelect(option.value)}
                        disabled={showEmpathy}
                        className={`w-full text-left flex items-center gap-4 border rounded-[2px] p-5 transition-all cursor-pointer bg-white ${
                          isSelected
                            ? 'border-forest bg-forest/5 ring-1 ring-forest/20'
                            : showEmpathy
                              ? 'border-border opacity-50 cursor-default'
                              : 'border-border hover:border-sage hover:shadow-sm'
                        }`}
                      >
                        <span className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          isSelected ? 'border-forest' : 'border-stone/30'
                        }`}>
                          {isSelected && (
                            <span className="w-2.5 h-2.5 rounded-full bg-forest" />
                          )}
                        </span>
                        <span className={`font-sans text-sm leading-relaxed ${isSelected ? 'text-forest font-medium' : 'text-stone'}`}>
                          {option.label[lang]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Empathy message */}
                {showEmpathy && selectedValue !== null && currentStep.empathy[selectedValue] && (
                  <div className="mt-6 bg-sage/10 border border-sage/30 rounded-[2px] p-5">
                    <p className="font-sans text-forest text-sm leading-relaxed">
                      {currentStep.empathy[selectedValue][lang]}
                    </p>
                  </div>
                )}

                {/* Step counter */}
                <p className="font-sans text-stone/40 text-xs mt-8 text-center">
                  {stepIndex + 1} / {quizSteps.length}
                </p>
              </div>
            )}

            {/* ── RESULTS SCREEN ── */}
            {quizScreen === 'results' && profile && (
              <div>
                <div className="text-center mb-10">
                  <hr className="rule mb-8 mx-auto" />
                  <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl leading-tight mb-3">
                    {lang === 'de' ? 'Ihre Ergebnisse' : 'Your results'}
                  </h2>
                  <p className="font-sans text-stone text-base">
                    {lang === 'de'
                      ? 'Basierend auf Ihren Antworten, hier ist eine Einschätzung.'
                      : 'Based on your answers, here\u2019s a snapshot.'}
                  </p>
                </div>

                {/* Severity bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-sans font-medium text-forest text-lg">{profile.level}</span>
                    <span className="font-sans text-stone/60 text-sm">{profile.pct}%</span>
                  </div>
                  <div className="w-full h-3 bg-white/60 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ease-out ${severityColor(profile.pct)}`}
                      style={{ width: `${profile.pct}%` }}
                    />
                  </div>
                  <p className="font-sans text-stone text-sm mt-3">{profile.message}</p>
                </div>

                {/* Top concerns */}
                {profile.topConcerns.length > 0 && (
                  <div className="mb-8">
                    <h3 className="font-sans font-medium text-forest text-sm uppercase tracking-wider mb-3">
                      {lang === 'de' ? 'Ihre Hauptbereiche' : 'Your top areas of concern'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.topConcerns.map((concern) => (
                        <span key={concern.id} className="inline-flex items-center gap-1.5 tag border-rose/30 text-forest text-sm">
                          <span>{concern.icon}</span> {concern.domain}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Validation message */}
                <div className="bg-sage/10 border-l-4 border-sage rounded-r-[2px] p-6 mb-10">
                  <p className="font-sans text-forest text-sm leading-relaxed">
                    {profile.detail}
                  </p>
                </div>

                {/* Booking CTA */}
                <div className="bg-forest rounded-[2px] p-8 md:p-10 text-center mb-8">
                  <h3 className="font-serif font-bold text-cream text-2xl md:text-3xl mb-3">
                    {lang === 'de'
                      ? 'Sprechen Sie mit einer Menopause-Fachperson'
                      : 'Talk to a menopause specialist'}
                  </h3>
                  <p className="font-sans text-cream/70 text-sm leading-relaxed mb-6 max-w-md mx-auto">
                    {lang === 'de'
                      ? '45–60 Minuten Video-Konsultation. Diagnose, Behandlungsplan und Rezept — in einer Sitzung.'
                      : '45–60 min video consultation. Diagnosis, treatment plan, and prescription — in one session.'}
                  </p>
                  <a
                    href="#pricing"
                    className="inline-block bg-rose text-cream font-sans font-medium text-sm uppercase tracking-wider px-10 py-4 rounded-[2px] hover:bg-rose/90 transition-colors"
                  >
                    {lang === 'de' ? 'Termin buchen — CHF 300' : 'Book your consultation — CHF 300'}
                  </a>
                </div>

                {/* Retake */}
                <div className="text-center">
                  <button
                    onClick={() => {
                      setQuizScreen('questions');
                      setStepIndex(0);
                      setAnswers({});
                      setSelectedValue(null);
                      setShowEmpathy(false);
                      setEmail('');
                    }}
                    className="font-sans text-stone/50 text-xs underline bg-transparent border-0 cursor-pointer hover:text-stone transition-colors"
                  >
                    {lang === 'de' ? 'Check-in wiederholen' : 'Retake check-in'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ════════════════════════════════════════════
          STATS
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
          HOW IT WORKS
          ════════════════════════════════════════════ */}
      <section className="fade-in-section bg-forest">
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
          YOUR DOCTOR
          ════════════════════════════════════════════ */}
      <section className="fade-in-section bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="bg-cream-dark border border-border rounded-lg aspect-[4/5] flex items-center justify-center max-w-md mx-auto lg:mx-0 w-full">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-sage/20 mx-auto mb-4 flex items-center justify-center">
                  <span className="font-serif text-sage text-3xl">F\u00C4</span>
                </div>
                <p className="font-sans text-stone-light text-sm">
                  {lang === 'de' ? 'Foto Ihrer Fachperson' : 'Photo of your specialist'}
                </p>
              </div>
            </div>
            <div>
              <span className="tag">
                {lang === 'de' ? 'Ihre Fachperson' : 'Your specialist'}
              </span>
              <hr className="rule mt-5 mb-6" />
              <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl mb-2">
                {t.doctor.name}
              </h2>
              <p className="font-sans text-sage text-sm font-medium mb-6">
                {t.doctor.title}
              </p>
              <p className="font-body text-stone text-base leading-[1.8] mb-8">
                {t.doctor.bio}
              </p>
              <div className="flex flex-wrap gap-2">
                {t.doctor.badges.map((badge, i) => (
                  <span key={i} className="tag">{badge}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          TESTIMONIALS
          ════════════════════════════════════════════ */}
      <section className="fade-in-section bg-rose-pale">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="text-center mb-14">
            <span className="tag">{lang === 'de' ? 'Erfahrungen' : 'Testimonials'}</span>
            <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl lg:text-5xl mt-5">
              {t.testimonials.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {t.testimonials.items.map((item, i) => (
              <div key={i} className="bg-white rounded-[2px] p-8 shadow-sm">
                <span className="font-serif text-rose text-5xl leading-none select-none" aria-hidden="true">&ldquo;</span>
                <p className="font-body text-stone text-sm leading-[1.8] mt-3 mb-6">
                  {item.quote}
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-sans font-medium text-forest text-sm">{item.attribution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          PRICING
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
                    <span className="text-stone-light mt-px">&mdash;</span>
                    {item}
                  </p>
                ))}
              </div>
              <a
                href="#"
                className="block w-full bg-forest text-cream font-sans font-medium text-sm uppercase tracking-wider px-8 py-4 rounded-[2px] hover:bg-forest-mid transition-colors text-center"
              >
                {t.pricing.cta}
              </a>
              <p className="font-sans text-stone-light text-xs mt-4">
                {t.pricing.note}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FAQ
          ════════════════════════════════════════════ */}
      <section className="fade-in-section bg-cream-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="text-center mb-14">
            <span className="tag">FAQ</span>
            <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl lg:text-5xl mt-5">
              {lang === 'de' ? 'H\u00E4ufig gestellte Fragen' : 'Frequently asked questions'}
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
      <footer className="bg-forest text-cream/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <p className="font-serif text-2xl font-bold text-cream">
                <span className="text-cream">Equi</span><span className="text-sage font-bold">vie</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-cream/60 font-light max-w-md">
                {t.footer.tagline}
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs text-cream/40">
                <span>Swiss-regulated</span>
                <span className="w-1 h-1 rounded-full bg-sage" />
                <span>nDSG compliant</span>
                <span className="w-1 h-1 rounded-full bg-sage" />
                <span>HIN e-prescription</span>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-medium tracking-widest uppercase text-cream/40 mb-4 font-sans">
                {lang === 'de' ? 'Kontakt' : 'Contact'}
              </h4>
              <p className="font-sans text-cream/70 text-sm">{t.footer.contact}</p>
              <p className="font-sans text-cream/40 text-xs leading-relaxed mt-3">{t.footer.medical}</p>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs font-medium tracking-widest uppercase text-cream/40 mb-4 font-sans">Legal</h4>
              <div className="flex flex-col gap-2.5">
                <a href="#" className="text-sm text-cream/70 hover:text-cream transition-colors">Impressum</a>
                <a href="#" className="text-sm text-cream/70 hover:text-cream transition-colors">Datenschutz</a>
                <a href="#" className="text-sm text-cream/70 hover:text-cream transition-colors">AGB</a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-cream/10">
            <p className="text-xs text-cream/30">
              &copy; {new Date().getFullYear()} Equivie. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
