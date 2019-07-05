# vuex-definitions-mapper
Auto TypeScript type definitions mapper for Vuex.
This codegenerator suit for Vuex inference, and `TypeScript Compiler API` practice example.

### Usage

```
$ yarn install
$ yarn dev 
```

Then start watch `store` directory.
This process will teach directory info to `ts.createProgram`.
The `ts.Program` parse TypeScript AST, and create meta type definitions by Node.js.

### What will happen

Try to change `type.ts` files definitions in `store`.
`S, G, M, A` Type decrarations will be procced and emit optimal type mapping to `types/vuex/impl.ts`.

There will be shown perfectory type inference in Module definitions.

CAUTION!: This example is prototyping.
