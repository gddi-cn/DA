import React from 'react'

export type LazyProps = {
  component: React.LazyExoticComponent<() => JSX.Element>;
  initialFallback?: JSX.Element;
}

const Lazy: React.FC<LazyProps> = (
  {
    component,
    initialFallback,
  }
) => {
  const fallback = React.useRef(() => initialFallback || <></>)
  const Component = component

  const updateFallback = async (): Promise<void> => {
    const result = await component?._result;
    fallback.current = typeof result === 'function' ? result : (result as any).default
  }

  React.useEffect(
    () => {
      updateFallback()
    },
    [component]
  )

  return (
    <React.Suspense fallback={<fallback.current />}>
      <Component />
    </React.Suspense>
  )
}

export default Lazy

