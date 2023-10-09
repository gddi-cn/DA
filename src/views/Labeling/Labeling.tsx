import React from 'react'
import http from "@src/utils/http";
import {Box, CircularProgress, Typography} from "@mui/material";
import userAPI from "@src/apis/user";
import {useCreateAndCheckoutTask} from "@src/hooks/task";

const getUrl = async () => {
  try {
    const { data }: { data: string | undefined } = await http.get('/v3/autolabel/addr')
    return {
      success: true,
      data,
    }
  } catch (e) {
    console.error(e)
    return {
      success: false,
    }
  }
}

const Labeling: React.FC = () => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null)
  const [loading, setLoading] = React.useState(true)
  const [url, setUrl] = React.useState<string | null>('')
  const createAndCheckoutTask = useCreateAndCheckoutTask()

  const handleTrain = async (datasetId: string) => {
    await createAndCheckoutTask(datasetId)
  }

  const handleRefreshToke = async () => {
    await userAPI.info()
    // const { token } = data
    // localStorage.setItem('token', token)
    const $f = iframeRef.current
    if (!$f?.contentWindow) return
    $f.contentWindow.postMessage({
      type: 'token',
      payload: window.localStorage.getItem('token'),
    }, '*')
  }

  React.useEffect(
    () => {
      setLoading(true)
      iframeRef.current?.addEventListener('open', () => {
        console.log('load')
      })
      getUrl()
        .then(({ success, data }) => {
          if (!success || !data) {
            setUrl(null)
            return
          }
          setUrl(data)
        })
        .finally(() => {
          setLoading(false)
        })
    },
    []
  )

  // event binding
  React.useEffect(
    () => {
      const handleMessage = (e: MessageEvent) => {
        const { type, payload }: { type: string, payload: unknown } = e.data

        switch (type) {
          case 'train':
            handleTrain((payload as { datasetId: string }).datasetId).catch(console.error)
            break
          case 'network':
            if ((payload as { code: number }).code === 401) {
              handleRefreshToke().catch(console.error)
            }
            break
          default:
            break
        }
      }

      window.addEventListener('message', handleMessage)

      return () => {
        window.removeEventListener('message', handleMessage)
      }
    },
    []
  )

  return (
    <div
      style={{
        height: 'calc(100vh - 50px)',
        lineHeight: 1,
        fontSize: 0,
        margin: '0 auto',
      }}
    >
      {
        loading ? (
          <Box sx={{ height: '100%', display: 'grid', placeItems: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          url === null ? (
            <Box sx={{ height: '100%', display: 'grid', placeItems: 'center' }}>
              <Typography color={'text.secondary'}>系统繁忙，请稍后再试</Typography>
            </Box>
          ) : (
            <iframe
              ref={iframeRef}
              onLoad={(e) => {
                (e.target as HTMLIFrameElement).contentWindow?.postMessage({
                  type: 'initToken',
                  payload: window.localStorage.getItem('token'),
                }, '*')
              }}
              autoFocus
               // src={ 'http://localhost:8080/'}
              src={url}
              style={{
                width: '1px',
                minWidth: '100%',
                height: '100%',
                border: 'none'
              }}
              allowFullScreen
            />
          )
        )
      }
    </div>
  )
}

export default Labeling
