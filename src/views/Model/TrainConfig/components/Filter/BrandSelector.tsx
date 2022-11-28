import React from 'react'
import styled from 'styled-components'

import { useBrandList, useBrandSelect } from './hook'
import { ChipBrand } from '@src/shared/enum/chip'
import { chipBrandLogoMapping, chipBrandNameMapping } from '@src/shared/mapping/chip'
import { Skeleton } from 'antd'

const Title = styled.p`
  font-weight: 400;
  font-size: 16px;
  color: #061926;
  margin: 15px 0 10px;
`

const BrandList = styled.div`
  display: grid;
  grid-template: auto / repeat(3, 1fr);
  grid-column-gap: 8px;
  grid-row-gap: 13px;
`

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 58px;
  cursor: pointer;
`

const Logo = styled.img`
  height: 40px;
  object-fit: contain;
  display: block;
  width: 100%;
  &.selected {
    border: 1px solid #48a2df;
  }
`

const BrandName = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #2582c1;
  margin-top: 7px;
  margin-bottom: 0;
`

const LoadingChipBrandItem: React.FC = () => {
  return (
    <ItemContainer>
      <Skeleton.Input active style={{ width: 58, height: 40, minWidth: 0 }} />
      <Skeleton.Input active style={{ width: 58, height: 20, minWidth: 0, marginTop: 7 }} />
    </ItemContainer>
  )
}

const ChipBrandItem: React.FC<{ brand: ChipBrand }> = (
  {
    brand,
  }
) => {
  const { selected, handleClick } = useBrandSelect(brand)

  return (
    <ItemContainer onClick={handleClick}>
      <Logo src={chipBrandLogoMapping.get(brand)} alt={'logo'} className={selected ? 'selected' : ''} />
      <BrandName>{chipBrandNameMapping.get(brand) || '-'}</BrandName>
    </ItemContainer>
  )
}

const BrandSelector: React.FC = () => {
  const { brandList, loading } = useBrandList()

  return (
    <>
      <Title>品牌</Title>
      <BrandList>
        {
          loading
            ? Array<number>(12).fill(0).map((_, idx) => (
              <LoadingChipBrandItem key={idx} />
            ))
            : brandList.map((brand) => (
              <ChipBrandItem key={brand} brand={brand} />
            ))
        }
      </BrandList>
    </>
  )
}

export default BrandSelector
