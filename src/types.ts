export type AgentType = 'Custom' | 'Declarative' | 'Embedded';

export interface Feature {
  name: string;
  category: string;
  description: string;
  values: Record<AgentType, string | boolean>;
}

export interface Scenario {
  id: string;
  text: string;
  correctAgent: AgentType;
  explanation: string;
}

export const FEATURES: Feature[] = [
  // Slide 1
  {
    name: "Availability",
    category: "Basics",
    description: "Current release status of the agent type.",
    values: { Custom: "Generally Available", Declarative: "Generally Available", Embedded: "Generally Available" }
  },
  {
    name: "Supported Scenarios",
    category: "Basics",
    description: "Who the agent is designed for.",
    values: { Custom: "B2C & B2E", Declarative: "B2E", Embedded: "B2E" }
  },
  {
    name: "Orchestrator",
    category: "Technical",
    description: "The logic engine behind the agent.",
    values: { Custom: "MCS standard / generative", Declarative: "Sydney", Embedded: "Sydney" }
  },
  {
    name: "LLM Answers",
    category: "Features",
    description: "Capabilities for large language model powered responses.",
    values: { Custom: true, Declarative: true, Embedded: true }
  },
  {
    name: "Custom Instructions",
    category: "Features",
    description: "Ability to provide detailed system prompts.",
    values: { Custom: true, Declarative: true, Embedded: true }
  },
  {
    name: "Starter Prompts",
    category: "Features",
    description: "Ready-to-use prompt suggestions for users.",
    values: { Custom: false, Declarative: true, Embedded: true }
  },
  {
    name: "Actions",
    category: "Capabilities",
    description: "How the agent interacts with other systems.",
    values: { Custom: "Connectors, Flows, Skills, Prompts, REST APIs", Declarative: "Connectors, Flows, Prompts, REST APIs", Embedded: "None" }
  },
  {
    name: "Knowledge Base",
    category: "Capabilities",
    description: "Sources the agent can pull info from.",
    values: { Custom: "Websites, Dataverse, AOAI On Your Data, etc.", Declarative: "SharePoint + Graph connectors", Embedded: "SharePoint + admin Graph connectors + full web" }
  },
  {
    name: "Topics",
    category: "Design",
    description: "Support for custom conversation topics.",
    values: { Custom: true, Declarative: false, Embedded: false }
  },
  {
    name: "Code Editor",
    category: "Design",
    description: "Pro-dev coding environment access.",
    values: { Custom: true, Declarative: false, Embedded: false }
  },
  {
    name: "Adaptive Cards",
    category: "UI",
    description: "Rich interactive UI components support.",
    values: { Custom: true, Declarative: false, Embedded: false }
  },
  // Slide 2
  {
    name: "Authentication",
    category: "Security",
    description: "Handing user identity for agent and actions.",
    values: { Custom: "Agent & Actions", Declarative: "Actions Only", Embedded: false }
  },
  {
    name: "Channels",
    category: "Deployment",
    description: "Where the agent can be reached.",
    values: { Custom: "M365, Teams, Web, Social, Telephony, Email, WhatsApp, etc.", Declarative: "M365 Copilot + Teams", Embedded: "M365 Copilot + Teams" }
  },
  {
    name: "Handoff",
    category: "Interactions",
    description: "Escalation to human agents.",
    values: { Custom: true, Declarative: false, Embedded: false }
  },
  {
    name: "Analytics",
    category: "Management",
    description: "Insights into performance and usage.",
    values: { Custom: true, Declarative: false, Embedded: false }
  },
  {
    name: "Azure AI Integration",
    category: "Technical",
    description: "Direct connection to Azure AI services.",
    values: { Custom: true, Declarative: false, Embedded: false }
  },
  {
    name: "AI Builder Prompts",
    category: "Advanced AI",
    description: "Custom prompts created through AI Builder.",
    values: { Custom: true, Declarative: true, Embedded: false }
  },
  {
    name: "Collaboration",
    category: "Management",
    description: "Working together on agent design.",
    values: { Custom: "Commenting & Sharing", Declarative: "Environment-wide collab (no comments)", Embedded: "None" }
  },
  {
    name: "Env Awareness",
    category: "Technical",
    description: "Knowledge of the environment/solution.",
    values: { Custom: true, Declarative: true, Embedded: "Environment Agnostic" }
  },
  {
    name: "Agentic Capabilities",
    category: "Future",
    description: "Autonomous agent features.",
    values: { Custom: "Coming soon (Ignite)", Declarative: false, Embedded: false }
  },
  {
    name: "Licensing",
    category: "Business",
    description: "Required license or inclusion.",
    values: { Custom: "Copilot Studio or M365 Copilot", Declarative: "M365 Copilot", Embedded: "M365 Copilot" }
  },
  {
    name: "Admin Controls",
    category: "Security",
    description: "Governance and control features.",
    values: { Custom: true, Declarative: true, Embedded: false }
  }
];

export const SCENARIOS: Scenario[] = [
  {
    id: "1",
    text: "Your company needs a customer-facing bot for the public website that can handle WhatsApp messages and escalate to a human agent.",
    correctAgent: "Custom",
    explanation: "Only Custom agents support B2C (public) scenarios, WhatsApp/Social channels, and Handoff to human agents."
  },
  {
    id: "2",
    text: "You want to quickly extend M365 Copilot for internal employees using existing SharePoint documents, but you don't need custom topics or pro-code editors.",
    correctAgent: "Declarative",
    explanation: "Declarative agents are designed for B2E (internal) SharePoint-backed extensions of M365 Copilot without complex topics."
  },
  {
    id: "3",
    text: "You need an agent that is 'environment agnostic' and is strictly for internal M365 Copilot usage with full web knowledge plus admin Graph connectors.",
    correctAgent: "Embedded",
    explanation: "Embedded agents are environment agnostic and leverage admin Graph connectors + full web search within M365 Copilot."
  },
  {
    id: "4",
    text: "You need to build a complex agent that uses Adaptive Cards for rich interactive forms and needs to connect directly to Azure AI services.",
    correctAgent: "Custom",
    explanation: "Adaptive Card support and Azure AI integration are exclusive to Custom agents."
  }
];
