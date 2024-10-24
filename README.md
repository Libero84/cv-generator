doc# CvGeneratorFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

---

## How to run?

Clone repository
from https://gitlab.polcode.com/pwasilonek/cv_generator_frontend/-/tree/master

Working on develop branch

run npm install

## Run following commands:

"docker-compose -f docker-compose.yml -f docker-compose-dev.yml up -d" - starts project http://localhost with live reload (ng serve)

"docker-compose -f docker-compose.yml -f docker-compose-dev.yml up" - run only with logs

"docker-compose down" - switch off project (stop containers)

"docker-compose -f docker-compose.yml up -d" - starts project without live reload

"docker logs -f cv_generator_frontend_app_1" - starts logs of containers

## For guarded API calls you can use provided users:

Ordinary user:
login: kasia
password: malina123\*

Admin user:
login: admin
password: root123\*
Admin's panel is available under localhost:8088/admin URL

## Libraries

Angular Material,
Lodash,
EsLint,
Prettier,
