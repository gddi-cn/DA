import { useAtomValue } from 'jotai'
import { pageAtom, pageSizeAtom, deployListAtom, deployTotalAtom } from './store'

export const useDeployList = () => {
  const deployList = useAtomValue(deployListAtom)

  return {
    deployList,
  }
}
