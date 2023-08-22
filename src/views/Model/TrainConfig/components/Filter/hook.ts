import React from 'react'
import { useAtom } from 'jotai'
import _ from 'lodash'

import { brandAtom, brandListAtom, nameAtom } from '@views/Model/TrainConfig/store'
import chipAPI from '@src/apis/chip'
import { ApplicationScene } from '@src/shared/enum/application'

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
          console.log({ data })

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

export const useBrandSelect = (brand: Chip.Brand) => {
  const { logo, alias: name } = brand
  const [currentBrand, setCurrentBrand] = useAtom(brandAtom)

  const selected = currentBrand?.name && (currentBrand.name === brand.name)

  const handleClick = () => {
    if (selected) return setCurrentBrand(undefined)

    setCurrentBrand(brand)
  }

  return {
    selected,
    handleClick,
    name,
    logo,
  }
}

export const useChipNameSearch = () => {
  const [, setName] = useAtom(nameAtom)
  const [localName, setLocalName] = React.useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalName(e.target.value)
  }

  const debouncedSetName = React.useMemo(() => _.debounce(setName, 200), [])

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
