<?php

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
            return false;
		}		

		// Whether the nick is in the database
		$result = $connect->query("SELECT id FROM zsebet_users WHERE nick='$username'");
				
		if (!$result) throw new Exception($connect->error);
				
		$how_many_nicks = $result->num_rows;
		if($how_many_nicks>0)
		{
			$its_ok = false;
            echo 'nicks';
            return false;
    	}
				
		if ($its_ok == true)
		{
			if ($connect->query("INSERT INTO zsebet_users VALUES (NULL, '$username', '$password', '$name', '$surname', '$email', 1000, 0, '$otp', 'user')"))
			{
				$_SESSION['udanarejestracja']=true;
				header('Location: clear.php');
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
	// echo '<br />Informacja developerska: '.$e;
}
?>