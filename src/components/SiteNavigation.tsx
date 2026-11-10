import { Link, useRouterState } from "@tanstack/react-router";

export function SiteNavigation() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="site-navigation">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="brand-link font-display text-lg font-bold" aria-label="Revant Ashokraj home">RA<span className="text-primary">.</span></Link>
        <nav aria-label="Main navigation" className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" hash="projects" aria-current={path === "/" ? "page" : undefined}>Projects</Link>
          <Link to="/about" aria-current={path === "/about" ? "page" : undefined}>About</Link>
        </nav>
      </div>
    </header>
  );
}