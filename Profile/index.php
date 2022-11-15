<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ZSEBET</title>
    <link rel="stylesheet" href="style.css">
    <link rel="shortcut icon" href="../Img/coin.png" type="image/x-icon">
    
    <!-- Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
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
        require "../connect.php";
        $connect = new mysqli($host, $db_user, $db_password, $db_name);
        $account = $_SESSION['username'];
        $result = $connect -> query("SELECT * FROM zsebet_amount WHERE nick LIKE '$account'");
        $coin = $result -> fetch_assoc();
        
        $total = $connect -> query("SELECT * FROM zsebet_bet WHERE nick LIKE '$account'");
        $totalNum = $total->num_rows;

        $total = $connect -> query("SELECT * FROM zsebet_bet WHERE nick LIKE '$account' AND team LIKE (SELECT winner FROM zsebet_match WHERE zsebet_bet.id_game=zsebet_match.id)");
        $winner = $total->num_rows;

        $total = $connect -> query("SELECT * FROM zsebet_bet WHERE nick LIKE '$account' AND team NOT LIKE (SELECT winner FROM zsebet_match WHERE zsebet_bet.id_game=zsebet_match.id AND length(winner)>0)");
        $lose = $total->num_rows;

        $total = $connect -> query("SELECT * FROM zsebet_bet WHERE nick LIKE '$account' AND team NOT LIKE (SELECT winner FROM zsebet_match WHERE zsebet_bet.id_game=zsebet_match.id AND length(winner)<=0)");
        $wait = $total->num_rows;
    ?>
    <!-- Navigation -->
    <div id="Nav">
        <div id="NavbarContainer">
            <div class="row">
                <a href="../Bets"><h1 id="NavLogo">ZSE<span class='yellow-color'>BET</span></h1></a>
            </div>
        </div>
    </div>

    <!-- Hero Section Left-->
    
    <div id="hero">
        <div id="hero_left">
            <div class="HeroContainer">
                <div id="HeroContent" >
                    <div id="intro">
                        <h1 id="HeroH1">Witaj <?php echo $account ?>!</h1>
                        <p id="HeroP">Twoje saldo</p>
                        <img src="../IMG/coin.png" alt="coin" id="coin"><span id="balanceP"><?php echo $coin["coins"] ?></span>
                    </div>
            <!-- Account-stat -->
                    <div id="stat">
                        <h2>Statystyki</h2>
                        <div class="stat_cont"><span class="stat_span">Obstawione kupony<span class="stat_span2"><?php echo $totalNum; ?></span></span></div>
                        <div class="stat_cont"><span class="stat_span">Wygrane kupony<span class="stat_span2"><?php echo $winner; ?></span></span></div>
                        <div class="stat_cont"><span class="stat_span">Przegrane kupony<span class="stat_span2"><?php echo $lose; ?></span></span></div>
                        <div class="stat_cont"><span class="stat_span">Oczekujące kupony<span class="stat_span2"><?php echo $lose; ?></span></span></div>
                    </div>

                    <hr id="sep">

                    <div id="set">
                        <h2>Ustawienia konta</h2>
                        <ul>
                            <li><a href="changepass.php">Zmień hasło</a></li>
                            <li><a href="#" class="lnk-prof" id="myBtn" onclick="edit()">Skontaktuj się z nami</a></li>

                            
                            <?php
                                if($_SESSION['role'] != "user"){
                                    echo "<li><a href='../Admin'>Panel Admina</a></li>";
                                }
                            ?>
                        </ul>
                    </div>
                    
                    <div id="buttons">
                        <div class="HeroBtnWrapper">
                            <a href="../Bets/index.php" class="Button">Obstaw mecz! 
                                <span id="ArrowRight"><i class="fa fa-angle-right" aria-hidden="true"></i></span> 
                                <span id="ArrowForward"><i class="fa fa-caret-right" aria-hidden="true"></i></span></a>
                        </div>
                        <div class="HeroBtnWrapper">
                            <a href="logout.php" class="Button">Wyloguj</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    
    <footer>
        <div id="FooterWrap">
            <div id="SocialMedia">
                <div id="SocialMediaWraper">
                    <a href="../Bets" id="SocialMediaLogo">ZSE<span id="SocialMediaSpan">BET</span></a>
                    <small id="WebsiteRights">ZSEBET &copy; 2022 Wszelkie prawa zastrzeżone.</small>

                    <div id="WebsiteCreators">
                        <p id="WebsiteText">Created by: <a href="https://www.facebook.com/DuolyStudio" target="_blank" id="FooterLinkOther">Duoly </a></p>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <div id="myModal" class="modal">  
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Skontaktuj się z nami</h2>
                <form method="post" action="send.php">
                    <h3>Twój mail</h3><br>
                    <input type="email" name="kemail" class="mail_text" required>
                    <h3>Imię i nazwisko</h3><br>
                    <input type="text" name="kname" class="mail_text" required>
                    <h3>Temat</h3><br>
                    <input type="text" class="mail_text" name="ktheme" required>
                    <h3>Twoja wiadomość</h3><br>
                    <textarea maxlength="600" placeholder="Twoja wiadomość..." id="message" name="kdescript" required></textarea><br><br><br>
                    <p id='errors'></p>
                    <button type="submit" class="mod-btn">Wyślij</button>
                    <button type="reset" class="mod-btn" onclick="anuluj()">Anuluj</button>
                </form>
            </div>
    </div>
    <script src="modal.js"></script>
    <?php         
        $connect->close();
    ?>
</body>
</html>