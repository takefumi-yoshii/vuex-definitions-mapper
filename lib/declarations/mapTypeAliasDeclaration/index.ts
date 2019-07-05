import * as ts from 'typescript'
import flatten from 'lodash.flatten'
import { TypeFile } from '../../types'
import { mapMembersTypeElements } from './mapMembersTypeElements'

function typedefs(program: ts.Program, typeFile: TypeFile, typeKind: string) {
  const sourceFile = program.getSourceFile(typeFile.filePath)
  if (!sourceFile) return
  const typeDefinitions = sourceFile.getChildAt(0)
  return flatten(
    typeDefinitions
      .getChildren()
      .filter(
        (node): node is ts.TypeAliasDeclaration | ts.InterfaceDeclaration =>
          ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)
      )
      .filter(node => node.name.text === typeKind)
      .map(node => mapMembersTypeElements(node, typeFile, typeKind))
  )
}

export default function(
  program: ts.Program,
  typeFiles: TypeFile[],
  identifier: string,
  typeKind: string
) {
  const typeElements = flatten(
    typeFiles
      .map(definition => typedefs(program, definition, typeKind))
      .filter((element): element is ts.TypeElement[] => element !== undefined)
  )
  return ts.createTypeAliasDeclaration(
    undefined,
    undefined,
    ts.createIdentifier(identifier),
    undefined,
    ts.createTypeLiteralNode(typeElements)
  )
}
