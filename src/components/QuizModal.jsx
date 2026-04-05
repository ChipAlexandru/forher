import { useState } from 'react';
import { useLang } from '../context/LanguageContext';

const questions = [
  {
    key: 'age',
    question: 'Wie alt sind Sie?',
    options: ['30–39', '40–44', '45–49', '50–54', '55–59', '60+'],
    multi: false,
  },
  {
    key: 'cycle',
    question: 'Wie ist Ihr aktueller Zyklus?',
    options: ['Regelmässig', 'Unregelmässig', 'Seit über 12 Monaten ausgeblieben'],
    multi: false,
  },
  {
    key: 'symptoms',
    question: 'Was belastet Sie am meisten?',
    subtitle: 'Wählen Sie bis zu 3 Symptome',
    options: [
      'Hitzewallungen',
      'Schlafstörungen',
      'Stimmungsschwankungen',
      'Konzentrationsprobleme',
      'Gewichtszunahme',
      'Erschöpfung',
      'Gelenkschmerzen',
      'Vaginale Trockenheit',
    ],
    multi: true,
    maxSelect: 3,
  },
  {
    key: 'hrt',
    question: 'Haben Sie bereits Hormontherapie ausprobiert?',
    options: ['Nein, noch nie', 'Ja, aktuell', 'Ja, früher'],
    multi: false,
  },
  {
    key: 'priority',
    question: 'Was ist Ihnen am wichtigsten?',
    options: [
      'Schnelle Linderung',
      'Natürliche Ansätze',
      'Langfristige Begleitung',
      'Diskretion & Komfort',
    ],
    multi: false,
  },
];

function getResultHeadline(answers) {
  const age = answers.age;
  const cycle = answers.cycle;
  const priority = answers.priority;

  if (cycle === 'Seit über 12 Monaten ausgeblieben') {
    return 'Sie befinden sich in der Postmenopause – wir begleiten Sie ganzheitlich.';
  }
  if (cycle === 'Unregelmässig') {
    return 'Sie befinden sich wahrscheinlich in der Perimenopause – eine gezielte Beratung kann jetzt viel bewirken.';
  }
  if (priority === 'Natürliche Ansätze') {
    return 'Natürliche Wege stehen bei Ihnen im Fokus – unsere Ärztinnen beraten Sie individuell.';
  }
  return 'Basierend auf Ihren Angaben empfehlen wir ein persönliches Beratungsgespräch.';
}

function getResultBody(answers) {
  const symptoms = answers.symptoms || [];
  const hrt = answers.hrt;

  const lines = [];
  if (symptoms.length > 0) {
    lines.push(
      `Ihre Hauptbeschwerden – ${symptoms.join(', ')} – verdienen individuelle Aufmerksamkeit.`
    );
  }
  if (hrt === 'Nein, noch nie') {
    lines.push(
      'Da Sie noch keine Hormontherapie ausprobiert haben, können wir alle Optionen gemeinsam besprechen.'
    );
  } else if (hrt === 'Ja, aktuell') {
    lines.push(
      'Ihre aktuelle Therapie können wir im Beratungsgespräch gemeinsam evaluieren und optimieren.'
    );
  } else if (hrt === 'Ja, früher') {
    lines.push(
      'Ihre früheren Erfahrungen mit Hormontherapie fliessen in unsere Empfehlung ein.'
    );
  }
  return lines;
}

