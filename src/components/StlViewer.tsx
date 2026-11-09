import { useEffect, useRef, useState } from "react";

/** Interactive 3D preview of an STL file. three.js is loaded only in the browser. */
export function StlViewer({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let disposed = false;
    let cleanup = () => {};
    setLoading(true);

    (async () => {
      const THREE = await import("three");
      const { STLLoader } = await import("three/examples/jsm/loaders/STLLoader.js");
      const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");
      if (disposed) return;

      const css = getComputedStyle(el);
      const line = new THREE.Color(css.getPropertyValue("--viewer-model").trim() || "#f97316");
      const w = el.clientWidth, h = el.clientHeight;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 10000);
      scene.add(new THREE.AmbientLight(0xffffff, 0.6));
      const dir = new THREE.DirectionalLight(0xffffff, 1.2);
      dir.position.set(1, 2, 3);
      scene.add(dir);

      const geo = await new STLLoader().loadAsync(url);
      if (disposed) { renderer.dispose(); renderer.domElement.remove(); return; }
      geo.computeVertexNormals();
      geo.center();
      geo.computeBoundingSphere();
      const r = geo.boundingSphere?.radius ?? 50;
      const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: line, metalness: 0.1, roughness: 0.6 }));
      mesh.rotation.x = -Math.PI / 2;
      scene.add(mesh);
      camera.position.set(r * 1.6, r * 1.3, r * 1.8);
      camera.lookAt(0, 0, 0);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1.5;
      setLoading(false);

      let raf = 0;
      const tick = () => { controls.update(); renderer.render(scene, camera); raf = requestAnimationFrame(tick); };
      tick();
      const ro = new ResizeObserver(() => {
        const W = el.clientWidth, H = el.clientHeight;
        renderer.setSize(W, H); camera.aspect = W / H; camera.updateProjectionMatrix();
      });
      ro.observe(el);
      cleanup = () => {
        cancelAnimationFrame(raf); ro.disconnect(); controls.dispose();
        geo.dispose(); renderer.dispose(); renderer.domElement.remove();
      };
    })();

    return () => { disposed = true; cleanup(); };
  }, [url]);

  return (
    <div ref={ref} className="blueprint relative h-full w-full overflow-hidden rounded-xl bg-secondary/40">
      {loading && (
        <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">Loading 3D model…</div>
      )}
    </div>
  );
}
