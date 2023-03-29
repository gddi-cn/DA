import { atom } from "jotai";

export const displayTypeAtom = atom<Album.Props["type"]>("grid");

export const dataListAtom = atom<Array<Painter.ImgMeta>>([]);

export const previewNumAtom = atom<number>(6);

