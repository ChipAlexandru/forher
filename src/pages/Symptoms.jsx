import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useFadeIn } from '../hooks/useFadeIn';

// ---------------------------------------------------------------------------
// Expanded symptom data (German medical content, keyed by symptom index 0–11)
// ---------------------------------------------------------------------------
const symptomDetails = [
  {
    // 0 – Hitzewallungen
    hormonal:
      'Der sinkende Östrogenspiegel beeinflusst das Temperaturregulationszentrum im Hypothalamus und verschiebt den sogenannten thermoneutralen Bereich, sodass bereits geringe Temperaturschwankungen intensive Hitzereaktionen auslösen. Noradrenalin- und Serotoninungleichgewichte verstärken diese Dysregulation zusätzlich.',
    hrtHelp:
      'Östrogen-basierte HRT stabilisiert den hypothalamischen Sollwert und reduziert Häufigkeit und Intensität von Hitzewallungen bei den meisten Frauen innerhalb von Wochen deutlich.',
    urgentCare:
      'Suchen Sie umgehend eine Ärztin auf, wenn Hitzegefühle mit Brustschmerzen, Atemnot oder starkem Herzrasen verbunden sind.',
  },
  {
    // 1 – Nachtschweiß
    hormonal:
      'Nächtliche Schweissausbrüche entstehen durch dieselbe hypothalamische Dysregulation wie Hitzewallungen, treten jedoch im Schlaf auf und führen häufig zu vollständigem Durchnässen von Bettwäsche. Der absinkende Östrogenspiegel senkt die Schwelle, ab der der Körper kühlende Schweissproduktion aktiviert.',
    hrtHelp:
      'Transdermales oder orales Östrogen reguliert die nächtliche Thermosteuerung und ermöglicht in der Regel innerhalb von vier bis acht Wochen einen deutlich erholsameren Schlaf.',
    urgentCare:
      'Persistierender Nachtschweiß ohne menopausalen Kontext – insbesondere mit ungewolltem Gewichtsverlust oder Fieber – erfordert eine umgehende ärztliche Abklärung.',
  },
  {
    // 2 – Schlafstörungen
    hormonal:
      'Progesteron hat schlaffördernde Eigenschaften; sein Abfall in der Perimenopause beeinträchtigt die Schlafarchitektur und verkürzt die Tiefschlafphasen. Gleichzeitig verstärken Hitzewallungen und veränderte Kortisolrhythmen die Schlaffragmentierung.',
    hrtHelp:
      'Die Kombination aus Östrogen und mikroionisiertem Progesteron verbessert die Einschlaflatenz und die Schlafqualität und wird von Fachgesellschaften explizit für diesen Indikationsbereich empfohlen.',
    urgentCare:
      'Wenn Schlaflosigkeit mit schweren Stimmungstiefs oder Gedanken an Selbstverletzung einhergeht, wenden Sie sich sofort an eine Fachkraft.',
  },
  {
    // 3 – Stimmungsschwankungen
    hormonal:
      'Östrogen moduliert die Sensitivität von Serotoninrezeptoren und beeinflusst die Dopaminausschüttung; sinkende Spiegel können emotionale Instabilität, erhöhte Reizbarkeit und depressive Verstimmungen begünstigen. Schwankende Hormonspiegel in der Perimenopause sind besonders destabilisierend, da sich das Gehirn nicht an ein konstant niedriges Niveau anpassen kann.',
    hrtHelp:
      'Eine leitliniengerechte HRT kann Stimmungsschwankungen und leichte bis mittelschwere depressive Symptome der Perimenopause lindern; bei schwerer Depression ist eine zusätzliche psychiatrische Beurteilung indiziert.',
    urgentCare:
      'Bitte suchen Sie sofort Hilfe auf, wenn Sie Gedanken haben, sich selbst zu schaden oder das Leben zu beenden.',
  },
  {
    // 4 – Konzentrationsprobleme
    hormonal:
      'Östrogen wirkt neurotroph und schützt hippokampale Strukturen, die für Kurzzeitgedächtnis und Aufmerksamkeit zuständig sind; ein Abfall beeinträchtigt nachweislich kognitive Verarbeitungsgeschwindigkeit und Merkfähigkeit. Diese Phase wird häufig als «Menopausales Gehirnnebel» (Brain Fog) beschrieben und ist in der Regel reversibel.',
    hrtHelp:
      'Studien zeigen, dass ein früher HRT-Beginn in der Perimenopause kognitive Beschwerden reduziert und das langfristige neurologische Risikoprofil günstig beeinflussen kann.',
    urgentCare:
      'Plötzliche, ausgeprägte Gedächtnis- oder Sprachstörungen müssen umgehend neurologisch abgeklärt werden, um einen Schlaganfall oder andere akute Erkrankungen auszuschliessen.',
  },
  {
    // 5 – Vaginale Trockenheit
    hormonal:
      'Östrogen hält die Elastizität, Feuchtigkeit und den sauren pH-Wert der Vaginalschleimhaut aufrecht; sinkende Spiegel führen zu Ausdünnung (Atrophie) und verminderter Lubrikation. Dieser Zustand – auch als Genitourinary Syndrome of Menopause (GSM) bezeichnet – verschlechtert sich ohne Behandlung mit der Zeit progressiv.',
    hrtHelp:
      'Lokales vaginales Östrogen (Creme, Zäpfchen, Ring) ist hochwirksam, systemisch kaum absorbierbar und auch für Frauen geeignet, bei denen eine systemische HRT kontraindiziert ist.',
    urgentCare:
      'Vaginalblutungen nach der Menopause müssen immer ärztlich abgeklärt werden, um eine maligne Ursache auszuschliessen.',
  },
  {
    // 6 – Gelenkschmerzen
    hormonal:
      'Östrogenrezeptoren befinden sich auch im Gelenkknorpel und in den Synovialmembranen; ein Östrogenabfall fördert lokale Entzündungsreaktionen und vermindert die Knorpelregeneration. Viele Frauen berichten von einer deutlichen Zunahme von Gelenksteifigkeit und Schmerzen, besonders morgens, in der Perimenopause.',
    hrtHelp:
      'Systemische HRT kann muskuloskelettale Beschwerden lindern und dem hormonell bedingten Knorpelabbau entgegenwirken; ergänzende Physiotherapie und entzündungshemmende Ernährung sind sinnvoll.',
    urgentCare:
      'Starke, akut auftretende Gelenkschmerzen mit Schwellung, Rötung oder Fieber erfordern eine zeitnahe rheumatologische oder orthopädische Abklärung.',
  },
  {
    // 7 – Herzrasen
    hormonal:
      'Östrogen hat eine schützende Wirkung auf das kardiovaskuläre System und beeinflusst die Herzfrequenzvariabilität; seine Reduktion kann autonome Dysregulation begünstigen, die sich als Palpitationen oder unregelmässiger Herzschlag äussert. Diese Symptome sind häufig mit Hitzewallungen assoziiert und in der Regel gutartig.',
    hrtHelp:
      'HRT kann vasomotorisch bedingte Palpitationen deutlich reduzieren; vor Beginn einer Therapie sollte eine kardiologische Grundabklärung erfolgen.',
    urgentCare:
      'Herzrasen mit Brustschmerzen, Atemnot, Schwindel oder Bewusstseinsverlust ist ein Notfall – rufen Sie sofort den Rettungsdienst.',
  },
  {
    // 8 – Verminderte Libido
    hormonal:
      'Testosteron, das auch bei Frauen eine zentrale Rolle für sexuelles Verlangen spielt, nimmt in der Perimenopause ab; gleichzeitig fördern Östrogenmangel, vaginale Atrophie und psychische Belastung eine weitere Minderung des Sexualinteresses. Schmerzen beim Geschlechtsverkehr durch GSM verstärken diesen Kreislauf.',
    hrtHelp:
      'Systemische HRT, gegebenenfalls ergänzt durch niedrig dosiertes vaginales oder systemisches Testosteron, kann die Libido und die sexuelle Zufriedenheit signifikant verbessern.',
    urgentCare:
      'Plötzlicher, vollständiger Libidoverlust mit Erschöpfung und Gewichtsveränderungen sollte auf Schilddrüsenerkrankungen oder andere hormonelle Ursachen hin abgeklärt werden.',
  },
  {
    // 9 – Gewichtsveränderungen
    hormonal:
      'Östrogen beeinflusst die Fettverteilung; sein Abfall begünstigt eine Verlagerung der Fettdepots aus den Hüften und Oberschenkeln hin zur Körpermitte, was das metabolische und kardiovaskuläre Risiko erhöht. Gleichzeitig sinkt der Grundumsatz, was eine Gewichtszunahme auch bei unveränderter Kalorienzufuhr begünstigt.',
    hrtHelp:
      'HRT kann die menopausale Fettumverteilung abschwächen und den metabolischen Grundumsatz stabilisieren; in Kombination mit körperlicher Aktivität ist die Wirkung am stärksten.',
    urgentCare:
      'Unbeabsichtigter Gewichtsverlust von mehr als 5 % innerhalb von sechs Monaten muss immer ärztlich abgeklärt werden.',
  },
  {
    // 10 – Erschöpfung
    hormonal:
      'Der Abfall von Östrogen und Progesteron beeinträchtigt den Schlaf-Wach-Rhythmus, die Mitochondrienfunktion und die Stressachse (HPA-Achse), was zu anhaltender Müdigkeit und Erschöpfung führt. Zudem kann ein durch Schlafmangel verursachter Kortisolanstieg die Erschöpfung weiter verstärken.',
    hrtHelp:
      'Eine wirksame HRT, die Schlaf, Stimmung und vasomotorische Symptome verbessert, führt oft zu einer deutlichen Verbesserung des Energiehaushalts; ein Screening auf Schilddrüsenfehlfunktion und Anämie sollte parallel erfolgen.',
    urgentCare:
      'Extreme, plötzlich einsetzende Erschöpfung oder Erschöpfung mit Herzrasen, Blässe und Atemnot erfordert umgehende ärztliche Beurteilung.',
  },
  {
    // 11 – Haarveränderungen
    hormonal:
      'Das Verhältnis von Östrogen zu Androgenen verschiebt sich in der Menopause zuungunsten des Östrogens, was Haarfollikel sensibilisiert und den Telogen-Effluvium-Mechanismus begünstigt. Diffuser Haarausfall oder Ausdünnung betrifft einen Grossteil der Frauen in der Postmenopause.',
    hrtHelp:
      'HRT kann das östrogenabhängige Haarwachstum unterstützen und den androgedriven Haarausfall bremsen; ergänzend können Mikronährstoffe (Biotin, Eisen, Zink) und lokale Therapien eingesetzt werden.',
    urgentCare:
      'Kreisrunder Haarausfall (Alopecia areata), plötzlicher fleckiger Haarverlust oder gleichzeitiger Verlust von Augen- und Körperhaaren sollte dermatologisch abgeklärt werden.',
  },
];

