export const networks = [
  "beIN SPORTS",
  "NETFLIX",
  "SKY SPORTS",
  "CNN",
  "BBC",
  "CANAL+",
  "ESPN",
  "HBO MAX",
  "DAZN",
  "EUROSPORT",
  "FOX SPORTS",
] as const;

export type NetworkName = (typeof networks)[number];
