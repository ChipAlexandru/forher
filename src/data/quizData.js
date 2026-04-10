export const quizSteps = [
  {
    id: "sleep", domain: "Sleep & energy", icon: "\u{1F319}",
    question: { en: "How has your sleep been lately?", de: "Wie schlafen Sie in letzter Zeit?" },
    context: { en: "Sleep disruption is one of the earliest and most common experiences during hormonal transitions. It\u2019s not in your head.", de: "Schlafst\u00F6rungen geh\u00F6ren zu den fr\u00FChesten und h\u00E4ufigsten Erfahrungen w\u00E4hrend hormoneller Ver\u00E4nderungen. Es liegt nicht an Ihnen." },
    options: [
      { label: { en: "I sleep well most nights", de: "Ich schlafe die meisten N\u00E4chte gut" }, value: 0 },
      { label: { en: "I wake up once or twice but fall back asleep", de: "Ich wache ein- bis zweimal auf, schlafe aber wieder ein" }, value: 1 },
      { label: { en: "I regularly wake at 3\u20134 AM and can\u2019t get back to sleep", de: "Ich wache regelm\u00E4ssig um 3\u20134 Uhr auf und kann nicht mehr einschlafen" }, value: 2 },
      { label: { en: "I dread bedtime \u2014 sleep feels broken most nights", de: "Ich f\u00FCrchte mich vor dem Schlafengehen \u2014 der Schlaf f\u00FChlt sich die meisten N\u00E4chte gest\u00F6rt an" }, value: 3 },
    ],
    empathy: {
      0: null,
      1: { en: "Waking during the night is one of the first signs many women notice. It often starts before other symptoms appear.", de: "N\u00E4chtliches Aufwachen ist eines der ersten Anzeichen, das viele Frauen bemerken. Es beginnt oft, bevor andere Symptome auftreten." },
      2: { en: "That 3 AM wake-up is so common during perimenopause that clinicians call it a hallmark pattern. You\u2019re not alone in this.", de: "Dieses Aufwachen um 3 Uhr ist in der Perimenopause so h\u00E4ufig, dass \u00C4rzte es als typisches Muster bezeichnen. Sie sind damit nicht allein." },
      3: { en: "Chronic sleep disruption takes a real toll \u2014 on your energy, your mood, everything. This is one of the most impactful symptoms, and it\u2019s treatable.", de: "Chronische Schlafst\u00F6rungen fordern ihren Tribut \u2014 bei der Energie, der Stimmung, allem. Dies ist eines der belastendsten Symptome, und es ist behandelbar." },
    },
  },
  {
    id: "energy", domain: "Daily energy", icon: "\u26A1",
    question: { en: "How would you describe your energy through the day?", de: "Wie w\u00FCrden Sie Ihre Energie im Tagesverlauf beschreiben?" },
    context: { en: "Fatigue during menopause isn\u2019t laziness \u2014 it\u2019s your body adapting to shifting hormone levels that affect every system.", de: "M\u00FCdigkeit in den Wechseljahren ist keine Faulheit \u2014 Ihr K\u00F6rper passt sich an ver\u00E4nderte Hormonspiegel an, die jedes System betreffen." },
    options: [
      { label: { en: "I have steady energy throughout the day", de: "Ich habe den ganzen Tag \u00FCber gleichm\u00E4ssig Energie" }, value: 0 },
      { label: { en: "I notice afternoon dips but manage", de: "Ich bemerke Nachmittagstiefs, komme aber zurecht" }, value: 1 },
      { label: { en: "I\u2019m running on empty by mid-afternoon most days", de: "Am fr\u00FChen Nachmittag bin ich die meisten Tage v\u00F6llig ersch\u00F6pft" }, value: 2 },
      { label: { en: "I feel exhausted from the moment I wake up", de: "Ich f\u00FChle mich ersch\u00F6pft, sobald ich aufwache" }, value: 3 },
    ],
    empathy: {
      0: null,
      1: { en: "Afternoon energy dips become more noticeable as estrogen fluctuates. Small adjustments can make a real difference here.", de: "Nachmittags-Energietiefs werden deutlicher, wenn der \u00D6strogenspiegel schwankt. Kleine Anpassungen k\u00F6nnen hier einen echten Unterschied machen." },
      2: { en: "That mid-afternoon wall is your body signaling that something has shifted. Many women describe exactly this \u2014 and it responds well to the right support.", de: "Diese Nachmittagsmauer ist ein Signal Ihres K\u00F6rpers, dass sich etwas ver\u00E4ndert hat. Viele Frauen beschreiben genau das \u2014 und es spricht gut auf die richtige Unterst\u00FCtzung an." },
      3: { en: "Waking up already exhausted is incredibly frustrating. This level of fatigue deserves proper attention \u2014 not just \u2018get more rest\u2019 advice.", de: "Bereits ersch\u00F6pft aufzuwachen ist unglaublich frustrierend. Dieses Mass an M\u00FCdigkeit verdient angemessene Aufmerksamkeit \u2014 nicht nur den Rat \u2018ruhen Sie sich mehr aus\u2019." },
    },
  },
  {
    id: "mood", domain: "Mood & emotions", icon: "\u{1F4AD}",
    question: { en: "Have your emotions felt different recently?", de: "Haben sich Ihre Emotionen in letzter Zeit anders angef\u00FChlt?" },
    context: { en: "Mood changes during menopause are neurological, not psychological weakness. Estrogen directly affects serotonin and other mood-regulating systems.", de: "Stimmungsver\u00E4nderungen in den Wechseljahren sind neurologisch, keine psychische Schw\u00E4che. \u00D6strogen beeinflusst direkt Serotonin und andere stimmungsregulierende Systeme." },
    options: [
      { label: { en: "I feel emotionally stable overall", de: "Ich f\u00FChle mich emotional insgesamt stabil" }, value: 0 },
      { label: { en: "I\u2019m more irritable or tearful than usual", de: "Ich bin reizbarer oder weinerlicher als sonst" }, value: 1 },
      { label: { en: "I have mood swings that feel out of character for me", de: "Ich habe Stimmungsschwankungen, die nicht zu mir passen" }, value: 2 },
      { label: { en: "I feel anxious, flat, or unlike myself much of the time", de: "Ich f\u00FChle mich oft \u00E4ngstlich, flach oder mir selbst fremd" }, value: 3 },
    ],
    empathy: {
      0: null,
      1: { en: "That increased irritability is so common \u2014 and so often dismissed. It\u2019s a real physiological shift, not overreacting.", de: "Diese erh\u00F6hte Reizbarkeit ist so h\u00E4ufig \u2014 und wird so oft abgetan. Es ist eine echte physiologische Ver\u00E4nderung, keine \u00DCberreaktion." },
      2: { en: "When you feel out of character, it\u2019s unsettling. These mood shifts have a clear hormonal basis, and understanding that can be a relief in itself.", de: "Wenn man sich nicht wiedererkennt, ist das verunsichernd. Diese Stimmungsschwankungen haben eine klare hormonelle Ursache, und das zu verstehen kann schon eine Erleichterung sein." },
      3: { en: "Feeling unlike yourself is one of the hardest parts. Many women say this is the symptom that finally made them seek help \u2014 and they wish they\u2019d done it sooner.", de: "Sich selbst fremd zu f\u00FChlen ist einer der schwierigsten Aspekte. Viele Frauen sagen, dies war das Symptom, das sie schliesslich Hilfe suchen liess \u2014 und sie w\u00FCnschten, sie h\u00E4tten es fr\u00FCher getan." },
    },
  },
  {
    id: "vasomotor", domain: "Hot flashes & sweating", icon: "\u{1F321}\uFE0F",
    question: { en: "Do you experience hot flashes or night sweats?", de: "Erleben Sie Hitzewallungen oder Nachtschweiss?" },
    context: { en: "Hot flashes affect up to 80% of women during menopause. They\u2019re caused by your brain\u2019s temperature regulation recalibrating as estrogen shifts.", de: "Hitzewallungen betreffen bis zu 80% der Frauen in den Wechseljahren. Sie werden durch die Neukalibrierung der Temperaturregulation im Gehirn verursacht." },
    options: [
      { label: { en: "Rarely or never", de: "Selten oder nie" }, value: 0 },
      { label: { en: "Occasionally \u2014 maybe a few times a week", de: "Gelegentlich \u2014 vielleicht ein paar Mal pro Woche" }, value: 1 },
      { label: { en: "Daily, and they disrupt what I\u2019m doing", de: "T\u00E4glich, und sie st\u00F6ren mich bei dem, was ich gerade tue" }, value: 2 },
      { label: { en: "Frequently, including at night \u2014 they affect my sleep and confidence", de: "H\u00E4ufig, auch nachts \u2014 sie beeintr\u00E4chtigen meinen Schlaf und mein Selbstvertrauen" }, value: 3 },
    ],
    empathy: {
      0: null,
      1: { en: "Even occasional hot flashes can catch you off guard. They often increase in frequency over time, so it\u2019s worth paying attention now.", de: "Auch gelegentliche Hitzewallungen k\u00F6nnen einen \u00FCberraschen. Sie nehmen oft mit der Zeit zu, daher lohnt es sich, jetzt aufmerksam zu sein." },
      2: { en: "When hot flashes start interrupting your day \u2014 meetings, meals, sleep \u2014 that\u2019s your body asking for support. This doesn\u2019t have to be your normal.", de: "Wenn Hitzewallungen Ihren Tag unterbrechen \u2014 Meetings, Mahlzeiten, Schlaf \u2014 bittet Ihr K\u00F6rper um Unterst\u00FCtzung. Das muss nicht Ihr Normal sein." },
      3: { en: "Hot flashes that affect your sleep and how you feel in public are among the most treatable menopause symptoms. There are real options here.", de: "Hitzewallungen, die Ihren Schlaf und Ihr Auftreten beeintr\u00E4chtigen, geh\u00F6ren zu den am besten behandelbaren Menopause-Symptomen. Es gibt echte Optionen." },
    },
  },
  {
    id: "body", domain: "Physical changes", icon: "\u{1F9B4}",
    question: { en: "Have you noticed physical changes in your body?", de: "Haben Sie k\u00F6rperliche Ver\u00E4nderungen bemerkt?" },
    context: { en: "Joint stiffness, weight shifts, and muscle changes are driven by the same hormonal transitions. They\u2019re connected \u2014 not separate problems.", de: "Gelenksteifigkeit, Gewichtsver\u00E4nderungen und Muskelver\u00E4nderungen werden durch dieselben hormonellen Ver\u00E4nderungen verursacht. Sie h\u00E4ngen zusammen \u2014 es sind keine separaten Probleme." },
    options: [
      { label: { en: "Not really \u2014 my body feels about the same", de: "Nicht wirklich \u2014 mein K\u00F6rper f\u00FChlt sich etwa gleich an" }, value: 0 },
      { label: { en: "Some joint stiffness or weight changes I didn\u2019t expect", de: "Etwas Gelenksteifigkeit oder Gewichtsver\u00E4nderungen, die ich nicht erwartet hatte" }, value: 1 },
      { label: { en: "My body feels noticeably different \u2014 aches, dryness, or changes I can\u2019t explain", de: "Mein K\u00F6rper f\u00FChlt sich deutlich anders an \u2014 Schmerzen, Trockenheit oder Ver\u00E4nderungen, die ich mir nicht erkl\u00E4ren kann" }, value: 2 },
      { label: { en: "Multiple changes that affect how I move, feel, or see myself", de: "Mehrere Ver\u00E4nderungen, die beeinflussen, wie ich mich bewege, f\u00FChle oder wahrnehme" }, value: 3 },
    ],
    empathy: {
      0: null,
      1: { en: "Those unexpected changes \u2014 the stiff knees in the morning, weight that doesn\u2019t respond like it used to \u2014 they\u2019re connected to hormonal shifts, not aging alone.", de: "Diese unerwarteten Ver\u00E4nderungen \u2014 die steifen Knie am Morgen, das Gewicht, das nicht mehr so reagiert \u2014 h\u00E4ngen mit hormonellen Ver\u00E4nderungen zusammen, nicht nur mit dem Alter." },
      2: { en: "When your body starts feeling unfamiliar, it can be isolating. These changes have a common root, and understanding that is the first step.", de: "Wenn sich der eigene K\u00F6rper fremd anf\u00FChlt, kann das isolierend sein. Diese Ver\u00E4nderungen haben eine gemeinsame Ursache, und das zu verstehen ist der erste Schritt." },
      3: { en: "Experiencing multiple physical changes at once is overwhelming. You shouldn\u2019t have to sort through this alone \u2014 a specialist can connect the dots.", de: "Mehrere k\u00F6rperliche Ver\u00E4nderungen gleichzeitig zu erleben ist \u00FCberw\u00E4ltigend. Sie sollten das nicht alleine durchstehen m\u00FCssen \u2014 eine Fachperson kann die Zusammenh\u00E4nge erkennen." },
    },
  },
  {
    id: "care", domain: "Your experience with care", icon: "\u{1FA7A}",
    question: { en: "Have you talked to a doctor about what you\u2019re experiencing?", de: "Haben Sie mit einer \u00C4rztin oder einem Arzt \u00FCber Ihre Beschwerden gesprochen?" },
    context: { en: "Only 1 in 5 physicians receive formal menopause training. Many women are told \u2018it\u2019s just stress\u2019 or \u2018it\u2019s part of aging.\u2019 You deserve better than that.", de: "Nur 1 von 5 \u00C4rztinnen und \u00C4rzten erh\u00E4lt eine formale Menopause-Ausbildung. Viele Frauen h\u00F6ren \u2018das ist nur Stress\u2019 oder \u2018das geh\u00F6rt zum \u00C4lterwerden.\u2019 Sie verdienen Besseres." },
    options: [
      { label: { en: "Yes, and I felt heard and supported", de: "Ja, und ich f\u00FChlte mich geh\u00F6rt und unterst\u00FCtzt" }, value: 0 },
      { label: { en: "Yes, but I didn\u2019t feel they fully understood", de: "Ja, aber ich hatte nicht das Gef\u00FChl, dass sie es wirklich verstanden haben" }, value: 1 },
      { label: { en: "I brought it up but was brushed off or told it\u2019s normal", de: "Ich habe es angesprochen, wurde aber abgewimmelt oder es hiess, das sei normal" }, value: 2 },
      { label: { en: "No \u2014 I haven\u2019t known who to turn to or what to say", de: "Nein \u2014 ich wusste nicht, an wen ich mich wenden oder was ich sagen soll" }, value: 3 },
    ],
    empathy: {
      0: { en: "That\u2019s wonderful. Having a doctor who listens makes all the difference. We\u2019re here to complement that care with specialist menopause expertise.", de: "Das ist wunderbar. Eine \u00C4rztin oder ein Arzt, der zuh\u00F6rt, macht den ganzen Unterschied. Wir erg\u00E4nzen diese Betreuung mit spezialisierter Menopause-Expertise." },
      1: { en: "Feeling partially heard is frustrating. Menopause care requires specific training that most general practitioners haven\u2019t had \u2014 it\u2019s not their fault, but you deserve a specialist.", de: "Sich nur teilweise geh\u00F6rt zu f\u00FChlen ist frustrierend. Menopause-Versorgung erfordert eine spezielle Ausbildung, die die meisten \u00C4rztinnen und \u00C4rzte nicht haben \u2014 das ist nicht ihre Schuld, aber Sie verdienen eine Fachperson." },
      2: { en: "Being told \u2018it\u2019s normal\u2019 when you\u2019re struggling is one of the most common experiences women report. Your symptoms are real. They\u2019re measurable. And they\u2019re treatable.", de: "Zu h\u00F6ren \u2018das ist normal\u2019, wenn man leidet, ist eine der h\u00E4ufigsten Erfahrungen, die Frauen berichten. Ihre Symptome sind real. Sie sind messbar. Und sie sind behandelbar." },
      3: { en: "Not knowing where to turn is incredibly common \u2014 there\u2019s a real gap in menopause care. That\u2019s exactly why we exist. You\u2019ve taken the first step right now.", de: "Nicht zu wissen, an wen man sich wenden soll, ist unglaublich h\u00E4ufig \u2014 es gibt eine echte L\u00FCcke in der Menopause-Versorgung. Genau daf\u00FCr gibt es uns. Sie haben gerade den ersten Schritt getan." },
    },
  },
];

