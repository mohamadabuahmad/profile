// All copy for the /services page lives here so it can be edited without touching layout code.

export const NEEDS = [
  { id: 'ai', label: 'AI Solution' },
  { id: 'automation', label: 'Automation / Integration' },
  { id: 'web', label: 'Website / E-Commerce' },
  { id: 'webapp', label: 'Web Application' },
  { id: 'mobile', label: 'Mobile Application' },
  { id: 'unsure', label: 'Not Sure Yet' },
];

export const hero = {
  eyebrow: 'Services · AI, automation & custom software',
  title: 'AI and digital solutions, built around your business.',
  lede:
    "Tell me the problem. I'll design and build the technology behind the solution — AI assistants, automations, websites, web platforms and mobile apps, connected to the tools you already use.",
  points: [
    'You talk directly to the engineer building it',
    'Start with a problem — no technical brief needed',
    'AI, automation, web and mobile under one roof',
  ],
};

export const systemMap = {
  center: { title: 'Your business', sub: 'workflows · data · customers' },
  nodes: [
    { id: 'ai', title: 'AI assistant', sub: 'answers, drafts, sorts', x: 118, y: 62 },
    { id: 'automation', title: 'Automation', sub: 'routine work, handled', x: 402, y: 62 },
    { id: 'integrations', title: 'Integrations', sub: 'CRM · Shopify · APIs', x: 440, y: 240 },
    { id: 'web', title: 'Website & store', sub: 'trust, sales, bookings', x: 402, y: 418 },
    { id: 'webapp', title: 'Web platform', sub: 'dashboards & portals', x: 118, y: 418 },
    { id: 'mobile', title: 'Mobile app', sub: 'iOS & Android', x: 80, y: 240 },
  ],
};

export const problems = {
  eyebrow: 'Sound familiar?',
  title: "Your business shouldn't have to work around its software.",
  intro: 'Most projects I take on start with a sentence like one of these.',
  items: [
    { quote: 'We do too much by hand.', fix: 'Automate the repetitive steps', target: 'automation' },
    { quote: "Our systems don't talk to each other.", fix: 'Connect your tools so data moves on its own', target: 'automation' },
    { quote: 'People re-type the same information every day.', fix: 'Enter it once, sync it everywhere', target: 'automation' },
    { quote: "We want to use AI, but don't know where it actually helps.", fix: 'Find the work AI can genuinely take on', target: 'ai' },
    { quote: "Our software doesn't fit the way we work.", fix: 'Build a tool around your workflow', target: 'webapp' },
    { quote: 'Everything lives in Excel, WhatsApp and email.', fix: 'Bring it into one system', target: 'webapp' },
    { quote: "Our website looks fine, but it doesn't bring in customers.", fix: 'Rebuild it around the next step', target: 'web' },
    { quote: 'We have an idea for an app, but no idea how to build it.', fix: 'Turn the idea into a working product', target: 'mobile' },
  ],
  answerTitle: "That's where I come in.",
  answer:
    'I start by understanding how your business runs today. Then I design and build the smallest piece of technology that makes a real difference — and connect it to what you already use.',
};

