const sectionHrefs = {
  solution: 'workflow',
  how: 'how',
  features: 'features',
  audience: 'audience',
  faq: 'faq',
  start: 'start',
};

const interfaceNumbers = {
  metric: {
    value: '5.6%',
    delta: '1.3 п.п.',
    countRu: '70 из 1 243',
    countKk: '1 243 ішінен 70',
    countEn: '70 of 1,243',
  },
  risk: {
    total: '1 243',
    items: [
      { color: 'red', value: '284', percent: '22.8%', range: '(70-100)' },
      { color: 'orange', value: '480', percent: '38.6%', range: '(40-69)' },
      { color: 'green', value: '639', percent: '51.4%', range: '(0-39)' },
    ],
  },
  improvement: {
    reduced: { value: '214', delta: '15.6%' },
    same: { value: '846' },
    increased: { value: '183', delta: '7.3%' },
  },
};

export const messages = {
  ru: {
    nav: {
      cta: 'Запросить демо',
      items: [
        { label: 'Решение', href: sectionHrefs.solution },
        { label: 'Как работает', href: sectionHrefs.how },
        { label: 'Возможности', href: sectionHrefs.features },
        { label: 'Кому полезно', href: sectionHrefs.audience },
        { label: 'FAQ', href: sectionHrefs.faq },
        { label: 'Как начать', href: sectionHrefs.start },
      ],
    },
    hero: {
      badge: 'Первый фишинг-симулятор в Казахстане',
      titleBrand: 'PhishLake',
      titleRest: 'платформа для фишинг-симуляций и обучения сотрудников',
      subtitle:
        'Запускайте контролируемые атаки, измеряйте человеческий риск и показывайте руководству, как снижается уязвимость команды.',
      interface: {
        ariaLabel: 'Элементы интерфейса PhishLake',
        timerLabel: 'Переключить виджет интерфейса',
        cardLabels: {
          metric: 'Клики по ссылкам',
          risk: 'Распределение уровня риска',
          improvement: 'Улучшение сотрудников',
          timeline: 'Динамика риска организации',
        },
        metric: {
          label: 'Клики по ссылкам',
          value: interfaceNumbers.metric.value,
          delta: interfaceNumbers.metric.delta,
          count: interfaceNumbers.metric.countRu,
        },
        risk: {
          title: 'Распределение уровня риска',
          total: interfaceNumbers.risk.total,
          unit: 'сотрудника',
          items: [
            { ...interfaceNumbers.risk.items[0], label: 'Высокий' },
            { ...interfaceNumbers.risk.items[1], label: 'Средний' },
            { ...interfaceNumbers.risk.items[2], label: 'Низкий' },
          ],
        },
        improvement: {
          title: 'Улучшение сотрудников',
          reduced: { label: 'Снизили риск', ...interfaceNumbers.improvement.reduced },
          same: { label: 'Без изменений', ...interfaceNumbers.improvement.same },
          increased: { label: 'Повысили риск', ...interfaceNumbers.improvement.increased },
          more: 'Подробнее',
        },
        timeline: {
          title: 'Динамика риска организации',
          legend: [
            { color: 'red', label: 'Фактический риск' },
            { color: 'green', label: 'Целевая траектория' },
            { color: 'blue', label: 'Тренинг' },
            { color: 'orange', label: 'Кампания' },
          ],
          months: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        },
      },
    },
    problem: {
      kicker: 'Блок 2. Проблематика',
      title: 'Даже лучшие средства защиты не помогут, если сотрудник откроет письмо злоумышленника',
      subtitle:
        'Современные фишинговые атаки становятся всё сложнее благодаря искусственному интеллекту. Один неверный клик сотрудника может привести к компрометации всей организации.',
      cards: [
        {
          title: 'Человеческий фактор',
          text: 'Большинство успешных атак начинаются с действий сотрудника, а не с технического взлома.',
        },
        {
          title: 'Фишинг стал умнее',
          text: 'Искусственный интеллект позволяет создавать письма, которые практически не отличаются от настоящих.',
        },
        {
          title: 'Последствия',
          text: 'Один клик способен привести к утечке данных, заражению инфраструктуры или финансовым потерям.',
        },
      ],
      scenario: {
        kicker: 'Сценарий атаки',
        title: 'Как один клик превращается в инцидент',
        steps: [
          {
            time: '09:14',
            title: 'Сотрудник получает письмо «Обновите пароль Microsoft 365»',
            text: 'Фишинговое письмо выглядит как настоящее уведомление от IT-поддержки.',
          },
          {
            time: '09:15',
            title: 'Переходит по ссылке',
            text: 'Ссылка ведёт на фальшивую страницу входа, которая копирует дизайн Microsoft.',
          },
          {
            time: '09:16',
            title: 'Вводит корпоративные данные',
            text: 'Логин и пароль попадают к злоумышленнику, а сотрудник ничего не подозревает.',
          },
          {
            time: '09:17',
            title: 'Учётная запись скомпрометирована',
            text: 'Злоумышленник получает доступ к почте и может начать внутреннюю разведку.',
          },
          {
            time: '09:18',
            title: 'Злоумышленник получает доступ к внутренним системам',
            text: 'Атака перешла в активную фазу: утечка данных, заражение или финансовые потери.',
          },
        ],
      },
    },
  },
  kk: {
    nav: {
      cta: 'Демо сұрау',
      items: [
        { label: 'Шешім', href: sectionHrefs.solution },
        { label: 'Қалай жұмыс істейді', href: sectionHrefs.how },
        { label: 'Мүмкіндіктер', href: sectionHrefs.features },
        { label: 'Кімге пайдалы', href: sectionHrefs.audience },
        { label: 'FAQ', href: sectionHrefs.faq },
        { label: 'Қалай бастау', href: sectionHrefs.start },
      ],
    },
    hero: {
      badge: 'Қазақстандағы алғашқы фишинг симуляторы',
      titleBrand: 'PhishLake',
      titleRest: 'қызметкерлерді фишинг симуляциялары арқылы тексеріп, оқытатын платформа',
      subtitle:
        'Бақыланатын шабуылдарды іске қосыңыз, адам тәуекелін өлшеңіз және команда осалдығы қалай төмендейтінін басшылыққа көрсетіңіз.',
      interface: {
        ariaLabel: 'PhishLake интерфейс элементтері',
        timerLabel: 'Интерфейс виджетін ауыстыру',
        cardLabels: {
          metric: 'Сілтемелерге кликтер',
          risk: 'Тәуекел деңгейінің таралуы',
          improvement: 'Қызметкерлердің жақсаруы',
          timeline: 'Ұйым тәуекелінің динамикасы',
        },
        metric: {
          label: 'Сілтемелерге кликтер',
          value: interfaceNumbers.metric.value,
          delta: '1.3 т.п.',
          count: interfaceNumbers.metric.countKk,
        },
        risk: {
          title: 'Тәуекел деңгейінің таралуы',
          total: interfaceNumbers.risk.total,
          unit: 'қызметкер',
          items: [
            { ...interfaceNumbers.risk.items[0], label: 'Жоғары' },
            { ...interfaceNumbers.risk.items[1], label: 'Орташа' },
            { ...interfaceNumbers.risk.items[2], label: 'Төмен' },
          ],
        },
        improvement: {
          title: 'Қызметкерлердің жақсаруы',
          reduced: { label: 'Тәуекелді азайтты', ...interfaceNumbers.improvement.reduced },
          same: { label: 'Өзгеріссіз', ...interfaceNumbers.improvement.same },
          increased: { label: 'Тәуекелді арттырды', ...interfaceNumbers.improvement.increased },
          more: 'Толығырақ',
        },
        timeline: {
          title: 'Ұйым тәуекелінің динамикасы',
          legend: [
            { color: 'red', label: 'Нақты тәуекел' },
            { color: 'green', label: 'Мақсатты траектория' },
            { color: 'blue', label: 'Тренинг' },
            { color: 'orange', label: 'Кампания' },
          ],
          months: ['Қаң', 'Ақп', 'Нау', 'Сәу', 'Мам', 'Мау', 'Шіл', 'Там', 'Қыр', 'Қаз', 'Қар', 'Жел'],
        },
      },
    },
    problem: {
      kicker: '2-блок. Мәселе',
      title: 'Қызметкер зиянкестің хатын ашса, ең мықты қорғаныс құралдары да көмектеспеуі мүмкін',
      subtitle:
        'Жасанды интеллекттің арқасында заманауи фишинг шабуылдары күрделене түсті. Қызметкердің бір қате клигі бүкіл ұйымның қауіпсіздігіне әсер етуі мүмкін.',
      cards: [
        {
          title: 'Адам факторы',
          text: 'Сәтті шабуылдардың көбі техникалық бұзудан емес, қызметкердің әрекетінен басталады.',
        },
        {
          title: 'Фишинг ақылдырақ болды',
          text: 'Жасанды интеллект шынайы хаттардан айырмашылығы аз хабарламалар жасауға мүмкіндік береді.',
        },
        {
          title: 'Салдары',
          text: 'Бір клик деректердің таралуына, инфрақұрылымның зақымдануына немесе қаржылық шығынға әкелуі мүмкін.',
        },
      ],
      scenario: {
        kicker: 'Шабуыл сценарийі',
        title: 'Бір клик қалай инцидентке айналады',
        steps: [
          {
            time: '09:14',
            title: 'Қызметкер «Microsoft 365 құпиясөзін жаңартыңыз» деген хат алады',
            text: 'Фишинг хаты IT-қолдаудан келген шынайы хабарламаға ұқсайды.',
          },
          {
            time: '09:15',
            title: 'Сілтемеге өтеді',
            text: 'Сілтеме Microsoft дизайнын көшірген жалған кіру бетіне апарады.',
          },
          {
            time: '09:16',
            title: 'Корпоративтік деректерін енгізеді',
            text: 'Логин мен құпиясөз шабуылдаушыға түседі, ал қызметкер ештеңе сезбейді.',
          },
          {
            time: '09:17',
            title: 'Есептік жазба бұзылады',
            text: 'Шабуылдаушы поштаға кіріп, ішкі барлауды бастай алады.',
          },
          {
            time: '09:18',
            title: 'Шабуылдаушы ішкі жүйелерге қол жеткізеді',
            text: 'Шабуыл белсенді кезеңге өтеді: деректердің таралуы, зақымдану немесе қаржылық шығын.',
          },
        ],
      },
    },
  },
  en: {
    nav: {
      cta: 'Request demo',
      items: [
        { label: 'Solution', href: sectionHrefs.solution },
        { label: 'How it works', href: sectionHrefs.how },
        { label: 'Features', href: sectionHrefs.features },
        { label: 'Who benefits', href: sectionHrefs.audience },
        { label: 'FAQ', href: sectionHrefs.faq },
        { label: 'How to start', href: sectionHrefs.start },
      ],
    },
    hero: {
      badge: 'The first phishing simulator in Kazakhstan',
      titleBrand: 'PhishLake',
      titleRest: 'is a phishing simulation platform for employee training',
      subtitle:
        'Run controlled simulations, measure human risk, and prove security awareness is improving.',
      interface: {
        ariaLabel: 'PhishLake interface elements',
        timerLabel: 'Switch interface widget',
        cardLabels: {
          metric: 'Link clicks',
          risk: 'Risk level distribution',
          improvement: 'Employee improvement',
          timeline: 'Organization risk dynamics',
        },
        metric: {
          label: 'Link clicks',
          value: interfaceNumbers.metric.value,
          delta: '1.3 p.p.',
          count: interfaceNumbers.metric.countEn,
        },
        risk: {
          title: 'Risk level distribution',
          total: '1,243',
          unit: 'employees',
          items: [
            { ...interfaceNumbers.risk.items[0], label: 'High' },
            { ...interfaceNumbers.risk.items[1], label: 'Medium' },
            { ...interfaceNumbers.risk.items[2], label: 'Low' },
          ],
        },
        improvement: {
          title: 'Employee improvement',
          reduced: { label: 'Reduced risk', ...interfaceNumbers.improvement.reduced },
          same: { label: 'No change', ...interfaceNumbers.improvement.same },
          increased: { label: 'Increased risk', ...interfaceNumbers.improvement.increased },
          more: 'Details',
        },
        timeline: {
          title: 'Organization risk trend',
          legend: [
            { color: 'red', label: 'Actual risk' },
            { color: 'green', label: 'Target path' },
            { color: 'blue', label: 'Training' },
            { color: 'orange', label: 'Campaign' },
          ],
          months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
      },
    },
    problem: {
      kicker: 'Block 2. The Problem',
      title: 'Even the best security tools cannot help if an employee opens an attacker’s email',
      subtitle:
        'Modern phishing attacks are getting harder to spot thanks to artificial intelligence. One wrong employee click can compromise the whole organization.',
      cards: [
        {
          title: 'Human factor',
          text: 'Most successful attacks begin with an employee action, not a technical breach.',
        },
        {
          title: 'Phishing got smarter',
          text: 'Artificial intelligence makes it possible to create emails that are almost indistinguishable from real ones.',
        },
        {
          title: 'Consequences',
          text: 'One click can lead to data leaks, infrastructure infection, or financial losses.',
        },
      ],
      scenario: {
        kicker: 'Attack scenario',
        title: 'How one click becomes an incident',
        steps: [
          {
            time: '09:14',
            title: 'An employee receives “Update your Microsoft 365 password”',
            text: 'The phishing email looks like a real notification from IT support.',
          },
          {
            time: '09:15',
            title: 'They follow the link',
            text: 'The link leads to a fake login page that copies Microsoft’s design.',
          },
          {
            time: '09:16',
            title: 'They enter corporate credentials',
            text: 'The username and password reach the attacker while the employee suspects nothing.',
          },
          {
            time: '09:17',
            title: 'The account is compromised',
            text: 'The attacker gains mailbox access and can begin internal reconnaissance.',
          },
          {
            time: '09:18',
            title: 'The attacker reaches internal systems',
            text: 'The attack enters an active phase: data leakage, infection, or financial loss.',
          },
        ],
      },
    },
  },
};
