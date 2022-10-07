<?php 
    session_start();

    // Pobieranie nicku zalogowanego uzytkownika i ilości coinsów do tabelki graczy
    require_once "../connect.php";
    mysqli_report(MYSQLI_REPORT_STRICT);
    try {
        $connect = new mysqli($host, $db_user, $db_password, $db_name);

        if ($connect->connect_errno!=0)
        {
            throw new Exception(mysqli_connect_errno());
        }
        else{
            $nick = $_SESSION['username'];
            if ($result = @$connect->query("SELECT * FROM zsebet_amount where nick LiKE '$nick'"))
            {
                $row = $result->fetch_assoc();
                $table['nick'] = $nick;
                $table['coins'] = $row['coins'];
                echo json_encode($table);
            }
            else{
                throw new Exception($connect->error);
            }
        }
    }
    catch(Exception $e)
    {
        echo 'servers';
        // echo 'Informacja developerska: '.$e;
    }
?>