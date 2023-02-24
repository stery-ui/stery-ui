import { defineConfig } from 'tsup'
import tsconfig from './tsconfig.json'
import pkg from './package.json'

export default defineConfig({
  name: pkg.name,
  entry: ['src/index.tsx'],
  format: 'cjs,esm',
  dts: true,
  target: tsconfig.compilerOptions.target
})
