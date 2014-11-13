# Abricos Platform

Content Management System and Web Application Platform

## Installation

### Install Node.js and NPM

```
[sudo] apt-get install nodejs npm
```

### Install Grunt.js

```
[sudo] npm install -g grunt-cli
```

### Install Multik.js

```
[sudo] npm install -g multik
```

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
cp ./abricos.src/core/src/includes/config.example.php ./src/config.php
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
