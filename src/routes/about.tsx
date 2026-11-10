import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Revant Ashokraj — Engineer & Robot Builder" },
      { name: "description", content: "Who Revant Ashokraj is, his titles and awards, and the teammates, professors, TAs, staff and club members who helped him build." },
      { property: "og:title", content: "About Revant Ashokraj" },
      { property: "og:description", content: "Titles, background, and thanks to everyone who helped along the way." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: About,
});

// Names marked "(add name)" are placeholders until Revant supplies them.
const titles = [
  "Judges' Favorite Award — SCU Young Scholars robot showcase",
  "SCU Young Scholars Program — ENGR1 & ENGR1-Lab",
  "Member, Engineering Design Club",
  "Co-author, omnidirectional rover research paper",
];

const programs = [
  { type: "Summer program", name: "SCU Young Scholars — ENGR1 & ENGR1-Lab", note: "Built the omnidirectional rover; won Judges' Favorite.", href: "/projects/omni-rover" as const },
  { type: "Bootcamp", name: "UC Berkeley Design Build Bootcamp", note: "Program details to be added.", href: undefined },
  { type: "Hackathon", name: "Hackathons", note: "Events and projects to be added.", href: undefined },
  { type: "Club", name: "Engineering Design Club", note: "Built the quadruped spider robot as a club project.", href: "/projects/spider-robot" as const },
];

const people: { group: string; list: { name: string; role: string }[] }[] = [
  { group: "SCU teammates", list: [
    { name: "Ethan Li", role: "Rover + 6-DOF arm teammate, co-author" },
    { name: "Cameron VanHaren", role: "Rover + 6-DOF arm teammate, co-author" },
  ] },
  { group: "SCU professors & TAs", list: [
    { name: "Professor Zand", role: "Professor, SCU Young Scholars ENGR1" },
    { name: "Mr. Yamao", role: "SCU Young Scholars support" },
  ] },
  { group: "SCU staff", list: [
    { name: "SCU Young Scholars Program staff", role: "Program support" },
    { name: "SCU Maker Lab staff", role: "Laser cutting & 3D printing help" },
  ] },
  { group: "Engineering Design Club", list: [
    { name: "Joseph Costello", role: "Role coming soon" },
    { name: "Stanley He", role: "Role coming soon" },
    { name: "Andrew Kasberger", role: "Role coming soon" },
    { name: "Aidan Matthew Roza", role: "Role coming soon" },
    { name: "Khanh Tu", role: "Role coming soon" },
    { name: "Kaia Crowley", role: "Role coming soon" },
    { name: "Katherine McNab", role: "Role coming soon" },
    { name: "Andrei Pokotylo", role: "Role coming soon" },
    { name: "Logan Tamblin", role: "Role coming soon" },
    { name: "Eric Junho Um", role: "Role coming soon" },
    { name: "Devin Hom", role: "Role coming soon" },
  ] },
  { group: "Others who helped", list: [
    { name: "Mert Kilic", role: "Open-source spider robot design used by the club (PCBWay)" },
  ] },
];

function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main id="main-content" className="about-page mx-auto max-w-5xl space-y-12 px-6 pb-24 pt-8">
        <section className="blueprint border-y border-border py-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">About me</p>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">Revant Ashokraj</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            I'm a student engineer who loves building robots that move. I design in CAD, 3D print and
            laser-cut parts, wire up Arduinos, and write the code that brings them to life — on my own,
            with my Engineering Design Club, and through Santa Clara University's Young Scholars Program.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold">Titles & recognition</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {titles.map((t) => (
              <li key={t} className="feedback-item border border-border bg-card p-5">
                <span className="text-leaf">▸</span> {t}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold">Programs & events</h2>
          <p className="mt-2 text-muted-foreground">Camps, bootcamps and hackathons I've taken part in.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((p, i) => (
              <div key={i} className="feedback-item relative flex flex-col border border-border bg-card p-5">
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">{p.type}</span>
                <h3 className="mt-3 font-display text-lg font-bold">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.note}</p>
                {p.href && <Link to={p.href} className="mt-auto pt-4 text-sm font-medium text-accent">View project ↗</Link>}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold">Thank you</h2>
          <p className="mt-2 text-muted-foreground">None of these builds happened alone.</p>
          {people.filter((g) => g.group === "Engineering Design Club").map((g) => (
            <div key={g.group} className="mt-6 border-y border-border py-6">
              <h3 className="font-display text-lg font-bold">{g.group}</h3>
              <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
                {g.list.map((p, i) => (
                  <li key={i} className="person-item border-l-2 border-primary pl-3 py-2">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-sm text-muted-foreground">{p.role}</div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {people.filter((g) => g.group !== "Engineering Design Club").map((g) => (
              <div key={g.group} className="h-full border-t border-border py-6">
                <h3 className="font-display text-lg font-bold">{g.group}</h3>
                <ul className="mt-3 space-y-2">
                  {g.list.map((p, i) => (
                    <li key={i} className="person-item py-2">
                      <div className="font-medium">{p.name}</div>
                      <div className="text-sm text-muted-foreground">{p.role}</div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
