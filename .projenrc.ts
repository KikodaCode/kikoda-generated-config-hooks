import { KikodaOpenSourceProject } from '@kikoda/projen-templates';
import { YamlFile } from 'projen';
import { GithubCredentials } from 'projen/lib/github';
import { ArrowParens, EndOfLine, TrailingComma, TypeScriptJsxMode } from 'projen/lib/javascript';
import { TypeScriptProject } from 'projen/lib/typescript';

const project = new TypeScriptProject({
  name: 'kikoda-generated-config-hooks',
  description: 'React hooks companion library for @kikoda/generated-config.',
  authorName: 'Kikoda, LLC',
  authorEmail: 'platform@kikoda.com',
  repository: 'https://github.com/KikodaCode/kikoda-generated-config-hooks.git',
  defaultReleaseBranch: 'main',
  keywords: ['configuration', 'websites', 'cicd', 'webpack', 'react'],
  stability: 'experimental',
  license: 'Apache-2.0',
  projenrcTs: true,
  devContainer: true,
  vscode: true,
  prettier: true,
  releaseToNpm: true,
  prettierOptions: {
    settings: {
      printWidth: 100,
      tabWidth: 2,
      useTabs: false,
      semi: true,
      singleQuote: true,
      trailingComma: TrailingComma.ALL,
      arrowParens: ArrowParens.AVOID,
      endOfLine: EndOfLine.LF,
    },
  },
  bundledDeps: [],
  tsconfig: {
    compilerOptions: { esModuleInterop: true, lib: ['dom'], jsx: TypeScriptJsxMode.REACT },
  },
  devDeps: ['@kikoda/projen-templates', 'react', '@types/react'],
  peerDeps: ['webpack', 'react'],
  packageName: '@kikoda/generated-config-hooks',
  gitignore: [],
  githubOptions: {
    projenCredentials: GithubCredentials.fromApp(),
  },
  pullRequestTemplate: false,
  codeCov: true,
  autoApproveUpgrades: true,
  autoApproveOptions: {
    allowedUsernames: ['projen-workflows[bot]'],
  },
  jestOptions: {
    jestConfig: {
      coveragePathIgnorePatterns: ['/node_modules/', 'test/config'],
    },
  },
});

// Run Build workflow on push to main to update base code coverage
const buildWorkflow = project.github?.tryFindWorkflow('build');
buildWorkflow?.on({
  push: { branches: ['main'] },
});

new YamlFile(project, 'codecov.yml', {
  obj: {
    coverage: {
      status: {
        patch: true,
      },
    },
  },
});

new KikodaOpenSourceProject(project, {
  title: 'React hooks for @kikoda/generated-config',
});

project.synth();
