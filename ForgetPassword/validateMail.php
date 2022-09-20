<?php
    session_start();

    require_once "../connect.php";
    mysqli_report(MYSQLI_REPORT_STRICT);

    
    
    try 
    {
        $connect = new mysqli($host, $db_user, $db_password, $db_name);

        // Get variable from js file
        $email =  mysqli_real_escape_string($connect,$_POST['email']);

        if ($connect->connect_errno!=0)
        {
            throw new Exception(mysqli_connect_errno());
        }
        else
        {
            if ($result = @$connect->query(
            sprintf("SELECT * FROM zsebet_users WHERE email LIKE '%s'",
            mysqli_real_escape_string($connect, $email))))
            {
                    $users = $result->num_rows;
                    if($users > 0){
                        $row = $result->fetch_assoc();

                        $email= $row['email'];
                        $token= $row['token'];
                        $link = "http://localhost/zsebet/ForgetPassword/forgetPassword.php?token=".$token."&email=".$email;

                        require_once "sendMail.php";
					    sendMail($email, $link);

                        echo 'success';
                        return false;
                    }
            }       
            $connect->close();
        }
        echo 'error';
                
    }
    catch(Exception $e)
    {
        echo 'servers';
        // echo 'Informacja developerska: '.$e;
    }
?>