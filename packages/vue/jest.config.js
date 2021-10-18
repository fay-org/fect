module.exports = {
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/lib/', '/es/'],
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx,vue}',
    '!components/utils/**',
    '!components/index.ts',
    '!components/**/type.ts',
    '!components/**/style.ts',
  ],
  collectCoverage: true,
  preset: '@fect-ui/cli/lib/config/@jest',
}