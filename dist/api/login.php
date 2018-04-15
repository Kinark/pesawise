<?php
header("Access-Control-Allow-Origin: *");
session_start();

if(isset($_SESSION['logged']) && $_SESSION['logged'] === true) {
   echo 1;
   die();
}

$correct_email = 'mintonne@gmail.com';
$correct_password = '$2y$10$Jceltt6ow88XiM8IiuYgvOgFS3irryoCg4H8JNQK9AD81e8eyr0dq';

$dev_email = 'igormarcossi@gmail.com';
$dev_password = '$2y$10$Q30ht4JG6AtrgEgSrmugAub87hfPMhYabFNp3CQRbkJjB7mCE19cy'; 

if(!isset($_POST['email']) || !isset($_POST['password'])) {
   echo 0;
   die();
}

function checkCredentials($email, $pass) {
   switch ($email) {
      case $correct_email:
         return password_verify($pass, $correct_password);
         break;
      case $dev_email:
         return password_verify($pass, $dev_password);
         break;
      default:
         return false;
         break;
   }
}

$email = $_POST['email'];
$password = $_POST['password'];

if(checkCredentials($email, $password)) {
   $_SESSION['logged'] = true;
   echo 1;
   die();
} else {
   echo 0;
   die();
}