import {DatasetScene} from "@src/shared/enum/dataset";
import {useShowCowFace} from "@src/hooks/user";

export const useAllDatasetScene = () => {
  const showCowFace = useShowCowFace();
  return Object.values(DatasetScene)
    .filter((x): x is DatasetScene => (showCowFace || x !== DatasetScene.CowFaceRecognition)
      && x !== DatasetScene.Unknown
    )
}

export const useCanCreateDatasetScene = () => {
  const list = useAllDatasetScene();
  return list.filter((x) => x !== DatasetScene.FaceRecognition);
}
