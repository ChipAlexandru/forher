import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useFadeIn } from '../hooks/useFadeIn';
import QuizModal from '../components/QuizModal';

/* ──────────────────── FAQ DATA ──────────────────── */
const faqData = [
  {
    question: 'Ist das legal in der Schweiz?',
    answer: 'Ja, Telemedizin ist in der Schweiz vollumfänglich legal und durch das Heilmittelgesetz sowie die kantonalen Arztgesetze geregelt. Unsere Ärztinnen verfügen über eine Berufsausübungsbewilligung in der Schweiz und erbringen ihre Leistungen im Einklang mit den Standesregeln der FMH. Gleichzeitig sind wir bei der Swissmedic registriert und halten alle datenschutzrechtlichen Vorgaben des revidierten Datenschutzgesetzes (nDSG) ein. Sie erhalten dieselbe medizinische Qualität wie bei einem Praxisbesuch — lediglich der Ort der Konsultation ist ein anderer.',
  },
  {
    question: 'Welche Medikamente können verschrieben werden?',
    answer: 'Unsere Gynäkologinnen können das gesamte Spektrum der evidenzbasierten Hormonersatztherapie (HRT) verschreiben, darunter transdermale Östrogene (Pflaster, Gel, Spray), orale Präparate, Progesteron sowie lokale urogenitale Therapien. Auch nicht-hormonelle Optionen wie selektive Serotonin-Wiederaufnahmehemmer zur Hitzewallungsbehandlung oder Vaginalmoisturizer auf Hyaluronsäurebasis sind möglich. Verschreibungspflichtige Medikamente werden ausschliesslich nach ärztlicher Beurteilung und unter Berücksichtigung Ihrer persönlichen Krankengeschichte sowie allfälliger Kontraindikationen ausgestellt. Ein vollständiges Medikamentenverzeichnis erhalten Sie im Verlauf Ihrer Konsultation.',
  },
  {
    question: 'Übernimmt die Grundversicherung (KVG) die Kosten?',
    answer: 'Telemedizinische Konsultationen sind grundsätzlich KVG-pflichtig, sofern der Leistungserbringer zugelassen ist und die Konsultation medizinisch indiziert ist. In der Praxis hängt die Kostentragung jedoch vom jeweiligen Versicherungsmodell (Hausarztmodell, HMO, Telmed) und dem individuellen Franchisebetrag ab. Wir stellen Ihnen nach jeder Konsultation eine zulagelungsfähige Rechnung aus, die Sie direkt bei Ihrer Krankenkasse einreichen können. Bei Fragen zu Ihrer spezifischen Deckungssituation empfehlen wir, vorab bei Ihrer Krankenkasse nachzufragen.',
  },
  {
    question: 'Wie lange dauert die Erstkonsultation?',
    answer: 'Die Erstkonsultation ist für 45 Minuten angesetzt, damit ausreichend Zeit für eine umfassende Anamnese, die Besprechung Ihrer Symptome und die gemeinsame Erarbeitung eines Therapieplans bleibt. Vor dem Gespräch füllen Sie einen strukturierten Gesundheitsfragebogen aus, der unsere Ärztinnen optimal vorbereitet und die Konsultationszeit effizient nutzt. Folgebesuche dauern in der Regel 20 bis 30 Minuten. Alle Konsultationen finden als verschlüsselte Videokonferenz statt und können von zu Hause oder einem anderen ruhigen Ort aus wahrgenommen werden.',
  },
  {
    question: 'Kann ich meine bestehende Gynäkologin behalten?',
    answer: 'Ja, absolut. Equivie versteht sich als Ergänzung zu Ihrer bestehenden gynäkologischen Betreuung, nicht als Ersatz. Wir legen grossen Wert auf eine nahtlose Zusammenarbeit mit Ihrer behandelnden Ärztin: Mit Ihrem Einverständnis stellen wir nach jeder Konsultation einen strukturierten Arztbericht zu. Körperliche Untersuchungen, Abstrichentnahmen oder bildgebende Verfahren verbleiben selbstverständlich in der Verantwortung Ihrer Gynäkologin vor Ort. Viele unserer Patientinnen nutzen Equivie ergänzend für rasche Anpassungen der Therapie und für Fragen zwischen den regulären Praxisterminen.',
  },
  {
    question: 'Was passiert, wenn ich eine körperliche Untersuchung brauche?',
    answer: 'Sollte unsere Ärztin im Verlauf der Konsultation eine körperliche Untersuchung, ein Labor oder bildgebende Diagnostik für notwendig erachten, wird sie Sie an eine geeignete Praxis oder ein Spital in Ihrer Nähe überweisen. Die Überweisungsschreiben werden digital ausgestellt und können direkt per E-Mail oder über das Patientenportal an die Fachstelle weitergeleitet werden. Wir pflegen ein wachsendes Netzwerk von Kooperationspartnerinnen in der ganzen Schweiz und unterstützen Sie bei der Koordination. Eine Behandlung, die aus medizinischen Gründen eine Präsenzuntersuchung erfordert, wird nicht gegen Ihren Vorteil telemedizinisch durchgeführt.',
  },
  {
    question: 'Wie werden Rezepte zugestellt?',
    answer: 'Verschreibungen erfolgen ausschliesslich elektronisch über das von Ihnen bevorzugte Schweizer Partnerunternehmen. Wir arbeiten mit mehreren zertifizierten Online-Apotheken zusammen, die eine diskreten Lieferung innert ein bis drei Werktagen in die ganze Schweiz anbieten. Alternativ können Sie das Rezept auch digital an Ihre lokale Apotheke weiterleiten lassen, wenn Sie dort einlösen möchten. Das Rezept wird in Ihrem persönlichen Patientenportal archiviert und ist jederzeit abrufbar.',
  },
  {
    question: 'Sind meine Daten sicher (nDSG)?',
    answer: 'Der Schutz Ihrer Gesundheitsdaten hat für uns höchste Priorität. Alle Daten werden ausschliesslich auf Schweizer Servern gespeichert und nach den Anforderungen des revidierten Datenschutzgesetzes (nDSG, in Kraft seit September 2023) verarbeitet. Die Kommunikation zwischen Ihnen und unserer Plattform ist durchgehend Ende-zu-Ende-verschlüsselt; Videokonferenzen werden nicht aufgezeichnet. Ihre Daten werden niemals an Dritte weitergegeben oder für Werbezwecke verwendet. Auf Wunsch können Sie jederzeit die vollständige Löschung Ihrer Daten verlangen.',
  },
  {
    question: 'Was, wenn ich bereits eine HRT nehme?',
    answer: 'Wenn Sie bereits eine Hormonersatztherapie erhalten, ist das kein Hindernis — im Gegenteil. Unsere Ärztinnen sind auf die Beurteilung und Optimierung bestehender HRT-Therapien spezialisiert, etwa wenn Symptome trotz Therapie persistieren, Dosisanpassungen notwendig sind oder ein Wechsel des Applikationswegs diskutiert werden soll. Bitte halten Sie Ihre aktuellen Präparate und — falls vorhanden — die zuletzt gemessenen Hormonspiegel bereit. Auf Wunsch übernehmen wir auch die Folgeverschreibung, sofern dies medizinisch sinnvoll und klinisch vertretbar ist.',
  },
  {
    question: 'Können Ärztinnen kantonsübergreifend verschreiben?',
    answer: 'Ja. In der Schweiz gilt das Territorialprinzip auf Bundesebene: Eine Ärztin mit einer in einem Kanton anerkannten Berufsausübungsbewilligung darf grundsätzlich Patientinnen in der gesamten Schweiz telemedizinisch behandeln und Rezepte ausstellen. Alle Ärztinnen bei Equivie verfügen über eine gültige Berufsausübungsbewilligung und sind im Medizinalberufsregister (MedReg) des Bundes eingetragen. Ihre Wohnadresse hat somit keinen Einfluss auf die Verfügbarkeit unserer Leistungen. Wir sind in allen 26 Kantonen sowie im Fürstentum Liechtenstein tätig.',
  },
];

