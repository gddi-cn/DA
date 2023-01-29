import { atom } from "jotai";

import { dataListAtom } from "../store";

export const currentIndexAtom = atom<number>(0);

export const pageSizeAtom = atom<number>(10);

export const currentPageAtom = atom<number>(1);

export const slickDataAtom = atom((get) => {
  const currentPage = get(currentPageAtom);
  const pageSize = get(pageSizeAtom);
  const allData = get(dataListAtom);

  return allData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
});

export const selectedItemAtom = atom<Painter.ImgMeta>((get) => {
  const slickData = get(slickDataAtom);
  const currentIndex = get(currentIndexAtom);

  // if ((slickData?.length || 0) < currentIndex) retur
  return slickData[currentIndex];
});
