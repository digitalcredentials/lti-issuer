# ALTI Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.5.1] - 2019-06-26
### Changed
- Rewrite some tests to use Cypress.
- Update gitignore to exclude cypress.env.json.

## [0.5.0] - 2019-06-24
### Changed
- Update configurations: buildspec, Dockerfile.
- Upgrade dependencies.

### Added
- Add Cypress for end-to-end testing.
- Add CACCL Canvas API library.

### Removed
- Makefile removed.
- Dependency on momentjs removed.

## [0.4.0] - 2019-06-24
### Added
- Change UI to display app version.
- Add Google Analytics helper.

### Changed
- Update configurations: buildspec, Dockerfile, readme.
- Various build config tweaks to figure out how CI/CD works.
- Edit and upgrade dependencies.

### Removed
- Remove unused HTML templating.

## [0.3.0] - 2019-02-19
### Added
- Included layout/frame/wrapper common component.

### Changed
- Upgraded all dependencies to latest versions.
- Specify files for test coverage collection, so that coverage statistics better reflect reality.
- Add tests around API endpoints.
- Refactor API endpoint handlers.
- Refactor the config.
- Indicate required variables for Canvas in the example env file.
- Refactor server-related files into a 'server' folder.
- Run precommit hook tasks via `npm-run-all`.

## [0.2.0] - 2019-02-07
### Added
- Add rule to eslint config so that unused variables are highlighted.
- Create this changelog.

### Changed
- Client HTTP agent handles getting the JWT to use in its requests.
- Update readme to reflect CHANGELOG and README files that need replacing.
- Update readme numbering scheme.
- All-caps the readme file name.
- Use 'alti' instead of generic project name when logging.

### Removed
- Removed dependency on Mobx since it is not needed for most LTI projects.

## 0.1.0 - 2019-02-02
### Added
- Initialize versioning.

[Unreleased]: https://github.gatech.edu/c21u/alti/compare/v0.5.1...test
[0.5.1]: https://github.gatech.edu/c21u/alti/compare/v0.5.0...v0.5.1
[0.5.0]: https://github.gatech.edu/c21u/alti/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.gatech.edu/c21u/alti/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.gatech.edu/c21u/alti/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.gatech.edu/c21u/alti/compare/v0.1.0...v0.2.0