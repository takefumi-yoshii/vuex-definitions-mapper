import * as fs from 'fs'
import * as path from 'path'
import { TypeFile, FileTree } from '../types'

function getFileInfo(filePath: string, storeDir: string) {
  const fileName = path.basename(filePath)
  const namespace = filePath
    .replace(storeDir, '')
    .replace(fileName, '')
    .slice(1, -1)
  const moduleName =
    namespace === '' ? 'ROOT' : namespace.toUpperCase().replace(/\//g, '_')
  return { fileName, namespace, moduleName }
}

export async function getTypeDefinitions(
  storeDir: string,
  definitionFileName: string
): Promise<[TypeFile[], FileTree[]]> {
  const typeFiles: TypeFile[] = []
  const recurse = (node: string, callback: Function) => {
    const fileTree: FileTree[] = []
    fs.readdir(node, (err, files) => {
      if (err) throw err
      let queue = files.length
      if (!queue) return callback(null, fileTree)
      files
        .map(file => path.join(node, file))
        .filter(filePath => {
          if (fs.statSync(filePath).isDirectory())
            recurse(filePath, (err: Error, children: FileTree[]) => {
              const { fileName, namespace, moduleName } = getFileInfo(
                filePath,
                storeDir
              )
              fileTree.push({
                fileName,
                filePath,
                namespace,
                moduleName,
                children
              })
              if (!--queue) callback(null, fileTree)
            })
          return fs.statSync(filePath).isFile()
        })
        .forEach(filePath => {
          const { fileName, namespace, moduleName } = getFileInfo(
            filePath,
            storeDir
          )
          if (fileName === definitionFileName) {
            typeFiles.push({ fileName, filePath, namespace, moduleName })
            fileTree.push({ fileName, filePath, namespace, moduleName })
          }
          if (!--queue) callback(null, fileTree)
        })
    })
  }
  return new Promise((resolve, reject) => {
    recurse(storeDir, (err: Error, fileTree: FileTree[]) => {
      if (err) reject(err)
      resolve([typeFiles, fileTree])
    })
  })
}
