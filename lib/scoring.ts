import type { GhostCode } from "./ghosts";

export function scoreAnswers(answers: readonly GhostCode[]): GhostCode {
  if (answers.length === 0) {
    throw new Error("At least one answer is required.");
  }

  const tallies = new Map<GhostCode, number>();
  let winner = answers[0];
  let winnerTally = 0;

  for (const code of answers) {
    const tally = (tallies.get(code) ?? 0) + 1;
    tallies.set(code, tally);
    if (tally > winnerTally) {
      winner = code;
      winnerTally = tally;
    }
  }

  return winner;
}

export function formatShareText(
  code: GhostCode,
  name: string,
  title: string,
): string {
  return `I'm ${name} (${code}) — ${title}. Take the Corporate Ghost Quiz.`;
}
