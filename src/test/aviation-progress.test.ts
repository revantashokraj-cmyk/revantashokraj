import { describe, expect, it } from "vitest";
import { aviationProgress } from "@/routes/about";

describe("Revant's stated aviation milestones", () => {
  it("records completed ground school", () => {
    expect(aviationProgress.groundSchool).toBe("completed");
  });
  it("records the written exam as preparation, not passed", () => {
    expect(aviationProgress.writtenExam).toBe("preparing");
  });
  it("keeps the private pilot license in progress", () => {
    expect(aviationProgress.privatePilotLicense).toBe("in-progress");
  });
});