<?php
    session_start();

    require_once "../connect.php";
    mysqli_report(MYSQLI_REPORT_STRICT);
    
    try 
    {
        $connect = new mysqli($host, $db_user, $db_password, $db_name);
        
        // Uzyskanie danych z pliku js
        $id = $_POST['id'];
        
        $result = $connect->query("SELECT * FROM zsebet_codes WHERE code LIKE '".$id."';");
        $row = $result->fetch_assoc();


        if($row['showCode'] == 1){
            $show = 0;
        }
        else {
            $show = 1;
        }

        if ($connect->connect_errno!=0)
        {
            throw new Exception(mysqli_connect_errno());
        }
        else
        {   
            if ($connect->query("UPDATE zsebet_codes SET showCode = ".$show." WHERE code LIKE '".$id."';"))
            {
                echo 'success';
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