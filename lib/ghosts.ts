export type GhostCode =
  | "OTGM"
  | "MTRG"
  | "KPIZ"
  | "CPGH"
  | "EMZG"
  | "BRNT"
  | "SLGH"
  | "LNGH";

export type Ghost = {
  code: GhostCode;
  name: string;
  emoji: string;
  title: string;
  short: string;
  description: string;
  strengths: [string, string, string];
  ritual: string;
  haunt: string;
};

export type Question = {
  prompt: string;
  options: readonly {
    text: string;
    ghost: GhostCode;
  }[];
};

export const ghosts: Ghost[] = [
  {
    code: "OTGM",
    name: "The Overtime Ghost Master",
    emoji: "🕛",
    title: "Deadline's favorite employee",
    short: "You've seen 2am so often it quietly filed a restraining order.",
    description:
      "You log on at 9 and log off after one more email—always one more. The office lights may be off, but your inbox is still glowing.",
    strengths: [
      "Your inbox is your legacy.",
      "You finish things. Eventually. Mostly.",
      "Reliable after hours, unfortunately.",
    ],
    ritual: "Close the laptop, reopen it, and send one more email.",
    haunt: "The empty office, peering at the vending machine at 3am.",
  },
  {
    code: "MTRG",
    name: "The Meeting Revenant",
    emoji: "📋",
    title: "An appointment to have no appointments",
    short: "Your calendar is so full you scheduled a meeting to read this quiz.",
    description:
      "Your day is back-to-back, lunch is theoretical, and every meeting could have been an email. You agree to things in sync calls you will never do.",
    strengths: [
      "You own the calendar.",
      "Your availability is a group project.",
      "You can say “let's align” in your sleep.",
    ],
    ritual: "Decline one meeting by scheduling another meeting.",
    haunt: "An endless Zoom room, permanently “please mute.”",
  },
  {
    code: "KPIZ",
    name: "The KPI Zombie",
    emoji: "📊",
    title: "If it isn't measured, it doesn't exist",
    short: "You once felt productive just because a number went up.",
    description:
      "You track the tracker that tracks the tracker. If a metric turns green, you briefly remember you have a body.",
    strengths: [
      "T-shaped, but the vertical bar is a chart.",
      "You can make a dashboard sound important.",
      "Your spreadsheets have spreadsheets.",
    ],
    ritual:
      "Update four dashboards at 5:59 so the number looks green overnight.",
    haunt: "The spreadsheet graveyard.",
  },
  {
    code: "CPGH",
    name: "The Cubicle Poltergeist",
    emoji: "🧊",
    title: "Two screens, zero plans",
    short:
      "You've been at your desk 30 minutes and still haven't decided what to open first.",
    description:
      "You hover over tabs like a haunted cursor. Deep work is absolutely happening—after the seventh refresh and one drawer reorganization.",
    strengths: [
      "You know every keyboard shortcut except “stop.”",
      "Your desk has excellent vibes.",
      "You can look busy in any lighting.",
    ],
    ritual: "Organize one drawer as a coping mechanism.",
    haunt: "The break room, hovering, not speaking.",
  },
  {
    code: "EMZG",
    name: "The Email Zombie",
    emoji: "✉️",
    title: "Send now, think never",
    short: "You reply to emails before the sender finishes writing them.",
    description:
      "Your response time is legendary and your response quality is cursed. You write at 11:58pm, schedule for 9am, and call it balance.",
    strengths: [
      "Legendary response time.",
      "Cursed response quality.",
      "Your outbox is a monument to effort.",
    ],
    ritual: "Schedule-send a midnight reply so you seem alive at 9am.",
    haunt: "An outbox that never stops growing.",
  },
  {
    code: "BRNT",
    name: "The Burnout Phantom",
    emoji: "🔋",
    title: "Running on fumes and office coffee",
    short: "Your weekend is 48 hours and somehow none of it restores you.",
    description:
      "You once had energy; you have the email archive to prove it. Sleep is now a loading screen that never quite finishes.",
    strengths: [
      "You once had energy.",
      "You can nap professionally.",
      "Your coffee order has a loyalty program.",
    ],
    ritual: "Sleep through alarms, wake up more tired.",
    haunt: "The nap room—if you had one, which is the problem.",
  },
  {
    code: "SLGH",
    name: "The Slack Ghoul",
    emoji: "💬",
    title: "Typing… until the end of time",
    short:
      "You've said “sorry for the late reply” so often it's your catchphrase.",
    description:
      "Your green dot says present; your nervous system says please wait. You heart-react to everything to prove you are still alive.",
    strengths: [
      "Presence, if green means panicking.",
      "You can type an apology instantly.",
      "Every thread knows your name.",
    ],
    ritual: "Heart-react to everything to look engaged.",
    haunt:
      "A thread where someone asks a question and the ghoul stares at the reply box.",
  },
  {
    code: "LNGH",
    name: "The Lunchtime Ghost",
    emoji: "🍱",
    title: "Desk dining eternal",
    short: "You asked what you had for lunch and genuinely don't remember.",
    description:
      "You merged eating into the meeting and called it efficiency. The microwave remembers your order better than you do.",
    strengths: [
      "You merged eating into the meeting.",
      "Your lunch has a calendar invite.",
      "You can eat standing up with dignity.",
    ],
    ritual: "Microwave something sad and eat it standing.",
    haunt: "The office kitchen, fading in and out by the fridge.",
  },
];

