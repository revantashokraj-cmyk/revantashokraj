import { describe, expect, it } from "vitest";

import { clubMembers, clubOfficers } from "@/routes/about";

const roleOf = (name: string) => clubOfficers.find((o) => o.name === name)?.role ?? "";
const noteOf = (name: string) => clubOfficers.find((o) => o.name === name)?.note ?? "";

describe("Engineering Design Club roster", () => {
  it("gives Revant the founder and president title", () => {
    expect(roleOf("Revant Ashokraj")).toBe("Founder & President");
  });

  it("lists the officer roles Revant supplied", () => {
    expect(roleOf("Stanley He")).toContain("Vice President");
    expect(roleOf("Stanley He")).toContain("Lead Programmer");
    expect(roleOf("Aidan Matthew Roza")).toContain("Lead Engineer");
    expect(roleOf("Aidan Matthew Roza")).toContain("Secretary");
  });

  it("marks the alumni roles and where each alum is now", () => {
    expect(roleOf("Andrew Kasberger")).toBe("Former Vice President");
    expect(noteOf("Andrew Kasberger")).toContain("Santa Clara University");
    expect(roleOf("Khanh Tu")).toBe("Former Fabrication Team Head");
    expect(noteOf("Khanh Tu")).toContain("Graduated");
    expect(roleOf("Tyler Tsuji")).toBe("Former Media Manager");
    expect(noteOf("Tyler Tsuji")).toContain("College of Alameda");
  });

  it("lists every remaining member with no unfilled role", () => {
    expect(clubMembers).toEqual([
      "Joseph Costello",
      "Kaia Crowley",
      "Katherine McNab",
      "Andrei Pokotylo",
      "Logan Tamblin",
      "Eric Junho Um",
      "Devin Hom",
    ]);
    const roster = [...clubOfficers.map((o) => o.name), ...clubMembers];
    expect(new Set(roster).size).toBe(roster.length);
    expect(roster.some((r) => /coming soon/i.test(r))).toBe(false);
  });
});
