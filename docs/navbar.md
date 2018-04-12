# Navbar

The navbar takes information from the file `nav-routes.json` (see [Application Structure][structure.md] to learn more). Take a look at the file structure:

```javascript
{
   "SAFARICOM": [
      "5ac90c520acab",
      "5ac90c64ed77b"
   ],
   "EQUITYBANK": [
      "5ac90c6d62044",
      "5ac90c6dcbccd",
      "5ac90c7932dbb",
      "5ac90c79a5aec"
   ],
   "OTHERS": [
      "5ac90c7a1d9d6",
      "5ac90c7b0bf9f",
      "5ac90d0b5fd5a"
   ]
}
```

It's a simple structure where you add the calculators id's (gathered from admin panel, see [Configuring](configuring-calculators.md) for more) and the navbar component do the rest of the job.

After the webpage is loaded, the navbar fetch the calculators and the routes, compare them, finds/generates the links and delivers the complete navbar with the routes.