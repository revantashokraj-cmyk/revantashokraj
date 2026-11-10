import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Revant Ashokraj — Engineering, Aviation & Leadership" },
      { name: "description", content: "Student engineer, Engineering Design Club founder, USS Hornet Air Group volunteer and aspiring pilot. Explore Revant's projects, programs and mentors." },
      { property: "og:title", content: "About Revant Ashokraj — Engineering, Aviation & Leadership" },
      { property: "og:description", content: "Robotics, aircraft restoration, hands-on engineering programs and a community built around mentorship." },
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
  "Air Group Volunteer — USS Hornet Museum",
  "AP Physics 1 Teaching Assistant — Mr. Joo",
  "Swim Team Captain — Since freshman year",
  "Co-author, omnidirectional rover research paper",
];

const programs = [
  { type: "Summer program", name: "SCU Young Scholars — ENGR1 & ENGR1-Lab", note: "Attended the summer before senior year. Coordinated our rover team's CAD, electronics, programming and assembly; our final project won Judges' Favorite.", href: "/projects/omni-rover" as const },
  { type: "Bootcamp", name: "UC Berkeley Design Build Bootcamp", note: "Attended the summer after sophomore year. Helped build a mini-golf course, organized team responsibilities and scheduling, and helped other teams after completing our course.", href: undefined },
  { type: "Aviation program", name: "Patriots Jet Team Foundation", note: "Completed the Introduction to Aviation Program: flight fundamentals, instruments, navigation, air traffic communication and flight-simulator practice. Met military and commercial pilots and aviation industry speakers.", href: undefined },
  { type: "Flight experience", name: "EAA Young Eagles", note: "Took multiple Young Eagles flights as my interest in aviation grew from a middle-school flight simulator into real-world experience.", href: undefined },
  { type: "Training · In progress", name: "Sporty's Flight Ground School", note: "Currently studying toward a private pilot license, with a long-term goal of becoming a commercial pilot.", href: undefined },
  { type: "Club", name: "Engineering Design Club", note: "Founded a hands-on engineering community and led our quadruped spider robot build using Mert Kilic's open-source design.", href: "/projects/spider-robot" as const },
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
  { group: "School mentors", list: [
    { name: "Ms. Nancy Reid", role: "CS Discoveries teacher and Engineering Design Club advisor; helped connect us with school engineering resources" },
    { name: "Mr. Joo", role: "AP Physics 1 teacher and my teaching assistant supervisor" },
    { name: "Ms. Galloway", role: "AP Physics 1 & 2 teacher" },
    { name: "School staff & AUSD administrators", role: "Helped secure access to engineering resources for the club" },
  ] },
  { group: "UC Berkeley mentors", list: [
    { name: "Professor Klea Bajala", role: "Design Build Bootcamp guidance and support for my team's leadership and coordination" },
    { name: "Professor Samar Prom", role: "Design Build Bootcamp professor who recognized our team's work" },
  ] },
  { group: "Others who helped", list: [
    { name: "Mr. Stephen Ramos", role: "STEM teacher who helped us explore access to his school's Fab-Lab" },
    { name: "Mr. Miguel Vega", role: "College of Alameda Fab-Lab lead who helped explore fabrication resources" },
    { name: "USS Hornet Air Group volunteers", role: "Shared aircraft knowledge and hands-on guidance in restoration work" },
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
            I'm a student engineer at Alameda High School with a passion for robotics and aviation.
            I design in CAD, fabricate parts, build electrical systems and write the code that brings
            machines to life. My work spans Engineering Design Club builds, Santa Clara University's
            Young Scholars Program and hands-on aircraft restoration at the USS Hornet Museum.
          </p>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            I enjoy turning ambitious ideas into working projects — and helping other students build
            the confidence to do the same. Alongside engineering, I'm studying toward a private pilot
            license with the goal of becoming a commercial pilot.
          </p>
        </section>

        <nav aria-label="About sections" className="section-navigation flex flex-wrap gap-x-5 gap-y-2 border-y border-border py-3 text-sm">
          <a href="#recognition">Recognition</a><a href="#programs">Programs</a><a href="#aviation">Aviation</a><a href="#club">Club & alumni</a><a href="#mentors">Mentors</a>
        </nav>

        <section id="recognition">
          <h2 className="font-display text-2xl font-bold">Titles & recognition</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {titles.map((t) => (
              <li key={t} className="feedback-item border border-border bg-card p-5">
                <span className="text-leaf">▸</span> {t}
              </li>
            ))}
          </ul>
        </section>

        <section id="programs">
          <h2 className="font-display text-2xl font-bold">Programs & training</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {programs.map((p, i) => (
              <div key={i} className="feedback-item relative flex flex-col border border-border bg-card p-5">
                <span className="self-start bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">{p.type}</span>
                <h3 className="mt-3 font-display text-lg font-bold">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.note}</p>
                {p.href && <Link to={p.href} className="mt-auto self-start pt-4 text-sm font-medium text-accent hover:text-primary">View project ↗</Link>}
              </div>
            ))}
          </div>
        </section>

        <section id="aviation" className="border-t border-border pt-8">
          <p className="text-xs font-semibold uppercase text-primary">Aviation & hands-on work</p>
          <h2 className="mt-2 font-display text-2xl font-bold">USS Hornet Museum · Air Group</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
            As an Air Group volunteer at the USS Hornet Museum in Alameda Point, I learn from
            veteran volunteers while helping restore and maintain retired military aircraft.
            This work connects my interest in aerospace with the real mechanisms, materials
            and care that keep historic machines intact.
          </p>
          <dl className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="person-item border-l-2 border-accent py-2 pl-4">
              <dt className="font-display text-lg font-bold">TBM-1C Avenger</dt>
              <dd className="mt-2 text-sm text-muted-foreground">Helped reconstitute the aircraft's undercarriage through hands-on restoration work.</dd>
            </div>
            <div className="person-item border-l-2 border-leaf py-2 pl-4">
              <dt className="font-display text-lg font-bold">Gemini spacecraft replica</dt>
              <dd className="mt-2 text-sm text-muted-foreground">Helped create a replica of the Gemini spacecraft, bringing my engineering interests into a space-history project.</dd>
            </div>
          </dl>
        </section>

        <section id="club">
          <h2 className="font-display text-2xl font-bold">Engineering Design Club</h2>
          <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">
            I founded the club to give aspiring engineers at my school a place to learn and build
            together. With help from our advisor and school staff, we secured access to engineering
            resources and taught fundamentals through small projects and hands-on labs before
            taking on our quadruped robot. Members who started as beginners now help guide newer students.
          </p>

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

        <section className="border-t border-border pt-8">
          <h2 className="font-display text-2xl font-bold">Leadership beyond the workshop</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-display text-lg font-bold">Teaching & mentorship</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">As Mr. Joo's AP Physics 1 teaching assistant during senior year, I help other students learn the physics behind the systems I enjoy building.</p>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">Athletics</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">I've captained my school swim team since freshman year and balance engineering with water polo and a multi-year commitment to Gators club swimming.</p>
            </div>
          </div>
        </section>

        <section id="mentors">
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
        <nav aria-label="More from the portfolio" className="border-t border-border pt-6 text-sm"><Link to="/" hash="projects" className="text-accent">Explore my engineering projects ↗</Link></nav>
      </main>
    </div>
  );
}
