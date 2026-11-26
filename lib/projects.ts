export type Project = {
  slug: string;
  name: string;
  kind: string;
  summary: string;
  description: string[];
  stack: string[];
  repo: string;
  /** Path under /public. Leave undefined to show the styled placeholder. */
  thumbnail?: string;
  flagship?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "telebot",
    name: "Telebot",
    kind: "Telegram AI agent",
    summary:
      "An agent that lives in Telegram. It uses tools across files, the web and the shell, reads images with Gemini vision, loads reusable skills, and sends simple messages to a cheaper model to keep costs down.",
    description: [
      "Telebot is a Telegram agent built around an agent loop. It can read and analyse uploads, search the web, work with files, run shell commands, and call its own custom tools when a task needs them.",
      "Simple messages go to a fast model with no tools attached. The full agent only takes over when a request needs tools, which keeps request costs down. Usage counters are available in chat.",
      "A safety guard blocks risky shell commands, such as privilege escalation and piping remote scripts into a shell. Pushes and destructive deletes require explicit confirmation.",
    ],
    stack: ["Python", "Telegram Bot API", "Gemini API", "Agent tools", "Skills system"],
    repo: "https://github.com/cortexinvader001/Telebot",
    flagship: true,
  },
  {
    slug: "cortex-cooks",
    name: "Cortex Cooks",
    kind: "Restaurant website",
    summary:
      "A scroll-driven restaurant site with smooth scrolling and animated sections. Visitors build an order from the menu, and it opens WhatsApp with the total already written out.",
    description: [
      "A restaurant website built with Next.js, Tailwind CSS, GSAP ScrollTrigger and Lenis smooth scrolling. Sections reveal as you scroll, and the menu uses React Bits components for its interactions.",
      "The business owner edits everything in one configuration file: contact details, opening hours, the menu with prices, and the WhatsApp number used for orders.",
      "Visitors add items to an order and tap a single button. WhatsApp opens with the order already written out, including a total when every chosen item has a price. There is no payment step or server involved.",
    ],
    stack: ["Next.js", "TypeScript", "GSAP", "Lenis", "Tailwind CSS", "React Bits"],
    repo: "https://github.com/cortexinvader001/Cortex-cooks",
    thumbnail: "/images/projects/cortex-cooks.jpg",
  },
  {
    slug: "waffybite",
    name: "WaffyBite",
    kind: "Food ordering site",
    summary:
      "A food ordering experience with a dynamic island header, a live cart, and WhatsApp checkout, with motion-led text and scroll-velocity sections.",
    description: [
      "A food ordering site built with Next.js and Tailwind, with a dynamic island header that opens into a navigation drawer and shows the live order count.",
      "The cart slides in as a panel, and checkout sends the full order to WhatsApp. Every dish, price, and the WhatsApp number live in one menu file, so prices are easy to change.",
      "The site exports to plain static files, so it runs as a free static site on Render with no server to maintain.",
    ],
    stack: ["Next.js", "Tailwind CSS", "Motion", "GSAP", "React Bits"],
    repo: "https://github.com/cortexinvader001/WaffyBite-",
    thumbnail: "/images/projects/waffybite.webp",
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
