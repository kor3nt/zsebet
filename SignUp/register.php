<?php

session_start();

require_once "../connect.php";
mysqli_report(MYSQLI_REPORT_STRICT);

try 
{
	$connect = new mysqli($host, $db_user, $db_password, $db_name);
	// Uzyskanie danych z pliku js
	$name = mysqli_real_escape_string($connect, $_POST['name']);
	$surname = mysqli_real_escape_string($connect, $_POST['surname']);
	$username = mysqli_real_escape_string($connect, $_POST['username']);
	$email = mysqli_real_escape_string($connect, $_POST['email']);
	$password = mysqli_real_escape_string($connect, $_POST['password']);
	$otp = $_POST['otp'];
	$token = md5(rand());

	$its_ok = true;

	$password = password_hash($password, PASSWORD_DEFAULT);

	if ($connect->connect_errno!=0)
	{
		throw new Exception(mysqli_connect_errno());
	}
	else
	{
		// Sprawdzenie czy email został już użyty
		$result = $connect->query("SELECT id FROM zsebet_users WHERE email='$email'");		

        if (!$result) throw new Exception($connect->error);
			
		$how_many_emails = $result->num_rows;
		if($how_many_emails>0)
		{
			$its_ok = false;
			echo 'emails';
		}		

		// Sprawdzenie czy nick został już użyty
		$result = $connect->query("SELECT id FROM zsebet_users WHERE nick='$username'");
				
		if (!$result) throw new Exception($connect->error);
				
		$how_many_nicks = $result->num_rows;
		if($how_many_nicks>0)
		{
			$its_ok = false;
            echo 'nicks';
    	}
				
		if ($its_ok == true)
		{
			if ($connect->query("INSERT INTO zsebet_users VALUES (NULL, '$username', '$password', '$name', '$surname', '$email', 0, '$otp', 'user', '$token')"))
			{

				if ($connect->query("INSERT INTO zsebet_amount VALUES (NULL, '$username', 1000)"))
				{
					$_SESSION['verify'] = 0;
					$_SESSION['otp'] = $otp;
					$_SESSION['username'] = $username;
					$_SESSION['email'] = $email;
					echo 'success';

					require_once "sendMail.php";
					sendMail($email, $otp);
					
					// $mailer = sendMail($email, $otp);
					// if($mailer){
					// 	echo 'send';
					// }
					// else{
					// 	echo 'error';
					// }
				}
				else
				{
					throw new Exception($connect->error);
				}
			}
			else
			{
				throw new Exception($connect->error);
			}
					
		}
				
		$connect->close();
    }
			
}
catch(Exception $e)
{
	echo 'servers';
	echo 'Informacja developerska: '.$e;
}
?>