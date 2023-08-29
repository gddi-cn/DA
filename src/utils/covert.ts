const getFilenameFromUrl = (url:string): string | undefined => {
  const urlSplit = url.split('/')
  return urlSplit.pop()
}

export const url2File = async (url?: string, filename?: string): Promise<File | null> => {
  if (!url) return null
  const res = await fetch(url)
  const blob = await res.blob()
  return new File([blob], filename ?? getFilenameFromUrl(url) ?? 'file')
}
