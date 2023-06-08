import React from "react"
jj

export const useRating = (onRating?: (value: number) => void) => {
  const [value, setValue] = React.useState<number | null>(null)
  const [rated, setRated] = React.useState(false)
  const [tipList, setTipList] = React.useState<string[]>([])

  const handleChange = (newValue: number | null) => {
    if (newValue === null) return

    setValue(newValue)
    setRated(true)
    setTipList(
      newValue <= 1
        ? [
          '非常抱歉给您带来不好的体验，如需人工帮助，请联系我们的业务代表',
          '欢迎随时向我们提出建议，您的每一个建议对我们都很宝贵'
        ]
        : [
          '非常感谢您的评价，我们会继续努力，为您提供更好的服务'
        ]
    )
    setTimeout(() => {
      onRating && onRating(newValue)
    })
  }

  return {
    rated,
    value,
    handleChange,
    tipList,
  }
}
