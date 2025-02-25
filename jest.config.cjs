module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^nanoid$": "<rootDir>/src/__mocks__/nanoidMock.js",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$)"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
