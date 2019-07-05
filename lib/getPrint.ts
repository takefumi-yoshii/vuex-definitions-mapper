import * as ts from 'typescript'
import { TypeFile, FileTree } from './types'
import importByLiteral from './declarations/importByLiteral'
import importModules from './declarations/importModules'
import declareModule from './declarations/declareModule'
import treeTypeAliasDeclaration from './declarations/treeTypeAliasDeclaration'
import mapTypeAliasDeclaration from './declarations/mapTypeAliasDeclaration'
//___________________________________________________________________

const printer = ts.createPrinter()
const emptyFile = ts.createSourceFile('', '', ts.ScriptTarget.ES2015)

export default function(
  program: ts.Program,
  typeFiles: TypeFile[],
  fileTree: FileTree[]
) {
  return printer.printList(
    ts.ListFormat.MultiLine,
    ts.createNodeArray([
      ...importModules(typeFiles),
      importByLiteral('vuex'),
      declareModule('vuex', [
        treeTypeAliasDeclaration(program, fileTree, 'RootState', 'S'),
        mapTypeAliasDeclaration(program, typeFiles, 'RootGetters', 'G'),
        mapTypeAliasDeclaration(program, typeFiles, 'RootMutations', 'M'),
        mapTypeAliasDeclaration(program, typeFiles, 'RootActions', 'A')
      ])
    ]),
    emptyFile
  )
}
