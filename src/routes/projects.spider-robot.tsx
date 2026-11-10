import { createFileRoute, Link } from "@tanstack/react-router";
import spider from "@/assets/spider-robot.jpg";
import { BlueprintPreview } from "@/components/BlueprintPreview";
import { Button } from "@/components/ui/button";
import { SpiderSourceDownloads } from "@/components/SpiderSourceDownloads";

export const Route = createFileRoute("/projects/spider-robot")({
  head: () => ({
    meta: [
      { title: "Quadruped Spider Robot — Revant Ashokraj" },
      {
        name: "description",
        content:
          "A four-legged walking robot with 12 SG90 servo joints, an Arduino Nano on a custom control PCB and 3D-printed SLA parts.",
      },
      { property: "og:title", content: "Quadruped Spider Robot" },
      {
        property: "og:description",
        content: "12 servo joints, 4 legs, an Arduino Nano and a custom control PCB.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Spider,
});

const specs = [
  ["Controller", "Arduino Nano V3.0 (ATMEGA328P)"],
  ["Servos", "12× SG90 — 3 per leg"],
  ["Legs", "4 legs × 3 joints (coxa, femur, tibia)"],
  ["Motion", "Pre-programmed gait sequences, servo angles calculated"],
  ["Structure", "3D-printed parts, SLA resin for fit and finish"],
  ["Power", "2× 18650 Li-ion in a 2-slot case"],
  ["Board", "Custom through-hole PCB for power + servo lines"],
  ["Firmware", "Arduino sketches using the FlexiTimer2 library"],
];

const joints = [
  ["Coxa", "Swings the whole leg in and out", "1 per leg · 4 total"],
  ["Femur", "Lifts the leg up and down", "1 per leg · 4 total"],
  ["Tibia", "Bends the lower leg for the step", "1 per leg · 4 total"],
];

const bom = [
  ["SG90 servo motor", "12"],
  ["Arduino Nano V3.0 ATMEGA328P", "1"],
  ["18650 Li-ion battery", "2"],
  ["18650 battery case, 2 slots", "1"],
  ["Latching DPDT push switch", "1"],
  ["5 mm 2-pin screw terminal", "1"],
  ["100 µF 16 V electrolytic capacitor", "1"],
  ["470 µF 10 V electrolytic capacitor", "2"],
  ["Red 3 mm LED", "1"],
  ["330 Ω resistor", "1"],
  ["2.54 mm 1×3P male pin header", "12"],
  ["2.54 mm 1×15P female header", "2"],
];

const printed = [
  ["body_d / body_u", "Lower and upper body shells"],
  ["coxa_l / coxa_r", "Left and right hip joints"],
  ["femur_1", "Upper leg link"],
  ["tibia_l / tibia_r", "Lower leg, left and right"],
  ["s_hold", "Servo mount"],
];

const steps = [
  ["Print the parts", "SLA resin printing was chosen for dimensional accuracy and smooth surfaces, so the moving joints fit without sanding."],
  ["Zero the servos", "Upload the legs-correction sketch so every servo sits at 90° before anything is bolted together."],
  ["Attach the arms", "Snap the servo rocker arms on at that 90° position, so the printed legs start level."],
  ["Assemble the legs", "Fit coxa, femur and tibia links onto their servos and mount them to the body shells."],
  ["Upload the gait code", "Install FlexiTimer2, then upload the main sketch with the Nano off the board."],
  ["Check the wiring", "Confirm each servo pin on the board matches the foot it is supposed to drive."],
];

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="detail-section">
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      <div className="mt-4 text-muted-foreground">{children}</div>
    </section>
  );
}

function Spider() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main id="main-content" className="detail-page mx-auto max-w-5xl space-y-8 px-6 pb-24 pt-6">
        <Link to="/" hash="projects" className="text-sm text-muted-foreground">← All projects</Link>
        <div className="blueprint py-8">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
              Engineering Design Club
            </span>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
              12 servo joints
            </span>
            <span className="rounded-full bg-leaf px-3 py-1 text-xs font-semibold text-leaf-foreground">
              Open-source design
            </span>
          </div>
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight md:text-6xl">
            Quadruped Spider Robot
          </h1>
          <p className="mt-4 text-muted-foreground">
            Four legs, twelve SG90 servos, an Arduino Nano and a custom control PCB — with every
            body and leg part 3D printed.
          </p>
        </div>

        <nav aria-label="Spider robot sections" className="section-navigation flex flex-wrap gap-5 border-y border-border py-4 text-sm"><a href="#overview">Overview</a><a href="#build">Build</a><a href="#downloads">Parts & downloads</a><a href="#source">Source & credit</a></nav>
        <BlueprintPreview src={spider} title="Quadruped Spider Robot" />
        <p className="text-xs text-muted-foreground">Illustrative drawing · source design by Mert Kilic · not a dimensioned fabrication plan.</p>

        <div id="overview"><Card title="What it is">
          <p>
            A four-legged walking robot — a quadruped — that moves by positioning its servos through
            calculation rather than sensors. Each leg has three joints, so twelve servos in total,
            and walking comes from pre-programmed sequences that fire those joints in the right
            order. The mechanical parts are 3D printed, and everything is wired to a custom PCB that
            carries power and the servo control lines back to an Arduino Nano.
          </p>
        </Card></div>
        <section className="detail-section">
          <h2 className="font-display text-2xl font-bold">Club funding</h2>
          <p className="mt-4 text-muted-foreground">I secured a <strong className="text-foreground">$300 grant</strong> from our school's club grant committee to support this Engineering Design Club build.</p>
        </section>

        <div className="grid gap-8 md:grid-cols-2">
          <Card title="Technical specs">
            <dl className="divide-y divide-border">
              {specs.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-2 text-sm">
                  <dt className="font-medium text-foreground">{k}</dt>
                  <dd className="text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>
          <Card title="One leg, three joints">
            <ul className="space-y-4">
              {joints.map(([name, what, count]) => (
                <li key={name} className="rounded-xl border-2 border-border p-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-display font-bold text-foreground">{name}</span>
                    <span className="text-xs text-muted-foreground">{count}</span>
                  </div>
                  <p className="mt-1 text-sm">{what}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm">
              Three joints per leg, across four legs, give the robot twelve independently controlled servo joints.
            </p>
          </Card>
        </div>

        <Card title="Bill of materials">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-foreground">
                  <th className="border-b-2 border-foreground py-2 pr-4">Part</th>
                  <th className="border-b-2 border-foreground py-2 pr-4 text-right">Qty</th>
                </tr>
              </thead>
              <tbody>
                {bom.map(([part, qty]) => (
                  <tr key={part} className="border-b border-border">
                    <td className="py-2 pr-4">{part}</td>
                    <td className="py-2 pr-4 text-right font-display font-bold text-foreground">{qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm">
            The electrolytic capacitors sit across the supply to absorb the current spikes when
            all twelve servos move at once; the DPDT latching switch is the main power cut, and the
            LED behind a 330 Ω resistor shows when the board is live.
          </p>
        </Card>

        <div className="grid gap-8 md:grid-cols-2">
          <Card title="Printed parts">
            <ul className="space-y-3">
              {printed.map(([file, what]) => (
                <li key={file} className="text-sm">
                  <span className="font-medium text-foreground">{file}</span>
                  <span className="block text-muted-foreground">{what}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card title="Firmware">
            <p className="text-sm">
              Two sketches run the build. The first, the legs correction, rotates every servo to 90°
              so the printed arms can be assembled in the right neutral position. The second is the
              main walking program, which needs the{" "}
              <a
                href="https://github.com/wimleers/flexitimer2"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-primary underline underline-offset-2"
              >
                FlexiTimer2
              </a>{" "}
              library to time the gait steps.
            </p>
            <p className="mt-4 text-sm">
              The Nano comes off the board while uploading, and after flashing the servo-to-pin
              mapping is checked against the feet before the robot is set down to walk.
            </p>
          </Card>
        </div>

        <div id="build"><Card title="Build order">
          <ol className="space-y-4">
            {steps.map(([title, body], i) => (
              <li key={title} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary font-display text-sm font-bold text-secondary-foreground">
                  {i + 1}
                </span>
                <div>
                  <div className="font-medium text-foreground">{title}</div>
                  <div className="text-sm">{body}</div>
                </div>
              </li>
            ))}
          </ol>
        </Card></div>

        <div id="source"><Card title="Source and credit">
          <p className="text-sm">
            This build follows the open-source quadruped spider robot design shared on PCBWay by
            Mert Kilic, published under a Creative Commons Attribution-ShareAlike licence. The
            schematic, board files, printed part STLs and both sketches are on the original project
            page.
          </p>
          <Button asChild variant="secondary" className="mt-4 h-auto whitespace-normal"><a
            href="https://www.pcbway.com/project/shareproject/Quadruped_Spider_Robot_3D_Printed_Parts_SG90_Servo_Motor_Arduino_Nano_10107fe3.html"
            target="_blank"
            rel="noreferrer"
          >
            Open the original project →
          </a></Button>
        </Card></div>
        <SpiderSourceDownloads />
        <nav aria-label="More from the portfolio" className="flex flex-wrap justify-between gap-4 border-t border-border pt-6 text-sm">
          <Link to="/" hash="projects" className="text-accent">← All projects</Link>
          <Link to="/projects/omni-rover" className="text-accent">Next project · Omnidirectional rover ↗</Link>
        </nav>
      </main>
    </div>
  );
}
