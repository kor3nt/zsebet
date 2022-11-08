<?php 
    session_start();
    if ((isset($_SESSION['verify'])) && ($_SESSION['verify'] == 0)){
        header('Location: ../Verify');
        exit();
    }

    if(!(isset($_SESSION['username']))){
        header('Location: ../../SignIn');
        exit();
    }

    if($_SESSION['role'] != "admin"){
        header('Location: ../');
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
    <!-- Nawigacja -->
    <div id="Nav">
        <div id="NavbarContainer">
            <div class="row">
                <h1 id="NavLogo">ZSE<span class='yellow-color'>BET</span></h1>
                
                <div id="NavInfo">
                    <ul id="NavMenu">
                        <li class="NavItem"><a class="NavLinks" href="#"><i class="fa fa-user" id='userNav' aria-hidden="true"></i>&nbsp;<span id='profil'><?php echo $_SESSION['username']?></span></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Przycisk powrót -->
    <div class="menu">
        <a href="../">< Powrót</a>
    </div>

    <div class="main">
        <div class="filter">
            <input id="search" name="search" placeholder="Szukaj">
            <button id="searchBtn" type="button">Wyszukaj</button>
        </div>
    
        <div class="players">
            <div class="none">
                <h1><i class="fa fa-exclamation-circle" aria-hidden="true"></i></h1>
                <p>Nie znaleziono graczy!</p>
            </div>
            <table id="playerList">
                
            </table>
            
        </div>
    </div>
    
    <script src="players.js"></script>
</body>
</html>