import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlueprintPreview } from "@/components/BlueprintPreview";
import compute from "@/assets/slash-compute-blueprint.jpg";

export const Route = createFileRoute("/projects/slash-compute")({
  head: () => ({ meta: [
    { title: "Slash Compute — Zero to Demo Project | Revant Ashokraj" },
    { name: "description", content: "A four-person Zero to Demo hackathon project exploring shared Mac compute. Revant built the web frontend with Lovable." },
    { property: "og:title", content: "Slash Compute — Revant Ashokraj's Hackathon Work" },
    { property: "og:description", content: "Frontend design and an interactive app preview for a Mac-first shared-compute concept." },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: SlashCompute,
});

function SlashCompute() {
  return <main id="main-content" className="detail-page mx-auto max-w-5xl space-y-8 px-6 pb-24 pt-6">
    <Link to="/" hash="projects" className="text-sm text-muted-foreground">← All projects</Link>
    <header className="blueprint py-8">
      <p className="text-xs font-semibold uppercase text-accent">Zero to Demo · Hackathon</p>
      <h1 className="mt-4 font-display text-4xl font-bold md:text-6xl">Slash Compute</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">A shared-compute concept for Macs, built with three teammates. My contribution was the web frontend, created with Lovable.</p>
      <Button asChild className="mt-6"><a href="https://midnight-mac-showcase.lovable.app" target="_blank" rel="noreferrer">Visit Slash Compute<ArrowUpRight /></a></Button>
    </header>
    <BlueprintPreview src={compute} title="Slash Compute network concept" />
    <p className="text-xs text-muted-foreground">Illustrative network concept · not a hardware schematic or measured network topology.</p>
    <div className="grid gap-8 md:grid-cols-2">
      <section className="detail-section"><h2 className="font-display text-2xl font-bold">The idea</h2><p className="mt-4 text-muted-foreground">Our team explored sharing Mac computing resources for AI workloads. The product pairs a Mac-first experience with a web presence and an interactive preview of the app.</p></section>
      <section className="detail-section"><h2 className="font-display text-2xl font-bold">My contribution</h2><p className="mt-4 text-muted-foreground">I built the frontend with Lovable, turning our team's concept into a website and navigable app interface. This project adds software and interface work to my hands-on robotics portfolio.</p></section>
    </div>
    <section className="detail-section"><h2 className="font-display text-2xl font-bold">Current project scope</h2><p className="mt-4 max-w-3xl text-muted-foreground">The public site includes an interactive app preview with pool connection, contribution and chat screens. That browser preview is simulated: it does not connect to live compute or process real payments. Shared Apple Silicon compute remains the project's vision, not a verified capability of the web preview.</p></section>
    <nav aria-label="More from the portfolio" className="flex flex-wrap justify-between gap-4 border-t border-border pt-6 text-sm"><Link to="/" hash="projects" className="text-accent">← All projects</Link><Link to="/about" className="text-accent">Programs & background ↗</Link></nav>
  </main>;
}