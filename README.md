# ArboFrontAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Mantendo organização do código

1 - Ajuste o VSCode para organizar o código e os imports ao salvar

```json
"editor.formatOnSave": true,
"[typescript]": {
    "editor.codeActionsOnSave": {
        "source.organizeImports": true
    }
}
```

## Buildando a aplicação com Docker

Se necessário publicar, ajuste a versão no arquivo package.json antes de executar os comandos a seguir.

Para buildar a aplicação com docker, primeiro gere o build da aplicação com o comando:

```
# IMPORTANTE: precisa ser produção para que o service worker funcione, caso contrário, o service worker não será registrado
npm run build-prod
# para resolver funcionamento offline ao efetuar o refresh da página https://github.com/angular/angular/issues/21636#issuecomment-366205459
npm run fix-sw
```

Em seguida execute o seguinte comando (veja a última versão publicada antes de atualizar):

```
docker build -t sisvetor/sv-app:0.9.36 .
docker push sisvetor/sv-app:0.9.36
```


# Sentry

 Test and validate your setup locally with the following Steps:

   1. Build your application in production mode.
      → For example, run npm run build.
      → You should see source map upload logs in your console.
   2. Run your application and throw a test error.
      → The error should appear in Sentry:
      → https://maolabs.sentry.io/issues/?project=4508004897128448
   3. Open the error in Sentry and verify that it's source-mapped.
      → The stack trace should show your original source code.

   If you encounter any issues, please refer to the Troubleshooting Guide:
   https://docs.sentry.io/platforms/javascript/sourcemaps/troubleshooting_js

   If the guide doesn't help or you encounter a bug, please let us know:
   https://github.com/getsentry/sentry-javascript/issues#   s i s v e t o r - e a d  
 