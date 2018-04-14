<?php
include('../simple_html_dom.php');

$html = file_get_html('https://www.safaricom.co.ke/personal/m-pesa/getting-started/m-pesa-rates');
// $html = file_get_html('../examples/safaricom.html');

$tablesDiv = $html->find('#M-PESA-Rates', 0);

$rates = array();

$tableCounter = 1;
foreach($tablesDiv->find('table') as $table) {
   foreach($table->find('tbody') as $tbody) {
      foreach($tbody->find('tr') as $row) {
         $tdCounter = 1;
         $min;$max;$value;
         foreach($row->find('td') as $cell) {
            $cellValue = $cell->plaintext;
            if($tdCounter == 1) {
               $min = $cellValue;
            } else if ($tdCounter == 2) {
               $max = $cellValue;
               $max = preg_replace('/\,/', '', $max);
            } else if ($tdCounter == 3) {
               $value = $cellValue;
            }
            $tdCounter++;
         }
         $value = preg_replace('/N\/A/', '0', $value);
         $value = preg_replace('/Free/', '0', $value);
         $value = preg_replace('/\,/', '', $value);
         if($tableCounter == 1) {
         $rates['from-mpesa'][$max] = $value;
         } else if ($tableCounter == 2) {
            $rates['to-unregistered'][$max] = $value;
         } else if ($tableCounter == 3) {
            $rates['to-mpesa'][$max] = $value;
         } else if ($tableCounter == 4) {
            $rates['atm'][$max] = $value;
         }
      }
   }
   $tableCounter += 1;
}

$json = json_encode($rates);

$fp = fopen('../rates/safaricom.json', 'w');
fwrite($fp, $json);
fclose($fp);

header('Access-Control-Allow-Origin: *');
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header('Content-Type: application/json');
echo $json;

die();