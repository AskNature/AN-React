# AskNature README

## The Stack

## Documentation Principles and Procedures

### JS

_[View AskNature's JSDOCs](http://asknatu.re/docs/api/index.html)_

All Javascript is automatically documented as it's created via JSDoc. We abide by [JSDoc commenting guidelines](http://usejsdoc.org/) to continuously create clear and concise documentation every step of the way.

### API

AskNature's API is available for public consumption and grows continuously to expose the full suite of CRUD functionality that is (or may be) possible. We write and parse our API documentation with [API Blueprint](https://github.com/apiaryio/api-blueprint) and use an [Apiary](http://apiary.io/) site to mock up and document the API. Calls are expressed in the native form we use in AskNature, as well as [RESTful](https://github.com/orientechnologies/orientdb/wiki/OrientDB-REST) equivalents.

### CSS

_[View AskNature's Living Styleguide](http://asknatu.re/docs/styleguide/index.html)_

AskNature's interfaces use Bootstrap for layouts and styling. As much as possible, layout and styling should stick to theme-agnostic code so that themes may be swapped and/or updated over time.

For the inevitable exceptions to that rule-of-thumb, we abide by several syntax and organization standards, as well as facilitating the production of living style guides via KSS:

1. We utilize SCSS, which goes through an automated translation and minification process on every build.

2. We follow the [Knyle Style Sheets (KSS)](https://github.com/kneath/kss/blob/master/SPEC.md) guidelines for organizing, formatting, and documenting blocks of code. The link above provides the full guidelines, but the basic format looks like this:
```
// A button suitable for giving stars to someone.
//
// :hover             - Subtle hover highlight.
// .stars-given       - A highlight indicating you've already given a star.
// .stars-given:hover - Subtle hover highlight on top of stars-given styling.
// .disabled          - Dims the button to indicate it cannot be used.
//
// Styleguide 2.1.3.
a.button.star{
  ...
  &.star-given{
    ...
  }
  &.disabled{
    ...
  }
}
```
As recommended, over time we will evolve an organizational structure that is flexible, but rigid enough to be machine processed and referenced inside of documentation.

3. We utilize the [*block, element, modifier* (BEM)](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) methodology for naming CSS classes, following this pattern:
```
.block {}
.block__element {}
.block--modifier {}
```

 * .block represents the higher level of an abstraction or component.
 * .block__element represents a descendent of .block that helps form .block as a whole.
 * .block--modifier represents a different state or version of .block.


## Continuous Deployment Workflow

This section may have more to do with our internal processes, but I'm including it here now until we find a better spot for it.

### Helpful links as we define this

[Continuous Deployment of Node.js Applications](http://blog.risingstack.com/continuous-deployment-of-node-js-applications/) - October 2014

[10 Deploys a Day - A Case Study of Continuous Delivery at Envato](http://webuild.envato.com/blog/10-deploys-a-day-a-case-study-of-continuous-delivery-at-envato/) - January 2014

### Principles

Much of this is pulled from this fantastic presentation from the Envato team: [10 Deploys a Day - A Case Study of Continuous Delivery at Envato](http://webuild.envato.com/blog/10-deploys-a-day-a-case-study-of-continuous-delivery-at-envato/) - January 2014

Our process:_ Pull work > Consult product team > Write code > Test code > Deploy code > Verify production
*Repeat ... about twice a week per developer.*

Now, in a bit more detail:

1. Start with the story on the wall
2. Flip or no flip?
3. Create a branch.
4. Write failing test.
5. Write code.
6. Run local tests.
7. Run full personal build.
8. Create pull request.
9. Advertise pull request.
10. Wait for code review.
11. Merge pull request.
12. Full master build green.
13. Notify team.
14. Deploy master to production.
15. Watch system-monitoring tools.
16. Rollback if failed.
17. Rinse and repeat.

Optional:

* Deploy to staging.
* Show product owner.
* Manual test.


### Practices

### Tools



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

In ./server/config/ add a new file, secrets.json and paste in the following:

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
server/config/secrets.json
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
