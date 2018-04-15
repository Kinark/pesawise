<?php
include('../simple_html_dom.php');

$base = 'https://www.centralbank.go.ke/bills-bonds/treasury-bills/';
$curl = curl_init();
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
curl_setopt($curl, CURLOPT_HEADER, false);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_URL, $base);
curl_setopt($curl, CURLOPT_REFERER, $base);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
$str = curl_exec($curl);
curl_close($curl);

// $str = file_get_contents('../examples/treasury.html');

$html = new simple_html_dom();
$html->load($str);

$article = $html->find('article', 0);

$rates = array();

function getValue($str) {
   preg_match_all("/Average Interest Rate.* (\d+\.\d{1,6})/",$str,$matches);
   return $matches[1][0];
}

foreach($article->find('strong') as $strong) {
   if($strong->plaintext == '91-DAY') {
      $str = $strong->parent()->next_sibling()->plaintext;
      $rates['91-day'] = getValue($str);
   }
   else if($strong->plaintext == '182-DAY') {
      $str = $strong->parent()->next_sibling()->plaintext;
      $rates['182-day'] = getValue($str);
   }
   else if($strong->plaintext == '364-DAY') {
      $str = $strong->parent()->next_sibling()->plaintext;
      $rates['364-day'] = getValue($str);
   } 
}

$json = json_encode($rates);

$fp = fopen('../json/rates/treasury.json', 'w');
fwrite($fp, $json);
fclose($fp);

header('Access-Control-Allow-Origin: *');
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header('Content-Type: application/json');
echo $json;

die();