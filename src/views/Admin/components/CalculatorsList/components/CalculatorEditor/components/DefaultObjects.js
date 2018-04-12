const typeOptions = [
   { key: 't', text: 'Text', value: 'text' },
   { key: 'n', text: 'Number', value: 'number' },
   { key: 's', text: 'Select', value: 'select' },
   { key: 'c', text: 'Checkbox', value: 'checkbox' },
   { key: 'r', text: 'Radio', value: 'radio' },
]

const defaultVariable = {
   type: "",
   name: "",
   options: [],
   variable_id: ""
}

const defaultResult = {
   name: "",
   expression: "",
   min: "",
   max: "",
   used_rates_id: [
      {
         variable_id: "",
         value: "",
         condition: ""
      }
   ]
}

const defaultRatesUsed = {
   variable_id: "",
   value: "",
   condition: ""
}

export { typeOptions, defaultVariable, defaultResult, defaultRatesUsed }