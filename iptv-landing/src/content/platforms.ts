import { Apple, Monitor, Smartphone, Tv } from "lucide-react";
import type { Platform } from "@/types/content";

export const platforms: readonly Platform[] = [
  { name: "Apple TV & iOS", detail: "Native tvOS App", icon: Apple },
  { name: "Amazon FireTV", detail: "FireStick 4K / Cube", icon: Tv },
  { name: "Android TV & Mobile", detail: "Direct APK / TiviMate", icon: Smartphone },
  { name: "Samsung Tizen", detail: "Smart Hub & Smarters", icon: Monitor },
  { name: "LG webOS", detail: "LG Content Store", icon: Tv },
];
