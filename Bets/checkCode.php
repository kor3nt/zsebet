<?php
    session_start();

    require_once "../connect.php";
    mysqli_report(MYSQLI_REPORT_STRICT);
    
    try 
    {
        $connect = new mysqli($host, $db_user, $db_password, $db_name);
        
        // Uzyskanie danych z pliku js
        $code = $_POST['code'];

        if ($connect->connect_errno!=0)
        {
            throw new Exception(mysqli_connect_errno());
        }
        else
        {   
            if ($result = $connect->query("SELECT * FROM zsebet_codes WHERE code LIKE '$code'"))
            {
                $numberCodes = $result->num_rows;
                if($numberCodes>0){
                    $result = $result->fetch_assoc();
                    
                    if($result['type'] == 2){
                        if ($uses = $connect->query("SELECT * FROM zsebet_uses WHERE code LIKE '$code' AND nick LIKE '".$_SESSION['username']."'")){
                            $numberUses = $uses->num_rows;
                            if($numberUses > 0){
                                echo 'used';
                                return false;
                            }
                            else{
                                $connect->query("INSERT INTO zsebet_uses VALUES ('".$_SESSION['username']."', '$code', '".date("Y-m-d H:i:s")."')");
                            }
                        }
                        else{
                            throw new Exception($connect->error);
                        }
                    }
                    else if($result['type'] == 1){
                        $connect->query("UPDATE zsebet_codes SET type = 0 WHERE code LIKE '$code'");
                    }   
                    else{
                        echo 'used';
                        return false;
                    }

                    $coinsResult = $connect->query("SELECT coins FROM zsebet_amount WHERE nick LIKE '".$_SESSION['username']."'");
                    if(!$coinsResult) throw new Exception($connect->error);
                    $coinsResult = $coinsResult->fetch_assoc();

                    $coins = $coinsResult['coins'] + $result['value'];

                    if($connect->query("UPDATE zsebet_amount SET coins = $coins WHERE nick LIKE '".$_SESSION['username']."'")){
                        echo 'success';
                        return true;
                    }
                    else throw new Exception($connect->error);
                }
                else{
                    echo 'error';
                    return false;
                }

                
                
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