<?php

session_start();

// Get variable from js file
$name = $_POST['name'];
$surname = $_POST['surname'];
$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];
$otp = $_POST['otp'];

$its_ok = true;

$password = password_hash($password, PASSWORD_DEFAULT);

require_once "../connect.php";
mysqli_report(MYSQLI_REPORT_STRICT);

try 
{
	$connect = new mysqli($host, $db_user, $db_password, $db_name);
	if ($connect->connect_errno!=0)
	{
		throw new Exception(mysqli_connect_errno());
	}
	else
	{
		// Whether the email is in the database
		$result = $connect->query("SELECT id FROM zsebet_users WHERE email='$email'");		

        if (!$result) throw new Exception($connect->error);
			
		$how_many_emails = $result->num_rows;
		if($how_many_emails>0)
		{
			$its_ok = false;
			echo 'emails';
		}		

		// Whether the nick is in the database
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
			if ($connect->query("INSERT INTO zsebet_users VALUES (NULL, '$username', '$password', '$name', '$surname', '$email', 0, '$otp', 'user')"))
			{
				if ($connect->query("INSERT INTO zsebet_amount VALUES (NULL, '$username', 1000)"))
				{
					$_SESSION['verify'] = 0;
					$_SESSION['otp'] = $otp;
					$_SESSION['nick'] = $username;
					echo 'success';
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
	// echo 'Informacja developerska: '.$e;
}
?>