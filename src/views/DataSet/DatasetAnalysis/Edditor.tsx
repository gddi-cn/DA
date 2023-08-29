import React from 'react'
import {
  Button,
  CircularProgress,
  Dialog, DialogActions,
  DialogContent,
  DialogTitle,
  FormControl, FormHelperText,
  FormLabel,
  TextField
} from "@mui/material";
import {useAtom} from "jotai";
import {datasetDetailAtom} from "@views/DataSet/DatasetAnalysis/store";
import DialogTransition from "@src/components/DialogTransition";
import {useFormik} from "formik";
import * as Yup from 'yup'
import {url2File} from "@src/utils/covert";
import Box from "@mui/material/Box";
import ImgPreview from "@src/components/ImgPreview";
import DropUpload from "@src/components/DropUpload";
import {LoadingButton} from "@mui/lab";
import s3API from "@src/apis/s3New";
import {message} from "antd";
import datasetAPI from "@src/apis/dataset";

type EditForm = {
  name: string
  summary?: string
  cover: File | null
}

const FORM_ID = 'dataset-editor-form'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('请输入数据集名称'),
  cover: Yup.mixed()
    .test('fileSize', '文件大小不能超过2M', (value) => {
      if (!value) return true
      return (value as File).size <= 2 * 1024 * 1024
    })
    .test('fileType', '文件格式不正确', (value) => {
      if (!value) return true
      const extension = (value as File).name.split('.').pop()
      return ['jpg', 'jpeg', 'png'].includes(extension?.toLowerCase() || '')
    })
})

const useEditor = () => {
  const [dataset, refresh] = useAtom(datasetDetailAtom)
  const nameInputRef = React.useRef<HTMLInputElement>(null)
  const [init, setInit] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [validateOnChange, setValidateOnChange] = React.useState(false)
  const [coverChanged, setCoverChanged] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const formik = useFormik<EditForm>({
    initialValues: {
      name: '',
      summary: '',
      cover: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { id, cover: oldCover } = dataset || {}
        if (!id) return
        const { name, summary, cover: coverFile } = values
        let cover = undefined

        setLoading(true)

        if (coverChanged && coverFile) {
          const { success, data } = await s3API.uploadFile(coverFile)
          if (!success || !data) {
            message.warning('上传封面失败')
            return
          }
          cover = data
        } else {
          cover = oldCover
        }
        const { success } = await datasetAPI.update(id, { name, summary, cover })

        refresh()

        if (!success) {
          message.warning('更新失败')
          return
        }

        setOpen(false)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    },
    validateOnChange,
  })

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCoverChange = (cover: File | null) => {
    formik.setFieldValue('cover', cover)
    setCoverChanged(true)
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    setValidateOnChange(true)
    formik.handleSubmit(e)
  }

  const handleInit = async () => {
    if (!dataset || init) return

    const { name, summary, cover: _cover } = dataset
    const cover = await url2File(_cover)
    await formik.setValues({
      name: name ?? '',
      summary: summary ?? '',
      cover,
    })
    setInit(true)
  }

  React.useEffect(
    () => {
      if (open) {
        handleInit()
          .then(() => {
            setTimeout(() => nameInputRef.current?.focus())
          })
          .catch(console.error)
      } else {
        setTimeout(
          () => {
            formik.resetForm()
            setInit(false)
            setValidateOnChange(false)
            setCoverChanged(false)
          },
          300
        )
      }
    },
    [open]
  )

  return {
    open,
    init,
    loading,
    formik,
    nameInputRef,
    handleOpen,
    handleClose,
    handleSubmit,
    handleCoverChange,
  }
}

const Fallback: React.FC = () => {
  return (
    <Box sx={{ minHeight: 300, display: 'grid', placeItems: 'center' }}>
      <CircularProgress />
    </Box>
  )
}

const Editor: React.FC = () => {
  const {
    open,
    init,
    loading,
    formik,
    nameInputRef,
    handleOpen,
    handleClose,
    handleSubmit,
    handleCoverChange,
  } = useEditor()

  return (
    <>
      <Dialog
        open={open}
        fullWidth
        maxWidth={'xs'}
        onClose={handleClose}
        TransitionComponent={DialogTransition}
      >
        <DialogTitle>编辑数据集信息</DialogTitle>
        <DialogContent>
          {
            init ? (
              <Box id={FORM_ID} component={'form'} noValidate onSubmit={handleSubmit}>
                <TextField
                  inputRef={nameInputRef}
                  fullWidth
                  margin='normal'
                  name='name'
                  label='名称'
                  value={formik.values.name}
                  onChange={e => {
                    formik.setFieldValue('name', e.target.value.trim())
                  }}
                  error={!!formik.errors.name}
                  helperText={formik.errors.name || ' '}
                  required
                  variant='standard'
                  autoComplete={'dataset name'}
                />
                <TextField
                  multiline
                  fullWidth
                  margin='normal'
                  name='summary'
                  label='描述'
                  value={formik.values.summary}
                  onChange={e => {
                    formik.setFieldValue('summary', e.target.value.trim())
                  }}
                  error={!!formik.errors.summary}
                  helperText={formik.errors.summary || ' '}
                  variant='filled'
                  rows={4}
                  autoComplete={'off'}
                />
                <FormControl fullWidth margin='dense'>
                  <FormLabel>封面</FormLabel>
                  <Box sx={{ aspectRatio: '16/9' }}>
                    {
                      formik.values.cover ? (
                        <ImgPreview img={formik.values.cover} aspectRatio={16/9} />
                      ) : (
                        <DropUpload
                          accept='.jpg,.jpeg,.png'
                          placeholder='点击或拖拽图片到此处上传封面'
                          tip='支持 .jpg .jpeg .png 格式的图片, 且大小不超过 2MB'
                          onChange={(fileList) => handleCoverChange(fileList[0] ?? null)}
                        />
                      )
                    }
                    {
                      formik.values.cover ? (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <Button
                            onClick={() => handleCoverChange(null)}
                            color={'warning'}
                            sx={{
                              minHeight: 'unset',
                              padding: 0,
                              minWidth: 'unset',
                            }}
                          >
                            移除
                          </Button>
                        </Box>
                      ) : null
                    }
                  </Box>
                </FormControl>
                <FormHelperText error={!!formik.errors.cover}>
                  {formik.errors.cover || ' '}
                </FormHelperText>
              </Box>
            ) : <Fallback />
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='inherit'>取消</Button>
          <LoadingButton type='submit' form={FORM_ID} loading={loading} disabled={!init}>
            保存
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Button variant={'outlined'} fullWidth sx={{ mt: 1.5 }} size={'small'} onClick={handleOpen}>
        编辑
      </Button>
    </>
  )
}

export default Editor
