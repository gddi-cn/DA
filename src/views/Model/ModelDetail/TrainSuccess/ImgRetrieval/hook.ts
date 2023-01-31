import { useSelector } from "react-redux";
import React from "react";
import { useAtom } from "jotai";
import { RootState } from "@src/controller/reducer";
import { DatasetScene } from "@src/shared/enum/dataset";
import modelAPI from "@src/apis/model";
import { currentLabelAtom, falseAnalysisAtom, imageListAtom } from "./store";
import { ImageRetrievalFalseAnalysis } from "@src/shared/types/model";

export const useImgRetrieval = () => {
  const [, setFalseAnalysis] = useAtom(falseAnalysisAtom);
  const [imgList] = useAtom(imageListAtom)
  const [currentLabel, setCurrentLabel] = useAtom(currentLabelAtom)

  const empty = !imgList.length

  const { id, iter, model_type } = useSelector(
    (state: RootState) => state.modelDetailSlice?.versionInfo || {}
  );

  React.useEffect(
    () => {
      if (model_type !== DatasetScene.ImageRetrieval) return;
      if (!id || !iter?.id) return;

      modelAPI.errorAnalysis(id, iter.id)
        .then(({ success, data }) => {
          if (!success || !data) return setFalseAnalysis(null);

          setFalseAnalysis(data as ImageRetrievalFalseAnalysis);
        });
    },
    [id, iter, model_type]
  );

  React.useEffect(
    () => {
      if (empty) return setCurrentLabel(undefined)

      if (currentLabel === undefined) return setCurrentLabel(imgList[0]?.label)

      if (imgList.some(x => x.label === currentLabel)) return

      setCurrentLabel(imgList[0]?.label)
    },
    [imgList]
  )

  React.useEffect(
    () => {
      return () => {
        setCurrentLabel(undefined)
        setFalseAnalysis(null)
      }
    },
    []
  )

  return {
    empty,
  }
};

export const useLeft = () => {
  const [imgList] = useAtom(imageListAtom)

  const labelList = imgList.map(img => img.label)

  return {
    labelList,
  }
}

export const useLabelItem = (label: string) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [currentLabel, setCurrentLabel] = useAtom(currentLabelAtom)

  const selected = label === currentLabel

  React.useEffect(
    () => {
      const $c = containerRef.current
      if (!$c) return

      if (selected) {
        $c.setAttribute('selected', '')
      } else {
        $c.removeAttribute('selected')
      }
    },
    [selected]
  )

  const handleClick = () => {
    if (selected) return

    setCurrentLabel(label)
  }

  return {
    containerRef,
    handleClick,
  }
}

export const useRight = () => {
  const [currentLabel] = useAtom(currentLabelAtom)
  const [itemList] = useAtom(imageListAtom)
  const [target] = itemList.filter(x => x.label === currentLabel)
  const [type, setType] = React.useState<Album.Props['type']>('grid')
  const imgList = target?.urlList ? target.urlList.map(src => ({ src })) : []

  const gridRef = React.useRef<HTMLDivElement | null>(null)
  const slickRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(
    () => {
      if (type === 'grid') {
        gridRef.current?.setAttribute('selected', '')
        slickRef.current?.removeAttribute('selected')
      } else {
        gridRef.current?.removeAttribute('selected')
        slickRef.current?.setAttribute('selected', '')
      }
    },
    [type]
  )

  const handleGrid = () => {
    setType('grid')
  }

  const handleSlick = () => {
    setType('slick')
  }

  return {
    type,
    imgList,
    handleGrid,
    handleSlick,
    gridRef,
    slickRef,
  }
}