export const solutions = [
  {
    id: 'ai',
    index: '01',
    label: 'AI Solutions',
    title: 'Put AI to work inside your actual business.',
    body:
      "Not a chatbot bolted onto your homepage. AI that knows your documents, products and processes — and does useful work with them: answering questions, drafting replies, sorting requests and finding information in seconds.",
    problems: [
      'Staff spend hours searching documents, emails and old chats for answers.',
      'Customers ask the same questions all day.',
      "You have plenty of data but no quick way to ask it anything.",
    ],
    examples: [
      'Company knowledge assistant',
      'Customer-support AI',
      'Document reading & data extraction',
      'AI-powered search',
      'Reply & content drafting',
      'AI features in your existing product',
    ],
    cta: 'Discuss an AI solution',
    visual: 'ai',
  },
  {
    id: 'automation',
    index: '02',
    label: 'AI Automation & Integrations',
    title: 'Let the repetitive work run itself.',
    body:
      "I map how work moves through your business today — the copying, checking, chasing and reminding — then connect your tools and let automation and AI handle the steps that don't need a person.",
    problems: [
      'The same data is typed into several systems.',
      'Follow-ups depend on someone remembering.',
      "Your CRM, shop, inbox and spreadsheets don't share information.",
    ],
    examples: [
      'Workflow automation',
      'CRM & email automation',
      'Automated follow-ups',
      'Shopify & e-commerce integrations',
      'API & system integrations',
      'AI agents for routine tasks',
      'Alerts & notifications',
      'Data sync between tools',
    ],
    cta: 'Discuss an automation',
    demoLink: true,
    visual: 'automation',
  },
  {
    id: 'web',
    index: '03',
    label: 'Websites & E-Commerce',
    title: 'A website that earns its place in your business.',
    body:
      'Your website is often the first conversation a customer has with you. I build sites and online stores that make the offer clear, earn trust quickly and make the next step — buying, booking or getting in touch — easy.',
    problems: [
      "Visitors arrive but don't contact you or buy.",
      'The site is slow, dated or hard to update.',
      "Your store needs features your platform doesn't offer out of the box.",
    ],
    examples: [
      'Company & marketing websites',
      'Landing pages',
      'Shopify stores & custom features',
      'Conversion-focused redesigns',
      'Multilingual & right-to-left sites',
      'Speed & performance work',
    ],
    cta: 'Discuss a website or store',
    visual: 'web',
  },
  {
    id: 'webapp',
    index: '04',
    label: 'Custom Web Applications',
    title: "When off-the-shelf software doesn't fit, build software that does.",
    body:
      'Generic tools make your team work their way. A custom web application works yours — one place for orders, bookings, stock, customers or internal operations, with exactly the screens and rules your business needs.',
    problems: [
      'You pay for several tools and still need spreadsheets to fill the gaps.',
      "Important processes live in one person's head or inbox.",
      'Customers or partners need their own secure access.',
    ],
    examples: [
      'Admin dashboards',
      'Booking systems',
      'Inventory & operations tools',
      'Customer & partner portals',
      'Marketplaces',
      'SaaS products',
      'Internal company tools',
    ],
    cta: 'Discuss a web application',
    visual: 'webapp',
  },
  {
    id: 'mobile',
    index: '05',
    label: 'Mobile Applications',
    title: "Put your service in your customers' pocket.",
    body:
      'An app makes sense when people use your service often, on the move, or need their phone for it — notifications, camera, location. I build iOS and Android apps connected to your existing systems, so the app and the business stay in sync.',
    problems: [
      'Customers book, order or check status by phone call or message.',
      'Field staff work from paper or WhatsApp.',
      'You have an app idea and need it designed, built and launched.',
    ],
    examples: [
      'Customer apps',
      'Booking & ordering apps',
      'Field & operations apps',
      'Marketplace apps',
      'iOS & Android',
      'Apps connected to your systems',
    ],
    cta: 'Discuss a mobile app',
    visual: 'mobile',
  },
];

export const automationDemo = {
  eyebrow: 'Automation, explained',
  title: 'What changes when a workflow is automated?',
  intro:
    'Pick an example. On one side, how the work often happens today. On the other, the same work with automation and AI handling the routine steps.',
  note: 'Illustrative examples — a real workflow is designed around your tools and rules.',
  summary: 'Your team steps in where judgment is needed — not to copy data between tools.',
  scenarios: [
    {
      id: 'inquiry',
      label: 'Customer inquiry',
      before: [
        'An inquiry arrives by email or WhatsApp',
        "Someone reads it and works out what's needed",
        'They check a spreadsheet for prices or availability',
        'They write and send a reply',
        'They update the CRM by hand',
        'They remind the manager to follow up',
      ],
      after: [
        { text: 'Inquiry arrives on any channel', who: 'auto' },
        { text: 'AI understands the request and its urgency', who: 'ai' },
        { text: 'System checks live prices or availability', who: 'auto' },
        { text: 'CRM updates automatically', who: 'auto' },
        { text: 'A personalised reply is drafted or sent', who: 'ai' },
        { text: 'The right person is notified — only if needed', who: 'team' },
      ],
    },
    {
      id: 'order',
      label: 'New online order',
      before: [
        'An order comes into the online store',
        'Someone copies it into a spreadsheet',
        'They check stock manually',
        'They email the warehouse or supplier',
        'They send the customer an update',
        'Accounting is updated later, in a batch',
      ],
      after: [
        { text: 'Order comes into the store', who: 'auto' },
        { text: 'Stock is checked and reserved', who: 'auto' },
        { text: 'Fulfilment request goes to the warehouse', who: 'auto' },
        { text: 'Invoice is created in accounting', who: 'auto' },
        { text: 'Customer gets tracking updates', who: 'auto' },
        { text: 'Team is alerted when stock runs low', who: 'team' },
      ],
    },
    {
      id: 'booking',
      label: 'Appointment request',
      before: [
        'A customer calls or sends a message',
        'Someone checks the calendar',
        'Back-and-forth to find a time that works',
        'The booking is entered by hand',
        'A reminder is sent — if someone remembers',
        'No-shows go unnoticed',
      ],
      after: [
        { text: 'Customer picks a time online', who: 'auto' },
        { text: 'Calendar is checked in real time', who: 'auto' },
        { text: 'Booking is confirmed instantly', who: 'auto' },
        { text: 'Details are saved to your system', who: 'auto' },
        { text: 'Reminders go out before the visit', who: 'auto' },
        { text: "Staff see the day's schedule", who: 'team' },
      ],
    },
  ],
};

