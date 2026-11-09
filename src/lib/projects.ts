import spider from "@/assets/spider-robot.jpg";
import rover from "@/assets/omni-rover.jpg";

export type Category = "Personal" | "Engineering Design Club" | "SCU YSP ENGR1" | "SCU YSP ENGR1-Lab";

export type Project = {
  title: string;
  category: Category;
  summary: string;
  details: string[];
  tags: string[];
  image?: string;
  badge?: string;
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
    category: "Personal",
    summary:
      "A four-legged walking robot driven by an Arduino and a custom PCB, built from an open-source design on PCBWay.",
    details: [
      "4 legs, 3 MG90S servos per leg (12 total)",
      "Custom PCB for power and servo control",
      "Coordinated gait programming on Arduino",
    ],
    tags: ["Arduino", "PCB", "Servos", "Open source"],
    image: spider,
  },
  {
    title: "Omnidirectional Rover + 6-DOF Arm",
    category: "SCU YSP ENGR1",
    summary:
      "A collision-avoiding rover that can drive in any direction, with a six-axis robotic arm mounted on top.",
    details: [
      "Omnidirectional drive with obstacle avoidance",
      "6-degree-of-freedom robotic arm",
      "Research paper pending clearance from SCU",
    ],
    tags: ["Arduino", "Robotics", "Sensors", "Research"],
    image: rover,
    badge: "Judges' Favorite",
  },
];