export default function QuizModal({ onClose }) {
  const { t } = useLang();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const totalSteps = 6;

  const canProceed = () => {
    if (step >= questions.length) return false;
    const q = questions[step];
    const val = answers[q.key];
    if (q.multi) {
      return Array.isArray(val) && val.length > 0;
    }
    return !!val;
  };

  const handleSingleSelect = (key, option) => {
    setAnswers((prev) => ({ ...prev, [key]: option }));
  };

  const handleMultiSelect = (key, option, maxSelect) => {
    setAnswers((prev) => {
      const current = prev[key] || [];
      if (current.includes(option)) {
        return { ...prev, [key]: current.filter((o) => o !== option) };
      }
      if (current.length >= maxSelect) return prev;
      return { ...prev, [key]: [...current, option] };
    });
  };

  const renderOptionCards = (q) => {
    if (q.multi) {
      const selected = answers[q.key] || [];
      return (
        <div className="space-y-2.5">
          {q.options.map((option) => {
            const isSelected = selected.includes(option);
            const isDisabled = !isSelected && selected.length >= q.maxSelect;
            return (
              <button
                key={option}
                onClick={() => handleMultiSelect(q.key, option, q.maxSelect)}
                disabled={isDisabled}
                className={`w-full text-left font-sans text-sm px-5 py-3.5 rounded-[2px] border transition-all cursor-pointer bg-transparent ${
                  isSelected
                    ? 'border-sage bg-[#6B8F6E]/10 text-forest'
                    : isDisabled
                    ? 'border-border text-stone/40 cursor-not-allowed'
                    : 'border-border text-charcoal hover:border-sage/50'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`flex-shrink-0 w-5 h-5 rounded-[3px] border-2 flex items-center justify-center transition-colors ${
                      isSelected ? 'border-sage bg-sage text-white' : 'border-border'
                    }`}
                  >
                    {isSelected && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        className="flex-shrink-0"
                      >
                        <path
                          d="M2.5 6L5 8.5L9.5 3.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  {option}
                </span>
              </button>
            );
          })}
        </div>
      );
    }

    return (
      <div className="space-y-2.5">
        {q.options.map((option) => {
          const isSelected = answers[q.key] === option;
          return (
            <button
              key={option}
              onClick={() => handleSingleSelect(q.key, option)}
              className={`w-full text-left font-sans text-sm px-5 py-3.5 rounded-[2px] border transition-all cursor-pointer bg-transparent ${
                isSelected
                  ? 'border-sage bg-[#6B8F6E]/10 text-forest'
                  : 'border-border text-charcoal hover:border-sage/50'
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected ? 'border-sage' : 'border-border'
                  }`}
                >
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-sage" />
                  )}
                </span>
                {option}
              </span>
            </button>
          );
        })}
      </div>
    );
  };

  const renderStep = () => {
    if (step < questions.length) {
      const q = questions[step];
      const selected = q.multi ? answers[q.key] || [] : null;
      return (
        <div>
          <h3 className="font-serif text-xl text-forest mb-2">
            {(step === 0 && t.quiz?.q1) || q.question}
          </h3>
          {q.subtitle && (
            <p className="font-sans text-sm text-stone mb-1">{q.subtitle}</p>
          )}
          {q.multi && (
            <p className="font-sans text-xs text-stone/70 mb-5">
              {selected.length} / {q.maxSelect} ausgewählt
            </p>
          )}
          {!q.multi && !q.subtitle && <div className="mb-5" />}
          {renderOptionCards(q)}
        </div>
      );
    }

    // Step 6: Result
    const headline = getResultHeadline(answers);
    const bodyLines = getResultBody(answers);
    const chipKeys = ['age', 'cycle', 'symptoms', 'hrt', 'priority'];
    const chips = [];
    chipKeys.forEach((key) => {
      const val = answers[key];
      if (Array.isArray(val)) {
        val.forEach((v) => chips.push(v));
      } else if (val) {
        chips.push(val);
      }
    });

    return (
      <div>
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-sage/15 flex items-center justify-center mx-auto mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-sage">
              <path
                d="M9 12l2 2 4-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <h3 className="font-serif text-xl text-forest mb-3">
            Ihre persönliche Einschätzung
          </h3>
        </div>

        <p className="font-sans text-sm text-charcoal leading-relaxed mb-4">
          {headline}
        </p>

        {bodyLines.map((line, i) => (
          <p
            key={i}
            className="font-sans text-sm text-stone leading-relaxed mb-3"
          >
            {line}
          </p>
        ))}

        <div className="flex flex-wrap gap-2 mt-6 mb-8">
          {chips.map((chip, i) => (
            <span
              key={i}
              className="font-sans text-xs text-forest bg-[#6B8F6E]/10 border border-sage/30 px-3 py-1.5 rounded-full"
            >
              {chip}
            </span>
          ))}
        </div>

        <a
          href="#beratung"
          onClick={onClose}
          className="block w-full text-center font-sans font-medium text-sm bg-forest text-cream px-6 py-3.5 rounded-[2px] hover:bg-forest-mid transition-colors no-underline uppercase tracking-wider"
        >
          Beratungsgespräch buchen
        </a>

        <p className="font-sans text-xs text-stone text-center mt-4">
          Kostenlos & unverbindlich – Ihre Daten bleiben vertraulich.
        </p>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-cream rounded-lg shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header with progress */}
        <div className="sticky top-0 bg-cream z-10 px-8 pt-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <span className="font-sans text-xs text-stone uppercase tracking-wider">
              {step < 5 ? `Schritt ${step + 1} von 5` : 'Ergebnis'}
            </span>
            <button
              onClick={onClose}
              className="text-stone hover:text-charcoal transition-colors bg-transparent border-0 cursor-pointer text-xl leading-none"
            >
              &times;
            </button>
          </div>
          {/* Progress bar */}
          <div className="h-1 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-rose rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-8">{renderStep()}</div>

        {/* Footer nav */}
        {step < 5 && (
          <div className="sticky bottom-0 bg-cream px-8 py-4 border-t border-border flex justify-between">
            {step > 0 ? (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="font-sans text-sm text-stone border border-border px-5 py-2.5 rounded-[2px] hover:border-stone transition-colors cursor-pointer bg-transparent"
              >
                Zurück
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
              className="font-sans font-medium text-sm bg-forest text-cream px-6 py-2.5 rounded-[2px] hover:bg-forest-mid transition-colors cursor-pointer border-0 disabled:opacity-40 disabled:cursor-not-allowed uppercase tracking-wider"
            >
              Weiter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
