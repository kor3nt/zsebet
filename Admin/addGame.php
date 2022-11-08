<?php
    session_start();

    require_once "../connect.php";
    mysqli_report(MYSQLI_REPORT_STRICT);
    
    try 
    {
        $connect = new mysqli($host, $db_user, $db_password, $db_name);
        
        // Uzyskanie danych z pliku js
        $title = $_POST['titleGame'];

        if ($connect->connect_errno!=0)
        {
            throw new Exception(mysqli_connect_errno());
        }
        else
        {   
            if ($result = $connect->query("SELECT * FROM zsebet_game WHERE title LIKE '$title'"))
            {
                $numberGames = $result->num_rows;
                if($numberGames>0){
                    echo 'exist';
                    return false;
                }
                
            }

            if ($connect->query("INSERT INTO zsebet_game VALUES ('$title')"))
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