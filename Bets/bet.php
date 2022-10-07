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

            if($amount > $row['coins']){
                echo 'coins';
                return false;
            }

            foreach($bets as $key => $value){
                $connect->query("INSERT INTO zsebet_bet VALUES (NULL, '$nick', '".$bets[$key] -> yourBet."', '".$bets[$key] -> amount."', '".$bets[$key] -> id."')");
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
        }
        echo 'error';
                
    }
    catch(Exception $e)
    {
        echo 'servers';
        // echo 'Informacja developerska: '.$e;
    }
?>