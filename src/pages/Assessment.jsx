import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { useFadeIn } from '../hooks/useFadeIn';

const CANTONS = [
  'Aargau', 'Appenzell Ausserrhoden', 'Appenzell Innerrhoden', 'Basel-Landschaft',
  'Basel-Stadt', 'Bern', 'Freiburg', 'Genf', 'Glarus', 'Graubünden', 'Jura',
  'Luzern', 'Neuenburg', 'Nidwalden', 'Obwalden', 'Schaffhausen', 'Schwyz',
  'Solothurn', 'St. Gallen', 'Tessin', 'Thurgau', 'Uri', 'Waadt', 'Wallis',
  'Zug', 'Zürich',
];

export default function Assessment() {
  const { t } = useLang();
  const containerRef = useFadeIn();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '',
    age: '',
    canton: '',
    language: 'de',
    cycleStatus: '',
    cycleStoppedDate: '',
    symptoms: [],
    severities: {},
    breastCancer: false,
    bloodClot: false,
    liverDisease: false,
    migraineAura: false,
    medications: '',
    goals: [],
  });

  const totalSteps = 6;

  const updateForm = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const toggleSymptom = (symptom) => {
    setForm(prev => {
      const syms = prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : prev.symptoms;
      if (!prev.symptoms.includes(symptom)) syms.push(symptom);
      return { ...prev, symptoms: syms };
    });
  };

  const setSeverity = (symptom, level) => {
    setForm(prev => ({ ...prev, severities: { ...prev.severities, [symptom]: level } }));
  };

  const toggleGoal = (goal) => {
    setForm(prev => ({
      ...prev,
      goals: prev.goals.includes(goal) ? prev.goals.filter(g => g !== goal) : [...prev.goals, goal],
    }));
  };

  const severityLevels = ['keine', 'leicht', 'mittel', 'stark'];
  const goalOptions = [
    'Hitzewallungen reduzieren',
    'Schlaf verbessern',
    'Knochengesundheit schützen',
    'Stimmung verbessern',
    'Libido erhalten',
    'Gewicht kontrollieren',
    'Konzentration verbessern',
    'Anderes',
  ];

  const canProceed = () => {
    switch (step) {
      case 0: return form.name && form.age && form.canton;
      case 1: return form.cycleStatus !== '';
      case 2: return form.symptoms.length > 0;
      case 3: return true;
      case 4: return form.goals.length > 0;
      default: return true;
    }
  };

  const inputClass = "w-full px-4 py-3 bg-white border border-sage/30 rounded-[2px] text-charcoal text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30 transition-colors";
  const labelClass = "block text-sm font-medium text-charcoal mb-2";

  return (
    <div ref={containerRef} className="page-enter">
      <section className="py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-5 lg:px-8">
          <div className="fade-in-section">
            <p className="text-xs font-medium tracking-widest uppercase text-sage mb-4 font-sans">{t.common.step} {Math.min(step + 1, totalSteps)} / {totalSteps}</p>
            <h1 className="font-serif font-bold text-forest text-3xl md:text-4xl leading-tight">{t.assessment.title}</h1>
            {step === 0 && <p className="mt-4 text-charcoal-light text-sm leading-relaxed">{t.assessment.intro}</p>}
          </div>

          {/* Progress bar */}
          <div className="mt-8 mb-10">
            <div className="flex gap-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    i <= step ? 'bg-sage' : 'bg-sage/20'
                  }`}
                />
              ))}
            </div>
            <p className="mt-3 text-xs text-charcoal-light">{t.assessment.steps[Math.min(step, totalSteps - 1)]}</p>
          </div>

          {/* Step 0: Basic info */}
          {step === 0 && (
            <div className="fade-in-section space-y-6">
              <div>
                <label className={labelClass}>Name *</label>
                <input type="text" value={form.name} onChange={e => updateForm('name', e.target.value)} className={inputClass} placeholder="Vor- und Nachname" />
              </div>
              <div>
                <label className={labelClass}>Alter *</label>
                <input type="number" value={form.age} onChange={e => updateForm('age', e.target.value)} className={inputClass} placeholder="z.B. 48" min="18" max="99" />
              </div>
              <div>
                <label className={labelClass}>Kanton *</label>
                <select value={form.canton} onChange={e => updateForm('canton', e.target.value)} className={inputClass}>
                  <option value="">Bitte wählen</option>
                  {CANTONS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Bevorzugte Sprache</label>
                <div className="flex gap-4">
                  {['de', 'fr', 'en'].map(l => (
                    <label key={l} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="language" value={l} checked={form.language === l} onChange={() => updateForm('language', l)} className="accent-sage" />
                      <span className="text-sm text-charcoal">{l.toUpperCase()}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Cycle status */}
          {step === 1 && (
            <div className="fade-in-section space-y-4">
              <p className={labelClass}>Wie ist Ihr aktueller Menstruationszyklus? *</p>
              {[
                { value: 'regular', label: 'Regelmässig', desc: 'Alle 21–35 Tage, vorhersehbar' },
                { value: 'irregular', label: 'Unregelmässig', desc: 'Zykluslänge schwankt, Aussetzer möglich' },
                { value: 'stopped', label: 'Blutung gestoppt', desc: 'Keine Menstruation seit über 12 Monaten' },
              ].map(opt => (
                <label
                  key={opt.value}
                  className={`flex items-start gap-4 p-5 border rounded-[2px] cursor-pointer transition-all duration-150 ${
                    form.cycleStatus === opt.value ? 'border-sage bg-sage/5' : 'border-sage/20 bg-white hover:border-sage/40'
                  }`}
                >
                  <input type="radio" name="cycle" value={opt.value} checked={form.cycleStatus === opt.value} onChange={() => updateForm('cycleStatus', opt.value)} className="mt-1 accent-sage" />
                  <div>
                    <span className="block text-sm font-medium text-charcoal">{opt.label}</span>
                    <span className="block text-xs text-charcoal-light mt-0.5">{opt.desc}</span>
                  </div>
                </label>
              ))}
              {form.cycleStatus === 'stopped' && (
                <div className="ml-8 mt-2">
                  <label className={labelClass}>Seit wann ungefähr?</label>
                  <input type="month" value={form.cycleStoppedDate} onChange={e => updateForm('cycleStoppedDate', e.target.value)} className={inputClass} />
                </div>
              )}
            </div>
          )}

          {/* Step 2: Symptoms */}
          {step === 2 && (
            <div className="fade-in-section">
              <p className={labelClass}>Welche Symptome belasten Sie? (Mehrfachauswahl möglich) *</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {t.symptoms.items.map((symptom, i) => {
                  const selected = form.symptoms.includes(symptom.name);
                  return (
                    <div key={i}>
                      <label
                        className={`flex items-center gap-3 p-4 border rounded-[2px] cursor-pointer transition-all duration-150 ${
                          selected ? 'border-sage bg-sage/5' : 'border-sage/20 bg-white hover:border-sage/40'
                        }`}
                      >
                        <input type="checkbox" checked={selected} onChange={() => toggleSymptom(symptom.name)} className="accent-sage" />
                        <span className="text-sm text-charcoal">{symptom.name}</span>
                      </label>
                      {selected && (
                        <div className="flex gap-1 mt-2 ml-7">
                          {severityLevels.map((level, li) => (
                            <button
                              key={level}
                              onClick={() => setSeverity(symptom.name, li)}
                              className={`px-3 py-1 text-xs rounded-[2px] border transition-colors cursor-pointer ${
                                (form.severities[symptom.name] || 0) === li
                                  ? 'bg-sage text-cream border-sage'
                                  : 'bg-white text-charcoal-light border-sage/20 hover:border-sage/40'
                              }`}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Medical history */}
          {step === 3 && (
            <div className="fade-in-section space-y-6">
              <p className={labelClass}>Bitte geben Sie relevante Vorerkrankungen an:</p>
              <div className="space-y-3">
                {[
                  { key: 'breastCancer', label: 'Brustkrebs (persönlich oder familiär)' },
                  { key: 'bloodClot', label: 'Thrombose / Blutgerinnsel' },
                  { key: 'liverDisease', label: 'Lebererkrankung' },
                  { key: 'migraineAura', label: 'Migräne mit Aura' },
                ].map(item => (
                  <label key={item.key} className={`flex items-center gap-3 p-4 border rounded-[2px] cursor-pointer transition-all duration-150 ${form[item.key] ? 'border-blush bg-blush/5' : 'border-sage/20 bg-white'}`}>
                    <input type="checkbox" checked={form[item.key]} onChange={() => updateForm(item.key, !form[item.key])} className="accent-sage" />
                    <span className="text-sm text-charcoal">{item.label}</span>
                  </label>
                ))}
              </div>
              <div>
                <label className={labelClass}>Aktuelle Medikamente (optional)</label>
                <textarea value={form.medications} onChange={e => updateForm('medications', e.target.value)} className={inputClass + ' min-h-[100px]'} placeholder="z.B. Schilddrüsenmedikamente, Blutdrucksenker..." />
              </div>
            </div>
          )}

          {/* Step 4: Goals */}
          {step === 4 && (
            <div className="fade-in-section">
              <p className={labelClass}>Was möchten Sie mit einer Behandlung erreichen? *</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {goalOptions.map(goal => (
                  <label
                    key={goal}
                    className={`flex items-center gap-3 p-4 border rounded-[2px] cursor-pointer transition-all duration-150 ${
                      form.goals.includes(goal) ? 'border-sage bg-sage/5' : 'border-sage/20 bg-white hover:border-sage/40'
                    }`}
                  >
                    <input type="checkbox" checked={form.goals.includes(goal)} onChange={() => toggleGoal(goal)} className="accent-sage" />
                    <span className="text-sm text-charcoal">{goal}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Result */}
          {step === 5 && (
            <div className="fade-in-section text-center py-10">
              <div className="w-16 h-16 mx-auto bg-sage/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h2 className="font-serif font-bold text-forest text-3xl">{t.assessment.resultTitle}</h2>
              <p className="mt-4 text-charcoal-light leading-relaxed max-w-lg mx-auto">{t.assessment.resultDescription}</p>

              <div className="mt-8 bg-white border border-sage/20 rounded-[2px] p-6 text-left max-w-md mx-auto">
                <h3 className="text-sm font-medium text-forest mb-4">Ihre Zusammenfassung</h3>
                <div className="space-y-2 text-sm text-charcoal">
                  <p><span className="text-charcoal-light">Name:</span> {form.name}</p>
                  <p><span className="text-charcoal-light">Alter:</span> {form.age}</p>
                  <p><span className="text-charcoal-light">Kanton:</span> {form.canton}</p>
                  <p><span className="text-charcoal-light">Zyklus:</span> {form.cycleStatus === 'regular' ? 'Regelmässig' : form.cycleStatus === 'irregular' ? 'Unregelmässig' : 'Gestoppt'}</p>
                  <p><span className="text-charcoal-light">Symptome:</span> {form.symptoms.join(', ') || '—'}</p>
                  <p><span className="text-charcoal-light">Ziele:</span> {form.goals.join(', ') || '—'}</p>
                </div>
              </div>

              {/* Mock booking calendar */}
              <div className="mt-10">
                <h3 className="font-serif font-bold text-forest text-xl mb-6">{t.assessment.bookCta}</h3>
                <div className="bg-white border border-sage/20 rounded-[2px] p-6 max-w-md mx-auto">
                  <div className="flex items-center justify-between mb-4">
                    <button className="text-charcoal-light hover:text-forest transition-colors text-sm cursor-pointer bg-transparent border-0">&larr; April</button>
                    <span className="text-sm font-medium text-forest">Mai 2026</span>
                    <button className="text-charcoal-light hover:text-forest transition-colors text-sm cursor-pointer bg-transparent border-0">Juni &rarr;</button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-xs">
                    {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(d => (
                      <div key={d} className="py-2 text-charcoal-light font-medium">{d}</div>
                    ))}
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={`e${i}`} className="py-2" />
                    ))}
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(d => {
                      const available = [4, 5, 6, 11, 12, 13, 18, 19, 20, 25, 26, 27].includes(d);
                      return (
                        <div
                          key={d}
                          className={`py-2 rounded-[2px] text-sm ${
                            available
                              ? 'bg-sage/10 text-forest cursor-pointer hover:bg-sage/20 transition-colors'
                              : 'text-charcoal-light/40'
                          }`}
                        >
                          {d}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-4 border-t border-sage/10">
                    <p className="text-xs text-charcoal-light">Verfügbare Zeiten für den gewählten Tag:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {['09:00', '10:30', '14:00', '15:30', '17:00'].map(time => (
                        <button key={time} className="px-3 py-1.5 text-xs border border-sage/30 rounded-[2px] text-forest hover:bg-sage/10 transition-colors cursor-pointer bg-transparent">
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-8 text-xs text-charcoal-light max-w-sm mx-auto">{t.assessment.privacy}</p>
            </div>
          )}

          {/* Navigation */}
          {step < 5 && (
            <div className="mt-10 flex items-center justify-between">
              {step > 0 ? (
                <button onClick={() => setStep(s => s - 1)} className="px-6 py-3 text-sm text-charcoal-light border border-sage/20 rounded-[2px] hover:border-sage/40 transition-colors cursor-pointer bg-transparent">
                  {t.assessment.back}
                </button>
              ) : <div />}
              <button
                onClick={() => setStep(s => s + 1)}
                disabled={!canProceed()}
                className={`px-8 py-3 text-sm font-medium rounded-[2px] transition-colors cursor-pointer border-0 ${
                  canProceed()
                    ? 'bg-forest text-cream hover:bg-sage-dark'
                    : 'bg-sage/20 text-charcoal-light cursor-not-allowed'
                }`}
              >
                {step === 4 ? t.assessment.submit : t.assessment.next}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
