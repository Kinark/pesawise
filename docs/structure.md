# Application structure

The application is made with react and bundled with webpack, so the source is a bit "messy" compared to the dist version, but it's actually pretty organized.

* `src` you can find almost everything in here. From views to components, it's all linked.

* `public` is the folder where you'll find the root of the page, a simple html page with nothing inside it.

* `config` folder is the habitat of the webpack configuration files and also the postcss settings.

* `dist` folder is just the distribution version. Run `$ npm run build` and upload the folder's contents.

An important point to remember and explain is the api folder. Below you can find the structure and the explanations:

```
api/
|--examples/   -- An examples folder for testing the scrappers in offline mode
|  |--equity.html
|  |--safaricom.html
|  |--treasury.html
|
|--json/   -- All your personal data. Wanna backup? Just download it
|  |--rates/   -- The rates folder. Here you can create more rates references arbitrarily
|  |  |--equity.json
|  |  |--safaricom.json
|  |  |--treasury.json
|  |
|  |--calculators.json   -- Just the calculators. Managed by the /puppies admin panel
|  |--nav-routes.json   -- Here are the navbar routes
|
|--scrappers/   -- These are the scrappers from the requested websites
|  |--update-equity-rates.php
|  |--update-safaricom-rates.php
|  |--update-treasury-rates.php
|
|--api.php/   -- This file merges the calculators with all the scrapped rates in json/rates/ folder
|--login.php   -- Login logic file for /puppies admin panel
|--logout.php   -- Logout function
|--save-calculator.php   -- A simple collection of functions (used as a kind of second api by the admin panel)
|--simple_html_dom.php   -- Simple html parser for php to build the auto scrappers
```

The `api.php` file uses a structure like this:

```javascript
{
   "calculators": [
      // here is included the calculators.json file
   ],
   "rates": {
      // here is merged all the rates references from json/rates/ folder.
      // each one of them is called inside an object with key name equal to the file
      // supposing the file json/rates/equity.json:
      "equity": {
         // here would be included the contents of the file json/rates/equity.json
      }
   }
}
```