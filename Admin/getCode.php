<?php 
    // Pobieranie informacji o kodach
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
            if ($result = @$connect->query("SELECT * FROM zsebet_codes"))
            {

                $numberCodes = $result->num_rows;
                if($numberCodes>0){
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