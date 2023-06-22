module.exports = {
  preset: 'jest-preset-angular',
  globalSetup: 'jest-preset-angular/global-setup',
  coverageReporters: ['clover', 'json', 'lcov', ['text', {skipFull: true}]],
};
