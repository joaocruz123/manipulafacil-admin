# Benessere Client Portal

Project for login

## Getting Started

Checkout the project and install dependencies:

```bash
git clone git@ssh.dev.azure.com:v3/IterativeProjetos/Benessere/manipulafacil-portal-admin
cd manipulafacil-portal-admin
yarn install
yarn dev
```

Open [http://localhost:6420/admin/autenticacao/login](http://localhost:6420/admin/autenticacao/login) with your browser to see the result.

## Development

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started) - Redux logic
- [Formik](https://formik.org/) - create forms
- [MUI](https://mui.com/) - Design System


## Deploying / Publishing

#### Pipeline

- [AzureDevOps](https://dev.azure.com/IterativeProjetos/Benessere/_build)

##### Install dependencies

```shell
yarn install
```

##### Build application
```shell
yarn build
```

##### Run application
```shell
yarn dev
```

## All commands

Start local server http://localhost:6420/admin/autenticacao/login

```shell
yarn dev
```

Version change to project

```shell
yarn version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease [--preid=<prerelease-id>] | from-git]
```

Build application

```shell
yarn build
```

Execute lint project

```shell
yarn lint
```