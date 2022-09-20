<?php

session_start();

$otp = $_SESSION['otp'];
$email = $_SESSION['email'];

require_once "../SignUp/sendMail.php";

$mailer = sendMail($email, $otp);
if($mailer){
	echo 'send';
}
else{
	echo 'error';
}
?>