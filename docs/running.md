# Running the application

In order to run/build it, clone the repo to some folder:

```
$ git clone https://github.com/Kinark/somerandomjob.git some-folder
```

CD into it:

```
$ cd some-folder
```

#### Run in server mode

In order to run it fully, you'll need two servers, one for the the front-end, which is achieved using dev-webpack-server by running:

```
$ npm i
$ npm start
```

And the other for the back-end written in PHP. You'll probably need to use Apache or Nginx, but it's your choice. But it's important to run it on port 8070. The api folder is inside the `src/api`.

#### Making a build

This is simple. Just use

```
$ npm run build
```

and watch the dist folder be created. In the end, you'll have something like this:

```
/api
/static
asset-manifest.json
index.html
```

Just upload it to any PHP server and access it. You're done.