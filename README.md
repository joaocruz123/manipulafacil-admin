# Benessere Client Portal

Project for login

## Getting Started

Checkout the project and install dependencies:

```bash
git clone https://IterativeProjetos@dev.azure.com/IterativeProjetos/Benessere/_git/PortalWebApp
cd benessere.cli.portal
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Formik](https://formik.org/) - create forms
- [MUI](https://mui.com/) - styles components


## Deploying / Publishing

#### Pipeline

- [AzureDevOps](https://dev.azure.com/IterativeProjetos/Benessere/_build)

##### Install dependencies

```shell
npm install
```

##### Build application
```shell
npm run build
```

##### Run application
```shell
npm run start
```

## All commands

Start local server http://localhost:3000

```shell
yarn dev
```

Version change to project

```shell
yarn version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease [--preid=<prerelease-id>] | from-git]
```

Build application

```shell
npm run build
```

Execute lint project

```shell
yarn run lint
```