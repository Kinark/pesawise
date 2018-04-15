# Configuring calculators

Configuring the calculators can be a little complicated, but it's the easier way to make a flexible system for adding new types of calculators.

The calculators settings are divided in two parts, the variables and the results. Everything runs around the expression fields in each result. Everything is used primarily to declarate `variable_id's` (for both user inputs and rates references) to be used to calculate the result.

## Quick peak

We're going to take a quick peak of their structures and afterwards explain them better.

#### Variable structure

The variables are showed inside the variables card (left side on desktops and superior side on mobiles). They define the user inputs. The editable field that users can enter values in order to generate results. Check it structure and some explanations:

```javascript
"variables" [
   {
      "type": "number", // number, text, radio, checkbox or select
      "name": "Amount", // input label (unless when it's radio)
      "options": "", // this field is useful only for select, checkbox and radio
      "variable_id": "amount" // this is the variable
   }
]
```

#### Result structure

The result is showed inside the results card (right side on desktops and inferior side on mobiles). They define how each result will be calculated, so it involves more rules. Check it structure and some explanations:

```javascript
"results": [
   {
      "name": "Some name", // the result name
      "expression": "x+y+1+a", // the expression to calculate it, will be explained later
      "min": "", // a simple min rule, will be explained later
      "max": "", // a simple max rule, will be explained later
      "used_rates_id": [  // rates reference area
         {
            "variable_id": "a", // the reference variable_id to be used in expression, more about it later
            "value": "equity.CNY/KES.buying", // the path to the reference
            "condition": "" // more about this one later
         }
      ]
   }
]
```

## Variables - Deeper Look

Now we're going to take a deeper look into each kind of variable declaration.

#### Text/Number

These are the simplest ones. Just choose a label in `name` and bind a variable to it in `variable_id`:

```javascript
"variables" [
   {
      "type": "text", // or number
      "name": "Amount",
      "options": "",
      "variable_id": "amount"
   }
]
```

Of course the number field will allow only numbers. Actually, only integer numbers. No points or commas are allowed.

#### Radio

For the radios we don't use the `name` field. Since you can only choose one radio in a radio group, the labels will be the same as the values. And in order to declare the values/labels we define them in `options` field, separated by a comma (avoid white spaces for now). (I'll update this to achieve separated labels and values by using multiple labels with comma in `name` field)

```javascript
"variables" [
   {
      "type": "radio",
      "name": "Generic Radio", // useless (for now)
      "options": "2-days, 5-days",
      "variable_id": "radioinput"
   }
]
```

The above example will result into something like this (ignoring classes and styles):

```html
<input name="radioinput" type="radio" value="2-days">
<label>2-days</label>
<input name="radioinput" type="radio" value="5-days">
<label>5-days</label>
```

#### Select

This one is almost like the radios, but since it's only one label to multiple options, this time it'll be used. When it comes to the options, it's the same, declare each of them in the `options` field, separated by commas.

```javascript
"variables" [
   {
      "type": "select",
      "name": "Generic Dropdown Select",
      "options": "first-option, second-option",
      "variable_id": "select"
   }
]
```

#### Checkbox

There's a trick with this one. In order to achieve different values and labels, we declare the value of each checkbox in `options` field, even though it's only one value. 

> It's important to remember to not to try to use "multiple options".

```javascript
"variables" [
   {
      "type": "checkbox",
      "name": "Generic Checkbox",
      "options": "something", // just one "option"
      "variable_id": "checkbox"
   }
]
```

## Results - Deeper look

Results involves a little more things to deal with and one of the most important of them are the references. Let's check them.

> It's important to remember that ALL the `variable_id's` (and by all, I mean all, both variables and rates references) share the same "scope", so DO NOT use the same variable_id for more than one thing.

#### Simple result 

This one will just take the values of the `x`, `y`, `a`, replace them in the expression and evaluate it.

```javascript
"results" [
   {
      "name": "Some simple result",
      "expression": "x+y+1+a",
      "min": "",
      "max": "",
      "used_rates_id": [
         {
            "variable_id": "",
            "value": "",
            "condition": ""
         }
      ]
   }
]
```

#### Reference result 

This one also declares a rate reference and binds a `variable_id` to it in order to be used by the expression. Check it out:

```javascript
"results" [
   {
      "name": "x+y+1+a",
      "expression": "x+buying",
      "min": "",
      "max": "",
      "used_rates_id": [
         {
            "variable_id": "buying",
            "value": "equity.CNY/KES.buying",
            "condition": ""
         }
      ]
   }
]
```

The references are searched inside the object `rates`, in the `api.php`, and can be obtained by passing the exact path to the value, what is defined by the rates inside `rates/` folder (check [Application Structure](structure.md) for more information). You can see merged version of all the rates in the `rates/` folder by accessing the file `api.php`.

#### Complex reference result 

Sometimes the reference we wanna use depends on some variable that isn't defined yet. To achieve it, we pass an object into the `value` field instead of a value. For example:

```javascript
"results" [
   {
      "name": "x+y+1+a",
      "expression": "x+buying",
      "min": "",
      "max": "",
      "used_rates_id": [
         {
            "variable_id": "buying",
            "value": "safaricom.from-mpesa",
            "condition": ">=x"
         }
      ]
   }
]
```

Let's take a look at the path provided in `value` field in the `api.php`:

```javascript
"rates": {
   "safaricom": {
      "from-mpesa": {
          "49": "0",
          "100": "10",
          "500": "27",
          "1000": "27",
          "1500": "27",
          "2500": "27",
          "3500": "49",
          "5000": "66",
          "7500": "82",
          "10000": "110",
          "15000": "159",
          "20000": "176",
          "25000": "187",
          "30000": "187",
          "35000": "187",
          "40000": "275",
          "45000": "275",
          "50000": "275",
          "70000": "330"
      }
   }
}
```

See? `safaricom.from-mpesa` is an object, not an exact value. But we also defined a condition:

```javascript
...
"condition": ">=x"
...
```

And that means "take the value from the object `safaricom.from-mpesa` that corresponds to the key that is bigger or equal than x". Cool, isn't it?

#### Result with min/max

The min/max are defined per result and is related to the variables, so:

```javascript
"results" [
   {
      "name": "Another thing",
      "expression": "x+2",
      "min": "x>100",
      "max": "x<=7000",
      "used_rates_id": [
         {
            "variable_id": "",
            "value": "",
            "condition": ""
         }
      ]
   }
]
```

That will throw a warning into the result if the variable `x` is smaller or equal to 100 or bigger than 7000.