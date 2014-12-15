# Abricos Platform

Content Management System and Web Application Platform

## Installation

### Install Node.js and NPM

[Installing Node.js via package manager](https://github.com/joyent/node/wiki/installing-node.js-via-package-manager)

### Install Grunt.js

```
[sudo] npm install -g grunt-cli
```

### Install Multik.js

```
[sudo] npm install -g multik
```

All subsequent commands must be performed in the project folder (where the file is located multik.json).

### Install other development packages

```
npm install
```

### Loading dependent

Loading the core and all the necessary dependent modules and third-party libraries

```
mk install
```

*Note: If there is an error in Ubuntu: /usr/bin/env: node: No such file or directory, then run command:*

```
sudo ln -s /usr/bin/nodejs /usr/bin/node
```

### Setting config.php

```
mkdir ./src/includes
```

```
cp ./abricos.src/core/src/includes/config.example.php ./src/includes/config.php
```

```
gedit ./src/config.php
```


### Initialize dependent

```
mk-grunt init
```

### Build the project

```
mk-grunt build
```
