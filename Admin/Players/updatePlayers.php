<?php
    session_start();

    require_once "../../connect.php";
    mysqli_report(MYSQLI_REPORT_STRICT);
    
    try 
    {
        $connect = new mysqli($host, $db_user, $db_password, $db_name);
        
        // Uzyskanie danych z pliku js
        $id = $_POST['id'];
        $role = $_POST['role'];
        $coins = $_POST['coins'];

        if ($connect->connect_errno!=0)
        {
            throw new Exception(mysqli_connect_errno());
        }
        else
        {   
            if ($connect->query("UPDATE zsebet_users SET role='$role' WHERE id = '$id'"))
            {
                if ($connect->query("UPDATE zsebet_amount SET coins='$coins' WHERE id = '$id'"))
                {
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

            $connect->close();
            return true;
        }
        echo 'error';
                
    }
    catch(Exception $e)
    {
        echo 'servers';
        // echo 'Informacja developerska: '.$e;
    }
?>