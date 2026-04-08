import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useFadeIn } from '../hooks/useFadeIn';

const IconPlay = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="12" cy="12" r="11" fill="rgba(255,255,255,0.18)" />
    <polygon points="10,8 18,12 10,16" fill="white" />
  </svg>
);

const IconInfo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="8" strokeWidth="2" />
    <line x1="12" y1="12" x2="12" y2="16" />
  </svg>
);

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

export default function HowItWorks() {
  const { t } = useLang();
  const containerRef = useFadeIn();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div ref={containerRef}>

      {/* PAGE HEADER */}
      <section className="fade-in-section bg-cream border-b border-sage/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <p className="font-sans text-xs uppercase tracking-widest text-sage mb-4">
            Equivie
          </p>
          <h1 className="font-serif font-bold text-forest text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-3xl">
            {t.howItWorks.title}
          </h1>
        </div>
      </section>

      {/* TIMELINE STEPS */}
      <section className="fade-in-section bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="max-w-3xl">
            {t.howItWorks.detailedSteps.map((step, i) => {
              const isLast = i === t.howItWorks.detailedSteps.length - 1;
              return (
                <div key={i} className="flex gap-8 md:gap-12">
                  {/* Left: number + connecting line */}
                  <div className="flex flex-col items-center shrink-0">
                    <div
                      className="w-10 h-10 rounded-full bg-sage text-cream font-sans font-semibold text-sm flex items-center justify-center shrink-0 z-10"
                      aria-label={`Schritt ${i + 1}`}
                    >
                      {i + 1}
                    </div>
                    {!isLast && (
                      <div className="w-px flex-1 bg-sage/30 my-2" style={{ minHeight: '40px' }} aria-hidden="true" />
                    )}
                  </div>

                  {/* Right: content */}
                  <div className={`pb-12 ${isLast ? 'pb-0' : ''}`}>
                    <h2 className="font-serif font-semibold text-forest text-2xl md:text-3xl mb-3 leading-snug">
                      {step.title}
                    </h2>
                    <p className="font-sans text-charcoal-light text-base md:text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* VIDEO CONSULTATION PLACEHOLDER */}
      <section className="fade-in-section bg-cream-dark border-y border-sage/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Video consultation image */}
            <div className="relative w-full rounded-[2px] overflow-hidden" style={{ height: '360px' }}>
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop&q=80"
                alt="Medical consultation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-forest/30 flex items-center justify-center">
                <div className="opacity-90">
                  <IconPlay />
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-sage mb-5">
                Die Videokonsultation
              </p>
              <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl mb-6 leading-snug">
                Was Sie in Ihrer ersten Konsultation erwartet
              </h2>
              <div className="space-y-5">
                {[
                  {
                    heading: 'Persönliche Anamnese',
                    text: 'Ihre Ärztin nimmt sich Zeit, Ihre Symptome, Vorgeschichte und Therapiewünsche umfassend zu verstehen — ohne Zeitdruck.',
                  },
                  {
                    heading: 'Gemeinsamer Therapieplan',
                    text: 'Sie erarbeiten gemeinsam einen individuellen Behandlungsplan, basierend auf aktuellen Leitlinien und Ihrer persönlichen Situation.',
                  },
                  {
                    heading: 'Rezept und Folgegespräch',
                    text: 'Falls angezeigt, erhalten Sie noch am selben Tag Ihr Rezept digital. Ein Folgegespräch wird unmittelbar terminiert.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-1 bg-sage/40 rounded-full shrink-0 self-stretch" aria-hidden="true" />
                    <div>
                      <p className="font-sans font-semibold text-forest text-sm mb-1">
                        {item.heading}
                      </p>
                      <p className="font-sans text-charcoal-light text-base leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="fade-in-section bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl lg:text-5xl mb-14 max-w-xl leading-snug">
            Häufig gestellte Fragen
          </h2>
          <div className="max-w-3xl divide-y divide-sage/20 border-t border-sage/20">
            {faqData.map((item, i) => (
              <div key={i}>
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="font-sans font-medium text-forest text-base md:text-lg group-hover:text-sage transition-colors leading-snug">
                    {item.question}
                  </span>
                  <span
                    className="shrink-0 font-sans text-2xl text-sage leading-none select-none w-6 text-center"
                    aria-hidden="true"
                  >
                    {openFaq === i ? '−' : '+'}
                  </span>
                </button>
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  hidden={openFaq !== i}
                  className={openFaq === i ? 'block' : 'hidden'}
                >
                  <p className="font-sans text-charcoal-light text-base leading-relaxed pb-6">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLINICAL TEAM */}
      <section className="fade-in-section bg-cream-dark border-t border-sage/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <p className="font-sans text-xs uppercase tracking-widest text-sage mb-5">
            Ihr medizinisches Team
          </p>
          <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl lg:text-5xl mb-14 leading-snug">
            Spezialistinnen, denen Sie vertrauen können
          </h2>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">

            {/* Dr. Katharina Müller */}
            <div className="bg-white border border-sage/20 rounded-[2px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop&q=80"
                alt="Dr. med. Katharina Müller"
                className="w-full object-cover bg-sage-light/20"
                style={{ height: '260px' }}
              />
              <div className="p-8">
                <p className="font-sans text-xs uppercase tracking-widest text-sage mb-2">
                  FMH Gynäkologie &amp; Geburtshilfe
                </p>
                <h3 className="font-serif font-bold text-forest text-2xl md:text-3xl mb-1">
                  Dr. med. Katharina Müller
                </h3>
                <p className="font-sans text-charcoal-light text-sm mb-5">
                  Zürich &nbsp;&middot;&nbsp; DE / EN
                </p>
                <p className="font-sans text-charcoal text-base leading-relaxed">
                  Dr. Müller ist Fachärztin für Gynäkologie und Geburtshilfe mit einem Schwerpunkt auf Hormonheilkunde und perimenopausaler Medizin; sie war langjährig am Universitätsspital Zürich tätig. Ihre Beratungsphilosophie verbindet evidenzbasierte Therapie mit einem tiefen Verständnis für die individuellen Lebenswelten ihrer Patientinnen.
                </p>
              </div>
            </div>

            {/* Dr. Sophie Perret */}
            <div className="bg-white border border-sage/20 rounded-[2px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=600&h=400&fit=crop&q=80"
                alt="Dr. méd. Sophie Perret"
                className="w-full object-cover bg-blush-light/20"
                style={{ height: '260px' }}
              />
              <div className="p-8">
                <p className="font-sans text-xs uppercase tracking-widest text-sage mb-2">
                  FMH Gynäkologie &amp; Geburtshilfe
                </p>
                <h3 className="font-serif font-bold text-forest text-2xl md:text-3xl mb-1">
                  Dr. méd. Sophie Perret
                </h3>
                <p className="font-sans text-charcoal-light text-sm mb-5">
                  Genf &nbsp;&middot;&nbsp; FR / EN
                </p>
                <p className="font-sans text-charcoal text-base leading-relaxed">
                  Dr. Perret hat ihre klinische Ausbildung an den Hôpitaux Universitaires de Genève absolviert und sich auf menopausale Transition sowie die psychosomatischen Aspekte des hormonellen Wandels spezialisiert. Sie ist Mitglied der Société Suisse de Ménopause und publiziert regelmässig zu Fragen der Lebensqualität in der Peri- und Postmenopause.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="fade-in-section bg-cream border-t border-sage/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20 text-center">
          <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl mb-6">
            Bereit für den ersten Schritt?
          </h2>
          <p className="font-sans text-charcoal-light text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Starten Sie jetzt mit dem kostenlosen Assessment und erfahren Sie, welche Behandlungsoption für Sie in Frage kommt.
          </p>
          <Link
            to="/0/assessment"
            className="inline-block bg-forest text-cream font-sans font-medium text-base px-10 py-4 rounded-[2px] hover:bg-opacity-90 transition-colors"
          >
            {t.nav.startAssessment}
          </Link>
        </div>
      </section>

    </div>
  );
}
