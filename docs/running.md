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

In order to run it fully, you'll need to have PHP installed into your computer and added your PATH. You can easily install it with XAMPP or WAMP. I personally would go with XAMPP, what you can download from:

> https://www.apachefriends.org/download.html

And to add into the PATH (Windows), follow:

> https://markladoux.wordpress.com/2012/07/06/run-php-from-command-line-with-xampp-on-windows-7/

After that, run:

```
$ npm i
$ npm start
```

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