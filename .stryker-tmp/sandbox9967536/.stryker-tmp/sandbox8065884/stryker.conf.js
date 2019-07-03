module.exports = function(config) {
  config.set({
    testRunner: 'mocha',
    mutator: 'typescript',
    transpilers: [],
    reporters: ['html', 'progress', 'dashboard'],
    packageManager: 'npm',
    testFramework: 'mocha',
    coverageAnalysis: 'off',
    tsconfigFile: 'tsconfig.json',
    mutate: ['src/**/*.ts'],
  })
}
