# AskNature README

## The Stack

## Documentation Principles and Procedures

### JS

### API

### CSS

## Continuous Deployment Workflow

## Initial Installation Procedure

### Locally

#### Yeogurt

There are a number of options out there for getting a local [Yeogurt](https://github.com/larsonjj/generator-yeogurt) framework up and running. Here's what's worked best so far for Mac OS 10.10.1:

1. [Install NVM](https://github.com/creationix/nvm)
```
curl https://raw.githubusercontent.com/creationix/nvm/v0.22.2/install.sh | bash
```

2. Use NVM to download, compile, and install the latest v0.10.x release of [Node](http://nodejs.org/):
```
nvm install 0.10
```

3. And then in any new shell just use the installed version:
```
nvm use 0.10
```

4. [Update NPM](http://blog.npmjs.org/post/85484771375/how-to-install-npm)
```
sudo npm install npm -g
```

5. Install the [Yeoman](http://yeoman.io/) modules with NPM:
* Yeoman (in theory this should also install Bower and Grunt, but this doesn't seem to be the state of reality):
```
npm install -g yo
```
* Bower:
```
npm install -g bower
```
* Grunt:
```
npm install -g grunt
```

6. Create a directory for the new local project, and within that directory run the Yeogurt generator:
```
yo yeogurt
```
7. Choose appropriate options presented by generator and watch it scaffold the project:
* React
* Express
* No DB (we'll hook up OrientDB later)
* SPA
* SCSS
* JS Docs
* KSS

8. Test and build a production version (/dist) of app:
```
grunt
```

9. Preview app on localhost:9010:
```
grunt serve
```

### OrientDB

Follow the official directions [here](http://www.orientechnologies.com/docs/2.0/orientdb.wiki/Tutorial-Installation.html).

### Oriento Installation

In project directory:

```
npm install oriento
```

```
bower install
```
### Configure Express & Oriento

In <project_directory>/server.js, add:

```
// Database configuration
var db = require('./server/config/database')(app);
```

In ./server/config/ add a new file, secrets.js and paste in the following:

```
{
  "server" : {
    "host": "107.170.226.233",
    "port": 2424,
    "httpPort": 2480,
    "username": "xxx",
    "password": "xxx"
  },
  "database" : {
    "name": "AskNature",
    "username": "xxx",
    "password": "xxx"
  }
}
  ```

Make sure that this file is referenced in the ./.gitignore file, and remember to manually place it on the testing and production servers:

```
server/config/secrets.js
```

In ./server/config/ add a new file, database.js, and paste in the following:

```/**
* Database Configuration
*/

'use strict';
var config = require('./secrets.json');
var oriento = require('oriento');

var databaseConfig = function() {

  // Connect to orient server
  var server = oriento(config.server);

  // Use the 'AskNature' database
  var db = server.use(config.database);

  // Console test to see if the connection to the Orient server is working
  server.list()
  .then(function (dbs) {
    console.log('✔ Connected to OrientDB.'.green + ' There are ' + dbs.length + ' databases on the server.');
  }).catch(function(err) {
    console.log('✗ Problem connecting to OrientDB server.'.red);
  });

  // Console test to see if the connection to the AskNature database is working
  db.class.list()
  .then(function (classes){
    console.log('✔ Connected to the '.green + this.name.green + ' database'.green + ' as '.green + this.username.blue + '.'.green + ' There are ' + classes.length + ' classes in this database.');
  }).catch(function(err){
    console.log('✗ Problem connecting to '.red + this.name.blue + ' database.'.red);
  });

  return {
    db: db,
    server: server
  };

};

module.exports = databaseConfig;

```
### Remote Production Server

#### Digital Ocean Droplet Specs

Add this.

#### NPM Setup

Scott: Make a note of what you needed to do to get everything running here.

#### OrientDB

Follow procedure described [here](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-orientdb-on-an-ubuntu-12-04-vps).

### Remote Staging/Testing Server

For now we're using Jenkins to redeploy to production server, but we haven't set up a working environment or tests yet.
