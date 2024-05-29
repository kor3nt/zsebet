<?php
    

    session_start();

    require_once "../connect.php";
    mysqli_report(MYSQLI_REPORT_STRICT);
    
    function multiple($input){
        if($input > 100001){
            return round($input/100000, 2);
        }
        else if($input > 10001){
            return round($input/10000, 2);
        }
        else if($input > 1001){
            return round($input/1000, 2);
        }
        else if($input > 101){
            return round($input/100, 2);
        }
        else if($input > 10.5){
            return round($input/10, 2);
        }
        else if(1.5 < $input && $input <= 10.5){
            return round($input, 2);
        }
        else if(0.3 < $input && $input <= 1.5){
            return 1.5;
        }
        else{
            return 1.2;
        }
    }

    try 
    {
        $connect = new mysqli($host, $db_user, $db_password, $db_name);
        // Uzyskanie danych z pliku js
        $bets = array_filter(json_decode($_POST['bets']));

        if ($connect->connect_errno!=0)
        {
            throw new Exception(mysqli_connect_errno());
        }
        else
        {   
            $error = [];
            $nick = $_SESSION['username'];

            $amount = 0;
            $multipleEnd = 0;

            $result = $connect->query("SELECT coins FROM zsebet_amount WHERE nick LIKE '$nick'");
		    if(!$result) throw new Exception($connect->error);
            $row = $result->fetch_assoc();

            foreach($bets as $key => $value){
                $result = $connect->query("SELECT * FROM zsebet_match WHERE id LIKE '".$bets[$key] -> id."'");
                $match = $result->fetch_assoc();
                if($match['block'] == 0 && $match['date'] >= date("Y-m-d H:i:s")){
                    $multipleA = 1.5;
                    $multipleB = 1.5;
                    $amountBet = $bets[$key] -> amount;

                    $multipleEnd += $bets[$key] -> multiple;

                    $costA = $match['costTeamA'];
                    $costB = $match['costTeamB'];
    
                    if($bets[$key] -> yourBet == $match['TeamA']){
                        $costA += $amountBet;
                    }
                    else{
                        $costB += $amountBet;
                    }

                    $multipleA = multiple($costB/$costA);
                    $multipleB = multiple($costA/$costB);

                    $connect->query("UPDATE zsebet_match SET costTeamA='$costA', costTeamB='$costB', multipleTeamA='$multipleA', multipleTeamB='$multipleB' WHERE  id LIKE '".$bets[$key] -> id."'");
    
                    $connect->query("INSERT INTO zsebet_bet VALUES (NULL, '$nick', '".$bets[$key] -> yourBet."', '".$bets[$key] -> amount."', '".$bets[$key] -> id."', '".$bets[$key] -> multiple."')");
                    $amount +=  $bets[$key] -> amount;
                }
                else{
                    $connect->query("UPDATE zsebet_match SET block=1 WHERE id LIKE '".$bets[$key] -> id."'");
                    $error['error'][] = $match['LabelMatch'];
                }
                
            }
            
            $coins = $row['coins']-$amount;
            if ($connect->query("UPDATE zsebet_amount SET coins='$coins' WHERE  nick LIKE '$nick'"))
            {
                $error['info']['amount'] = $amount;
                $error['info']['multiple'] = $multipleEnd;
                $error['info']['winPrice'] = $amount*$multipleEnd;

                echo json_encode($error);
            }
            else
            {
                throw new Exception($connect->error);
            }

            $connect->close();
            return true;
        }
        echo 'servers';
                
    }
    catch(Exception $e)
    {
        echo 'servers';
        // echo 'Informacja developerska: '.$e;
    }
?>