export const questions: Question[] = [
  {
    prompt: "You know it's bad when your evening looks like…",
    options: [
      { text: "One more email, obviously", ghost: "OTGM" },
      { text: "Another meeting appears", ghost: "MTRG" },
      { text: "Four dashboards need updating", ghost: "KPIZ" },
      { text: "A drawer needs organizing", ghost: "CPGH" },
    ],
  },
  {
    prompt: "Your inbox reacts to your presence by…",
    options: [
      { text: "Screaming at 11:58pm", ghost: "EMZG" },
      { text: "Asking for a status report", ghost: "KPIZ" },
      { text: "Scheduling another meeting", ghost: "MTRG" },
      { text: "Quietly filing a complaint", ghost: "OTGM" },
    ],
  },
  {
    prompt: "Friday at 5pm, your ritual is…",
    options: [
      { text: "Send one last message", ghost: "OTGM" },
      { text: "Decline by rescheduling", ghost: "MTRG" },
      { text: "Make every number green", ghost: "KPIZ" },
      { text: "Tidy a drawer for hope", ghost: "CPGH" },
    ],
  },
  {
    prompt: "The office recognizes you by your…",
    options: [
      { text: "Legendary reply speed", ghost: "EMZG" },
      { text: "Calendar full of ghosts", ghost: "MTRG" },
      { text: "Two screens and blank stare", ghost: "CPGH" },
      { text: "Lunch eaten in a meeting", ghost: "LNGH" },
    ],
  },
  {
    prompt: "Your weekend restoration plan is…",
    options: [
      { text: "Sleep through every alarm", ghost: "BRNT" },
      { text: "Reply before breakfast", ghost: "EMZG" },
      { text: "Microwave something sad", ghost: "LNGH" },
      { text: "Heart-react from bed", ghost: "SLGH" },
    ],
  },
  {
    prompt: "Sunday office hauntings include…",
    options: [
      { text: "A thread you cannot leave", ghost: "SLGH" },
      { text: "The fridge, maybe lunch", ghost: "LNGH" },
      { text: "The spreadsheet graveyard", ghost: "KPIZ" },
      { text: "The vending machine at 3am", ghost: "OTGM" },
    ],
  },
  {
    prompt: "Your productivity spirit animal is…",
    options: [
      { text: "A green dot, panicking", ghost: "SLGH" },
      { text: "A battery at one percent", ghost: "BRNT" },
      { text: "A chart with commitment issues", ghost: "KPIZ" },
      { text: "A cursor hovering forever", ghost: "CPGH" },
    ],
  },
  {
    prompt: "The final confession is…",
    options: [
      { text: "You answer before reading", ghost: "EMZG" },
      { text: "You schedule rest, then cancel", ghost: "BRNT" },
      { text: "You eat while discussing work", ghost: "LNGH" },
      { text: "You react instead of replying", ghost: "SLGH" },
    ],
  },
];

export const getGhost = (code: GhostCode): Ghost => {
  const ghost = ghosts.find((candidate) => candidate.code === code);
  if (!ghost) {
    throw new Error(`Unknown ghost code: ${code}`);
  }
  return ghost;
};
