# Ksubaka Exercise
> React app to search movies, display movies lists and individual movie.

----------
## Getting started

### Node version
The project is meant to be run on `Nodejs 8`.

Use NVM to install and manage multiple versions of nodeJS.

**If NVM is running on your machine please skip the next step**.

1. install nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

Or

wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

Then

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

------------
2.

* `nvm list` - List your installed versions
* `nvm install 8` - Install (And use) a version
* `nvm use` - Use the version specified in the project `.nvmrc` file

### Build and run the app

npm run start

###`the app is running on port 3000` localhost:3000


Or


### Dependencies

Install the npm dependencies as follow

```

npm install

```

### Npm Scripts

During the normal development

##### Local execution
* `npm run start-dev` Build the front end and rebuild on every change
* `npm run build` Build the front end and start node server at localhost:3000
* `npm run start-server` Start node server at localhost:3000
* `npm run start` installs dependencies, runs test, build the app, start the server and start chrome browser

##### Testing
* `npm run test` Run the front end tests

> To run the test with watch mode run `npm run test -- --watch`
