<?php 
    session_start();
    if ((isset($_SESSION['verify'])) && ($_SESSION['verify'] == 0)){
        header('Location: ../Verify');
        exit();
    }

    if(!(isset($_SESSION['username']))){
        header('Location: ../SignIn');
        exit();
    }
?>

<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ZSEBET</title>
    <link rel="stylesheet" href="style.css">

    <!-- Ikony -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <!-- JQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</head>
<body>
    <!-- Ekran ładowania -->
    <div class="loading">
        <div class="lds-ring"><div></div><div></div></div>
    </div>

    <div id="Nav">
        <div id="NavbarContainer">
            <div class="row">
                <h1 id="NavLogo">ZSE<span class='yellow-color'>BET</span></h1>
                
                <div id="NavInfo">
                    <ul id="NavMenu">
                        <li class="NavItem"><a class="NavLinks" href="#"><span id='Bg-coins'><span id='coins'></span><span class="yellow-coins">+</span></span></a></li>
                        <li class="NavItem"><a class="NavLinks" href="#"><i class="fa fa-ticket yellow-color-nav" aria-hidden="true"></i><span id='tickets'>&nbsp; Moje kupony</span></a></li>
                        <li class="NavItem"><a class="NavLinks" href="#"><i class="fa fa-user" id='userNav' aria-hidden="true"></i>&nbsp;<span id='profil'></span></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    
    <div class="shopButton">
        <a href='#' id='btnShop'><i class="fa fa-shopping-cart" aria-hidden="true"></i></a>
    </div>


    <div class="Section">
        <div class="Container">
            <div class="Wrapper">
                <div class="row">
                    <div class="left-panel">
                        <div class="History">
                            <h4><i class="fa fa-users" aria-hidden="true"></i> &nbsp; Top:</h4>
                            <div class="HistoryElements">
                                
                            </div>
                        </div>

                        <div class="Main">
                            <div class="none">
                                <h1><i class="fa fa-exclamation-circle" aria-hidden="true"></i></h1>
                                <p>Brak meczy do obstawienia!</p>
                            </div>
                        </div>
                    </div>

                    <div class="Bets" id='betMenu'>
                        <h4><i class="fa fa-shopping-cart" aria-hidden="true"></i>&nbsp; Kupon</h4>    
                        <div id="Icon">
                            <i id="CloseIcon" class="fa fa-times" aria-hidden="true"></i>
                        </div>
                        <div class="MatchElements">
                            
                        </div>

                        <div class="InfoBets">
                            <small>Łączna stawka: <span id='totalBet' class="text-bold">0</span></small>
                            <p>Potencjalna wygrana: <span id='winning' class="text-bold text-blue">0</span></p>
                            <small id='error'></small>
                            <button class="BetsBtn" id='betMenuBtn'>Obstaw</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    </div>
    
    <script src="write.js"></script>
    <script src="script.js"></script>
    <script src="shopButton.js"></script>
</body>
</html>