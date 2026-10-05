export const BPM = 120;
export const BEAT = 60 / BPM;
export const BAR = BEAT * 4;
export const beat = (n: number) => n * BEAT;

export const DURATION = 45;

export const ACT = {
  fragments: [0, 8],
  system: [8, 18],
  question: [18, 21],
  retrieval: [21, 26.72],
  review: [26.3, 30],
  scale: [30, 36],
  resolve: [36, 45],
} as const;

export const FRAG = {
  marks: 0.25,
  nodes: [0.5, 0.875, 1.1875, 1.5625, 1.9375, 2.3125, 2.625],
  wires: 2.8,
  notes: [3.25, 3.75, 4.25, 4.75],
  dense: 4.9,
  signalIn: 6.25,
  signalStop: 7.25,
  freeze: 7.5,
  cut: 8,
};
