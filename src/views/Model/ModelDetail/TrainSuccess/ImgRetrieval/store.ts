import { ImageRetrievalFalseAnalysis } from "@src/shared/types/model";
import { atom } from "jotai";

export const falseAnalysisAtom = atom<ImageRetrievalFalseAnalysis | null>(null);

export const currentLabelAtom = atom<string | undefined>(undefined)

export const imageListAtom = atom<
  Array<{ label: string; count: number; urlList: Array<string> }>
>((get) => {
  const falseAnalysis = get(falseAnalysisAtom);
  if (!falseAnalysis) return [];

  const baseData = falseAnalysis.base_data_matrix;
  if (!baseData) return [];

  return Object.entries(baseData).map(([label, { cnt = 0, results = [] }]) => ({
    label,
    count: cnt,
    urlList: results,
  }));
});

