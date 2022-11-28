import { ScoreClass } from '@src/shared/enum/dataset'

export const getScoreClass = (score: number): ScoreClass => {
  if (score >= 100) return ScoreClass.Excellent
  if (score >= 85) return ScoreClass.Great
  if (score >= 60) return ScoreClass.NotBad
  return ScoreClass.Bad
}

export const getColor = (scoreClass: ScoreClass): string => {
  switch (scoreClass) {
  case ScoreClass.Excellent:
    return '#19a051'
  case ScoreClass.Great:
    return '#19a051'
  case ScoreClass.NotBad:
    return '#48A2DF'
  case ScoreClass.Bad:
    return '#ff6177'
  default:
    return '#ff6177'
  }
}

export const getSubColor = (scoreClass: ScoreClass): string => {
  switch (scoreClass) {
  case ScoreClass.Excellent:
    return '#cbeadc'
  case ScoreClass.Great:
    return '#cbeadc'
  case ScoreClass.NotBad:
    return '#d5eaf9'
  case ScoreClass.Bad:
    return '#f9dde4'
  default:
    return '#f9dde4'
  }
}
