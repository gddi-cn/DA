import React from 'react'
import { useAtom } from 'jotai'
import _ from 'lodash'

import { brandAtom, brandListAtom, nameAtom } from '@views/Model/TrainConfig/store'
import chipAPI from '@src/apis/chip'
import { ApplicationScene } from '@src/shared/enum/application'
import { ChipBrand } from '@src/shared/enum/chip'

export const useBrandList = () => {
  const [brandList, setBrandList] = useAtom(brandListAtom)
  const [loading, setLoading] = React.useState<boolean>(false)

  React.useEffect(
    () => {
      if (loading) return
      setLoading(true)

      chipAPI.brandList(ApplicationScene.ALL)
        .then(({ success, data }) => {
          if (!success || !data) return setBrandList([])

          setBrandList(data)
        })
        .finally(() => {
          setLoading(false)
        })
    },
    []
  )

  return {
    brandList,
    loading,
  }
}

export const useBrandSelect = (brand: ChipBrand) => {
  const [currentBrand, setCurrentBrand] = useAtom(brandAtom)

  const selected = currentBrand === brand

  const handleClick = () => {
    if (selected) return setCurrentBrand(undefined)

    setCurrentBrand(brand)
  }

  return {
    selected,
    handleClick,
  }
}

export const useChipNameSearch = () => {
  const [, setName] = useAtom(nameAtom)
  const [localName, setLocalName] = React.useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalName(e.target.value)
  }

  const debouncedSetName = _.debounce(setName, 200)

  React.useEffect(
    () => {
      debouncedSetName(localName)
    },
    [localName]
  )

  return {
    name: localName,
    handleChange,
  }
}