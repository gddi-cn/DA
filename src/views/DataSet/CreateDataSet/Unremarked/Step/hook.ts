import React from 'react'

const setActive = (ref: React.MutableRefObject<HTMLDivElement | null>) =>
  ref.current?.setAttribute('active', '')

const setInactive = (ref: React.MutableRefObject<HTMLDivElement | null>) => {
  ref.current?.removeAttribute('active')
}

export const useStep = (currentStep: Unremarked.Step) => {
  const baseRef = React.useRef<HTMLDivElement | null>(null)
  const firstArrow = React.useRef<HTMLDivElement | null>(null)
  const requirementRef = React.useRef<HTMLDivElement | null>(null)
  const secondArrow = React.useRef<HTMLDivElement | null>(null)
  const processRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(
    () => {
      switch (currentStep) {
        case "base":
          setActive(baseRef)
          setInactive(firstArrow)
          setInactive(requirementRef)
          setInactive(secondArrow)
          setInactive(processRef)
          break
        case "requirement":
          setActive(baseRef)
          setActive(firstArrow)
          setActive(requirementRef)
          setInactive(secondArrow)
          setInactive(processRef)
          break
        case "process":
          setActive(baseRef)
          setActive(firstArrow)
          setActive(requirementRef)
          setActive(secondArrow)
          setActive(processRef)
          break
        default:
          break
      }
    },
    [currentStep]
  )

  return {
    baseRef,
    requirementRef,
    processRef,
    firstArrow,
    secondArrow,
  }
}