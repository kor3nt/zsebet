<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ZSEBET | Show Code </title>

    <style>
        *{
            font-family: 'Encode Sans Expanded', sans-serif;
        }

        @keyframes show {
            0% {left: -1500px; bottom: 20px;}
            25% {left: 20px; bottom: 20px;}
            75% {left: 20px; bottom: 20px;}
            100% {bottom: -1500px;}
        }

        .yellow-color{
            color: #ffbf00;
        }

        #logo{
            font-weight: bolder;
        }

        #container{
            position: absolute;
            left: 20px; 
            bottom: -1500px;
            padding: -1500px;
            color: white;
            display: flex; 
            align-items: center;
            animation-name: show;
            animation-duration: 10s;
        }

        #logo{
            background-color: #1E1E1E;
            padding: 20px;
            border: 5px solid #ffbf00;
            text-align: center;
            font-size: 48px;
        }

        #text{
            padding: 15px;
            font-size: 24px;
            background-color: #1E1E1E;
            border-top: 5px solid #ffbf00;
        }

        .bigger{
            font-size: 32px;
        }
    </style>
</head>
<body>
   
                <?php

                session_start();

                require_once "../../connect.php";
                mysqli_report(MYSQLI_REPORT_STRICT);

                $connect = new mysqli($host, $db_user, $db_password, $db_name);

                if ($result = $connect->query("SELECT * FROM zsebet_codes WHERE showCode = 1"))
                {
                    $numbers = $result->num_rows;
                    if($numbers == 0){
                        header("Refresh:30");
                    }
                    else{

                        $row = $result->fetch_assoc();
                        // $connect->query("UPDATE zsebet_codes SET showCode = 0 WHERE code LIKE '".$row['code']."';");
                        echo '<div id="container">
                                <div id="logo">ZSE<br><span class="yellow-color">BET</span></div>
                                <div id="text">Kod dla najszybszego użytkownika: <br> <span class="yellow-color bigger">';
                        
                        echo $row['code'];
                        
                        echo '</span></div></div>';

                        header("Refresh:30");
                    }
                }

                $connect->close();
                ?>
</body>
</html>