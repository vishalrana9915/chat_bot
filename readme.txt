# Initials to run the project

Node must be install on your system.
Npm install  to load all the dependencies.
All dependencies are required to run the code.

For testing we are using mocha

#We are using Chai as a assertion library.we can also use node default assertion library by simply importing.
var assert = require('assert');

For now we are using Chai.

For code coverage we are using intanbul.There are plenty of code coverage tools out there for now lets work with intanbul.

#For running a test case the project must have a test folder.Because everytime you run a mocha command it will look for a folder test.

Let create a test.js inside a test folder.

#Run npm run test for testing the code.

#Run npm run coverage for generating a coverage report.

The command will generate a coverage folder in the root directory.

To view the coverage report simply run the command:
Npm run coverageReport.







# two types of dependecies:

Dev depen: the dependecies that we use to work with our application comes under this.

Depend: The dependencies which are required to run the application comes in this.