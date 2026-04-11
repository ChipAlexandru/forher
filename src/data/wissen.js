export const clusters = [
  {
    slug: 'perimenopause',
    title: { de: 'Perimenopause', en: 'Perimenopause', fr: 'Perimenopause' },
    description: {
      de: 'Erste Anzeichen, Diagnose und der Beginn der hormonellen Umstellung.',
      en: 'Early signs, diagnosis, and the beginning of hormonal transition.',
      fr: 'Premiers signes, diagnostic et debut de la transition hormonale.',
    },
    icon: '\u{1F321}\uFE0F',
  },
  {
    slug: 'symptome',
    title: { de: 'Symptome & Behandlung', en: 'Symptoms & Management', fr: 'Symptomes et prise en charge' },
    description: {
      de: 'Hitzewallungen, Schlafstorungen, Stimmungsschwankungen und was hilft.',
      en: 'Hot flashes, sleep issues, mood swings and what helps.',
      fr: 'Bouffees de chaleur, troubles du sommeil, sautes d\'humeur et solutions.',
    },
    icon: '\u{1FA7A}',
  },
  {
    slug: 'hormontherapie',
    title: { de: 'Hormontherapie (HRT)', en: 'Hormone Therapy (HRT)', fr: 'Therapie hormonale (THS)' },
    description: {
      de: 'Evidenzbasierte Informationen zu Hormonersatztherapie, Risiken und Nutzen.',
      en: 'Evidence-based information on hormone replacement therapy, risks and benefits.',
      fr: 'Informations fondees sur les preuves concernant le THS, risques et benefices.',
    },
    icon: '\u{1F48A}',
  },
  {
    slug: 'psychische-gesundheit',
    title: { de: 'Psychische Gesundheit', en: 'Mental Health', fr: 'Sante mentale' },
    description: {
      de: 'Depression, Angst und kognitive Veranderungen in den Wechseljahren.',
      en: 'Depression, anxiety, and cognitive changes during menopause.',
      fr: 'Depression, anxiete et changements cognitifs pendant la menopause.',
    },
    icon: '\u{1F9E0}',
  },
  {
    slug: 'ernaehrung',
    title: { de: 'Ernahrung & Nahrungserganzung', en: 'Nutrition & Supplements', fr: 'Nutrition et complements' },
    description: {
      de: 'Ernahrungsstrategien, Vitamine und Mineralien fur die Wechseljahre.',
      en: 'Nutritional strategies, vitamins and minerals for menopause.',
      fr: 'Strategies nutritionnelles, vitamines et mineraux pour la menopause.',
    },
    icon: '\u{1F96C}',
  },
  {
    slug: 'sexualitaet',
    title: { de: 'Sexualitat & Beziehungen', en: 'Sexuality & Relationships', fr: 'Sexualite et relations' },
    description: {
      de: 'Vaginale Trockenheit, Libido und Intimitat in den Wechseljahren.',
      en: 'Vaginal dryness, libido and intimacy during menopause.',
      fr: 'Secheresse vaginale, libido et intimite pendant la menopause.',
    },
    icon: '\u{1F495}',
  },
  {
    slug: 'nach-den-wechseljahren',
    title: { de: 'Nach den Wechseljahren', en: 'Post-Menopause Health', fr: 'Apres la menopause' },
    description: {
      de: 'Knochengesundheit, Herz-Kreislauf und langfristige Pravention.',
      en: 'Bone health, cardiovascular care and long-term prevention.',
      fr: 'Sante osseuse, cardiovasculaire et prevention a long terme.',
    },
    icon: '\u{1F9B4}',
  },
  {
    slug: 'arbeitsplatz',
    title: { de: 'Wechseljahre & Arbeitsplatz', en: 'Menopause & Workplace', fr: 'Menopause et travail' },
    description: {
      de: 'Unterstutzung am Arbeitsplatz, Policies und praktische Anpassungen.',
      en: 'Workplace support, policies and practical accommodations.',
      fr: 'Soutien au travail, politiques et amenagements pratiques.',
    },
    icon: '\u{1F4BC}',
  },
  {
    slug: 'behandlungsoptionen',
    title: { de: 'Behandlungsoptionen', en: 'Treatment Options', fr: 'Options de traitement' },
    description: {
      de: 'Hormonelle und nicht-hormonelle Therapien im Vergleich.',
      en: 'Hormonal and non-hormonal therapies compared.',
      fr: 'Therapies hormonales et non hormonales comparees.',
    },
    icon: '\u{2696}\uFE0F',
  },
  {
    slug: 'schweiz',
    title: { de: 'Wechseljahre in der Schweiz', en: 'Menopause in Switzerland', fr: 'Menopause en Suisse' },
    description: {
      de: 'Kassenpflicht, Spezialitätenliste und Schweizer Gesundheitssystem.',
      en: 'Insurance coverage, drug lists and the Swiss health system.',
      fr: 'Remboursement, liste des specialites et systeme de sante suisse.',
    },
    icon: '\u{1F1E8}\u{1F1ED}',
  },
];

