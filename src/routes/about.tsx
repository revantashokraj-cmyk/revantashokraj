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

type Person = { name: string; role: string; note?: string };

const titles = [
  "Founder & President — Engineering Design Club",
  "Judges' Favorite Award — SCU Young Scholars robot showcase",
  "SCU Young Scholars Program — ENGR1 & ENGR1-Lab",
  "Co-author, omnidirectional rover research paper",
];

const programs = [
  { type: "Summer program", name: "SCU Young Scholars — ENGR1 & ENGR1-Lab", note: "Built the omnidirectional rover; won Judges' Favorite.", href: "/projects/omni-rover" as const },
  { type: "Bootcamp", name: "UC Berkeley Design Build Bootcamp", note: "Program details coming soon.", href: undefined },
  { type: "Hackathon", name: "Hackathons", note: "Event details coming soon.", href: undefined },
  { type: "Club", name: "Engineering Design Club", note: "Built the quadruped spider robot as a club project.", href: "/projects/spider-robot" as const },
];

// Officer roles as supplied by Revant; notes carry each person's current path.
export const clubOfficers: Person[] = [
  { name: "Revant Ashokraj", role: "Founder & President" },
  { name: "Stanley He", role: "Vice President · Lead Programmer / Computer Scientist" },
  { name: "Aidan Matthew Roza", role: "Lead Engineer · Secretary" },
  { name: "Andrew Kasberger", role: "Former Vice President", note: "Studying Mechatronics at Chico State" },
  { name: "Khanh Tu", role: "Former Fabrication Team Head", note: "Graduated alumni" },
  { name: "Tyler Tsuji", role: "Former Media Manager", note: "Studying Game Design at College of Alameda" },
];

export const clubMembers = [
  "Joseph Costello",
  "Kaia Crowley",
  "Katherine McNab",
  "Andrei Pokotylo",
  "Logan Tamblin",
  "Eric Junho Um",
  "Devin Hom",
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
            as founder and president of my Engineering Design Club, and through Santa Clara
            University's Young Scholars Program.
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
          <h2 className="font-display text-2xl font-bold">Engineering Design Club</h2>
          <p className="mt-2 text-muted-foreground">The club I founded — and where the spider robot was built.</p>

          <div className="feedback-item mt-5 border-l-2 border-primary bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Alumni Mentorship Network</p>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              The club runs as an alumni network. Current and future members get guidance from club
              seniors now in college or working in industry — technical advice, recommendation
              letters, internship leads, and general mentorship.
            </p>
          </div>

          <h3 className="mt-8 font-display text-lg font-bold">Founding & leadership</h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clubOfficers.map((p) => (
              <li key={p.name} className="person-item border border-border bg-card p-4">
                <div className="font-medium">{p.name}</div>
                <div className="mt-1 text-sm text-accent">{p.role}</div>
                {p.note && <div className="mt-1 text-xs text-muted-foreground">{p.note}</div>}
              </li>
            ))}
          </ul>

          <h3 className="mt-8 font-display text-lg font-bold">Club members</h3>
          <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
            {clubMembers.map((name) => (
              <li key={name} className="person-item border-l-2 border-border pl-3 py-2">{name}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold">Thank you</h2>
          <p className="mt-2 text-muted-foreground">None of these builds happened alone.</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {people.map((g) => (
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
