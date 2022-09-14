
<?php 
    session_start();

    $otp = $_POST['otp'];

    require_once "../connect.php";
    mysqli_report(MYSQLI_REPORT_STRICT);
    try {
        $connect = new mysqli($host, $db_user, $db_password, $db_name);
        if ($connect->connect_errno!=0)
        {
            throw new Exception(mysqli_connect_errno());
        }
        else{
            if($otp == $_SESSION['otp']){
                $nick = $_SESSION['nick'];
                if ($connect->query("UPDATE zsebet_users SET verify=1 WHERE nick LIKE '$nick'"))
                {
                    $_SESSION['verify'] = 1;
                    unset($_SESSION['otp']);
                    echo 'success';
                }
                else{
                    throw new Exception($connect->error);
                }
            }
            else{
                echo 'error';
            }
        }
    }
    catch(Exception $e)
    {
        echo 'servers';
        // echo 'Informacja developerska: '.$e;
    }
?>