declare namespace Album {
  interface Props {
    type: "grid" | "slick";
    imgList: Array<Painter.ImgMeta>;
    previewNum?: number;
  }
}
