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


    <!-- Panel z meczami zablokowanymi i aktywnymi -->
    <div class="Section">   
        <div class="choose">
            <form>
                <label for='active' class='custom-radio'>
                    <input type='radio' id='active' name='match' value='0'  checked>
                    <span class="radio-btn">Aktywne</span>
                </label>

                <label for='block' class='custom-radio'>
                    <input type='radio' id='block' name='match' value='1'>
                    <span class="radio-btn">Zablokowane</span>
                </label>
            </form>
        </div>
        <div class="output">
            <div class="match">
                <div class="elementMatch">
                    <div class="row">
                        <div class="title">
                            <h3><span>Fasola Funclub</span> - <span>Mieszanka</span></h3>
                            <small>Counter-Strike: Global Offensive</small>
                        </div>
                        <div class="date">
                            <p>22:00</p>
                            <p>27.10.2022</p>
                        </div>
                        <div class="buttons">
                            <button class='btnEdit' type='button'>Edytuj</button>
                            <button class='btnBlock' type='button'>Zablokuj</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script src='matches.js'></script>
</body>
</html>