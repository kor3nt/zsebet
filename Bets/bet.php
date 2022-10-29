<?php
    session_start();

    require_once "../connect.php";
    mysqli_report(MYSQLI_REPORT_STRICT);
    
    try 
    {
        $connect = new mysqli($host, $db_user, $db_password, $db_name);
        // Uzyskanie danych z pliku js
        $bets = array_filter(json_decode($_POST['bets']));
        $amount = $_POST['amount'];

        if ($connect->connect_errno!=0)
        {
            throw new Exception(mysqli_connect_errno());
        }
        else
        {   
            $nick = $_SESSION['username'];

            $result = $connect->query("SELECT coins FROM zsebet_amount WHERE nick LIKE '$nick'");
		    if(!$result) throw new Exception($connect->error);
            $row = $result->fetch_assoc();

            foreach($bets as $key => $value){
                $result = $connect->query("SELECT * FROM zsebet_match WHERE id LIKE '".$bets[$key] -> id."'");
                $match = $result->fetch_assoc();
                
                $multipleA = 1.5;
                $multipleB = 1.5;
                $amountBet = $bets[$key] -> amount;
                $costA = $match['costTeamA'];
                $costB = $match['costTeamB'];

                if($bets[$key] -> yourBet == $match['TeamA']){
                    $costA += $amountBet;
                }
                else{
                    $costB += $amountBet;
                }

                $sum = $costA + $costB;

                $multipleA = round(($sum / $costA / $multipleA));
                $multipleB = round(($sum / $costB / $multipleB));
            
                if($multipleA < 1.1){
                    $multipleA = 1.1;
                }
                
                if($multipleB < 1.1){
                    $multipleB = 1.1;
                }
                
                $connect->query("UPDATE zsebet_match SET costTeamA='$costA', costTeamB='$costB', multipleTeamA='$multipleA', multipleTeamB='$multipleB' WHERE  id LIKE '".$bets[$key] -> id."'");

                $connect->query("INSERT INTO zsebet_bet VALUES (NULL, '$nick', '".$bets[$key] -> yourBet."', '".$bets[$key] -> amount."', '".$bets[$key] -> id."', '".$bets[$key] -> multiple."')");
            }
            
            $coins = $row['coins']-$amount;
            if ($connect->query("UPDATE zsebet_amount SET coins='$coins' WHERE  nick LIKE '$nick'"))
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