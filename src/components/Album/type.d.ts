declare namespace Album {

  interface ImgMeta {
    rawSrc?: string
    src: string
  }
  interface Props {
    type: 'grid' | 'slick'
    imgList: Array<ImgMeta>
  }
}
