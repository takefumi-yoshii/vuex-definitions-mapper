import * as ts from 'typescript'

export default (literal: string) => {
  return ts.createImportDeclaration(
    undefined,
    undefined,
    undefined,
    ts.createStringLiteral(literal)
  )
}
