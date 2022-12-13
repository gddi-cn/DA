import { useAtom } from 'jotai'
import { currentIndexAtom, currentPageAtom, pageSizeAtom, slickDataAtom } from '../store'
import React from 'react'
import { Swiper as ISwiper } from 'swiper/types'
import { dataListAtom } from '../../store'

export const useSlider = () => {
  const [totalDataList] = useAtom(dataListAtom)
  const [dataList] = useAtom(slickDataAtom)
  const [pageSize] = useAtom(pageSizeAtom)
  const [currentIndex, setCurrentIndex] = useAtom(currentIndexAtom)
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom)

  const isFirstPage = currentPage <= 1
  const isLastPage = currentPage * pageSize >= totalDataList.length

  const swiperRef = React.useRef<ISwiper | null>(null)

  const handleInit = (swiper: ISwiper) => {
    swiper.activeIndex = currentIndex

    swiperRef.current = swiper
  }


  const handlePrePage = () =>{
    if (isFirstPage) return
    setCurrentPage(p => p + 1)
    setCurrentIndex(Math.max(pageSize - 1, 0))
  }

  const handleNextPage = () => {
    if (isLastPage) return
    setCurrentPage(p => p + 1)
    setCurrentIndex(0)
  }

  React.useEffect(
    () => {
      const $s = swiperRef.current
      if (!$s) return
      if ($s.activeIndex === currentIndex) return
      $s?.slideTo(currentIndex)
    },
    [currentIndex]
  )

  React.useEffect(
    () => {
      setCurrentPage(1)
      setCurrentIndex(0)
    },
    [totalDataList]
  )

  return {
    imageList: dataList.map((d, idx) => ({ ...d, uid: `i_${currentPage}_${idx}`})),
    handleInit,
    handleNextPage,
    handlePrePage,
    disabledPre: isFirstPage,
    disabledNext: isLastPage,
  }
}

export const useSliderItem = (uid: string) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [currentIndex, setCurrentIndex] = useAtom(currentIndexAtom)
  const [currentPage] = useAtom(currentPageAtom)
  const [, page, idx] = uid.split('_')

  const selected = currentPage.toString() === page && currentIndex.toString() === idx

  const handleClick = () => {
    if (selected) return

    setCurrentIndex(Number(idx))
  }

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

  return {
    containerRef,
    handleClick,
  }
}