export const outcomes = {
  eyebrow: 'Why it matters',
  title: 'Outcomes, not features.',
  items: [
    { title: 'Save time', text: "Automate the repetitive operational work that eats your team's week." },
    { title: 'Reduce manual work', text: 'Connect disconnected processes so information moves without re-typing.' },
    { title: 'Increase sales', text: 'Websites, stores and apps designed around getting the customer to act.' },
    { title: 'Move faster', text: 'Turn internal ideas into working systems instead of long-running plans.' },
    { title: 'Use AI practically', text: "Put AI where it produces real value for your business — not where it's fashionable." },
    { title: 'Own your solution', text: 'Technology shaped around your workflow, not a subscription you have to adapt to.' },
  ],
};

export const process = {
  eyebrow: 'How I work',
  title: 'A clear process, from first conversation to real use.',
  intro: "You always know what's being built, why, and what comes next.",
  steps: [
    { title: 'Understand', text: "We start with the business problem, not the technology. I learn how things work today and what 'better' looks like." },
    { title: 'Design', text: 'I define the workflow, the solution, the architecture and the experience — and we agree on scope before building starts.' },
    { title: 'Build', text: 'Production-quality engineering, with working versions you can see and react to along the way.' },
    { title: 'Integrate', text: 'The solution is connected to the tools and systems your business already uses.' },
    { title: 'Launch', text: 'Tested, deployed and monitored — and your team is shown how to use it.' },
    { title: 'Improve', text: 'Refined based on real usage and what the business needs next.' },
  ],
  assurances: [
    'Start small: prove value on one workflow first',
    'See working progress early, not only at the end',
    'Scope and estimate agreed before building starts',
  ],
};

export const work = {
  eyebrow: 'Selected work',
  title: 'Real projects, explained as problems and solutions.',
  intro: "A few things I've built. No invented clients or numbers — just what was built and what it does.",
  items: [
    {
      id: 'whatsapp-automation',
      name: 'WhatsApp Automation Bot',
      kind: 'Personal project',
      problem: 'Deliver useful daily updates to people on WhatsApp without anyone sending them by hand.',
      solution:
        'A Node.js service that pulls live weather data and daily quotes from external APIs, fills message templates and sends them on schedule through the Twilio WhatsApp API.',
      capabilities: ['Automation', 'API integrations'],
      result: 'Runs unattended: messages are fetched, composed and delivered automatically every day.',
      links: [{ label: 'View project on GitHub', href: 'https://github.com/mohamadabuahmad/Automation_Whatsapp' }],
    },
    {
      id: 'car-info',
      name: 'Car Info Lookup',
      kind: 'Mobile apps · iOS & Android',
      problem: "Get a vehicle's make, model, year and details quickly, from nothing more than a licence plate.",
      solution:
        'Two native apps — Swift for iOS, Java for Android — that query vehicle data through an external API and present it in a consistent interface on both platforms.',
      capabilities: ['Mobile', 'API integration'],
      result: 'A working lookup flow on both platforms, suited to verification, parking and quick-reference use.',
      links: [
        { label: 'Android project', href: 'https://github.com/mohamadabuahmad/Car-info-Android' },
        { label: 'iOS project', href: 'https://github.com/mohamadabuahmad/Car-info-iOS-' },
      ],
    },
    {
      id: 'social-platform',
      name: 'Networking — Social Platform',
      kind: 'Web application',
      problem: 'A platform where people can post, follow each other and message in real time.',
      solution:
        'A full-stack web application with secure sign-up and login, feeds, likes, comments, follow notifications and real-time direct messaging over WebSockets.',
      capabilities: ['Web application', 'Real-time'],
      result: 'Deployed on Vercel, with authentication, live notifications and messaging working end to end.',
      links: [{ label: 'View project on GitHub', href: 'https://github.com/mohamadabuahmad/Social-Media-Platform' }],
    },
    {
      id: 'go-nature',
      name: 'Go Nature — Park Management',
      kind: 'Academic team project',
      problem: 'Park services needed one system for administrators and visitors instead of separate manual handling.',
      solution:
        'A client-server Java system on a shared database, with separate interfaces for administrators and visitors and real-time communication between them.',
      capabilities: ['Internal system', 'Client-server'],
      result: 'A working multi-user system, built with a five-person team.',
      links: [{ label: 'View project on GitHub', href: 'https://github.com/mohamadabuahmad/Go-Nature' }],
    },
  ],
};

