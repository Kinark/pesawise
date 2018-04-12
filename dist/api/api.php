<?php

$json = array();

$calculators = file_get_contents('calculators.json');
// $calculators = preg_replace('/\s+/', '', $calculators);
$json['calculators'] = json_decode($calculators);

foreach(glob("rates/*.json") as $file) {
   $filename = basename($file, '.json');
   $file = file_get_contents($file);
   // $file = preg_replace('/\s+/', '', $file);
   $file = json_decode($file);
   $json['rates'][$filename] = $file;
}

$json = json_encode($json, JSON_PRETTY_PRINT);
header('Access-Control-Allow-Origin: *');
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header('Content-Type: application/json');
echo $json;

die();