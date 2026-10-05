import type { Entry, Scene } from '../engine/scene';
import { ACT } from './cues';
import Fragments from '../scenes/fragments';
import System from '../scenes/system';
import Question from '../scenes/question';
import Retrieval from '../scenes/retrieval';
import Review from '../scenes/review';
import Scale from '../scenes/scale';
import Resolve from '../scenes/resolve';

type Ctor = new () => Scene;

const PLAN: [string, readonly [number, number], Ctor][] = [
  ['fragments', ACT.fragments, Fragments],
  ['system', ACT.system, System],
  ['question', ACT.question, Question],
  ['retrieval', ACT.retrieval, Retrieval],
  ['review', ACT.review, Review],
  ['scale', ACT.scale, Scale],
  ['resolve', ACT.resolve, Resolve],
];

export async function buildTimeline(only?: string[]): Promise<Entry[]> {
  const out: Entry[] = [];
  for (const [id, [start, end], C] of PLAN) {
    if (only && !only.includes(id)) continue;
    const scene = new C();
    scene.start = start;
    scene.end = end;
    await scene.init();
    out.push({ id, start, end, scene });
  }
  return out;
}

export const SCENE_IDS = PLAN.map((p) => p[0]);
