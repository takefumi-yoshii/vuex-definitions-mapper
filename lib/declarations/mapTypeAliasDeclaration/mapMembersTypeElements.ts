import * as ts from 'typescript'
import { TypeFile } from '../../types'

function getSignature(
  typeFile: TypeFile,
  typeKind: string,
  identifier: string
) {
  return ts.createPropertySignature(
    undefined,
    ts.createStringLiteral(`${typeFile.namespace}/${identifier}`),
    undefined,
    ts.createIndexedAccessTypeNode(
      ts.createTypeReferenceNode(
        ts.createQualifiedName(
          ts.createIdentifier(typeFile.moduleName),
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
  typeFile: TypeFile,
  typeKind: string
) {
  if (ts.isInterfaceDeclaration(node)) {
    return node.members.map(element => {
      if (!element.name) return element
      if (!ts.isIdentifier(element.name)) return element
      return getSignature(typeFile, typeKind, element.name.text)
    })
  }
  const typeElements: ts.TypeElement[] = []
  node.type.forEachChild(node => {
    if (!ts.isPropertySignature(node)) return node
    if (!ts.isIdentifier(node.name)) return node
    typeElements.push(getSignature(typeFile, typeKind, node.name.text))
  })
  return typeElements
}
