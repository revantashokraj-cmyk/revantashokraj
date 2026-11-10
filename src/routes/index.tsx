import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { HeroAnimation } from "@/components/HeroAnimation";
import { Button } from "@/components/ui/button";
import { categories, projects, projectsInCategory, type Category } from "@/lib/projects";
import { ArrowUpRight, Trophy } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Revant Ashokraj — Engineering Projects" },
      {
        name: "description",
        content:
          "Robotics and engineering projects by Revant Ashokraj: personal builds, Engineering Design Club, and SCU YSP ENGR1 work.",
      },
      { property: "og:title", content: "Revant Ashokraj — Engineering Projects" },
      {
        property: "og:description",
        content: "Robots, rovers and builds from personal work, design club and SCU YSP.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const catStyle: Record<Category, string> = {
  Personal: "bg-accent text-accent-foreground",
  "Engineering Design Club": "bg-secondary text-secondary-foreground",
  "SCU YSP ENGR1": "bg-primary text-primary-foreground",
  "SCU YSP ENGR1-Lab": "bg-leaf text-leaf-foreground",
  Hackathons: "bg-accent text-accent-foreground",
};

function Index() {
  const [filter, setFilter] = useState<Category | "All">("All");
  const shown = projectsInCategory(filter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main id="main-content">
      <section className="home-hero blueprint border-y-2 border-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-12 md:grid-cols-[1.2fr_1fr]">
        <div>
        <p className="mb-6 font-mono text-xs font-semibold uppercase text-accent">
          Engineering portfolio
        </p>
        <h1 className="font-display text-5xl font-bold uppercase leading-[1.05] md:text-6xl">
          Revant<br />Ashokraj.
        </h1>
        <p className="mt-5 font-display text-2xl font-bold uppercase">I build <span className="text-primary">robots</span> that <span className="text-leaf">move.</span></p>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Projects I've designed and built on my own, with my Engineering Design Club, and through
          Santa Clara University's Young Scholars Program (ENGR1 &amp; ENGR1-Lab), plus software built at hackathons.
        </p>
        <div className="mt-10 grid max-w-lg grid-cols-3 gap-4">
          {[
            [String(projects.length), "Projects"],
            ["1", "Award"],
            ["1", "Paper pending"],
          ].map(([n, l]) => (
            <div key={l} className="stat-item border-l-2 border-primary pl-4 py-2">
              <div className="font-display text-3xl font-bold">{n}</div>
              <div className="text-xs text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
        </div>
        <HeroAnimation />
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-6 pt-10 pb-24">
        <div className="flex items-baseline justify-between gap-4"><h2 className="font-display text-3xl font-bold">Projects</h2><span aria-live="polite" className="font-mono text-xs text-muted-foreground">{shown.length} / {projects.length}</span></div>
        <div className="mt-6 flex flex-wrap gap-2">
          {(["All", ...categories] as const).map((c) => (
            <Button
              key={c}
              onClick={() => setFilter(c)}
              variant="outline"
              aria-pressed={filter === c}
              className={`h-auto whitespace-normal border-2 border-foreground px-4 py-1.5 text-sm font-medium transition ${
                filter === c ? "bg-foreground text-background" : "bg-card hover:bg-secondary"
              }`}
            >
              {c}
            </Button>
          ))}
        </div>

        <div className="project-grid mt-10 grid gap-8 md:grid-cols-2">
          {shown.map((p) => (
            <article
              key={p.title}
              className="project-card relative flex flex-col overflow-hidden border border-border bg-card"
            >
              {p.image && (
                <div className="relative">
                  <img src={p.image} alt={p.title} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                  {p.badge && (
                    <span className="absolute left-4 top-4 inline-flex items-center gap-2 bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                      <Trophy className="h-3 w-3" />{p.badge}
                    </span>
                  )}
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <span className={`self-start px-3 py-1 text-xs font-semibold ${catStyle[p.category]}`}>
                  {p.category}
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold">{p.title}</h3>
                <p className="mt-2 text-muted-foreground">{p.summary}</p>
                <ul className="mt-4 space-y-1 text-sm">
                  {p.details.map((d) => (
                    <li key={d} className="flex gap-2">
                      <span className="text-leaf">▸</span>
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
                {p.href && (
                  <Button asChild variant="link" className="project-link mt-6 self-start p-0 font-bold"><Link to={p.href}>{p.cta?.replace(" →", "") ?? "Read more"}<ArrowUpRight /></Link></Button>
                )}
              </div>
            </article>
          ))}
          {shown.length === 0 && (
            <div className="col-span-full rounded-2xl border-2 border-dashed border-foreground/40 p-12 text-center text-muted-foreground">
              Projects for {filter} coming soon.
            </div>
          )}
        </div>
      </section>
      </main>

      <footer className="border-t-2 border-foreground py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Revant Ashokraj
      </footer>
    </div>
  );
}
