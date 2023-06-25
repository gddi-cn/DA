declare namespace Template {
  namespace Create {
    type Form = {
      name: string
      description?: string
      cover?: import('antd').UploadFile[]
    }
  }
}
