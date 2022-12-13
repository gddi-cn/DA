import React from 'react'
import { Swiper as ISwiper } from 'swiper/types'
import { useAtom } from "jotai"

import { currentIndexAtom, currentPageAtom, pageSizeAtom, slickDataAtom } from '../store'
import { dataListAtom, previewNumAtom } from '@src/components/Album/store'

export const useContent = () => {
  const swiperRef = React.useRef<ISwiper | null>(null)

  const [currentPage] = useAtom(currentPageAtom)
  const [currentIndex, setCurrentIndex] = useAtom(currentIndexAtom)
  const [dataList] = useAtom(slickDataAtom)
  const [previewNum] = useAtom(previewNumAtom)


  const handleInit = (swiper: ISwiper) => {
    swiper.activeIndex = currentIndex
    swiperRef.current = swiper
  }

  const handleActiveChange = (swiper: ISwiper) => {
    if (currentIndex === swiper.activeIndex) return
    setCurrentIndex(swiper.activeIndex)
  }

  const showView = (idx: number) => Math.abs(idx - currentIndex) <= previewNum

  React.useEffect(
    () => {
      const $s = swiperRef.current
      if (!$s) return

      $s.slideTo(currentIndex)
    },
    [currentIndex]
  )

  return {
    imgList: dataList.map((d, idx) => ({ ...d, uid: `i_${currentPage}_${idx}`})),
    handleInit,
    handleActiveChange,
    showView,
  }
}

const usePosition = () => {
  const [currentIndex] = useAtom(currentIndexAtom)
  const [currentPage] = useAtom(currentPageAtom)
  const [dataList] = useAtom(slickDataAtom)
  const [totalDataList] = useAtom(dataListAtom)
  const [pageSize] = useAtom(pageSizeAtom)

  const isFirst = currentIndex === 0
  const isLast = currentIndex + 1 === dataList.length
  const isFirstPage = currentPage <= 1
  const isLastPage = currentPage * pageSize >= totalDataList.length

  return {
    isFirst,
    isLast,
    isFirstPage,
    isLastPage,
  }
}

export const useNext = () => {
  const [, setCurrentPage] = useAtom(currentPageAtom)
  const [, setCurrentIndex] = useAtom(currentIndexAtom)

  const { isLast, isLastPage } = usePosition()

  const handleNext = () => {
    if (isLast) return
    setCurrentIndex(i => i + 1)
  }

  const handleNextPage = () => {
    if (isLastPage) return
    setCurrentPage(p => p + 1)
    setCurrentIndex(0)
  }

  return {
    showPage: isLast,
    disabledNextPage: isLastPage,
    handleNext,
    handleNextPage,
  }
}


export const usePre = () => {
  const [pageSize] = useAtom(pageSizeAtom)
  const [, setCurrentPage] = useAtom(currentPageAtom)
  const [, setCurrentIndex] = useAtom(currentIndexAtom)

  const { isFirst, isFirstPage } = usePosition()

  const handlePre = () => {
    if (isFirst) return
    setCurrentIndex(i => i - 1)
  }

  const handlePrePage = () => {
    if (isFirstPage) return
    setCurrentPage(p => p - 1)
    setCurrentIndex(Math.max(pageSize - 1, 0))
  }

  return {
    showPage: isFirst,
    disabledPrePage: isFirstPage,
    handlePre,
    handlePrePage,
  }
}
