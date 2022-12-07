import { useAtom } from 'jotai'
import {
  displayTypeAtom,
  falseTypeAtom,
  selectedItemAtom
} from '@views/Model/ModelDetail/TrainSuccess/ErrorAnalysis/store'

export const useHeader = () => {
  const [falseType] = useAtom(falseTypeAtom)
  const [selectedItem] = useAtom(selectedItemAtom)
  const [displayType, setDisplayType] = useAtom(displayTypeAtom)

  const handleClick = (type: 'grid' | 'slick') => {
    setDisplayType(type)
  }

  return {
    falseType,
    sceneTip: selectedItem?.sceneTip,
    labelTip: selectedItem?.labelTip,
    handleClick,
  }
}