/* ──────────────────── PHYSICIAN DATA ──────────────────── */
const physicians = [
  {
    name: 'Dr. med. Katharina Müller',
    initials: 'KM',
    specialty: 'FMH Gynäkologie & Geburtshilfe',
    location: 'Zürich',
    languages: ['DE', 'EN'],
  },
  {
    name: 'Dr. méd. Sophie Perret',
    initials: 'SP',
    specialty: 'FMH Gynäkologie & Geburtshilfe',
    location: 'Genf',
    languages: ['FR', 'EN'],
  },
  {
    name: 'Dr. med. Marina Bianchi',
    initials: 'MB',
    specialty: 'FMH Gynäkologie & Geburtshilfe',
    location: 'Lugano',
    languages: ['IT', 'DE'],
  },
];

/* ──────────────────── COMPONENT ──────────────────── */
export default function Home({ quizOpen, setQuizOpen }) {
  const { t } = useLang();
  const containerRef = useFadeIn();
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [expandedSymptom, setExpandedSymptom] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  /* Fallback data for translation keys that may not exist yet */
  const problemStats = (t.problem && t.problem.stats) || [
    { value: '<10', unit: '%', label: 'der betroffenen Frauen erhalten eine adäquate Behandlung' },
    { value: '8', unit: 'Jahre', label: 'durchschnittliche Dauer der Symptome' },
    { value: '1.2', unit: 'Mio.', label: 'Frauen in der Schweiz sind betroffen' },
  ];

  const problemParagraphs = (t.problem && t.problem.paragraphs) || [
    'Die Wechseljahre betreffen jede Frau, doch das Schweizer Gesundheitssystem ist darauf kaum vorbereitet. Wartezeiten von vier bis acht Wochen auf einen Termin bei der Gynäkologin sind die Norm. Viele Ärztinnen haben nur wenige Minuten pro Konsultation, und das Thema Menopause wird in der medizinischen Ausbildung stiefmütterlich behandelt.',
    'Die Folge: Frauen leiden unnötig. Sie verlieren Schlaf, Konzentration und Lebensfreude. Sie reduzieren ihre Arbeitszeit oder geben ihre Karriere auf. Sie zweifeln an sich selbst, obwohl es wirksame, evidenzbasierte Behandlungen gibt.',
    'Equivie wurde gegründet, um diese Versorgungslücke zu schliessen. Wir verbinden Sie mit Spezialistinnen, die sich ausschliesslich der Menopause widmen — ohne Wartezeiten, ohne Zeitdruck, ohne Tabus.',
  ];

  const problemQuote = (t.problem && t.problem.quote) || 'Es darf nicht sein, dass Frauen in einem der reichsten Länder der Welt jahrelang mit behandelbaren Symptomen allein gelassen werden.';

  return (
    <div ref={containerRef}>

      {/* ════════════════════════════════════════════
          1. HERO — Split layout
          ════════════════════════════════════════════ */}
      <section className="fade-in-section bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <div>
              <span className="tag">{(t.hero && t.hero.tag) || 'Die Realität in der Schweiz'}</span>
              <hr className="rule mt-5 mb-6" />
              <h1 className="font-serif font-bold text-forest text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-6">
                {t.hero.headline}
              </h1>
              <p className="font-sans text-stone text-lg leading-relaxed mb-10 max-w-lg">
                {t.hero.subHeadline}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <button
                  onClick={() => setQuizOpen(true)}
                  className="inline-block bg-forest text-cream font-sans font-medium text-sm uppercase tracking-wider px-8 py-4 rounded-[2px] hover:bg-forest-mid transition-colors cursor-pointer border-0"
                >
                  {t.hero.cta}
                </button>
                <a
                  href="#how-it-works"
                  className="inline-block font-sans text-sm text-forest border-b border-forest pb-0.5 hover:text-sage transition-colors mt-3"
                >
                  {t.hero.secondaryCta}
                </a>
              </div>
            </div>

            {/* Right — dark panel */}
            <div className="relative bg-forest rounded-lg p-10 min-h-[480px] flex flex-col items-center justify-center">
              <div className="w-48 h-48 rounded-full bg-forest-mid mb-6" />
              {/* Floating badges */}
              <div className="absolute top-6 right-6 bg-cream/95 rounded-[2px] px-3 py-1.5 text-xs font-sans font-medium text-forest shadow-sm">
                FMH-zertifiziert
              </div>
              <div className="absolute bottom-24 left-6 bg-sage/90 rounded-[2px] px-3 py-1.5 text-xs font-sans font-medium text-cream">
                Swissmedic
              </div>
              {/* Quote overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-forest-mid/80 backdrop-blur-sm px-8 py-5 rounded-b-lg">
                <p className="font-body italic text-cream/80 text-sm leading-relaxed">
                  {(t.hero && t.hero.quote) || 'Jede Frau verdient eine Behandlung, die auf sie zugeschnitten ist — nicht ein Rezept von der Stange.'}
                </p>
                <p className="font-sans text-cream/50 text-xs mt-2">
                  {(t.hero && t.hero.quoteAuthor) || 'Dr. med. Katharina Müller, Leitende Ärztin'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          2. TRUST STRIP — Dark forest bar
          ════════════════════════════════════════════ */}
      <section className="fade-in-section bg-forest">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6">
          <div className="flex flex-wrap justify-center divide-x divide-dotted divide-cream/20">
            {t.trustBar.map((item, i) => (
              <div key={i} className="px-6 lg:px-10 py-2 text-center">
                <p className="font-sans font-medium text-cream text-sm tracking-wide">{item.label}</p>
                <p className="font-sans text-cream/50 text-xs mt-0.5">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          3. PROBLEM SECTION — Sticky left with stats
          ════════════════════════════════════════════ */}
      <section className="fade-in-section bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left — sticky on desktop */}
            <div className="lg:col-span-2 lg:sticky lg:top-28 lg:self-start">
              <span className="tag">{(t.problem && t.problem.tag) || 'Das Problem'}</span>
              <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl lg:text-5xl mt-5 mb-10 leading-[1.1]">
                {(t.problem && t.problem.title) || 'Millionen Frauen. Kaum Versorgung.'}
              </h2>
              <div className="space-y-6">
                {problemStats.map((stat, i) => (
                  <div key={i} className="bg-cream-dark border border-border rounded-[2px] p-6">
                    <p className="font-serif font-bold text-forest text-4xl leading-none">
                      {stat.value}
                      <span className="text-rose text-lg ml-1 font-normal">{stat.unit}</span>
                    </p>
                    <p className="font-sans text-stone text-sm mt-2 leading-relaxed">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — editorial text */}
            <div className="lg:col-span-3">
              <div className="space-y-6 mb-10">
                {problemParagraphs.map((para, i) => (
                  <p key={i} className="font-body text-stone text-base leading-[1.8]">
                    {para}
                  </p>
                ))}
              </div>
              <blockquote className="border-l-2 border-rose pl-6 py-2">
                <p className="font-body italic text-forest text-lg leading-relaxed">
                  {problemQuote}
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          4. HOW IT WORKS — Steps on dark bg
          ════════════════════════════════════════════ */}
      <section id="how-it-works" className="fade-in-section bg-forest">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <span className="tag border-cream/30 text-cream/60">{(t.howItWorks && t.howItWorks.tag) || 'Ihr Weg'}</span>
          <h2 className="font-serif font-bold text-cream text-3xl md:text-4xl lg:text-5xl mt-5 mb-16">
            {t.howItWorks.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(t.howItWorks.detailedSteps || t.howItWorks.steps).slice(0, 4).map((step, i) => (
              <div key={i} className="border border-cream/15 rounded-[2px] p-7">
                <span className="font-serif font-bold text-rose text-3xl">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-serif font-bold text-cream text-lg mt-4 mb-3">{step.title}</h3>
                <p className="font-sans text-cream/60 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          5. SYMPTOMS — 3-column clickable grid
          ════════════════════════════════════════════ */}
      <section id="symptoms" className="fade-in-section bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="text-center mb-14">
            <span className="tag">{(t.symptoms && t.symptoms.tag) || 'Symptome'}</span>
            <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl lg:text-5xl mt-5 mb-4">
              {t.symptoms.title}
            </h2>
            <p className="font-sans text-stone text-lg max-w-2xl mx-auto leading-relaxed">
              {t.symptoms.subtitle}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.symptoms.items.map((item, i) => (
              <button
                key={i}
                onClick={() => setExpandedSymptom(expandedSymptom === i ? null : i)}
                className={`text-left border rounded-[2px] p-5 transition-all cursor-pointer ${
                  expandedSymptom === i
                    ? 'border-rose bg-rose-pale shadow-sm'
                    : 'border-border bg-white hover:border-sage-light hover:shadow-sm'
                }`}
              >
                <p className="font-sans font-medium text-forest text-sm mb-1">{item.name}</p>
                <p
                  className={`font-sans text-stone text-xs leading-relaxed transition-all ${
                    expandedSymptom === i ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  {item.description}
                </p>
              </button>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => setQuizOpen(true)}
              className="inline-block bg-forest text-cream font-sans font-medium text-sm uppercase tracking-wider px-8 py-4 rounded-[2px] hover:bg-forest-mid transition-colors cursor-pointer border-0"
            >
              {t.hero.cta}
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          6. TREATMENTS — Tab navigation
          ════════════════════════════════════════════ */}
      <section id="treatments" className="fade-in-section bg-cream-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <span className="tag">{(t.treatments && t.treatments.tag) || 'Behandlungen'}</span>
          <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl lg:text-5xl mt-5 mb-4">
            {t.treatments.title}
          </h2>
          <p className="font-sans text-stone text-sm max-w-2xl leading-relaxed mb-12">
            {t.treatments.disclaimer}
          </p>

          {/* Tab bar */}
          <div className="flex gap-0 border-b border-border overflow-x-auto mb-10">
            {t.treatments.categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`font-sans text-sm whitespace-nowrap px-5 py-3 border-b-2 transition-colors cursor-pointer bg-transparent ${
                  activeTab === i
                    ? 'border-rose text-forest font-medium'
                    : 'border-transparent text-stone hover:text-forest'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {t.treatments.categories[activeTab] && (
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
              <div>
                <p className="font-body text-stone text-base leading-[1.8] mb-6">
                  {t.treatments.categories[activeTab].description}
                </p>
                <div className="bg-cream border border-border rounded-[2px] p-5">
                  <p className="font-sans font-medium text-forest text-xs uppercase tracking-wider mb-2">Für wen geeignet</p>
                  <p className="font-sans text-stone text-sm leading-relaxed">
                    {t.treatments.categories[activeTab].forWhom}
                  </p>
                </div>
              </div>
              <div>
                <p className="font-sans font-medium text-forest text-xs uppercase tracking-wider mb-4">Darreichungsformen</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {t.treatments.categories[activeTab].forms.map((form, i) => (
                    <span key={i} className="tag">{form}</span>
                  ))}
                </div>
                <div className="bg-forest/5 border border-forest/10 rounded-[2px] p-5">
                  <p className="font-sans font-medium text-forest text-xs uppercase tracking-wider mb-2">Kosten</p>
                  <p className="font-sans text-stone text-sm leading-relaxed">
                    {t.treatments.categories[activeTab].cost}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          7. PHYSICIANS — 3 cards on dark bg
          ════════════════════════════════════════════ */}
      <section className="fade-in-section bg-forest">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <span className="tag border-cream/30 text-cream/60">Ihr medizinisches Team</span>
          <h2 className="font-serif font-bold text-cream text-3xl md:text-4xl lg:text-5xl mt-5 mb-14">
            Spezialistinnen, denen Sie vertrauen können
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {physicians.map((doc, i) => (
              <div key={i} className="bg-charcoal rounded-[2px] p-8 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-forest-mid flex items-center justify-center mb-5">
                  <span className="font-serif font-bold text-cream text-xl">{doc.initials}</span>
                </div>
                <h3 className="font-serif font-bold text-cream text-lg mb-1">{doc.name}</h3>
                <p className="font-sans text-cream/60 text-xs mb-1">{doc.specialty}</p>
                <p className="font-sans text-cream/40 text-xs mb-4">{doc.location}</p>
                <div className="flex gap-2">
                  {doc.languages.map((lang, j) => (
                    <span key={j} className="font-sans text-xs text-cream/70 bg-cream/10 rounded-[2px] px-2 py-0.5">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          8. TESTIMONIALS — Rose-pale background
          ════════════════════════════════════════════ */}
      <section id="testimonials" className="fade-in-section bg-rose-pale">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="text-center mb-14">
            <span className="tag">{(t.testimonials && t.testimonials.tag) || 'Erfahrungen'}</span>
            <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl lg:text-5xl mt-5">
              {t.testimonials.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {t.testimonials.items.map((item, i) => (
              <div key={i} className="bg-white rounded-[2px] p-8 shadow-sm">
                {/* Quote mark */}
                <span className="font-serif text-rose text-5xl leading-none select-none" aria-hidden="true">&ldquo;</span>
                {/* Star rating */}
                <div className="flex gap-0.5 mb-4 mt-2">
                  {Array.from({ length: item.rating }).map((_, j) => (
                    <svg key={j} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#C4957A" aria-hidden="true">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                    </svg>
                  ))}
                </div>
                <p className="font-body text-stone text-sm leading-[1.8] mb-6">
                  {item.text}
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-sans font-medium text-forest text-sm">{item.name}, {item.age}</p>
                  <p className="font-sans text-stone-light text-xs">{item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          9. PRICING — 3-tier cards
          ════════════════════════════════════════════ */}
      <section id="pricing" className="fade-in-section bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="text-center mb-14">
            <span className="tag">{(t.pricing && t.pricing.tag) || 'Preise'}</span>
            <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl lg:text-5xl mt-5 mb-4">
              {t.pricing.title}
            </h2>
            <p className="font-sans text-stone text-lg max-w-2xl mx-auto leading-relaxed">
              {t.pricing.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {t.pricing.tiers.map((tier, i) => (
              <div
                key={i}
                className={`relative border rounded-[2px] p-8 flex flex-col ${
                  tier.recommended
                    ? 'border-rose bg-white shadow-md ring-1 ring-rose/30'
                    : 'border-border bg-white'
                }`}
              >
                {tier.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 font-sans text-xs font-medium uppercase tracking-wider bg-rose text-cream px-4 py-1 rounded-[2px]">
                    {t.common.recommended}
                  </span>
                )}
                <h3 className="font-serif font-bold text-forest text-xl mb-2">{tier.name}</h3>
                <p className="font-sans text-stone text-sm mb-4 leading-relaxed">{tier.description}</p>
                <div className="mb-6">
                  <span className="font-serif font-bold text-forest text-4xl">CHF {tier.price}</span>
                  <span className="font-sans text-stone text-sm ml-2">/ {tier.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B8F6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="font-sans text-stone text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setQuizOpen(true)}
                  className={`w-full font-sans font-medium text-sm uppercase tracking-wider px-6 py-3 rounded-[2px] transition-colors cursor-pointer border-0 ${
                    tier.recommended
                      ? 'bg-forest text-cream hover:bg-forest-mid'
                      : 'bg-cream-dark text-forest hover:bg-sage-pale'
                  }`}
                >
                  {t.hero.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          10. EMPLOYERS TEASER
          ════════════════════════════════════════════ */}
      <section className="fade-in-section bg-cream-dark border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="tag">Für Arbeitgeber</span>
              <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl mt-5 mb-4 leading-[1.1]">
                {t.employers.heroTitle}
              </h2>
              <p className="font-sans text-stone text-base leading-relaxed max-w-lg">
                {t.employers.heroSubtitle}
              </p>
            </div>
            <div className="lg:text-right">
              <Link
                to="/employers"
                className="inline-block bg-forest text-cream font-sans font-medium text-sm uppercase tracking-wider px-8 py-4 rounded-[2px] hover:bg-forest-mid transition-colors"
              >
                {t.common.learnMore}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          11. FAQ — Accordion
          ════════════════════════════════════════════ */}
      <section id="faq" className="fade-in-section bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="text-center mb-14">
            <span className="tag">FAQ</span>
            <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl lg:text-5xl mt-5">
              Häufig gestellte Fragen
            </h2>
          </div>
          <div className="max-w-3xl mx-auto divide-y divide-border border-t border-border">
            {faqData.map((item, i) => (
              <div key={i}>
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group bg-transparent border-0 cursor-pointer"
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="font-sans font-medium text-forest text-base md:text-lg group-hover:text-sage transition-colors leading-snug">
                    {item.question}
                  </span>
                  <span className="shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center text-stone group-hover:border-sage transition-colors" aria-hidden="true">
                    <span className="font-sans text-lg leading-none select-none">
                      {openFaq === i ? '\u2212' : '+'}
                    </span>
                  </span>
                </button>
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  hidden={openFaq !== i}
                  className={openFaq === i ? 'block' : 'hidden'}
                >
                  <p className="font-sans text-stone text-base leading-relaxed pb-6 pr-14">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          12. FINAL CTA — Dark section
          ════════════════════════════════════════════ */}
      <section className="fade-in-section bg-forest relative overflow-hidden">
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(196,149,122,0.15)_0%,transparent_70%)]" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28 text-center">
          <h2 className="font-serif font-bold text-cream text-3xl md:text-4xl lg:text-5xl mb-6 leading-[1.1]">
            Bereit für den ersten Schritt?
          </h2>
          <p className="font-sans text-cream/60 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Starten Sie jetzt mit der kostenlosen Bewertung und erfahren Sie, welche Behandlungsoption für Sie in Frage kommt.
          </p>
          <button
            onClick={() => setQuizOpen(true)}
            className="inline-block bg-rose text-cream font-sans font-medium text-sm uppercase tracking-wider px-10 py-4 rounded-[2px] hover:bg-rose/90 transition-colors cursor-pointer border-0"
          >
            {t.hero.cta}
          </button>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          QUIZ MODAL
          ════════════════════════════════════════════ */}
      {quizOpen && <QuizModal onClose={() => setQuizOpen(false)} />}

    </div>
  );
}
