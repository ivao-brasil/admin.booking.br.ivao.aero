export type ScenarySimulators = "fs9" | "fsx" | "p3d" | "xp11" | "msfs";
export type ScenaryLicences = "freeware" | "payware";

export interface Scenery {
  id: number;
  title: string;
  license: string;
  link: string;
  simulator: string;
  created_at: string;
  updated_at: string;
  icao: string;
}
