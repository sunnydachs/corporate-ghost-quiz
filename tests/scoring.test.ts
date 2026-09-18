import { describe, expect, it } from "vitest";
import { scoreAnswers } from "../lib/scoring";

describe("scoreAnswers", () => {
  it("returns the code with the highest tally", () => {
    expect(scoreAnswers(["OTGM", "MTRG", "OTGM", "OTGM", "KPIZ"])).toBe(
      "OTGM",
    );
  });

  it("uses first-reached tie breaking", () => {
    expect(scoreAnswers(["MTRG", "OTGM", "MTRG", "OTGM"])).toBe("MTRG");
    expect(scoreAnswers(["OTGM", "MTRG", "OTGM", "MTRG"])).toBe("OTGM");
  });

  it("rejects an empty answer set", () => {
    expect(() => scoreAnswers([])).toThrow("At least one answer is required.");
  });
});
