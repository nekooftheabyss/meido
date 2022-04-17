# Meido
Sends a welcome image when someone joins a server.

## Installation
* Clone this repo.
```sh
$ git clone https://github.com/retraigo/meido
```

* Open the repo in your command line.
```sh
$ cd tokino
```

* Install dependencies.
```sh
$ npm i # NPM
$ pnpm i # PNPM
```

* Open `config.js` in a text editor.
* Replace `<insert server name>` with the server name or anything you want the bot to welcome the user to.
* Replace `<insert channel id>` with the ID of the channel you wanna work with.
* Replace `<insert token here>` with the token of your Discord bot.
* Replace `This is some cool message, {{member}}!` with some welcome message. The user will be pinged wherever you place `{{member}}`.
* Start the bot.
```sh
$ node meido.js
```

Need the bot to not die after closing your terminal? Check out [PM2](https://pm2.keymetrics.io/).