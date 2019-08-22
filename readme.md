# Frontmen Open Source Contributions project

A project consisting of a web app and a GraphQL server to show and administrate the contributions of our employees to the Open Source community.

## Getting started

This repository uses Lerna and Yarn workspaces to manage multiple packages and their dependencies.

Prequisites:

- `yarn ^1.0.0`
- `node ^10.0.0`
- `npm ^6.0.0`

Running the project:

1. run `yarn` in the root of this project to install all dependencies of all packages.
2. check the `README.md` of each project for additional setup steps (for example setting up env. variables).
3. run `yarn dev` in the root of this project to run both WEB and API in parallel to start developing.

### Adding dependencies

To add a dependencies to a workspace/package use `yarn workspace <name-of-workspace> add <name-of-dependency>`. (Note that the name of the workspace is the name key in the `package.json` of the package, such as "web" or "api".)This properly installs the dependency using yarn workspaces. To learn more about yarn workspaces, please see: https://yarnpkg.com/lang/en/docs/workspaces/

To add a dependency to the root of the workspace use `yarn add -W <name-of-dependency>`.
