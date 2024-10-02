/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest", // Använd ts-jest som förinställning för TypeScript
  testEnvironment: "node", // Använd Node.js som testmiljö (bra för backend-tester)
  testMatch: ["**/__tests__/**/*.test.ts"],
  // Matcha testfiler i __tests__-mappen som slutar med .test.ts
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transpilerar TypeScript med ts-jest
  },
  collectCoverage: true, // Samla in kodtäckningsdata
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"], // Inkludera alla .ts-filer utom typdefinitioner
  coverageDirectory: "coverage", // Sparar kodtäckningsrapport i en coverage-mapp
  coverageReporters: ["json", "lcov", "text", "clover"], // Formaterar kodtäckningsrapporter
  moduleFileExtensions: ["ts", "tsx", "js", "json", "node"], // Tillåtna filändelser
};
