<?php
header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: *");
// header("Access-Control-Allow-Headers: *");
session_start();

if(isset($_SESSION['logged']) && $_SESSION['logged'] === true) {
   echo 1;
   die();
}

$correct_email = 'mintonne@gmail.com';
$correct_password = '$2y$10$Jceltt6ow88XiM8IiuYgvOgFS3irryoCg4H8JNQK9AD81e8eyr0dq';

$correct_password_dumb = '$2y$10$bY5SgFkAXzbCXraFLimQXOfXxZovak1vXBbEvFX8jqZuz53D5QT9u'; 
// 123456

if(!isset($_POST['email']) || !isset($_POST['password'])) {
   echo 0;
   die();
}

$email = $_POST['email'];
$password = $_POST['password'];

if($email == $correct_email && (password_verify($password, $correct_password) || password_verify($password, $correct_password_dumb))) {
   $_SESSION['logged'] = true;
   echo 1;
   die();
} else {
   echo 0;
   die();
}