import * as ts from 'typescript'

export default (moduleName: string, statements: (ts.Statement)[]) => {
  return ts.createModuleDeclaration(
    undefined,
    [ts.createModifier(ts.SyntaxKind.DeclareKeyword)],
    ts.createStringLiteral(moduleName),
    ts.createModuleBlock(statements),
    ts.NodeFlags.None
  )
}
