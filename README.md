# angularjs-banking-app-qa
Project and tests developed during my time as an QA Trainee in the AngularJS Banking App at http://www.way2automation.com/angularjs-protractor/

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites
Librarys and modules used in this project.

1. NodeJS v14.x.x - https://nodejs.org/en/
2. npm v6.x.x  - Should come with NodeJS
3. Cypress v7.6.0 - See instalation guide bellow

### Installing
A step by step series of examples that tell you have to get a development env running.
1. Clone the project to your machine.
2. Download and install NodeJS indicated in the prerequisites.
3. Install Cpyress by running this commands:
    ```
    cd angularjs-banking-app-qa/
    npm install cypress@7.6.0
    ```

## Running the project and tests
After installing all modules required you can run the project and all tests via cypress.
1. To do that, first make sure to be in the projects main folder.
    ```
    cd angularjs-banking-app-qa/
    ```
2. Then, run the project with: 
    ```
    npm run cypress:open
    ```
    or with: 
    ```
    ./node_modules/.bin/cypress open
    ```
3. The project will open by default using Google Chrome.

The tests are located in the file: 
```
./integration/BankingApp/functional.spec.js 
```
Select the functional.spec.js file in the cypress application and the tests will start to run.

## Built With

* [Cypress](https://www.cypress.io/) - Testing and validating

## Authors

* **Matheus Zanon Nunes** - *Initial work* - [Zanon](https://github.com/zanon005)

