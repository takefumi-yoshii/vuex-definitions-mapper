import * as ts from 'typescript'
import { FileTree } from '../../types'

function getSignature(
  fileTree: FileTree,
  typeKind: string,
  identifier: string
) {
  return ts.createPropertySignature(
    undefined,
    identifier,
    undefined,
    ts.createIndexedAccessTypeNode(
      ts.createTypeReferenceNode(
        ts.createQualifiedName(
          ts.createIdentifier(fileTree.moduleName),
          ts.createIdentifier(typeKind)
        ),
        undefined
      ),
      ts.createLiteralTypeNode(ts.createStringLiteral(identifier))
    ),
    undefined
  )
}

export function mapMembersTypeElements(
  node: ts.InterfaceDeclaration | ts.TypeAliasDeclaration,
  fileTree: FileTree,
  typeKind: string
) {
  if (ts.isInterfaceDeclaration(node)) {
    return node.members.map(element => {
      if (!element.name) return element
      if (!ts.isIdentifier(element.name)) return element
      return getSignature(fileTree, typeKind, element.name.text)
    })
  }
  const typeElements: ts.TypeElement[] = []
  node.type.forEachChild(node => {
    if (!ts.isPropertySignature(node)) return node
    if (!ts.isIdentifier(node.name)) return node
    typeElements.push(getSignature(fileTree, typeKind, node.name.text))
  })
  return typeElements
}
