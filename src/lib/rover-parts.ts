const pointers = import.meta.glob<{ url: string; size: number; original_filename: string }>(
  "../assets/rover-stl/*.asset.json",
  { eager: true, import: "default" },
);

export type StlPart = { name: string; file: string; url: string; size: number; group: string };

const groupOf = (f: string) =>
  f.startsWith("Grip") ? "Gripper" : /^(Arm|Forearm|Central|Axle)/.test(f) ? "Arm" : "Base & drive";

const all: StlPart[] = Object.values(pointers).map((p) => ({
  file: p.original_filename,
  name: p.original_filename.replace(/\.stl$/i, "").replace(/_/g, " "),
  url: p.url,
  size: p.size,
  group: groupOf(p.original_filename),
}));

const combined = all.find((p) => p.file === "Rover_All_Parts.stl");
if (!combined) throw new Error("The combined rover STL asset is missing.");
export const combinedPart: StlPart = combined;
export const roverParts = all
  .filter((p) => p !== combinedPart)
  .sort((a, b) => a.group.localeCompare(b.group) || a.name.localeCompare(b.name));

export const formatSize = (b: number) =>
  b > 1e6 ? `${(b / 1e6).toFixed(1)} MB` : `${Math.round(b / 1e3)} KB`;
