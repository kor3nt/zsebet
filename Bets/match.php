<?php 
    // Pobieranie informacji o meczach

    session_start();
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
            if ($result = @$connect->query("SELECT * FROM zsebet_match WHERE NOT EXISTS (SELECT * FROM zsebet_bet WHERE zsebet_match.id = zsebet_bet.id_game AND nick='$nick')"))
            {
                $numberMatches = $result->num_rows;
                if($numberMatches>0){
                    while($row = $result->fetch_assoc()){
                        $table[] = $row;
                    }
                    echo json_encode($table);
                }
                else{
                    echo 'none';
                }
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