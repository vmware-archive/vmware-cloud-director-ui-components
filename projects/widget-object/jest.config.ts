/* eslint-disable */
export default {
    displayName: 'widget-object',
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    globalSetup: 'jest-preset-angular/global-setup',
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
        },
    },
    transform: {
        '^.+\\.(ts|js|html)$': 'jest-preset-angular',
    },
    restoreMocks: true,
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory: '../../coverage/projects/widget-object',
};
