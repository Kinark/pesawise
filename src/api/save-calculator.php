<?php
header("Access-Control-Allow-Origin: *");
session_start();

if (!isset($_SESSION['logged']) || $_SESSION['logged'] !== true) {
   echo 2;
   die();
}

$calculatorsFilename = 'json/calculators.json';

$calculatorsFile = file_get_contents($calculatorsFilename);
$calculatorsFile = json_decode($calculatorsFile, JSON_UNESCAPED_SLASHES);

if ($_POST['action'] == 'add') {
   $newCalculatorDefaults = array(
      'calculator' => 'New calculator',
      'id' => uniqid(),
      'category' => '',
      'active' => 'true',
      'icon' => '',
      'variables' => array(
         0 => array(
            'type' => 'text',
            'name' => 'Sample Variable',
            'options' => '',
            'variable_id' => 'x'
         )
      ),
      'results' => array(
         0 => array(
            'name' => 'Sample result',
            'expression' => '',
            'min' => '',
            'max' => '',
            'used_rates_id' => array(
               0 => array(
                  'variable_id' => '',
                  'value' => '',
                  'condition' => ''
               )
            )
         )
      )
   );
   array_push($calculatorsFile, $newCalculatorDefaults);
}

if ($_POST['action'] == 'save' || $_POST['action'] == 'delete') {
   $receivedCalculator = $_POST['calculatorArray'];
   $receivedCalculator = json_decode($_POST['calculatorArray'], JSON_UNESCAPED_SLASHES);


   $rightIndex = null;
   foreach ($calculatorsFile as $key => $value) {
      if ($value['id'] == $receivedCalculator['id']) {
         $rightIndex = $key;
         break;
      }
   }

   if (is_null($rightIndex)) {
      echo 0;
      die();
   }
}

if ($_POST['action'] == 'save') {
   $calculatorsFile[$rightIndex] = $receivedCalculator;
} else if ($_POST['action'] == 'delete') {
   unset($calculatorsFile[$rightIndex]);
}

$calculatorsFile = json_encode(array_values($calculatorsFile), JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);

$fp = fopen($calculatorsFilename, 'w');
fwrite($fp, $calculatorsFile);
fclose($fp);

echo 1;