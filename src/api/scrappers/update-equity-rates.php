<?php
include('../simple_html_dom.php');

$html = file_get_html('https://ke.equitybankgroup.com/');
// $html = file_get_html('../examples/equity.html');

$carouselDiv = $html->find('.shares', 0);

$rates = array();

foreach($carouselDiv->find('.single-forex') as $rate) {
   $currency = $rate->find('.user-currency',0)->plaintext;
   $buying = $rate->find('.currency-value',0)->plaintext;
   $selling = $rate->find('.currency-value',1)->plaintext;

   $currency = preg_replace('/\s+/', '', $currency);
   $currency = preg_replace('/:/', '', $currency);
   $buying = filter_var($buying, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
   $selling = filter_var($selling, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);

   $rates[$currency]['buying'] = $buying;
   $rates[$currency]['selling'] = $selling;
}

$json = json_encode($rates);

$fp = fopen('../rates/equity.json', 'w');
fwrite($fp, $json);
fclose($fp);

header('Access-Control-Allow-Origin: *');
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header('Content-Type: application/json');
echo $json;

die();