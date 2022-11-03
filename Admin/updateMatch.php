<?php
    session_start();

    require_once "../connect.php";
    mysqli_report(MYSQLI_REPORT_STRICT);
    
    try 
    {
        $connect = new mysqli($host, $db_user, $db_password, $db_name);
        
        // Uzyskanie danych z pliku js
        $id = $_POST['id'];
        $teamA = $_POST['teamA'];
        $tagA = $_POST['tagA'];
        $teamB = $_POST['teamB'];
        $tagB = $_POST['tagB'];
        $date = $_POST['date'];
        $label = $_POST['label'];
        $game = $_POST['game'];
        $winner = $_POST['winner'];

        if($winner == "null"){
            $winner = NULL;
        }

        if ($connect->connect_errno!=0)
        {
            throw new Exception(mysqli_connect_errno());
        }
        else
        {   
            if ($connect->query("UPDATE zsebet_match SET LabelMatch='$label', TeamA='$teamA', TagTeamA='$tagA', TeamB='$teamB', TagTeamB='$tagB', game='$game', winner='$winner', date='$date' WHERE id = '$id'"))
            {
                if($winner){   
                    if ($result = @$connect->query("SELECT * FROM zsebet_bet WHERE team LIKE '$winner'"))
                    {
                        $numberBets = $result->num_rows;
                        if($numberBets>0){
                            while($row = $result->fetch_assoc()){
                                $coins = @$connect->query("SELECT * FROM zsebet_amount WHERE nick LIKE '".$row['nick']."'");
                                $coins = $coins->fetch_assoc();

                                $price = ($row['amount']*$row['multiple']) + $coins['coins'];
                                echo $price;
                                @$connect->query("UPDATE `zsebet_amount` SET coins='$price' WHERE nick LIKE '".$row['nick']."'");
                                
                            }
                        }
                    }
                }
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