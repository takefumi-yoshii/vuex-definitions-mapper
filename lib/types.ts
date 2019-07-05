export type TypeFile = {
  fileName: string
  filePath: string
  namespace: string
  moduleName: string
}
export type FileTree = {
  fileName: string
  filePath: string
  namespace: string
  moduleName: string
  children?: FileTree[]
}
