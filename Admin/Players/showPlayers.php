<?php 
    // Pobieranie informacji o meczach

    session_start();
    require_once "../../connect.php";
    mysqli_report(MYSQLI_REPORT_STRICT);
    try {
        $connect = new mysqli($host, $db_user, $db_password, $db_name);

        if ($connect->connect_errno!=0)
        {
            throw new Exception(mysqli_connect_errno());
        }
        else{
            $search = $_POST['search'];
            if(empty($search)){
                if ($result = @$connect->query("SELECT id, nick, coins, role FROM zsebet_users NATURAL JOIN zsebet_amount"))
                {
                    $numberPlayers = $result->num_rows;
                    if($numberPlayers>0){
                        while($row = $result->fetch_assoc()){
                            $table[] = $row;
                        }
                        echo json_encode($table);
                    }
                }
                else{
                    throw new Exception($connect->error);
                }
            }
            else{
                if ($result = @$connect->query("SELECT id, nick, coins, role FROM zsebet_users NATURAL JOIN zsebet_amount WHERE nick LIKE '%$search%'"))
                {
                    $numberPlayers = $result->num_rows;
                    if($numberPlayers>0){
                        while($row = $result->fetch_assoc()){
                            $table[] = $row;
                        }
                        echo json_encode($table);
                    }
                    else 
                        echo'none';
                }
                else{
                    throw new Exception($connect->error);
                }
            }
            
        }
    }
    catch(Exception $e)
    {
        echo 'servers';
        echo 'Informacja developerska: '.$e;
    }
?>