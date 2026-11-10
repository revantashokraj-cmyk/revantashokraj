import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type ViewerActions = { reset: () => void; zoom: (factor: number) => void; spin: (value: boolean) => void };

export function StlViewer({ url, name = "STL model" }: { url: string; name?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const actions = useRef<ViewerActions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [rotating, setRotating] = useState(true);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let disposed = false;
    let cleanup = () => {};
    const abort = new AbortController();
    setLoading(true); setError(false);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setRotating(!reduced);

    (async () => {
      const THREE = await import("three");
      const { STLLoader } = await import("three/examples/jsm/loaders/STLLoader.js");
      const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");
      const response = await fetch(url, { signal: abort.signal });
      if (!response.ok) throw new Error("Unable to load STL");
      const data = await response.arrayBuffer();
      if (disposed) return;
      const geo = new STLLoader().parse(data);
      geo.computeVertexNormals(); geo.center(); geo.computeBoundingSphere();
      const radius = Math.max(geo.boundingSphere?.radius ?? 50, 1);
      // Canvas resolves semantic OKLCH tokens to sRGB; Three.js doesn't parse OKLCH.
      const colorFromToken = (token: string) => {
        const canvas = document.createElement("canvas"); canvas.width = 1; canvas.height = 1;
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Color conversion unavailable");
        context.fillStyle = getComputedStyle(el).getPropertyValue(token).trim();
        context.fillRect(0, 0, 1, 1);
        const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
        if (r === undefined || g === undefined || b === undefined) throw new Error("Color conversion failed");
        return new THREE.Color().setRGB(r / 255, g / 255, b / 255, THREE.SRGBColorSpace);
      };
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      const material = new THREE.MeshStandardMaterial({
        color: colorFromToken("--viewer-model"),
        metalness: 0.16, roughness: 0.52,
      });
      const width = Math.max(el.clientWidth, 1), height = Math.max(el.clientHeight, 1);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); renderer.setSize(width, height);
      renderer.domElement.setAttribute("aria-label", `Interactive 3D view of ${name}`);
      renderer.domElement.setAttribute("role", "img");
      el.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, width / height, radius / 100, radius * 100);
      scene.add(new THREE.AmbientLight(colorFromToken("--viewer-light"), 1.8));
      const light = new THREE.DirectionalLight(colorFromToken("--viewer-light"), 3);
      light.position.set(1, 2, 3); scene.add(light);
      const mesh = new THREE.Mesh(geo, material); mesh.rotation.x = -Math.PI / 2; scene.add(mesh);
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true; controls.autoRotate = !reduced; controls.autoRotateSpeed = 1;
      controls.minDistance = radius * 1.1; controls.maxDistance = radius * 10;
      const reset = () => {
        const aspectScale = Math.max(1, 1 / camera.aspect);
        camera.position.set(radius * 1.8 * aspectScale, radius * 1.5 * aspectScale, radius * 2.1 * aspectScale);
        controls.target.set(0, 0, 0); controls.update();
      };
      reset();
      actions.current = {
        reset,
        zoom: (factor) => { camera.position.sub(controls.target).multiplyScalar(factor).add(controls.target); controls.update(); },
        spin: (value) => { controls.autoRotate = value; },
      };
      let raf = 0;
      const tick = () => { controls.update(); renderer.render(scene, camera); raf = requestAnimationFrame(tick); };
      const resize = new ResizeObserver(() => {
        const w = Math.max(el.clientWidth, 1), h = Math.max(el.clientHeight, 1);
        renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix();
      });
      resize.observe(el);
      cleanup = () => { cancelAnimationFrame(raf); resize.disconnect(); controls.dispose(); geo.dispose(); material.dispose(); renderer.dispose(); renderer.domElement.remove(); actions.current = null; };
      setLoading(false); tick();
    })().catch(() => { if (!disposed) { cleanup(); setLoading(false); setError(true); } });
    return () => { disposed = true; abort.abort(); cleanup(); };
  }, [url, retry, name]);

  const tools = [
    { label: rotating ? "Pause rotation" : "Resume rotation", icon: rotating ? Pause : Play, action: () => { actions.current?.spin(!rotating); setRotating(!rotating); } },
    { label: "Zoom in", icon: ZoomIn, action: () => actions.current?.zoom(0.8) },
    { label: "Zoom out", icon: ZoomOut, action: () => actions.current?.zoom(1.25) },
    { label: "Reset view", icon: RotateCcw, action: () => actions.current?.reset() },
  ];
  return <div className="viewer-frame relative h-full w-full overflow-hidden border border-border bg-background">
    <div ref={ref} className="blueprint absolute inset-0" />
    {loading && <div role="status" className="absolute inset-0 grid place-content-center gap-3 text-center text-sm text-muted-foreground"><span className="model-loader mx-auto h-6 w-6 border-2 border-border border-t-primary" />Loading 3D model…</div>}
    {error && <div role="alert" className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background text-sm text-muted-foreground"><p>The 3D preview couldn’t load.</p><Button variant="outline" onClick={() => setRetry(v => v + 1)}>Try again</Button></div>}
    {!loading && !error && <TooltipProvider delayDuration={150}><div className="absolute bottom-4 right-4 flex gap-1 border border-border bg-background p-1" aria-label="3D view controls">
      {tools.map(({ label, icon: Icon, action }) => <Tooltip key={label}><TooltipTrigger asChild><Button variant="ghost" size="icon" aria-label={label} onClick={action}><Icon /></Button></TooltipTrigger><TooltipContent>{label}</TooltipContent></Tooltip>)}
    </div></TooltipProvider>}
  </div>;
}
