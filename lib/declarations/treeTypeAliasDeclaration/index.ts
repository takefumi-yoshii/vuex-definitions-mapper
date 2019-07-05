import * as ts from 'typescript'
import flatten from 'lodash.flatten'
import { FileTree } from '../../types'
import { mapMembersTypeElements } from './mapMembersTypeElements'

function typedefs(program: ts.Program, fileTree: FileTree, typeKind: string) {
  const sourceFile = program.getSourceFile(fileTree.filePath)
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
      .map(node => mapMembersTypeElements(node, fileTree, typeKind))
  )
}

export default function(
  program: ts.Program,
  fileTree: FileTree[],
  identifier: string,
  typeKind: string
) {
  const recurse = (tree: FileTree[]) => {
    return tree
      .map(definition => {
        let node: ts.TypeElement[] = []
        if (definition.children) {
          node.push(
            ts.createPropertySignature(
              undefined,
              ts.createIdentifier(definition.fileName),
              undefined,
              ts.createTypeLiteralNode(flatten(recurse(definition.children))),
              undefined
            )
          )
        }
        const defs = typedefs(program, definition, typeKind)
        if (!defs) return [...node]
        return [...defs, ...node]
      })
      .filter((element): element is ts.TypeElement[] => element !== undefined)
  }
  const typeElements = flatten(recurse(fileTree))
  return ts.createTypeAliasDeclaration(
    undefined,
    undefined,
    ts.createIdentifier(identifier),
    undefined,
    ts.createTypeLiteralNode(typeElements)
  )
}
