import { defaults } from 'jest-config';

export default {
  preset: 'ts-jest/presets/default-esm', // Use ts-jest preset for TypeScript with ESM
  testEnvironment: 'node', // Run tests in Node.js environment
  extensionsToTreatAsEsm: ['.ts'], // Treat .ts files as ESM
  transform: {
    '^.+\\.ts$': 'ts-jest', // Use ts-jest for transforming TypeScript files
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Handle ES Modules import syntax
  },
  globals: {
    'ts-jest': {
      useESM: true, // Enable ESM support for TypeScript
    },
  },
};
