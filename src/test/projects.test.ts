import { describe, it, expect } from "vitest";
import { projectsInCategory } from "@/lib/projects";

describe("Project affiliations from Revant's requests", () => {
  it("lists the spider under Engineering Design Club", () => {
    expect(projectsInCategory("Engineering Design Club").map(p => p.title)).toContain("Quadruped Spider Robot");
    expect(projectsInCategory("Personal").map(p => p.title)).not.toContain("Quadruped Spider Robot");
  });
  it("lists the SCU rover in both ENGR1 and ENGR1-Lab", () => {
    for (const category of ["SCU YSP ENGR1", "SCU YSP ENGR1-Lab"] as const) {
      expect(projectsInCategory(category).map(p => p.title)).toContain("Omnidirectional Rover + 6-DOF Arm");
    }
  });
  it("also lists the rover being rebuilt with Engineering Design Club", () => {
    expect(projectsInCategory("Engineering Design Club").map(p => p.title)).toContain("Omnidirectional Rover + 6-DOF Arm");
  });
  it("lists Slash Compute as a hackathon project", () => {
    expect(projectsInCategory("Hackathons").map(p => p.title)).toEqual(["Slash Compute"]);
  });
});