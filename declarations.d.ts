/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

declare global {
  // We have to declare how files other than .ts(x) or .js(x) are handled by our codebase because
  // Typescript does not know we are handling these files with Webpack.
  declare module '*.json' {
    // eslint-disable-next-line
    const value: any
    export = value
  }
}
