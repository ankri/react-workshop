# react-workshop

Check back later to see a more detailed README. For now this README will only contain how to install the dependencies

# Local Development

To be able to run the code locally you need to check out the project and install the dependencies. To be able to install the dependencies you need to have `git` and `nodejs` installed on your system.

### Requirements

1. Install `git`. _Only if you do not have `git` installed._ Follow the instructions on [git-scm.com](https://git-scm.com/)
2. Install the LTS or latest version of Node. The installation is optional if you have Node >= 10 installed. To install node follow the instructions on [nodejs.org](https://nodejs.org/en/)

   To check your node version run `node -v` in your command line/terminal.

3. Clone the project `git clone git@github.com:ankri/react-workshop.git`

### Install the dependencies

> `cd` into the cloned directory: `cd react-workshop`

We have to both install the `/server` and the `/ui`. In the two directories we have to run `npm install`:

```shell
  cd server
  npm install
  cd ..
  cd ui
  npm install
```

> Installing the dependencies for the `/ui` will take some time.

### Testing the installation

Open a command line/terminal and `cd` into the `/server` directory. In there run:

```shell
npm start
```

You should see an output like this:

```shell
[nodemon] 1.19.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node src/index.js`
[nodemon] clean exit - waiting for changes before restart
```

Open another command line and `cd` into the `/ui` directory. In there run:

```shell
npm start
```

You should see an output like this:

```shell
Compiled successfully!

You can now view ui in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://XXX.XXX.XXX.XXX:3000/

Note that the development build is not optimized.
To create a production build, use npm run build.
```

Also a browser window should have opened automatically.

# IDE / Code Editor

I recommend using [VS Code](https://code.visualstudio.com/), but you're free to use the IDE / Code Editor you feel comfortable in.

# Staying up to date

Since the code and the README is still work in progress, please run `git pull` again in the morning on 10th of July.
