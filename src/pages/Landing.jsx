import { useState } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';

/* ──────────────────── CONTENT DATA ──────────────────── */
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
      name: 'Dr. med. [Name]',
      title: 'Facharzt/Fachärztin für Gynäkologie & Geburtshilfe (FMH) | Menopause-Spezialisierung',
      bio: 'Dr. [Name] gehört zu den wenigen Fachpersonen in der Schweiz mit einer spezialisierten Menopause-Zertifizierung. Mit [X] Jahren klinischer Erfahrung in Perimenopause, Menopause und Hormontherapie bringt Dr. [Name] die Expertise, die den meisten Ärztinnen und Ärzten in der Ausbildung schlicht nicht vermittelt wurde. 45–60 Minuten pro Konsultation, weil Menopause kein 10-Minuten-Gespräch ist. Vorab-Review Ihres gesamten Gesundheitsprofils, weil Ihre Geschichte nicht noch einmal erzählt werden sollte.',
      badges: ['FMH-zertifiziert', 'Menopause-Spezialisierung', 'Evidenzbasierte Medizin', 'Telemedizin aus Zürich'],
    },
    symptoms: {
      title: 'Was wir behandeln',
      items: ['Hitzewallungen', 'Schlafstörungen', 'Stimmungsschwankungen', 'Vaginale Trockenheit', 'Gelenkschmerzen', 'Gewichtsveränderungen', 'Gehirnnebel', 'Libidoverlust'],
      note: 'Hormontherapie (HRT), nicht-hormonelle Alternativen und Lebensstil-Empfehlungen — evidenzbasiert und individuell auf Ihre Bedürfnisse, Ihr Risikoprofil und Ihre Präferenzen abgestimmt.',
    },
    testimonials: {
      title: 'Was unsere Patientinnen sagen',
      items: [
        { quote: 'Meine Gynäkologin sagte mir, ich solle einfach abwarten. Hier hat mir zum ersten Mal jemand wirklich zugehört — und nach 45 Minuten hatte ich einen konkreten Plan.', attribution: 'K., 48, Zürich' },
        { quote: 'In 45 Minuten hatte ich mehr Klarheit als in drei Jahren bei verschiedenen Ärzten. Ich wusste endlich, was mit mir los ist.', attribution: 'S., 52, Winterthur' },
        { quote: 'Das Rezept war noch am selben Tag in meiner Apotheke. Mein Hausarzt hatte mich monatelang auf Antidepressiva gesetzt, ohne je über die Wechseljahre zu sprechen.', attribution: 'M., 46, Zürich' },
      ],
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
      { q: 'Brauche ich eine Überweisung?', a: 'Nein. In der Schweiz können Sie direkt zu einer gynäkologischen Fachperson gehen, ohne Überweisung. Sie buchen einfach und bezahlen.' },
      { q: 'Wird die Konsultation von der Krankenkasse übernommen?', a: 'Die Konsultationsgebühr von CHF 300 ist eine Selbstzahlerleistung. Die verschriebenen Medikamente (HRT, Progesteron etc.) werden jedoch von der Grundversicherung übernommen, sofern sie auf der Spezialitätenliste stehen. Einige Zusatzversicherungen decken auch Präventions- und Komplementärkonsultationen ab — erkundigen Sie sich bei Ihrer Versicherung.' },
      { q: 'Werde ich Hormone verschrieben bekommen?', a: 'Das hängt ganz von Ihren Symptomen, Ihrer Krankengeschichte und Ihren Präferenzen ab. Ihre Fachperson bespricht alle evidenzbasierten Optionen mit Ihnen — hormonell, nicht-hormonell und lebensstilbasiert — und gemeinsam entscheiden Sie, was für Ihre Situation richtig ist. Es gibt keinen Einheitsansatz. Genau dafür gibt es die Spezialkonsultation.' },
      { q: 'Meine Estradot-Pflaster werden nicht mehr von der Versicherung gedeckt. Können Sie helfen?', a: 'Ja. Sandoz hat Estradot im September 2025 aufgrund eines Preisstreits von der Spezialitätenliste genommen. Mehrere alternative HRT-Produkte bleiben vollständig gedeckt, darunter transdermale Östradiol-Gele (Oestrogel, Estreva), orale Formulierungen und vaginale Präparate. Ihre Fachperson hilft Ihnen, die beste gedeckte Alternative für Ihre Situation zu finden.' },
      { q: 'Was unterscheidet Equivie von meiner regulären Gynäkologin oder meinem Gynäkologen?', a: 'Die meisten Gynäkologinnen und Gynäkologen in der Schweiz haben keine spezialisierte Menopause-Ausbildung erhalten — sie ist nicht Teil des FMH-Kerncurriculums. Unsere Fachpersonen haben eine zusätzliche Menopause-spezifische Zertifizierung abgeschlossen und sind auf dem neuesten Stand der Evidenz zur Hormontherapie. 45–60 Minuten pro Konsultation (statt der üblichen 15–20 Minuten), vorab-Review Ihrer gesamten Krankengeschichte und ein schriftlicher Behandlungsplan. Das ist spezialisierte Menopause-Versorgung, kein allgemeiner Wellness-Check.' },
      { q: 'Was passiert nach der Konsultation?', a: 'Sie erhalten Ihren Behandlungsplan und Ihr Rezept innerhalb von 24 Stunden. Das Rezept wird elektronisch an Ihre gewählte Apotheke gesendet. Sie können 7 Tage lang Rückfragen per E-Mail stellen. Wenn Sie fortlaufende Betreuung benötigen, bieten wir ein Abonnement-Betreuungsprogramm an (demnächst verfügbar).' },
      { q: 'Welche Beschwerden werden behandelt?', a: 'Hitzewallungen, Nachtschweiss, Schlafstörungen, Stimmungsschwankungen, Angst, Gehirnnebel, Gelenkschmerzen, vaginale Trockenheit, Libidoverlust, Gewichtsveränderungen, Herzrasen und Erschöpfung. Wenn Ihre Symptome mit der Perimenopause oder Menopause zusammenhängen, können wir helfen.' },
      { q: 'Wie funktioniert die Video-Konsultation?', a: 'Nach der Buchung erhalten Sie einen Link für einen sicheren Videoanruf (verschlüsselt, auf Schweizer Servern gehostet). Sie verbinden sich von Ihrem Smartphone, Tablet oder Computer. Keine Software-Installation nötig. Ihre Fachperson ist in Zürich ansässig und im Kanton Zürich zugelassen.' },
    ],
    footerCta: 'Bereit? Ihre Wechseljahre verdienen mehr als Abwarten.',
    footer: {
      tagline: 'Telemedizin aus Zürich',
      contact: 'kontakt@equivie.ch',
      medical: 'Ärztliche Leitung: Dr. med. [Name], FMH Gynäkologie & Geburtshilfe',
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
      name: 'Dr. med. [Name]',
      title: 'Specialist in Gynaecology & Obstetrics (FMH Board Certified) | Menopause Specialist',
      bio: 'Dr. [Name] is one of fewer than [X] physicians in Switzerland with specialist menopause certification. With [X] years of clinical experience in perimenopause, menopause, and hormone therapy, Dr. [Name] brings the expertise that most doctors simply were not trained to provide. 45–60 minutes per consultation because menopause is not a 10-minute conversation. Full health profile review before your session because repeating your story to yet another doctor who doesn\u2019t listen is part of the problem we\u2019re solving.',
      badges: ['FMH Board Certified', 'Menopause Specialist', 'Evidence-Based Medicine', 'Telehealth from Zürich'],
    },
    symptoms: {
      title: 'What we treat',
      items: ['Hot flashes', 'Sleep disruption', 'Mood changes', 'Vaginal dryness', 'Joint pain', 'Weight changes', 'Brain fog', 'Low libido'],
      note: 'Hormone therapy (HRT), non-hormonal alternatives, and lifestyle recommendations — evidence-based and personalised to your needs, your risk profile, and your preferences.',
    },
    testimonials: {
      title: 'What our patients say',
      items: [
        { quote: 'My gynaecologist told me to just wait it out. Here, for the first time, someone actually listened — and after 45 minutes I had a concrete plan.', attribution: 'K., 48, Zürich' },
        { quote: 'In 45 minutes I had more clarity than in three years with different doctors. I finally knew what was happening to me.', attribution: 'S., 52, Winterthur' },
        { quote: 'The prescription was at my pharmacy the same day. My GP had put me on antidepressants for months without ever discussing menopause.', attribution: 'M., 46, Zürich' },
      ],
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
      { q: 'Do I need a referral?', a: 'No. In Switzerland, you can see a gynaecologist directly without a GP referral. You simply book and pay.' },
      { q: 'Is the consultation covered by health insurance?', a: 'The CHF 300 consultation fee is self-pay. However, any medications prescribed (HRT, progesterone, etc.) are covered by your Grundversicherung if they are on the Spezialitätenliste. Some Zusatzversicherung plans also cover prevention and complementary consultations — check with your insurer.' },
      { q: 'Will I be prescribed hormones?', a: 'That depends entirely on your symptoms, medical history, and preferences. Our doctor will discuss all evidence-based options with you — hormonal, non-hormonal, and lifestyle-based — and together you\u2019ll decide what\u2019s right for your situation. There is no one-size-fits-all approach. That\u2019s exactly why a specialist consultation exists.' },
      { q: 'My Estradot patches are no longer covered by insurance. Can you help?', a: 'Yes. Sandoz removed Estradot from the Spezialitätenliste in September 2025 due to a price dispute. Several alternative HRT products remain fully covered, including transdermal estradiol gels (Oestrogel, Estreva), oral formulations, and vaginal preparations. Our doctor will help you find the best covered alternative for your situation.' },
      { q: 'What makes this different from seeing my regular gynaecologist?', a: 'Most gynaecologists in Switzerland have not received specialist menopause training — it is not part of the core FMH curriculum. Our doctors have completed additional menopause-specific certification and stay current with the latest evidence on hormone therapy. 45–60 minutes per consultation (versus the typical 15–20 minutes), full medical history reviewed in advance, and a written treatment plan. This is specialist menopause care, not a general wellness check.' },
      { q: 'What happens after the consultation?', a: 'You receive your treatment plan and prescription within 24 hours. The prescription is sent electronically to your chosen pharmacy. You can email follow-up questions for 7 days. If you need ongoing support, we offer a subscription care programme (coming soon).' },
      { q: 'What symptoms do you treat?', a: 'Hot flashes, night sweats, sleep disruption, mood changes, anxiety, brain fog, joint pain, vaginal dryness, low libido, weight changes, heart palpitations, and fatigue. If your symptoms are related to perimenopause or menopause, we can help.' },
      { q: 'How does the video consultation work?', a: 'After booking you receive a link for a secure video call (encrypted, Swiss-hosted). You connect from your phone, tablet, or computer. No software to install. Your doctor is based in Zürich and licensed to practise in Kanton Zürich.' },
    ],
    footerCta: 'Ready? Your menopause deserves more than waiting it out.',
    footer: {
      tagline: 'Telehealth from Zürich',
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
  const [lang, setLang] = useState('de');
  const [openFaq, setOpenFaq] = useState(null);
  const t = content[lang];

  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col">

      {/* ════════════════════════════════════════════
          HEADER — Minimal, single-page
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
          4. YOUR DOCTOR
          ════════════════════════════════════════════ */}
      <section className="fade-in-section bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Photo placeholder */}
            <div className="bg-cream-dark border border-border rounded-lg aspect-[4/5] flex items-center justify-center max-w-md mx-auto lg:mx-0 w-full">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-sage/20 mx-auto mb-4 flex items-center justify-center">
                  <span className="font-serif text-sage text-3xl">FÄ</span>
                </div>
                <p className="font-sans text-stone-light text-sm">
                  {lang === 'de' ? 'Foto Ihrer Fachperson' : 'Photo of your specialist'}
                </p>
              </div>
            </div>

            {/* Bio */}
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
          6. TESTIMONIALS
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
          9. FOOTER CTA
          ════════════════════════════════════════════ */}
      <section className="fade-in-section bg-forest relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(196,149,122,0.15)_0%,transparent_70%)]" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28 text-center">
          <h2 className="font-serif font-bold text-cream text-3xl md:text-4xl lg:text-5xl mb-10 leading-[1.1]">
            {t.footerCta}
          </h2>
          <a
            href="#pricing"
            className="inline-block bg-rose text-cream font-sans font-medium text-sm uppercase tracking-wider px-10 py-4 rounded-[2px] hover:bg-rose/90 transition-colors"
          >
            {t.pricing.cta}
          </a>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════════ */}
      <footer className="bg-charcoal">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
          <div className="grid md:grid-cols-3 gap-10 items-start">
            {/* Brand */}
            <div>
              <p className="font-serif text-xl tracking-tight mb-2">
                <span className="text-cream">Equi</span><span className="text-sage font-bold">vie</span>
              </p>
              <p className="font-sans text-cream/40 text-sm">{t.footer.tagline}</p>
            </div>

            {/* Contact */}
            <div>
              <p className="font-sans text-cream/60 text-sm mb-1">{t.footer.contact}</p>
              <p className="font-sans text-cream/40 text-xs leading-relaxed mt-3">{t.footer.medical}</p>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-2 md:items-end">
              <a href="#" className="font-sans text-cream/60 text-sm hover:text-cream transition-colors">Impressum</a>
              <a href="#" className="font-sans text-cream/60 text-sm hover:text-cream transition-colors">Datenschutz</a>
            </div>
          </div>

          <div className="border-t border-cream/10 mt-10 pt-6">
            <p className="font-sans text-cream/30 text-xs text-center">
              &copy; {new Date().getFullYear()} Equivie. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
