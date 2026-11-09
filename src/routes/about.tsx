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

const people: { group: string; list: { name: string; role: string }[] }[] = [
  { group: "SCU teammates", list: [
    { name: "Ethan Li", role: "Rover + 6-DOF arm teammate, co-author" },
    { name: "Cameron VanHaren", role: "Rover + 6-DOF arm teammate, co-author" },
  ] },
  { group: "SCU professors & TAs", list: [
    { name: "Professor Zand", role: "Professor, SCU Young Scholars ENGR1" },
    { name: "Mr. Yamao", role: "Instructor / TA, SCU Young Scholars" },
  ] },
  { group: "SCU staff", list: [
    { name: "SCU Young Scholars Program staff", role: "Program support" },
    { name: "SCU Maker Lab staff", role: "Laser cutting & 3D printing help" },
  ] },
  { group: "Engineering Design Club", list: [
    { name: "(add name)", role: "Club member" },
    { name: "(add name)", role: "Club advisor / mentor" },
  ] },
  { group: "Others who helped", list: [
    { name: "Mert Kilic", role: "Open-source spider robot design (PCBWay)" },
  ] },
];

function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <Link to="/" className="font-display text-lg font-bold">RA<span className="text-primary">.</span></Link>
        <Link to="/" className="text-sm font-medium hover:text-primary">← Projects</Link>
      </header>
      <main className="mx-auto max-w-5xl space-y-10 px-6 pb-24">
        <section className="blueprint rounded-2xl border-2 border-foreground bg-card p-8 shadow-hard">
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
              <li key={t} className="rounded-xl border-2 border-foreground bg-card p-4">
                <span className="text-leaf">▸</span> {t}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold">Thank you</h2>
          <p className="mt-2 text-muted-foreground">None of these builds happened alone.</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {people.map((g) => (
              <div key={g.group} className="rounded-2xl border-2 border-foreground bg-card p-6 shadow-hard">
                <h3 className="font-display text-lg font-bold">{g.group}</h3>
                <ul className="mt-3 space-y-2">
                  {g.list.map((p, i) => (
                    <li key={i}>
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
