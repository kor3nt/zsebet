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
            $choose = $_POST['choose'];
            $nick = $_SESSION['username'];

            if($choose == 0){
                $sql = "SELECT team, amount, multiple, 	LabelMatch, game, block, date, winner FROM zsebet_bet INNER JOIN zsebet_match ON zsebet_bet.id_game=zsebet_match.id WHERE nick = '$nick' AND (winner IS NULL OR length(winner) <= 0);";
            }
            else{
                $sql = "SELECT team, amount, multiple, LabelMatch ,game, block, date, winner FROM zsebet_bet INNER JOIN zsebet_match ON zsebet_bet.id_game=zsebet_match.id WHERE nick = '$nick' AND length(winner) > 0;";
            }

            if ($result = @$connect->query($sql))
            {
                $numberTickets = $result->num_rows;
                if($numberTickets>0){
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