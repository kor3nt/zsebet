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

    <link rel="shortcut icon" href="../Img/coin.png" type="image/x-icon">

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

    <!-- Nawigacja -->
    <div id="Nav">
        <div id="NavbarContainer">
            <div class="row">
                <h1 id="NavLogo">ZSE<span class='yellow-color'>BET</span></h1>
                
                <div id="NavInfo">
                    <ul id="NavMenu">
                        <li class="NavItem"><a class="NavLinks" href="#" id="CodesBtnOpen"><span id='Bg-coins'><span id='coins'></span><span class="yellow-coins">+</span></span></a></li>
                        <li class="NavItem"><a class="NavLinks" href="#" id="TicketBtnOpen"><i class="fa fa-ticket yellow-color-nav" aria-hidden="true"></i><span id='tickets'>&nbsp; Moje kupony</span></a></li>
                        <li class="NavItem"><a class="NavLinks" href="../Profile"><i class="fa fa-user" id='userNav' aria-hidden="true"></i>&nbsp;<span id='profil'><?php echo $_SESSION['username']?></span></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Guzik do obstawiania na telefonie -->
    <div class="shopButton">
        <a href='#' id='btnShop'><i class="fa fa-shopping-cart" aria-hidden="true"></i></a>
    </div>


    <div class="Section">
        <div class="Container">
            <div class="Wrapper">
                <div class="row">
                    <div class="left-panel">
                        <!-- Topka -->
                        <div class="History">
                            <h4><i class="fa fa-users" aria-hidden="true"></i> &nbsp; Top:</h4>
                            <div class="HistoryElements">
                                
                            </div>
                        </div>

                        <!-- Mecze, które są możliwe do obstawiania -->
                        <div class="Main">
                            <div class="none">
                                <h1><i class="fa fa-exclamation-circle" aria-hidden="true"></i></h1>
                                <p>Brak meczy do obstawienia!</p>
                            </div>
                        </div>
                    </div>

                        <!-- Miejsce do obstawiania -->
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
                            <small class="error" id='error'></small>
                            <button class="BetsBtn" id='betMenuBtn'>Obstaw</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    </div>

    <!-- Modal - Kod -->
    <div id="ModalCode" class="modal" >
        <div class="modal-content">
            <span class="closeModal" id="closeModal">&times;</span>
            <div class="main-modal">
                <div class="title-modal">
                    <h1 id='title-code'>Doładuj portfel</h1>
                </div>

                <form>
                    <div class="input">
                        <label for="code">Wprowadź kod:</label><br>
                        <input type="text" name="code" id="code"><br>
                        <small class="error" id="errorCode"></small>
                    </div>
                    
                    <div class="button-content">
                        <button class='btnModalCode' id="btnModalCode" type='button' onclick="">Odbierz</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

     <!-- Modal - Kupony -->
     <div id="ModalTicket" class="modal" >
        <div class="modal-ticket">
            <span class="closeModal" id="ticketModal">&times;</span>
            <div class="main-modal">
                <div class="title-modal">
                    <h1 id='title-ticket'>Kupony</h1>
                </div>

                <div class="filterTicket">
                    <form id="filterMatch">
                        <label for='active' class='custom-radio-filter'>
                            <input type='radio' id='active' name='match' value='0' onclick="writeTicket(0);" checked>
                            <span class="radio-btn-filter">Otwarte</span>
                        </label>

                        <label for='block' class='custom-radio-filter'>
                            <input type='radio' id='block' name='match' value='1' onclick="writeTicket(1);">
                            <span class="radio-btn-filter">Zakończone</span>
                        </label>
                    </form>
                </div>

                <div class="ticketScroll" id="ticketsOutput">
                    
                </div>
            </div>
        </div>
    </div>


    <!-- Obstawiony kupon -->
    <div id="ModalBets" class="modal" >
        <div class="modal-ticket">
            <div class="main-modal">   
            
                <table>
                    <tr>
                        <td colspan="2">
                            <div class="wrapper">
                                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <h3>Twój zakład został przyjęty!</h3>
                            <p>Potencjalna wygrana</p>
                            <h2 id="winPriceBets"></h2>
                        </td>
                    </tr>
                    <tr>
                        <td class="centerBetsTr">Stawka <br> <span class="bold" id="amountPriceBets"></span></td>
                        <td class="centerBetsTr">Kurs <br> <span class="betsMultiple" id="multiplePriceBets"></span></td>
                    </tr>
                </table>

                <table id="blockBets">

                </table>
                
                <div class="centerBtn">
                    <button type="button" id="btnBetsModal">Ok</button>
                </div>
            </div>
        </div>
    </div>

    <script src="write.js"></script>
    <script src="script.js"></script>
    <script src="shopButton.js"></script>
    <script src="ModalCode.js"></script>
    <script src="showTicket.js"></script>
    <script src="BetsWindow.js"></script>
</body>
</html>