export const wissenArticles = [
  {
    slug: 'was-ist-die-perimenopause',
    cluster: 'perimenopause',
    isPillar: true,
    title: {
      de: 'Was ist die Perimenopause und wie erkenne ich sie?',
      en: 'What is perimenopause and how do I recognize it?',
      fr: 'Qu\'est-ce que la perimenopause et comment la reconnaitre?',
    },
    excerpt: {
      de: 'Die Perimenopause beginnt oft Jahre vor der letzten Regelblutung und wird von vielen Frauen nicht erkannt. Erfahren Sie, welche Veranderungen typisch sind und ab wann Sie arztliche Unterstutzung in Betracht ziehen sollten.',
      en: 'Perimenopause often begins years before the last period and goes unrecognized by many women. Learn which changes are typical and when to seek medical support.',
      fr: 'La perimenopause commence souvent des annees avant les dernieres regles et n\'est pas reconnue par de nombreuses femmes.',
    },
    readingTime: 6,
    date: '2025-03-12',
    author: 'Dr. Katharina Muller',
    category: 'symptoms',
    content: `Die Perimenopause ist die Ubergangsphase, die dem endgultigen Ausbleiben der Regelblutung \u2013 der Menopause \u2013 vorausgeht. Sie kann bereits im Alter von 40 Jahren beginnen und dauert im Durchschnitt vier bis acht Jahre, in manchen Fallen sogar langer. Da der Hormonspiegel in dieser Zeit nicht kontinuierlich sinkt, sondern stark schwankt, ist das klinische Bild ausserst variabel.

Das erste und haufigste Anzeichen sind Veranderungen im Menstruationszyklus. Die Abstande zwischen den Blutungen werden langer oder kurzer, die Blutungsstarke andert sich, und gelegentliche Aussetzer treten auf. Viele Frauen bemerken auch, dass sich ihr Korper anders anfuhlt: Bruste schwellen zyklisch starker an, Schlaf wird unruhiger, und die emotionale Stimmung schwankt in Phasen, die fruher stabil waren.

Hitzewallungen und Nachtschweiss sind ebenfalls charakteristisch fur die Perimenopause, obwohl viele Frauen diese Symptome erst mit der Menopause assoziieren. In der Perimenopause konnen Hitzewallungen schon auftreten, wenn die Menstruation noch regelmassig stattfindet. Ostrogenschwankungen aktivieren den hypothalamischen Thermostat auf dysfunktionale Weise und losen die bekannten plotzlichen Hitzegefuhle aus.

Weniger bekannt, aber klinisch bedeutsam sind kognitive Veranderungen. Konzentrationsschwierigkeiten, Wortfindungsstorungen und das Gefuhl des \u00ABBrain Fog\u00BB werden haufig berichtet. Diese Symptome sind hormonell bedingt und reversibel, hangen jedoch stark mit der Schlafqualitat zusammen: Wer durch Nachtschweiss wiederholt aufwacht, akkumuliert ein Schlafdefizit, das die kognitive Leistungsfahigkeit erheblich beeintrachtigt.

Die Diagnose der Perimenopause erfolgt primar klinisch. Ein einzelner FSH-Wert (follikelstimulierendes Hormon) ist wenig aussagekraftig, da er in der Perimenopause stark variiert. Relevanter ist die Kombination aus Alter, Zyklusveranderungen und Symptomen. Das AMH (Anti-Muller-Hormon) kann einen Hinweis auf die ovarielle Reserve geben, ist aber ebenfalls kein verlasslicher alleiniger Marker.

Wann sollten Sie arztliche Hilfe suchen? Wenn die Symptome Ihren Alltag, Ihre Schlafqualitat oder Ihr emotionales Wohlbefinden beeintrachtigen, ist eine Konsultation sinnvoll. Eine fruhzeitige Therapie \u2013 gegebenenfalls mit Hormonen \u2013 kann nicht nur die Lebensqualitat verbessern, sondern auch langfristige Gesundheitsrisiken wie Knochenschwund und kardiovaskulare Erkrankungen mindern. Die Perimenopause ist keine Schwachephase, sondern ein hormoneller Wendepunkt, der medizinische Aufmerksamkeit verdient.`,
    faq: [
      { q: 'In welchem Alter beginnt die Perimenopause typischerweise?', a: 'Die Perimenopause beginnt im Durchschnitt zwischen dem 40. und 45. Lebensjahr, kann aber bei manchen Frauen bereits mit Ende 30 einsetzen. Die Dauer betragt typischerweise vier bis acht Jahre.' },
      { q: 'Kann ich in der Perimenopause noch schwanger werden?', a: 'Ja, eine Schwangerschaft ist in der Perimenopause weiterhin moglich, solange noch Eisprunge stattfinden. Verhutung sollte bis mindestens ein Jahr nach der letzten Menstruation fortgefuhrt werden.' },
      { q: 'Welche Blutuntersuchungen sind in der Perimenopause sinnvoll?', a: 'Ein einzelner FSH-Wert ist wenig aussagekraftig, da er in der Perimenopause stark schwankt. Die Diagnose erfolgt primar klinisch anhand von Alter, Zyklusveranderungen und Symptomen. Das AMH kann erganzend Hinweise auf die ovarielle Reserve geben.' },
      { q: 'Sind Stimmungsschwankungen in der Perimenopause normal?', a: 'Ja, Stimmungsschwankungen gehoren zu den haufigsten Symptomen der Perimenopause. Sie werden durch Ostrogenschwankungen verursacht und konnen durch Schlafmangel infolge von Nachtschweiss verstarkt werden.' },
      { q: 'Wann sollte ich wegen Perimenopause-Symptomen eine Arztin aufsuchen?', a: 'Wenn die Symptome Ihren Alltag, Ihre Schlafqualitat oder Ihr emotionales Wohlbefinden beeintrachtigen, ist eine Konsultation sinnvoll. Eine fruhzeitige Behandlung kann die Lebensqualitat verbessern und langfristige Gesundheitsrisiken mindern.' },
    ],
  },

  {
    slug: 'hrt-und-brustkrebs-aktuelle-forschung',
    cluster: 'hormontherapie',
    isPillar: false,
    title: {
      de: 'HRT und Brustkrebs: Was sagt die aktuelle Forschung?',
      en: 'HRT and breast cancer: What does current research say?',
      fr: 'THS et cancer du sein: que dit la recherche actuelle?',
    },
    excerpt: {
      de: 'Die Angst vor Brustkrebs hat dazu gefuhrt, dass viele Frauen eine effektive Hormontherapie meiden. Die wissenschaftliche Evidenz der letzten zehn Jahre zeichnet ein deutlich differenzierteres Bild.',
      en: 'Fear of breast cancer has led many women to avoid effective hormone therapy. Scientific evidence from the past decade paints a much more nuanced picture.',
      fr: 'La peur du cancer du sein a conduit de nombreuses femmes a eviter une therapie hormonale efficace.',
    },
    readingTime: 7,
    date: '2025-04-28',
    author: 'Dr. Katharina Muller',
    category: 'hormones',
    content: `Die Angst vor Brustkrebs ist der haufigste Grund, warum Frauen eine Hormonersatztherapie (HRT) ablehnen oder abbrechen. Diese Angst hat historische Wurzeln: Im Jahr 2002 veroffentlichte die Women's Health Initiative (WHI) Studienergebnisse, die einen erhohten Brustkrebsrisiko unter kombinierter oraler HRT zeigten. Die Schlagzeilen erzeugten eine weitreichende Verunsicherung, die bis heute nachwirkt.

Was die Offentlichkeit damals kaum erfuhr: Die WHI-Studie untersuchte eine spezifische Kombination \u2013 konjugierte Pferdeostrogene mit synthetischem Medroxyprogesteronacetat (MPA) \u2013 bei Frauen, die im Schnitt 63 Jahre alt waren und die Menopause bereits uber ein Jahrzehnt hinter sich hatten. Diese Ergebnisse lassen sich nicht ohne Weiteres auf jungere Frauen oder moderne HRT-Formulierungen ubertragen.

Die aktuelle Forschung liefert eine erheblich differenziertere Perspektive. Erstens spielt die Art des Gestagens eine entscheidende Rolle. Synthetische Gestagene wie MPA sind mit einem erhohten Risiko assoziiert, wahrend mikronisiertes Progesteron \u2013 das bioidentische Pendant \u2013 nach den vorliegenden Daten keine erhohte Brustkrebsinzidenz zeigt. Eine grosse britische Kohortenstudie (Beral et al., 2019) bestatigte diesen Unterschied in einer Million untersuchter Frauen.

Zweitens ist der Zeitpunkt der Therapie von Bedeutung. Das sogenannte \u00ABWindow of Opportunity\u00BB beschreibt die klinische Beobachtung, dass eine HRT, die innerhalb von zehn Jahren nach der Menopause oder vor dem 60. Lebensjahr begonnen wird, ein gunstigeres Nutzen-Risiko-Profil aufweist.

Drittens ist die Applikationsform relevant. Transdermales Ostrogen \u2013 also Pflaster oder Gel \u2013 umgeht den First-Pass-Effekt der Leber und ist nicht mit dem erhohten Thromboserisiko assoziiert, das bei oralen Formulierungen beobachtet wurde.

Fur die arztliche Praxis bedeutet dies: Die pauschale Aussage, \u00ABHRT erhoht das Brustkrebsrisiko\u00BB, ist wissenschaftlich uberholt. Moderne, bioidentische, transdermal applizierte HRT mit mikronisiertem Progesteron bei Frauen in der fruhen Menopause ist nach aktuellem Kenntnisstand mit einem sehr geringen absoluten Risikoanstieg verbunden. Die Menopause Society und die International Menopause Society haben diese Einschatzung in aktuellen Leitlinien verankert.

Eine individuelle Nutzen-Risiko-Abwagung unter Einbeziehung personlicher Risikofaktoren \u2013 familiare Vorbelastung, Mammografiebefunde, Lebensstil \u2013 bleibt unerlasslich. Sie verdienen eine informierte Entscheidung, keine pauschale Ablehnung.`,
    faq: [
      { q: 'Erhoht jede Form der Hormontherapie das Brustkrebsrisiko?', a: 'Nein. Die Art des Gestagens ist entscheidend. Synthetische Gestagene wie MPA sind mit einem erhohten Risiko assoziiert, wahrend mikronisiertes Progesteron nach aktueller Evidenz keine erhohte Brustkrebsinzidenz zeigt.' },
      { q: 'Was war das Problem mit der WHI-Studie von 2002?', a: 'Die WHI untersuchte konjugierte Pferdeoestrogene mit synthetischem MPA bei Frauen mit einem Durchschnittsalter von 63 Jahren. Diese Ergebnisse lassen sich nicht auf jungere Frauen oder moderne bioidentische HRT-Formulierungen ubertragen.' },
      { q: 'Was bedeutet das Window of Opportunity bei der HRT?', a: 'Es bezeichnet den Zeitraum innerhalb von zehn Jahren nach der Menopause oder vor dem 60. Lebensjahr, in dem eine HRT ein gunstigeres Nutzen-Risiko-Profil aufweist.' },
      { q: 'Ist transdermale HRT sicherer als orale?', a: 'Transdermales Ostrogen umgeht den First-Pass-Effekt der Leber und ist nicht mit dem erhohten Thromboserisiko assoziiert, das bei oralen Formulierungen beobachtet wurde. Es wird daher bei erhotem Risiko bevorzugt.' },
    ],
  },

  {
    slug: 'oestrogen-und-knochengesundheit',
    cluster: 'nach-den-wechseljahren',
    isPillar: false,
    title: {
      de: 'Warum Ostrogen fur die Knochengesundheit entscheidend ist',
      en: 'Why estrogen is crucial for bone health',
      fr: 'Pourquoi l\'oestrogene est crucial pour la sante osseuse',
    },
    excerpt: {
      de: 'Osteoporose ist eine stille Krankheit \u2013 und Ostrogen ist ihr wirksamster naturlicher Gegenspieler. Was in den Wechseljahren mit dem Knochen passiert und wie Sie langfristige Schaden verhindern konnen.',
      en: 'Osteoporosis is a silent disease \u2013 and estrogen is its most effective natural counterpart.',
      fr: 'L\'osteoporose est une maladie silencieuse \u2013 et l\'oestrogene est son antagoniste naturel le plus efficace.',
    },
    readingTime: 5,
    date: '2025-05-19',
    author: 'Dr. Sophie Perret',
    category: 'hormones',
    content: `Der Knochen ist kein statisches Gewebe. Er wird permanent auf- und abgebaut \u2013 ein Gleichgewicht, das als \u00ABBone Remodeling\u00BB bezeichnet wird. Ostrogen spielt in diesem Prozess eine zentrale regulatorische Rolle: Es hemmt die Aktivitat der Osteoklasten, der Zellen, die Knochengewebe abbauen, und fordert gleichzeitig die Apoptose dieser Zellen. Sinkt der Ostrogenspiegel in den Wechseljahren, verschiebt sich diese Balance zugunsten des Abbaus.

Die Konsequenzen sind messbar und klinisch bedeutsam. In den ersten funf bis sieben Jahren nach der Menopause kann die Knochendichte um ein bis drei Prozent pro Jahr sinken. Dies entspricht einem Verlust, der ohne Gegenmassnahmen innerhalb einer Dekade das Frakturrisiko erheblich erhoht. Besonders betroffen sind der Wirbelkorper, der Schenkelhals und das distale Handgelenk \u2013 die klassischen osteoporotischen Frakturlokalisationen.

Osteoporose entwickelt sich ohne Warnsymptome. Die erste klinische Manifestation ist haufig eine Fraktur \u2013 und eine Wirbelkorperfraktur kann jahrelang unbemerkt bleiben, bis Schmerzen oder ein messbarer Korpergressenverlust auffallen. Die Knochendichtemessung (DXA) ermoglicht eine fruhzeitige Diagnose, wird aber in der Schweiz erst ab 65 Jahren routinemassig empfohlen, ausser bei zusatzlichen Risikofaktoren.

Hier setzt die Hormontherapie an. Ostrogen ist das wirksamste Mittel zur Pravention der postmenopausalen Knochenverlustrate. Klinische Studien zeigen konsistent, dass eine HRT den jahrlichen Knochenverlust stoppt oder sogar umkehrt. Die WHI-Studie, so kontrovers sie in anderen Punkten diskutiert wurde, belegte klar, dass HRT das Frakturrisiko signifikant senkt \u2013 um rund 30 Prozent fur Huftfrakturen.

Fur Frauen unter 60 Jahren oder innerhalb von zehn Jahren nach der Menopause uberwiegen die skelettaren Vorteile einer HRT in den meisten Fallen die potenziellen Risiken, insbesondere wenn keine starken Kontraindikationen vorliegen. Die Therapie sollte jedoch individuell abgestimmt und regelmassig uberpruft werden.

Erganzend zur HRT sind eine ausreichende Kalziumzufuhr (1000\u20131200 mg taglich aus der Nahrung), Vitamin D (mindestens 800 IE taglich) und regelmassiges Krafttraining unverzichtbar. Keine dieser Massnahmen ersetzt die andere \u2013 sie wirken synergistisch. Eine langfristige Knochengesundheit beginnt mit der richtigen Weichenstellung in der Perimenopause.`,
    faq: [
      { q: 'Wie viel Knochendichte verliert man nach der Menopause?', a: 'In den ersten funf bis sieben Jahren nach der Menopause kann die Knochendichte um ein bis drei Prozent pro Jahr sinken, wenn keine Gegenmassnahmen ergriffen werden.' },
      { q: 'Ab wann wird eine Knochendichtemessung empfohlen?', a: 'In der Schweiz wird die DXA-Messung routinemassig ab 65 Jahren empfohlen. Bei zusatzlichen Risikofaktoren wie familiarer Belastung oder fruher Menopause kann sie fruher sinnvoll sein.' },
      { q: 'Kann HRT Knochenverlust tatsachlich stoppen?', a: 'Ja, klinische Studien zeigen konsistent, dass eine Hormontherapie den jahrlichen Knochenverlust stoppt oder sogar umkehrt und das Frakturrisiko um rund 30 Prozent senkt.' },
      { q: 'Welche erganzenden Massnahmen schutzen die Knochen?', a: 'Eine ausreichende Kalziumzufuhr (1000\u20131200 mg taglich), Vitamin D (mindestens 800 IE taglich) und regelmassiges Krafttraining wirken synergistisch mit einer Hormontherapie zum Schutz der Knochengesundheit.' },
    ],
  },

  {
    slug: 'wechseljahre-am-arbeitsplatz',
    cluster: 'arbeitsplatz',
    isPillar: false,
    title: {
      de: 'Wechseljahre am Arbeitsplatz: Was Arbeitgeber wissen mussen',
      en: 'Menopause in the workplace: What employers need to know',
      fr: 'Menopause au travail: ce que les employeurs doivent savoir',
    },
    excerpt: {
      de: 'Hitzewallungen im Meeting, Schlafmangel vor Prasentationen, kognitiver Nebel wahrend Verhandlungen \u2013 Wechseljahressymptome beeinflussen Millionen erwerbstatiger Frauen.',
      en: 'Hot flashes in meetings, sleep deprivation before presentations, brain fog during negotiations \u2013 menopause symptoms affect millions of working women.',
      fr: 'Bouffees de chaleur en reunion, manque de sommeil avant les presentations \u2013 les symptomes de la menopause affectent des millions de femmes actives.',
    },
    readingTime: 6,
    date: '2025-06-03',
    author: 'Dr. Sophie Perret',
    category: 'lifestyle',
    content: `In der Schweiz sind rund 1,4 Millionen Frauen im erwerbsfahigen Alter zwischen 45 und 60 Jahren. Dies ist exakt die Altersgruppe, in der die Perimenopause und Menopause auftreten. Und doch bleibt das Thema am Arbeitsplatz weitgehend tabuisiert \u2013 mit spurbaren Folgen fur Produktivitat, Wohlbefinden und Mitarbeiterbindung.

Eine britische Studie der Universitat Leicester aus dem Jahr 2023 ergab, dass fast jede dritte betroffene Frau ernsthaft in Betracht zieht, ihre Erwerbstatigkeit zu reduzieren oder aufzugeben \u2013 nicht wegen mangelnder Motivation, sondern wegen unbehandelter Symptome und fehlender betrieblicher Unterstutzung. Das ist ein vermeidbares Talent- und Wissensabflussproblem.

Was konkret hilft: Zunachst ist es die offene Unternehmenskultur. Frauen brauchen die Moglichkeit, mit Vorgesetzten oder der HR-Abteilung offen uber gesundheitliche Herausforderungen zu sprechen, ohne Stigma oder Konsequenzen zu befurchten. Schulungen fur Fuhrungskrafte zu den haufigsten Symptomen und deren Auswirkungen auf Leistung und Konzentration sind hierfur eine sinnvolle Grundlage.

Praktische Anpassungen am Arbeitsplatz konnen ebenfalls viel bewirken. Dazu gehoren flexible Arbeitszeiten, um schlechte Nachte zu kompensieren, die Moglichkeit, Raumtemperaturen zu regulieren, Zugang zu ruhigen Ruckzugsraumen und die Option auf Homeoffice an besonders belastenden Tagen. Diese Massnahmen sind in vielen Fallen kostenneutral oder kostengunstig.

Auf der gesundheitlichen Seite profitieren Unternehmen, die ihren Mitarbeitenden Zugang zu Telemedizin oder spezialisierten Menopausensprechstunden ermoglichen. Eine effektiv behandelte Mitarbeiterin arbeitet konzentrierter, fehlt seltener und ist langfristig motivierter. Das betriebswirtschaftliche Argument ist deutlich: Die Kosten fur Fehlzeiten und Fluktuation ubersteigen die Investition in praventive Gesundheitsleistungen regelmassig.

Einige Schweizer Unternehmen beginnen, \u00ABMenopause Policies\u00BB einzufuhren \u2013 ahnlich wie Mutterschutzrichtlinien, jedoch bisher weit weniger verbreitet. Unternehmen, die voranschreiten, positionieren sich als attraktive Arbeitgeber fur erfahrene Fachkrafte und senden ein klares Signal: Die Gesundheit aller Lebensphasen hat hier einen Platz. Das ist keine Sozialpolitik \u2013 das ist strategisches Personalmanagement.`,
    faq: [
      { q: 'Wie viele Frauen erwagen wegen Wechseljahren eine Arbeitszeitreduktion?', a: 'Laut einer Studie der Universitat Leicester (2023) zieht fast jede dritte betroffene Frau ernsthaft in Betracht, ihre Erwerbstatigkeit zu reduzieren oder ganz aufzugeben.' },
      { q: 'Welche praktischen Massnahmen konnen Arbeitgeber ergreifen?', a: 'Flexible Arbeitszeiten, regulierbare Raumtemperaturen, ruhige Ruckzugsraume, Homeoffice-Optionen und Zugang zu Telemedizin oder Menopausensprechstunden sind wirksame und oft kostenneutrale Massnahmen.' },
      { q: 'Gibt es in der Schweiz Menopause-Policies fur Unternehmen?', a: 'Einige Schweizer Unternehmen beginnen, Menopause Policies einzufuhren, ahnlich wie Mutterschutzrichtlinien. Sie sind jedoch noch weit weniger verbreitet als in Grossbritannien.' },
      { q: 'Was bringt eine Menopause-Policy dem Unternehmen wirtschaftlich?', a: 'Die Kosten fur Fehlzeiten und Fluktuation ubersteigen die Investition in praventive Gesundheitsleistungen regelmassig. Effektiv behandelte Mitarbeiterinnen arbeiten konzentrierter und fehlen seltener.' },
    ],
  },

  {
    slug: 'estradot-abnahme-spezialitaetenliste',
    cluster: 'hormontherapie',
    isPillar: false,
    title: {
      de: 'Die Abnahme von Estradot von der Spezialitätenliste: Was Sie jetzt wissen mussen',
      en: 'Estradot removed from the Swiss drug list: What you need to know now',
      fr: 'Le retrait d\'Estradot de la liste des specialites: ce que vous devez savoir',
    },
    excerpt: {
      de: 'Estradot wurde per 1. Juli 2025 aus der Spezialitätenliste gestrichen und ist damit nicht mehr kassenpflichtig. Was diese Entscheidung bedeutet und welche Handlungsoptionen bestehen.',
      en: 'Estradot was removed from the Swiss specialty list on July 1, 2025 and is no longer covered by basic insurance.',
      fr: 'Estradot a ete retire de la liste des specialites le 1er juillet 2025 et n\'est plus rembourse par l\'assurance de base.',
    },
    readingTime: 5,
    date: '2025-07-08',
    author: 'Dr. Katharina Muller',
    category: 'hormones',
    content: `Per 1. Juli 2025 hat das Bundesamt fur Gesundheit (BAG) Estradot \u2013 ein Ostradiol-Pflaster, das in der Schweiz seit vielen Jahren als Erstlinientherapie in der Menopausenbehandlung eingesetzt wurde \u2013 aus der Spezialitätenliste (SL) gestrichen. Das bedeutet: Estradot wird von der obligatorischen Krankenpflegeversicherung (OKP) nicht mehr ruckvergütet, und Patientinnen mussen die Kosten ab sofort selbst tragen.

Die Entscheidung des BAG beruht auf dem ordentlichen Uberprufungsverfahren zur Wirtschaftlichkeit und Zweckmassigkeit von Arzneimitteln. Sie ist keine Aussage uber die klinische Wirksamkeit von Estradot, die weiterhin unbestritten ist. Das Praparat bleibt in der Schweiz zugelassen und ist in Apotheken erhaltlich \u2013 jedoch ohne Kassenleistung.

Was bedeutet das in der Praxis? Patientinnen, die derzeit Estradot erhalten, sollten nicht abrupt aufhoren. Ein plotzliches Absetzen einer laufenden Hormontherapie kann zu einem raschen Wiederkehren von Symptomen wie Hitzewallungen, Schlafstorungen und Stimmungsveranderungen fuhren. Der erste Schritt ist ein Gesprach mit der behandelnden Arztin, um zu beurteilen, ob ein Wechsel auf ein kassenpflichtiges Alternativpraparat sinnvoll ist.

Fur Frauen, die Estradot weiterfuhren mochten und konnen, entstehen je nach Dosierung monatliche Kosten von ungefahr 30 bis 60 Schweizer Franken. Diese Kosten fallen ausserhalb des Selbstbehalts an, da das Praparat nicht mehr Bestandteil der Grundversicherung ist.

Erganzende Versicherungen (Zusatzversicherungen) einzelner Krankenversicherer konnen in bestimmten Fallen einen Teil der Kosten ubernehmen \u2013 eine Abklarung bei der eigenen Krankenkasse lohnt sich. Massgeblich sind dabei die individuellen Vertragsbedingungen.

Wichtig zu betonen: Die Abnahme von der SL betrifft ausschliesslich die Kostenübernahme, nicht die medizinische Qualitat oder Verfugbarkeit des Praparats. Es gibt gleichwertige kassenpflichtige Alternativen, auf die im Bedarfsfall problemlos umgestellt werden kann. Eine informierte Entscheidung \u2013 getroffen gemeinsam mit Ihrer Arztin \u2013 ist jetzt der richtige nachste Schritt.`,
    faq: [
      { q: 'Ist Estradot in der Schweiz noch erhaltlich?', a: 'Ja, Estradot bleibt in der Schweiz zugelassen und in Apotheken erhaltlich. Nur die Kostenübernahme durch die Grundversicherung ist weggefallen.' },
      { q: 'Wie hoch sind die monatlichen Kosten fur Estradot ohne Kassenleistung?', a: 'Je nach Dosierung entstehen monatliche Kosten von ungefahr 30 bis 60 Schweizer Franken, die ausserhalb des Selbstbehalts anfallen.' },
      { q: 'Sollte ich Estradot sofort absetzen?', a: 'Nein, ein plotzliches Absetzen kann zu einem raschen Wiederkehren von Symptomen fuhren. Sprechen Sie zuerst mit Ihrer Arztin uber einen moglichen Wechsel auf ein kassenpflichtiges Alternativpraparat.' },
      { q: 'Ubernimmt die Zusatzversicherung die Kosten fur Estradot?', a: 'Erganzende Versicherungen einzelner Krankenversicherer konnen in bestimmten Fallen einen Teil der Kosten ubernehmen. Eine Abklarung bei der eigenen Krankenkasse lohnt sich.' },
    ],
  },

  {
    slug: 'alternativen-zu-estradot',
    cluster: 'hormontherapie',
    isPillar: false,
    title: {
      de: 'Alternativen zu Estradot: Welche HRT-Optionen bleiben kassenpflichtig?',
      en: 'Alternatives to Estradot: Which HRT options remain covered by insurance?',
      fr: 'Alternatives a Estradot: quelles options THS restent remboursees?',
    },
    excerpt: {
      de: 'Nach der Streichung von Estradot aus der Spezialitätenliste fragen sich viele Patientinnen, welche transdermalen und oralen Ostrogenpraparate weiterhin von der Grundversicherung abgedeckt werden.',
      en: 'After Estradot was removed from the specialty list, many patients wonder which transdermal and oral estrogen preparations remain covered.',
      fr: 'Apres le retrait d\'Estradot, de nombreuses patientes se demandent quelles preparations restent remboursees.',
    },
    readingTime: 6,
    date: '2025-08-15',
    author: 'Dr. Sophie Perret',
    category: 'hormones',
    content: `Die Streichung von Estradot aus der Spezialitätenliste hat bei vielen Patientinnen verstandliche Unsicherheit ausgelost. Die gute Nachricht: Es stehen weiterhin mehrere kassenpflichtige Ostradiolpraparate und Hormonkombinationen zur Verfugung, die klinisch gleichwertig sind und von der obligatorischen Krankenpflegeversicherung (OKP) ruckvergütet werden \u2013 sofern eine arztliche Indikation besteht.

Transdermale Ostradiolpraparate (Pflaster): Verschiedene Ostradiol-Matrixpflaster anderer Hersteller sind weiterhin auf der SL gelistet, darunter Praparate mit vergleichbaren Wirkstoffmengen in 25, 50, 75 und 100 Mikrogramm pro 24 Stunden. Die Wechselintervalle und Klebeigenschaften konnen leicht variieren, die hormonelle Wirkung ist jedoch pharmakologisch aquivalent. Ihr Arzt oder Ihre Arztin kann das spezifische aktuell kassenpflichtige Praparat angeben, da sich die SL regelmassig aktualisiert.

Ostradiol-Gele: Transdermale Gele (z. B. Estreva Gel, Estrogel) sind eine flexible Alternative zu Pflastern. Die Dosierung kann durch Variation der aufgetragenen Menge feiner angepasst werden, was einigen Frauen \u2013 insbesondere jenen mit wechselnden Symptomintensitaten \u2013 entgegenkommt. Gele sind in der Regel auf der SL gelistet und damit kassenpflichtig.

Orale Ostrogene: Fur Frauen ohne erhohtes Thromboserisiko kann auch orales mikronisiertes Ostradiol (Progynova, Estrofem) eine kassenpflichtige Option sein. Der Hauptunterschied zur transdermalen Applikation liegt im Lebermetabolismus: Orale Ostrogene unterliegen dem First-Pass-Effekt, was die Synthese von Gerinnungsfaktoren und Triglyzeriden leicht beeinflusst. Bei Frauen mit Thromboseanamnese oder erhohtem kardiovaskularem Risiko wird die transdermale Applikation vorgezogen.

Kombinationspraparate: Fur Frauen mit intaktem Uterus, die eine Ostrogentherapie benotigen, muss zwingend ein Gestagen hinzugegeben werden, um die Gebarmutterschleimhaut zu schutzen. Kassenpflichtige Optionen umfassen Kombinationspflaster sowie orale Kombinationspraparate. Mikronisiertes Progesteron (Utrogestan) als separates Praparat ist ebenfalls kassenpflichtig und gilt als bevorzugtes Gestagen aufgrund seines gunstigeren Sicherheitsprofils.

Eine arztliche Beratung ist unerlasslich, um das optimale Praparat fur Ihre individuelle Situation auszuwahlen. Faktoren wie Applikationspraferenz, Vertraglichkeit, Begleiterkrankungen und Kostenübernahme fliessen in diese Entscheidung ein. Der Wechsel von Estradot auf ein alternatives Praparat ist in der Regel unkompliziert und ohne Wirkungslucke moglich.`,
    faq: [
      { q: 'Welche transdermalen Pflaster sind noch kassenpflichtig?', a: 'Verschiedene Ostradiol-Matrixpflaster anderer Hersteller sind weiterhin auf der Spezialitätenliste gelistet, mit vergleichbaren Wirkstoffmengen in 25, 50, 75 und 100 Mikrogramm pro 24 Stunden.' },
      { q: 'Sind Ostradiol-Gele eine gleichwertige Alternative zu Pflastern?', a: 'Ja, transdermale Gele wie Estreva Gel oder Estrogel sind klinisch gleichwertig und bieten zusatzlich eine feinere Dosierungsmoglichkeit. Sie sind in der Regel kassenpflichtig.' },
      { q: 'Fur wen ist orales Ostrogen geeignet?', a: 'Orales mikronisiertes Ostradiol ist fur Frauen ohne erhohtes Thromboserisiko eine kassenpflichtige Option. Bei Thromboseanamnese oder erhohtem kardiovaskularem Risiko wird die transdermale Applikation vorgezogen.' },
      { q: 'Ist ein Wechsel von Estradot auf ein anderes Praparat problemlos moglich?', a: 'Ja, der Wechsel ist in der Regel unkompliziert und ohne Wirkungslucke moglich. Ihre Arztin kann das optimale Alternativpraparat basierend auf Ihrer individuellen Situation auswahlen.' },
      { q: 'Brauche ich zusatzlich ein Gestagen?', a: 'Frauen mit intaktem Uterus benotigen zwingend ein Gestagen zum Schutz der Gebarmutterschleimhaut. Mikronisiertes Progesteron (Utrogestan) ist kassenpflichtig und gilt als bevorzugtes Gestagen.' },
    ],
  },
];

/** Helper: get all articles for a given cluster slug */
export function getArticlesByCluster(clusterSlug) {
  return wissenArticles.filter((a) => a.cluster === clusterSlug);
}

/** Helper: find a single article by slug */
export function getArticleBySlug(slug) {
  return wissenArticles.find((a) => a.slug === slug);
}

/** Helper: get cluster object by slug */
export function getClusterBySlug(slug) {
  return clusters.find((c) => c.slug === slug);
}