export function getProfile(answers, lang) {
  const total = Object.values(answers).reduce((sum, v) => sum + v, 0);
  const max = quizSteps.length * 3;
  const pct = Math.round((total / max) * 100);
  const sorted = Object.entries(answers).filter(([, v]) => v >= 2).sort(([, a], [, b]) => b - a);
  const topConcerns = sorted.map(([id]) => quizSteps.find(s => s.id === id)).filter(Boolean);

  let level, message, detail;
  if (pct <= 20) {
    level = lang === 'de' ? 'Minimale Auswirkung' : 'Minimal impact';
    message = lang === 'de' ? 'Ihre Symptome scheinen derzeit beherrschbar.' : 'Your symptoms appear manageable right now.';
    detail = lang === 'de' ? 'Auch in diesem Stadium kann ein Basisgespräch mit einer Menopause-Fachperson Ihnen helfen zu verstehen, worauf Sie achten sollten.' : 'Even at this stage, a baseline conversation with a menopause specialist can help you understand what to watch for and how to stay ahead of changes.';
  } else if (pct <= 45) {
    level = lang === 'de' ? 'Mässige Auswirkung' : 'Moderate impact';
    message = lang === 'de' ? 'Ihre Symptome beeinflussen Ihre Lebensqualität auf bedeutsame Weise.' : 'Your symptoms are affecting your quality of life in meaningful ways.';
    detail = lang === 'de' ? 'Die meisten Frauen in diesem Stadium profitieren erheblich von einem Fachgespräch. Gezielte Massnahmen können einen echten Unterschied machen.' : 'Most women at this level benefit significantly from a specialist conversation. Small, targeted interventions can make a real difference before symptoms intensify.';
  } else if (pct <= 70) {
    level = lang === 'de' ? 'Erhebliche Auswirkung' : 'Significant impact';
    message = lang === 'de' ? 'Mehrere Bereiche Ihres Lebens sind betroffen.' : 'Multiple areas of your life are being affected.';
    detail = lang === 'de' ? 'Auf diesem Niveau gehen Ihre Symptome über das hinaus, was Lebensänderungen allein bewältigen können. Eine Menopause-Fachperson kann Ihnen helfen, Ihre Optionen zu verstehen.' : 'At this level, your symptoms are beyond what lifestyle changes alone can address. A menopause-trained physician can help you understand your options \u2014 including treatments most GPs don\'t discuss.';
  } else {
    level = lang === 'de' ? 'Starke Auswirkung' : 'Severe impact';
    message = lang === 'de' ? 'Ihre Erfahrung deutet auf eine erhebliche Belastung im Alltag hin.' : 'Your experience suggests a substantial burden on daily life.';
    detail = lang === 'de' ? 'Sie tragen viel mit sich. Frauen auf diesem Niveau sagen durchweg, dass sie wünschten, sie hätten früher Hilfe gesucht. Es gibt wirksame, evidenzbasierte Optionen.' : 'You\'ve been carrying a lot. Women at this level consistently say they wish they\'d sought specialist help sooner. There are effective, evidence-based options available to you.';
  }
  return { total, max, pct, level, message, detail, topConcerns };
}