export const explorer = {
  eyebrow: 'Ideas',
  title: "Not sure what it's called? Start here.",
  intro: "Pick the one closest to what you need — I'll take it from there.",
  filters: [
    { id: 'all', label: 'All' },
    { id: 'ai', label: 'AI' },
    { id: 'automation', label: 'Automation' },
    { id: 'web', label: 'Websites' },
    { id: 'webapp', label: 'Web apps' },
    { id: 'mobile', label: 'Mobile' },
  ],
  items: [
    { name: 'AI Assistant', text: 'Answers questions for customers or staff, using your own information.', need: 'ai' },
    { name: 'AI Knowledge Base', text: 'Ask your documents, policies and files anything — and get sourced answers.', need: 'ai' },
    { name: 'Business Automation', text: 'Repetitive steps across your tools, handled automatically.', need: 'automation' },
    { name: 'CRM Integration', text: 'Leads, customers and follow-ups kept in sync everywhere.', need: 'automation' },
    { name: 'E-Commerce Platform', text: 'An online store with the features your business actually needs.', need: 'web' },
    { name: 'Internal Dashboard', text: 'One live view of orders, bookings, stock or performance.', need: 'webapp' },
    { name: 'Booking System', text: 'Customers book online; your calendar and team stay in sync.', need: 'webapp' },
    { name: 'Inventory Platform', text: 'Track stock, orders and suppliers without spreadsheets.', need: 'webapp' },
    { name: 'Customer Portal', text: 'A secure place for customers to see orders, files or status.', need: 'webapp' },
    { name: 'Marketplace', text: 'Listings, buyers and sellers, payments and reviews in one platform.', need: 'webapp' },
    { name: 'Custom SaaS', text: 'Your idea, built as a product other businesses pay for.', need: 'webapp' },
    { name: 'Mobile App', text: 'An iOS and Android app connected to your business systems.', need: 'mobile' },
  ],
};

export const why = {
  eyebrow: 'Why Mohamad Dev',
  title: 'The person who understands your problem is the person who builds the solution.',
  items: [
    { title: 'Business-first thinking', text: 'I start with the problem and the people affected by it, then choose the technology — never the other way round.' },
    { title: 'End-to-end development', text: 'Strategy, UX, engineering, integrations and deployment handled together, without hand-offs between vendors.' },
    { title: 'AI and software together', text: "AI isn't a separate gimmick. It becomes part of a complete product that your team actually uses." },
    { title: 'Custom, not generic', text: 'Technology adapted to your workflow, rather than your workflow bent around generic software.' },
    { title: 'Direct communication', text: 'No account managers or layers. You talk to the person designing and writing the code.' },
  ],
};

export const tech = {
  eyebrow: 'Under the hood',
  title: 'Proven, well-supported technology.',
  intro: "Chosen per project, based on what fits. Here's what I work with.",
  groups: [
    { label: 'AI & automation', items: ['LLM APIs', 'n8n', 'Twilio / WhatsApp API'] },
    { label: 'Web', items: ['React', 'Next.js', 'Node.js', 'Express'] },
    { label: 'Mobile', items: ['Flutter', 'Swift (iOS)', 'Java (Android)'] },
    { label: 'Data & backend', items: ['PostgreSQL', 'Supabase', 'Firebase', 'MongoDB', 'MySQL'] },
    { label: 'Commerce & integration', items: ['Shopify', 'REST APIs', 'Webhooks', 'WebSockets'] },
    { label: 'Deployment', items: ['Vercel', 'Docker'] },
  ],
};

export const closing = {
  eyebrow: 'Start here',
  title: 'Have a business problem that technology could solve?',
  text: "You don't need to know the stack, the architecture or even the exact solution. Start with the problem — I'll help you work out the rest.",
  next: [
    'I read every message personally and reply by email.',
    "If it's a fit, we set up a short call about the problem.",
    'You get a clear recommendation and an estimate — with no obligation.',
  ],
  email: 'mohamdadm25@gmail.com',
  phone: { label: '+972 54-236-6982', href: 'tel:+972542366982' },
};

export const BUDGETS = [
  'Not sure yet',
  'Under $2,000',
  '$2,000 – $5,000',
  '$5,000 – $15,000',
  '$15,000+',
];
