import React from 'react'
import styled from 'styled-components'

import { useGrid } from './hook'
import Scrollbar from '@src/components/Scrollbar'

import GridItem from './GridItem'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeGrid } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import { Spin } from 'antd'

const Container = styled.div`
  height: 100%;
`

const Loading = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const GridContainer = styled.div`
  display: grid;
  gap: 20px;
  padding: 0 16px 0 1px;
  @media only screen and (min-width: 1800px) {
    grid-template: auto/repeat(8, 1fr);
  }

  @media only screen and (min-width: 1700px) and (max-width: 1799px) {
    grid-template: auto/repeat(7, 1fr);
  }

  @media only screen and (min-width: 1536px) and (max-width: 1699px) {
    grid-template: auto/repeat(6, 1fr);
  }

  @media only screen and (min-width: 1440px) and (max-width: 1535px) {
    grid-template: auto/repeat(6, 1fr);
  }

  @media only screen and (min-width: 1200px) and (max-width: 1439px) {
    grid-template: auto/repeat(5, 1fr);
  }

  @media only screen and (min-width: 1000px) and (max-width: 1199px) {
    grid-template: auto/repeat(4, 1fr);
  }

  @media only screen and (min-width: 700px) and (max-width: 999px) {
    grid-template: auto/repeat(3, 1fr);
  }

  @media only screen and (min-width: 600px) and (max-width: 699px) {
    grid-template: auto/repeat(2, 1fr);
  }
`

const getColumnsNum = (width?: number) => {
  if (!width) return 2
  width -= 8
  if (width <= 600) return 2
  if (width <= 700) return 3
  if (width <= 1000) return 4
  if (width <= 1200) return 5
  if (width <= 1440) return 6
  if (width <= 1536) return 7
  if (width <= 1700 && width < 1800) return 8
  return 9
}

const Grid: React.FC = () => {
  const {
    key,
    data,
    isItemLoaded,
    loadMoreItems,
  } = useGrid()

  return (
    <Container>
      <AutoSizer>
        {
          ({ height, width }: { height: number, width: number }) => (
            <InfiniteLoader
              key={key}
              itemCount={data.length}
              isItemLoaded={isItemLoaded}
              loadMoreItems={loadMoreItems}
            >
              {
                ({ onItemsRendered, ref }) => {
                  const columnsNum = getColumnsNum(width)
                  const columnWidth = width ? Math.floor((width - 8) / columnsNum) : 0
                  const rowCount = Math.ceil(data.length / columnsNum)

                  return (
                    <FixedSizeGrid
                      height={height || 0}
                      width={width || 0}
                      columnCount={columnsNum}
                      columnWidth={columnWidth}
                      rowHeight={columnWidth}
                      rowCount={rowCount}
                      onItemsRendered={gridProps => {
                        onItemsRendered({
                          overscanStartIndex: gridProps.overscanRowStartIndex * columnsNum,
                          overscanStopIndex: gridProps.overscanRowStopIndex * columnsNum,
                          visibleStartIndex: gridProps.visibleRowStartIndex * columnsNum,
                          visibleStopIndex: gridProps.visibleRowStopIndex * columnsNum,
                        })
                      }}
                      ref={ref}
                    >
                      {
                        ({ rowIndex, columnIndex, style }) => {
                          const item: Painter.ImgMeta | null
                            = data[columnsNum * rowIndex + columnIndex]

                          return item ? (
                            <div style={style} >
                              <div style={{ padding: '12px' }}>
                                <GridItem
                                  {...item}
                                />
                              </div>
                            </div>
                          ) : null
                        }
                      }
                    </FixedSizeGrid>
                  )
                }
              }
            </InfiniteLoader>
          )

        }
      </AutoSizer>
    </Container>
  )
}

export default Grid
