import * as ts from 'typescript'
import { TypeFile } from '../types'

function importModule(name: string, from: string) {
  return ts.createImportDeclaration(
    undefined,
    undefined,
    ts.createImportClause(
      undefined,
      ts.createNamespaceImport(ts.createIdentifier(name))
    ),
    ts.createStringLiteral(from)
  )
}

export default function(typeFiles: TypeFile[]) {
  return typeFiles.map(file =>
    importModule(file.moduleName, file.filePath.slice(0, -3))
  )
}
