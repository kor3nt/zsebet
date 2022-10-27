<?php
    session_start();

    require_once "../connect.php";
    mysqli_report(MYSQLI_REPORT_STRICT);

    
    
    try 
    {
        $connect = new mysqli($host, $db_user, $db_password, $db_name);
        // Uzyskanie danych z pliku js
        $email = mysqli_real_escape_string($connect, $_POST['email']);
        $password = mysqli_real_escape_string($connect, $_POST['password']);


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

                        if (password_verify($password, $row['password'])){
                            $_SESSION['username'] = $row['nick'];
                            $_SESSION['verify'] = $row['verify'];
                            $_SESSION['role'] = $row['role'];
                            
                            if($row['verify'] == 0){
                                $_SESSION['email'] = $row['email'];
                                $_SESSION['otp'] = $row['otp'];
                                echo 'otp';
                                return false;
                            }

                            echo 'success';
                            return false;
                        }
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