export type Language = 'pt' | 'en';
export type Category = 'featured' | 'learning';
export type Localized = { pt: string; en: string };
export type Project = {
  slug: string;
  title: string;
  number: string;
  category: Category;
  kind: Localized;
  status: Localized;
  description: Localized;
  challenge: Localized;
  solution: Localized;
  outcome: Localized;
  contribution: Localized;
  technologies: string[];
  github?: string;
  demo?: string;
  theme: 'nexus' | 'helpdesk' | 'maas' | 'odin';
  screenshots: { src: string; alt: Localized }[];
};

export const projects: Project[] = [
  {
    slug: 'nexus-dev', title: 'Nexus Dev', number: '01', category: 'featured', theme: 'nexus', screenshots: [{src: 'projects/nexus-editor.webp', alt: {pt: "Interface da demonstração pública do Nexus Dev", en: "Nexus Dev public demo interface"}},{src: 'projects/nexus-ai.webp', alt: {pt: "Nexus AI analisando código", en: "Nexus AI reviewing code"}},{src: 'projects/nexus-code.webp', alt: {pt: "Exemplo de código apresentado pelo Nexus AI", en: "Code example displayed by Nexus AI"}}],
    kind: { pt: 'Ferramenta de desenvolvimento com IA', en: 'AI-assisted development workspace' },
    status: { pt: 'Protótipo e demo pública', en: 'Prototype and public demo' },
    description: {
      pt: 'Ambiente de desenvolvimento com editor Monaco, recursos de Git e integração local com modelos via Ollama.',
      en: 'Development workspace featuring Monaco Editor, Git tools and local model integration through Ollama.',
    },
    challenge: {
      pt: 'Centralizar conversa com IA, edição de código e ferramentas de desenvolvimento sem sobrecarregar a interface.',
      en: 'Bring AI chat, code editing and development tools together without overwhelming the interface.',
    },
    solution: {
      pt: 'Interface minimalista de painéis com React e TypeScript, editor Monaco e integração com serviços locais para recursos de IA.',
      en: 'Minimal panel-based interface built with React and TypeScript, Monaco Editor and local service integration for AI workflows.',
    },
    outcome: {
      pt: 'Demo de interface publicada. Recursos que dependem de Ollama e de serviços locais exigem configuração específica.',
      en: 'Interface demo published. Features that depend on Ollama and local services require separate configuration.',
    },
    contribution: {
      pt: 'Concepção da experiência, desenvolvimento da interface, integração de ferramentas e evolução incremental das versões.',
      en: 'Experience design, interface development, tool integration and iterative version improvements.',
    },
    technologies: ['React', 'TypeScript', 'Vite', 'Monaco', 'Ollama', 'Git'],
    github: 'https://github.com/MarceloFraitag/nexus-dev',
    demo: 'https://nexus-dev-minimal-demo.regal-tune-3069.chatgpt.site',
  },
  {
    slug: 'helpdesk-mobile', title: 'HelpDesk Mobile', number: '02', category: 'featured', theme: 'helpdesk', screenshots: [{src: 'projects/helpdesk-ticket.webp', alt: {pt: "Tela de acompanhamento de chamado com dados ocultados", en: "Ticket tracking screen with details redacted"}},{src: 'projects/helpdesk-form.webp', alt: {pt: "Formulário de abertura de chamado com dados ocultados", en: "Ticket creation form with details redacted"}}],
    kind: { pt: 'Aplicação mobile / Gestão de chamados', en: 'Mobile application / Ticket management' },
    status: { pt: 'Em desenvolvimento · Uso interno', en: 'In development · Internal use' },
    description: {
      pt: 'Aplicativo React Native que se comunica com a API do GLPI para abrir, acompanhar, atribuir e tratar chamados conforme o perfil do usuário.',
      en: 'React Native app communicating with the GLPI API to create, track, assign and handle tickets based on user permissions.',
    },
    challenge: {
      pt: 'Simplificar o atendimento móvel a chamados em um fluxo que respeite as permissões de solicitantes e técnicos.',
      en: 'Make mobile ticket handling simpler while respecting requester and technician permissions.',
    },
    solution: {
      pt: 'Aplicação Expo/React Native com autenticação, consultas à API do GLPI, filtros de chamados e telas para tarefas e soluções.',
      en: 'Expo/React Native app with authentication, GLPI API requests, ticket filters, tasks and resolution screens.',
    },
    outcome: {
      pt: 'Versões de teste com login, acompanhamento e rotinas técnicas. Integrações de categoria e atribuição seguem em validação.',
      en: 'Test versions include login, ticket tracking and technician workflows. Category and assignment integrations are still being validated.',
    },
    contribution: {
      pt: 'Estruturação do aplicativo, interfaces, integração com API, testes e tratamento incremental de fluxos do GLPI.',
      en: 'App structure, interfaces, API integration, testing and incremental refinement of GLPI workflows.',
    },
    technologies: ['React Native', 'Expo', 'TypeScript', 'REST API', 'GLPI'],
  },
  {
    slug: 'barbearia-maas', title: 'Barbearia Maas', number: '03', category: 'featured', theme: 'maas', screenshots: [{src: 'projects/maas-site.webp', alt: {pt: "Página inicial do site Barbearia Maas", en: "Barbearia Maas website homepage"}}],
    kind: { pt: 'Website comercial / Experiência mobile', en: 'Business website / Mobile experience' },
    status: { pt: 'Protótipo enviado para avaliação', en: 'Prototype submitted for review' },
    description: {
      pt: 'Website de barbearia com identidade preta e dourada, informações de serviços e fluxo de agendamento via WhatsApp.',
      en: 'Barbershop website with a black-and-gold visual identity, service information and WhatsApp appointment flow.',
    },
    challenge: {
      pt: 'Dar ao negócio uma presença digital coerente e facilitar o caminho entre conhecer os serviços e solicitar um agendamento.',
      en: 'Give the business a coherent digital presence and make it easy to go from discovering services to requesting an appointment.',
    },
    solution: {
      pt: 'Interface responsiva com seções de serviços, planos, produtos e galeria, priorizando a navegação e o contato via WhatsApp.',
      en: 'Responsive interface with services, plans, products and gallery, prioritizing navigation and WhatsApp contact.',
    },
    outcome: {
      pt: 'Protótipo V1.2 desenvolvido e enviado ao proprietário. Aprovação e publicação definitiva ainda dependem de retorno.',
      en: 'V1.2 prototype developed and shared with the business owner. Final approval and publication are still pending.',
    },
    contribution: {
      pt: 'Planejamento do site, identidade visual, implementação front-end, versão PWA e fluxo de agendamento.',
      en: 'Website planning, visual design, front-end implementation, PWA version and appointment flow.',
    },
    technologies: ['HTML', 'CSS', 'JavaScript', 'PWA', 'UX'],
  },
  {
    slug: 'odin-project', title: 'The Odin Project', number: '04', category: 'learning', theme: 'odin', screenshots: [{src: 'projects/odin-dashboard.webp', alt: {pt: "Dashboard desenvolvido no The Odin Project", en: "Dashboard built during The Odin Project"}}],
    kind: { pt: 'Estudos / Fundamentos front-end', en: 'Learning / Front-end foundations' },
    status: { pt: 'Exercícios práticos', en: 'Hands-on exercises' },
    description: {
      pt: 'Projetos de estudo como Sign-up Form, Admin Dashboard e Recipes, com foco em HTML semântico, CSS Grid e Flexbox.',
      en: 'Learning projects such as Sign-up Form, Admin Dashboard and Recipes, focused on semantic HTML, CSS Grid and Flexbox.',
    },
    challenge: {
      pt: 'Construir uma base sólida em marcação, layouts e organização de código antes de avançar para aplicações complexas.',
      en: 'Build solid skills in markup, layout and code organization before moving on to more complex applications.',
    },
    solution: {
      pt: 'Exercícios incrementais de formulários, grids aninhados, responsividade e navegação entre páginas.',
      en: 'Incremental exercises covering forms, nested grids, responsiveness and navigation between pages.',
    },
    outcome: {
      pt: 'Projetos construídos como parte da trilha de estudos. Repositório público disponível para o Admin Dashboard.',
      en: 'Projects built as part of the learning curriculum. Public repository available for the Admin Dashboard.',
    },
    contribution: {
      pt: 'Construção dos exercícios, organização dos repositórios, revisões de código e documentação.',
      en: 'Building exercises, organizing repositories, reviewing code and writing documentation.',
    },
    technologies: ['HTML5', 'CSS3', 'Grid', 'Flexbox', 'Git'],
    github: 'https://github.com/MarceloFraitag/projeto_odin_dashboard_nexus',
  },
];

export function findProject(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug);
}
