<?php
    session_start();

    require_once "../connect.php";
    mysqli_report(MYSQLI_REPORT_STRICT);
    
    try 
    {
        $connect = new mysqli($host, $db_user, $db_password, $db_name);
        
        // Uzyskanie danych z pliku js
        $teamA = $_POST['teamA'];
        $tagA = $_POST['tagA'];
        $teamB = $_POST['teamB'];
        $tagB = $_POST['tagB'];
        $date = $_POST['date'];
        $label = $_POST['label'];
        $game = $_POST['game'];

        if ($connect->connect_errno!=0)
        {
            throw new Exception(mysqli_connect_errno());
        }
        else
        {   
            if ($connect->query("INSERT INTO zsebet_match VALUES (NULL, '$label', '$teamA', '$tagA', 2, 1, '$teamB', '$tagB', 2, 1, '$game', NULL, '$date', 0)"))
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