declare namespace Painter {
  type Color = [number, number, number];

  type Point = {
    x: number;
    y: number;
    visible?: boolean;
  };

  interface Line {
    start: Point;
    end: Point;
    color: Color;
    show: boolean;

    width?: number;
  }

  interface Circle {
    centre: Point
    radius: number
    color: Color
  }

  interface Box {
    leftTop: Point;
    rightBottom: Point;
    prob: number;
    fill?: boolean;
  }

  interface BBox extends Box {
    label: string;
  }

  interface ClassLabel {
    label: string;
    prob: number;
  }

  interface ImgMeta {
    src: string;
    rawSrc?: string;
    bBoxes?: Array<BBox>;
    classLabel?: ClassLabel;
    boxes?: Array<Box>;
    lines?: Array<Line>;
    circles?: Array<Circle>
  }
}