// ---------------------------------------------------------------------------
// Icon helpers
// ---------------------------------------------------------------------------
const ChevronDownIcon = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// ---------------------------------------------------------------------------
// Symptom card component
// ---------------------------------------------------------------------------
function SymptomCard({ symptom, detail, index, isExpanded, onToggle }) {
  const dotColors = [
    'bg-blush',
    'bg-sage/60',
    'bg-blush-light',
    'bg-sage/40',
    'bg-blush',
    'bg-sage/70',
    'bg-blush-light',
    'bg-sage/50',
    'bg-blush',
    'bg-sage/60',
    'bg-blush-light',
    'bg-sage/40',
  ];

  return (
    <button
      type="button"
      onClick={() => onToggle(index)}
      className={[
        'w-full text-left bg-white border rounded-[2px] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2',
        isExpanded
          ? 'border-sage shadow-sm'
          : 'border-sage/20 hover:border-sage hover:shadow-sm',
      ].join(' ')}
      aria-expanded={isExpanded}
    >
      {/* Collapsed header */}
      <div className="flex items-center justify-between gap-3 p-5">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className={`shrink-0 w-2.5 h-2.5 rounded-full ${dotColors[index]}`}
            aria-hidden="true"
          />
          <span className="font-sans font-medium text-forest text-sm leading-snug truncate">
            {symptom.name}
          </span>
        </div>
        <ChevronDownIcon
          className={`shrink-0 text-sage transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-5 pb-6 border-t border-sage/15">
          <p className="font-sans text-charcoal text-sm leading-relaxed mt-4 mb-5">
            {symptom.description}
          </p>

          <div className="space-y-4">
            <div className="bg-cream rounded-[2px] p-4">
              <p className="font-sans font-semibold text-forest text-xs uppercase tracking-wider mb-2">
                Hormoneller Hintergrund
              </p>
              <p className="font-sans text-charcoal text-sm leading-relaxed">
                {detail.hormonal}
              </p>
            </div>

            <div className="bg-cream-dark rounded-[2px] p-4">
              <p className="font-sans font-semibold text-forest text-xs uppercase tracking-wider mb-2">
                Wie HRT helfen kann
              </p>
              <p className="font-sans text-charcoal text-sm leading-relaxed">
                {detail.hrtHelp}
              </p>
            </div>

            <div className="bg-blush/20 rounded-[2px] p-4">
              <p className="font-sans font-semibold text-forest text-xs uppercase tracking-wider mb-2">
                Wann dringend zur Ärztin
              </p>
              <p className="font-sans text-charcoal text-sm leading-relaxed">
                {detail.urgentCare}
              </p>
            </div>
          </div>
        </div>
      )}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Symptom checker form
// ---------------------------------------------------------------------------
const TOTAL_STEPS = 4;

function SymptomChecker({ symptoms }) {
  const [step, setStep] = useState(1);
  const [age, setAge] = useState('');
  const [cycleStatus, setCycleStatus] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [hrtHistory, setHrtHistory] = useState('');

  function toggleSymptom(idx) {
    setSelectedSymptoms((prev) => {
      if (prev.includes(idx)) return prev.filter((i) => i !== idx);
      if (prev.length >= 3) return prev;
      return [...prev, idx];
    });
  }

  function getResultMessage() {
    const ageNum = parseInt(age, 10);
    if (cycleStatus === 'stopped') {
      return 'Sie befinden sich wahrscheinlich in der Menopause oder Postmenopause. Ihre Symptome sind typisch für dauerhaft niedrige Östrogenspiegel. Eine ärztliche Begleitung hilft Ihnen, die optimale Behandlungsoption zu finden und langfristigen Knochenabbau sowie kardiovaskuläre Risiken zu minimieren.';
    }
    if (ageNum < 45 && cycleStatus === 'irregular') {
      return 'Ihre Angaben deuten möglicherweise auf eine frühe Perimenopause hin. Dies kann bereits ab dem 35. bis 40. Lebensjahr auftreten und verdient besondere medizinische Aufmerksamkeit. Eine spezialisierte Ärztin kann klären, ob eine frühe Hormontherapie sinnvoll ist.';
    }
    if (ageNum >= 45 && ageNum <= 55 && cycleStatus === 'irregular') {
      return 'Ihr Profil deutet auf die Perimenopause hin – die Übergangsphase, in der Hormonspiegel schwanken und sich Ihr Körper auf die Menopause vorbereitet. Mit der richtigen Unterstützung können Sie diese Phase gut meistern.';
    }
    if (cycleStatus === 'regular') {
      return 'Ihr Zyklus ist noch regelmässig, dennoch können Sie perimenopausale Symptome erleben. Eine ärztliche Einschätzung hilft dabei, andere Ursachen auszuschliessen und geeignete Massnahmen frühzeitig einzuleiten.';
    }
    return 'Basierend auf Ihren Angaben empfehlen wir eine persönliche ärztliche Beratung, um Ihren individuellen Bedarf zu ermitteln und die passende Behandlung zu besprechen.';
  }

  const canAdvanceStep1 = age !== '' && parseInt(age, 10) > 0 && cycleStatus !== '';
  const canAdvanceStep2 = selectedSymptoms.length > 0;
  const canAdvanceStep3 = hrtHistory !== '';

  const progressPct = ((step - 1) / (TOTAL_STEPS - 1)) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={[
                  'w-7 h-7 rounded-full flex items-center justify-center font-sans font-semibold text-xs transition-colors duration-200',
                  i + 1 < step
                    ? 'bg-sage text-white'
                    : i + 1 === step
                    ? 'bg-forest text-cream'
                    : 'bg-cream-dark text-charcoal-light border border-sage/30',
                ].join(' ')}
              >
                {i + 1 < step ? <CheckIcon /> : i + 1}
              </div>
              {i < TOTAL_STEPS - 1 && (
                <div className="flex-1 h-px w-12 md:w-20 bg-sage/20">
                  <div
                    className="h-full bg-sage transition-all duration-300"
                    style={{ width: i + 1 < step ? '100%' : '0%' }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="h-1 bg-sage/15 rounded-full overflow-hidden">
          <div
            className="h-full bg-sage transition-all duration-300 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div>
          <h3 className="font-serif font-semibold text-forest text-xl mb-6">
            Persönliche Angaben
          </h3>

          <div className="mb-6">
            <label
              htmlFor="checker-age"
              className="font-sans font-medium text-forest text-sm block mb-2"
            >
              Ihr Alter
            </label>
            <input
              id="checker-age"
              type="number"
              min="30"
              max="70"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="z. B. 48"
              className="w-full max-w-xs font-sans text-charcoal text-base border border-sage/30 rounded-[2px] px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent placeholder:text-charcoal-light/50"
            />
          </div>

          <div>
            <p className="font-sans font-medium text-forest text-sm mb-3">
              Wie würden Sie Ihren aktuellen Menstruationszyklus beschreiben?
            </p>
            <div className="space-y-3">
              {[
                { value: 'regular', label: 'Regelmässig (weniger als 7 Tage Abweichung)' },
                { value: 'irregular', label: 'Unregelmässig (Schwankungen von Wochen oder Monaten)' },
                { value: 'stopped', label: 'Ausgeblieben (seit mindestens 12 Monaten)' },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className={[
                    'flex items-start gap-3 border rounded-[2px] p-4 cursor-pointer transition-colors duration-150',
                    cycleStatus === opt.value
                      ? 'border-sage bg-sage/5'
                      : 'border-sage/20 bg-white hover:border-sage/50',
                  ].join(' ')}
                >
                  <div className="relative shrink-0 mt-0.5">
                    <input
                      type="radio"
                      name="cycle-status"
                      value={opt.value}
                      checked={cycleStatus === opt.value}
                      onChange={() => setCycleStatus(opt.value)}
                      className="sr-only"
                    />
                    <div
                      className={[
                        'w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors',
                        cycleStatus === opt.value
                          ? 'border-sage'
                          : 'border-sage/40',
                      ].join(' ')}
                    >
                      {cycleStatus === opt.value && (
                        <div className="w-2 h-2 rounded-full bg-sage" />
                      )}
                    </div>
                  </div>
                  <span className="font-sans text-charcoal text-sm leading-snug">
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div>
          <h3 className="font-serif font-semibold text-forest text-xl mb-2">
            Ihre Hauptbeschwerden
          </h3>
          <p className="font-sans text-charcoal-light text-sm mb-6">
            Wählen Sie bis zu 3 Symptome aus, die Sie am stärksten belasten.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {symptoms.map((s, idx) => {
              const checked = selectedSymptoms.includes(idx);
              const disabled = !checked && selectedSymptoms.length >= 3;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleSymptom(idx)}
                  disabled={disabled}
                  className={[
                    'text-left font-sans text-sm rounded-[2px] border px-3 py-3 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage',
                    checked
                      ? 'bg-sage text-white border-sage'
                      : disabled
                      ? 'bg-cream-dark border-sage/10 text-charcoal-light cursor-not-allowed'
                      : 'bg-white border-sage/20 text-charcoal hover:border-sage',
                  ].join(' ')}
                >
                  {s.name}
                </button>
              );
            })}
          </div>
          {selectedSymptoms.length === 3 && (
            <p className="font-sans text-sage text-xs mt-3">
              Maximal 3 Symptome ausgewählt.
            </p>
          )}
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div>
          <h3 className="font-serif font-semibold text-forest text-xl mb-6">
            Erfahrungen mit Hormontherapie
          </h3>
          <div className="space-y-3">
            {[
              { value: 'never', label: 'Noch keine Hormontherapie ausprobiert' },
              { value: 'current', label: 'Ich bin derzeit in einer Hormontherapie' },
              { value: 'previous', label: 'Ich habe früher eine Hormontherapie gemacht' },
            ].map((opt) => (
              <label
                key={opt.value}
                className={[
                  'flex items-start gap-3 border rounded-[2px] p-4 cursor-pointer transition-colors duration-150',
                  hrtHistory === opt.value
                    ? 'border-sage bg-sage/5'
                    : 'border-sage/20 bg-white hover:border-sage/50',
                ].join(' ')}
              >
                <div className="relative shrink-0 mt-0.5">
                  <input
                    type="radio"
                    name="hrt-history"
                    value={opt.value}
                    checked={hrtHistory === opt.value}
                    onChange={() => setHrtHistory(opt.value)}
                    className="sr-only"
                  />
                  <div
                    className={[
                      'w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors',
                      hrtHistory === opt.value ? 'border-sage' : 'border-sage/40',
                    ].join(' ')}
                  >
                    {hrtHistory === opt.value && (
                      <div className="w-2 h-2 rounded-full bg-sage" />
                    )}
                  </div>
                </div>
                <span className="font-sans text-charcoal text-sm leading-snug">
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Step 4 – Result */}
      {step === 4 && (
        <div>
          <h3 className="font-serif font-semibold text-forest text-xl mb-2">
            Ihre individuelle Einschätzung
          </h3>
          <p className="font-sans text-charcoal-light text-xs mb-6 leading-relaxed">
            Diese Einschätzung ersetzt keine ärztliche Diagnose. Sie dient ausschliesslich der Orientierung.
          </p>

          <div className="bg-cream border border-sage/20 rounded-[2px] p-6 mb-6">
            <p className="font-sans text-charcoal text-base leading-relaxed">
              {getResultMessage()}
            </p>
          </div>

          {/* Summary chips */}
          <div className="mb-6 space-y-3">
            <div className="flex flex-wrap gap-2">
              <span className="font-sans text-xs text-forest bg-cream-dark border border-sage/20 rounded-[2px] px-3 py-1.5">
                Alter: {age}
              </span>
              <span className="font-sans text-xs text-forest bg-cream-dark border border-sage/20 rounded-[2px] px-3 py-1.5">
                Zyklus: {cycleStatus === 'regular' ? 'Regelmässig' : cycleStatus === 'irregular' ? 'Unregelmässig' : 'Ausgeblieben'}
              </span>
              <span className="font-sans text-xs text-forest bg-cream-dark border border-sage/20 rounded-[2px] px-3 py-1.5">
                HRT: {hrtHistory === 'never' ? 'Noch nie' : hrtHistory === 'current' ? 'Aktuell' : 'Früher'}
              </span>
            </div>
            {selectedSymptoms.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedSymptoms.map((idx) => (
                  <span
                    key={idx}
                    className="font-sans text-xs text-white bg-sage rounded-[2px] px-3 py-1.5"
                  >
                    {symptoms[idx].name}
                  </span>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/assessment"
            className="inline-flex items-center gap-2 bg-forest text-cream font-sans font-medium text-sm px-6 py-3.5 rounded-[2px] hover:bg-opacity-90 transition-colors"
          >
            Jetzt persönliche Beratung buchen
            <ArrowRightIcon />
          </Link>
        </div>
      )}

      {/* Navigation buttons */}
      {step < 4 && (
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-sage/15">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="font-sans text-sm text-forest border border-forest/30 px-5 py-2.5 rounded-[2px] hover:border-forest transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          >
            Zurück
          </button>
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(TOTAL_STEPS, s + 1))}
            disabled={
              (step === 1 && !canAdvanceStep1) ||
              (step === 2 && !canAdvanceStep2) ||
              (step === 3 && !canAdvanceStep3)
            }
            className="font-sans font-medium text-sm bg-forest text-cream px-6 py-2.5 rounded-[2px] hover:bg-opacity-90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
          >
            Weiter
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="mt-8 pt-6 border-t border-sage/15">
          <button
            type="button"
            onClick={() => {
              setStep(1);
              setAge('');
              setCycleStatus('');
              setSelectedSymptoms([]);
              setHrtHistory('');
            }}
            className="font-sans text-sm text-charcoal-light hover:text-forest transition-colors underline underline-offset-2"
          >
            Neu beginnen
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------
export default function Symptoms() {
  const { t } = useLang();
  const containerRef = useFadeIn();
  const [expandedCard, setExpandedCard] = useState(null);

  function handleCardToggle(index) {
    setExpandedCard((prev) => (prev === index ? null : index));
  }

  return (
    <div ref={containerRef}>

      {/* ------------------------------------------------------------------ */}
      {/* 1. PAGE HEADER                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="fade-in-section bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="max-w-2xl">
            <p className="font-sans text-xs uppercase tracking-widest text-sage mb-4">
              Symptome & Erkrankungsbild
            </p>
            <h1 className="font-serif font-bold text-forest text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-6">
              {t.symptoms.title}
            </h1>
            <p className="font-sans text-charcoal-light text-lg md:text-xl leading-relaxed">
              {t.symptoms.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. SYMPTOM LIBRARY                                                   */}
      {/* ------------------------------------------------------------------ */}
      <section className="fade-in-section bg-cream-dark border-y border-sage/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl">
                Symptom-Bibliothek
              </h2>
              <p className="font-sans text-charcoal-light text-base mt-2">
                Klicken Sie auf ein Symptom, um medizinische Hintergrundinformationen zu erhalten.
              </p>
            </div>
            {expandedCard !== null && (
              <button
                type="button"
                onClick={() => setExpandedCard(null)}
                className="font-sans text-sm text-sage hover:text-forest transition-colors underline underline-offset-2 shrink-0"
              >
                Alle zuklappen
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {t.symptoms.items.map((symptom, index) => (
              <SymptomCard
                key={index}
                symptom={symptom}
                detail={symptomDetails[index]}
                index={index}
                isExpanded={expandedCard === index}
                onToggle={handleCardToggle}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. PERIMENOPAUSE VS MENOPAUSE                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="fade-in-section bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl lg:text-5xl mb-4">
            {t.symptoms.periVsMeno.title}
          </h2>
          <p className="font-sans text-charcoal-light text-base mb-14 max-w-xl">
            Verstehen Sie, wo Sie sich in Ihrer hormonellen Reise befinden – und was das für Ihre Symptome bedeutet.
          </p>

          {/* Visual timeline */}
          <div className="mb-14">
            <div className="relative h-10 rounded-[2px] overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to right, #E8C4B8 0%, #F2DDD5 30%, #d5e0d6 65%, #7C9A7E 100%)',
                }}
                aria-hidden="true"
              />
              {/* Milestone markers */}
              <div className="absolute inset-0 flex items-center">
                <div className="absolute left-0 right-0 flex justify-between px-0">
                  {[
                    { label: 'Reproduktive Phase', pos: '5%' },
                    { label: 'Frühe Peri', pos: '25%' },
                    { label: 'Späte Peri', pos: '52%' },
                    { label: 'Menopause', pos: '70%' },
                    { label: 'Postmenopause', pos: '88%' },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="absolute flex flex-col items-center"
                      style={{ left: m.pos, transform: 'translateX(-50%)' }}
                    >
                      <div className="w-px h-4 bg-white/70" aria-hidden="true" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Labels below */}
            <div className="relative h-6 mt-1">
              {[
                { label: 'Reproduktiv', pos: '5%' },
                { label: 'Perimenopause', pos: '38%' },
                { label: 'Menopause', pos: '70%' },
                { label: 'Postmenopause', pos: '89%' },
              ].map((m) => (
                <span
                  key={m.label}
                  className="absolute font-sans text-xs text-charcoal-light whitespace-nowrap"
                  style={{ left: m.pos, transform: 'translateX(-50%)' }}
                >
                  {m.label}
                </span>
              ))}
            </div>
          </div>

          {/* Two-column comparison */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Perimenopause */}
            <div className="bg-blush/25 border border-blush rounded-[2px] p-8 lg:p-10">
              <div className="w-8 h-1 bg-blush rounded-full mb-6" aria-hidden="true" />
              <h3 className="font-serif font-bold text-forest text-2xl md:text-3xl mb-4">
                {t.symptoms.periVsMeno.peri.title}
              </h3>
              <p className="font-sans text-charcoal text-base leading-relaxed mb-6">
                {t.symptoms.periVsMeno.peri.description}
              </p>
              <ul className="space-y-2">
                {[
                  'Beginnt oft 8–10 Jahre vor der letzten Regelblutung',
                  'Hormonspiegel schwanken unregelmässig',
                  'Zyklus wird kürzer, dann länger, dann unregelmässig',
                  'Symptome können kommen und gehen',
                  'Konzentrationsprobleme und Stimmungsschwankungen häufig',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span className="shrink-0 mt-1 text-blush">
                      <CheckIcon />
                    </span>
                    <span className="font-sans text-charcoal text-sm leading-snug">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Menopause */}
            <div className="bg-sage/10 border border-sage/30 rounded-[2px] p-8 lg:p-10">
              <div className="w-8 h-1 bg-sage rounded-full mb-6" aria-hidden="true" />
              <h3 className="font-serif font-bold text-forest text-2xl md:text-3xl mb-4">
                {t.symptoms.periVsMeno.meno.title}
              </h3>
              <p className="font-sans text-charcoal text-base leading-relaxed mb-6">
                {t.symptoms.periVsMeno.meno.description}
              </p>
              <ul className="space-y-2">
                {[
                  'Definiert als 12 Monate ohne Menstruation',
                  'Östrogenspiegel dauerhaft niedrig und stabil',
                  'Vasomotorische Symptome können anhalten',
                  'Knochen- und kardiovaskuläres Risiko steigt',
                  'HRT bleibt oft langfristig sinnvoll',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span className="shrink-0 mt-1 text-sage">
                      <CheckIcon />
                    </span>
                    <span className="font-sans text-charcoal text-sm leading-snug">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. INTERACTIVE SYMPTOM CHECKER                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="fade-in-section bg-cream-dark border-y border-sage/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <p className="font-sans text-xs uppercase tracking-widest text-sage mb-4">
              Selbsteinschätzung
            </p>
            <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl mb-4">
              Wo befinden Sie sich gerade?
            </h2>
            <p className="font-sans text-charcoal-light text-base leading-relaxed">
              Beantworten Sie vier kurze Fragen – und erhalten Sie eine erste, unverbindliche Orientierung. Keine Registrierung erforderlich.
            </p>
          </div>

          <div className="bg-white border border-sage/20 rounded-[2px] p-8 md:p-10 lg:p-12 shadow-sm">
            <SymptomChecker symptoms={t.symptoms.items} />
          </div>

          <p className="font-sans text-charcoal-light text-xs text-center mt-6 max-w-lg mx-auto leading-relaxed">
            Dieser Selbstcheck dient der allgemeinen Orientierung und ersetzt keine ärztliche Diagnose. Alle Angaben werden nicht gespeichert.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. BOTTOM CTA                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="fade-in-section bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl lg:text-5xl mb-6">
              Bereit für den nächsten Schritt?
            </h2>
            <p className="font-sans text-charcoal-light text-lg leading-relaxed mb-10">
              Unsere FMH-lizenzierten Ärztinnen begleiten Sie persönlich – von der ersten Einschätzung bis zur massgeschneiderten Behandlung.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/assessment"
                className="inline-flex items-center gap-2 bg-forest text-cream font-sans font-medium text-base px-8 py-4 rounded-[2px] hover:bg-opacity-90 transition-colors"
              >
                {t.nav.startAssessment}
                <ArrowRightIcon />
              </Link>
              <Link
                to="/treatments"
                className="inline-block font-sans text-base text-forest border-b border-forest pb-0.5 hover:text-sage hover:border-sage transition-colors"
              >
                Behandlungsoptionen ansehen
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
