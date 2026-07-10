const sources = {
  pp832: 'https://adilet.zan.kz/rus/docs/P1600000832',
  arrfr53: 'https://adilet.zan.kz/rus/docs/V2600038336',
};

export const complianceMessages = {
  ru: {
    title: 'Соответствие требованиям РК',
    standardLabel: 'Норма',
    sourceLabel: 'Источник',
    evidenceLabel: 'Документальное подтверждение',
    subtitle:
      'Нормативные акты требуют выстраивать процесс информационной безопасности, учитывать обучение и подтверждать работу документами. PhishLake помогает закрыть человеческий фактор в этом процессе.',
    regulations: [
      {
        code: 'ПП РК № 832',
        source: 'Единые требования в области ИКТ и обеспечения ИБ',
        sourceUrl: sources.pp832,
        points: [
          'Постановление утверждает единые требования в области ИКТ и информационной безопасности',
          'Пункт 44 предусматривает учет прохождения обучения в сфере информатизации и ИБ',
          'Подтверждение обучения хранится в материалах личного дела, включая электронный сертификат',
        ],
      },
      {
        code: 'АРРФР № 53',
        source: 'Действующие требования к обеспечению ИБ банков и отдельных банковских операций',
        sourceUrl: sources.arrfr53,
        points: [
          'Документ заменил прежние требования Нацбанка № 48, утратившие силу в 2026 году',
          'Требует систему управления информационной безопасностью и контроль связанных процессов',
          'Предусматривает мероприятия по повышению осведомленности работников в области ИБ',
        ],
      },
    ],
    stats: [
      { value: 'Обучение', label: 'п. 44: учет прохождения обучения и электронные сертификаты' },
      { value: 'ИБ-процесс', label: 'АРРФР №53: управление ИБ и осведомленность работников' },
      { value: 'PDF', label: 'отчеты и доказательства для внутреннего аудита' },
    ],
    quote:
      'Мы не заменяем юридическую оценку, но помогаем собрать проверяемые доказательства обучения, симуляций и снижения человеческого риска.',
  },
  kk: {
    title: 'ҚР талаптарына сәйкестік',
    standardLabel: 'Норма',
    sourceLabel: 'Дереккөз',
    evidenceLabel: 'Құжаттық дәлел',
    subtitle:
      'Нормативтік актілер ақпараттық қауіпсіздік процесін құруды, оқытуды есепке алуды және жұмысты құжатпен растауды талап етеді. PhishLake осы процестегі адам факторын басқаруға көмектеседі.',
    regulations: [
      {
        code: 'ҚР ҮҚ № 832',
        source: 'АКТ және ақпараттық қауіпсіздікті қамтамасыз ету саласындағы бірыңғай талаптар',
        sourceUrl: sources.pp832,
        points: [
          'Қаулы АКТ және ақпараттық қауіпсіздік саласындағы бірыңғай талаптарды бекітеді',
          '44-тармақ информатизация және АҚ саласындағы оқытудан өтуді есепке алуды көздейді',
          'Оқыту дәлелі жеке іс материалдарында, оның ішінде электрондық сертификат арқылы сақталады',
        ],
      },
      {
        code: 'АРРФР № 53',
        source: 'Банктер мен жекелеген банк операциялары үшін ақпараттық қауіпсіздік талаптары',
        sourceUrl: sources.arrfr53,
        points: [
          'Бұл құжат 2026 жылы күшін жойған Ұлттық банк №48 талаптарының орнына қабылданған',
          'Ақпараттық қауіпсіздікті басқару жүйесін және байланысты процестерді бақылауды талап етеді',
          'Қызметкерлердің ақпараттық қауіпсіздік бойынша хабардарлығын арттыру шараларын көздейді',
        ],
      },
    ],
    stats: [
      { value: 'Оқыту', label: '44-т.: оқытудан өтуді есепке алу және электрондық сертификаттар' },
      { value: 'АҚ процесі', label: 'АРРФР №53: АҚ басқару және қызметкерлердің хабардарлығы' },
      { value: 'PDF', label: 'ішкі аудитке арналған есептер мен дәлелдер' },
    ],
    quote:
      'Біз құқықтық қорытындыны алмастырмаймыз, бірақ оқыту, симуляция және адам тәуекелінің төмендеуін тексерілетін дәлелдермен көрсетуге көмектесеміз.',
  },
  en: {
    title: 'Compliance With Kazakhstan Requirements',
    standardLabel: 'Standard',
    sourceLabel: 'Source',
    evidenceLabel: 'Compliance evidence',
    subtitle:
      'Kazakhstan regulations require an information security process, training records, and documented evidence. PhishLake helps cover the human-risk part of that process.',
    regulations: [
      {
        code: 'Gov. Res. No. 832',
        source: 'Unified ICT and information security requirements',
        sourceUrl: sources.pp832,
        points: [
          'The resolution approves unified ICT and information security requirements',
          'Clause 44 covers records of training in informatization and information security',
          'Training evidence is stored in personnel records, including an electronic certificate',
        ],
      },
      {
        code: 'ARRFR No. 53',
        source: 'Current information security requirements for banks and selected banking operations',
        sourceUrl: sources.arrfr53,
        points: [
          'This document replaced the former National Bank No. 48 requirements repealed in 2026',
          'It requires an information security management system and control of related processes',
          'It includes measures to improve employee information security awareness',
        ],
      },
    ],
    stats: [
      { value: 'Training', label: 'clause 44: training records and electronic certificates' },
      { value: 'IS process', label: 'ARRFR No. 53: IS management and employee awareness' },
      { value: 'PDF', label: 'reports and evidence for internal audit' },
    ],
    quote:
      'We do not replace legal review, but we help collect verifiable evidence of training, simulations, and human-risk reduction.',
  },
};
