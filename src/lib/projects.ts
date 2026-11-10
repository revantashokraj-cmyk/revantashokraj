import spider from "@/assets/spider-robot.jpg";
import rover from "@/assets/omni-rover.jpg";

export type Category = "Personal" | "Engineering Design Club" | "SCU YSP ENGR1" | "SCU YSP ENGR1-Lab";

export type Project = {
  title: string;
  category: Category;
  additionalCategories?: Category[];
  summary: string;
  details: string[];
  tags: string[];
  image?: string;
  badge?: string;
  href?: "/projects/omni-rover" | "/projects/spider-robot";
  cta?: string;
};

export const categories: Category[] = [
  "Personal",
  "Engineering Design Club",
  "SCU YSP ENGR1",
  "SCU YSP ENGR1-Lab",
];

export const projects: Project[] = [
  {
    title: "Quadruped Spider Robot",
    category: "Engineering Design Club",
    href: "/projects/spider-robot",
    cta: "Read the build →",
    summary:
      "A four-legged walking robot with 12 servo joints, a custom control PCB and 3D-printed parts, built from an open-source design.",
    details: [
      "4 legs × 3 servos = 12 SG90 joints",
      "Arduino Nano V3.0 on a custom control PCB",
      "3D-printed SLA resin body and leg parts",
      "Powered by 2× 18650 Li-ion cells",
    ],
    tags: ["Arduino", "3D printing", "Servos", "PCB", "Open source"],
    image: spider,
  },
  {
    title: "Omnidirectional Rover + 6-DOF Arm",
    category: "SCU YSP ENGR1",
    additionalCategories: ["SCU YSP ENGR1-Lab"],
    href: "/projects/omni-rover",
    cta: "Read the research →",
    summary:
      "A collision-avoiding rover that can drive in any direction, with a six-axis robotic arm mounted on top.",
    details: [
      "4 mecanum wheels + ultrasonic avoidance (25 cm)",
      "6-DOF arm: 3x MG995 + 3x MG90 servos",
      "80% maneuvering success, built on a $20 budget",
    ],
    tags: ["Arduino", "Robotics", "Sensors", "Research"],
    image: rover,
    badge: "Judges' Favorite",
  },
];

export const projectsInCategory = (category: Category | "All") =>
  category === "All" ? projects : projects.filter((p) => p.category === category || p.additionalCategories?.includes(category));
