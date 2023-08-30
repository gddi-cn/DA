import React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

export interface ScrollFetcherProps {
  hasMore: boolean
  fetchMore: () => Promise<void>
}


const useObserverFetcher = (fetchMore: () => Promise<void>) => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const observerTarget = React.useRef<HTMLDivElement>(null)

  React.useEffect(
    () => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !loading) {
            setLoading(true)
            fetchMore().then(() => setLoading(false))
          }
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.1,
        }
      )

      if (observerTarget.current) {
        observer.observe(observerTarget.current)
      }

      return () => {
        if (observerTarget.current) {
          observer.unobserve(observerTarget.current)
        }
      }
    },
    [loading]
  )

  return {
    observerTarget,
  }
}

const ObserverFetcher: React.FC<Pick<ScrollFetcherProps, 'fetchMore'>> = (
  {
    fetchMore,
  }
) => {
  const {
    observerTarget,
  } = useObserverFetcher(fetchMore)

  return (
    <div ref={observerTarget}>
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
        <CircularProgress />
      </Box>
    </div>
  )
}


const ScrollFetcher: React.FC<ScrollFetcherProps> = (
  {
    hasMore,
    ...rest
  }
) => {
  if (!hasMore) return null

  return (
    <ObserverFetcher {...rest} />
  )
}

export default ScrollFetcher
