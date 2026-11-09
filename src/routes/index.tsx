import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { categories, projects, type Category } from "@/lib/projects";

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
};

function Index() {
  const [filter, setFilter] = useState<Category | "All">("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-display text-lg font-bold">RA<span className="text-primary">.</span></span>
        <nav className="flex gap-6 text-sm font-medium">
          <a href="#projects" className="hover:text-primary">Projects</a>
          <Link to="/about" className="hover:text-primary">About</Link>
        </nav>
      </header>

      <section className="blueprint mx-auto max-w-6xl px-6 pb-20 pt-12">
        <p className="mb-4 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-secondary-foreground">
          Engineering portfolio
        </p>
        <h1 className="font-display text-5xl font-bold leading-[1.05] md:text-7xl">
          Hi, I'm Revant.
          <br />
          I build <span className="text-primary">robots</span> that{" "}
          <span className="text-leaf">move</span>.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Projects I've designed and built on my own, with my Engineering Design Club, and through
          Santa Clara University's Young Scholars Program (ENGR1 &amp; ENGR1-Lab).
        </p>
        <div className="mt-10 grid max-w-lg grid-cols-3 gap-4">
          {[
            [String(projects.length), "Projects"],
            ["1", "Award"],
            ["1", "Paper pending"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-xl border-2 border-foreground bg-card p-4 shadow-hard">
              <div className="font-display text-3xl font-bold">{n}</div>
              <div className="text-xs text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="font-display text-3xl font-bold">Projects</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {(["All", ...categories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full border-2 border-foreground px-4 py-1.5 text-sm font-medium transition ${
                filter === c ? "bg-foreground text-background" : "bg-card hover:bg-secondary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {shown.map((p) => (
            <article
              key={p.title}
              className="overflow-hidden rounded-2xl border-2 border-foreground bg-card shadow-hard transition hover:-translate-y-1"
            >
              {p.image && (
                <div className="relative">
                  <img src={p.image} alt={p.title} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                  {p.badge && (
                    <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                      🏆 {p.badge}
                    </span>
                  )}
                </div>
              )}
              <div className="p-6">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${catStyle[p.category]}`}>
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
                  <Link to={p.href} className="mt-6 inline-block rounded-full border-2 border-foreground bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
                    {p.cta ?? "Read more →"}
                  </Link>
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

      <footer className="border-t-2 border-foreground py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Revant Ashokraj
      </footer>
    </div>
  );
}
