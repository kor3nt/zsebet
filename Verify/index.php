<?php
    session_start();
    
    if((isset($_SESSION['verify'])) && ($_SESSION['verify'] == 1)){
        header('Location: ../Bets');
        exit();
    }

    if (!isset($_SESSION['otp']) || !($_SESSION['verify'] == 0))
    {
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
    <link rel="shortcut icon" href="../Img/coin.png" type="image/x-icon">
    
    <!-- Ikony -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <!-- JQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</head>
<body>
    <canvas class="background"></canvas>
    <div class='form-container'>
        <div class='form-content-left'>
            <img class='form-img' src="../Img/svg5.svg" alt='verify' />
        </div>
        
        <div class='form-content-right'>
            
            <!-- Ekran ładowania -->
            <div class="loading">
                <div class="lds-ring"><div></div><div></div></div>
            </div>
            

            <!-- Formularz -->
            <form class='form' id='form'>
                <h1><span class="span-color">Został ostatni krok!</span> Podaj kod weryfikacyjny i utwórz konto.</h1>

                <div class="otp-field">
                <input type="text" maxlength="1" id="first" onpaste="paste()">
                    <input type="text" maxlength="1" id="second" onpaste="paste()">
                    <input class="space" type="text" maxlength="1" id="third" onpaste="paste()">
                    <input type="text" maxlength="1" id="fourth" onpaste="paste()">
                    <input type="text" maxlength="1" id="fifth" onpaste="paste()">
                    <input type="text" maxlength="1" id="sixth" onpaste="paste()">
                </div>
                <small id='error'></small>
                <button class='form-input-btn' type="submit" id='submit'>Zweryfikuj</button>
                <button class='form-input-btn' type="button" onclick="sendMail()" id='resend'>Nie dotarł kod? Wyślij ponowanie</button>
                <br>
                <span id="email"></span>
            </form>
        </div>
    </div>
    <!-- Footer -->
    <footer>
        <div id="FooterWrap">
            <div id="SocialMedia">
                <div id="SocialMediaWraper">
                    <a href="../" id="SocialMediaLogo">ZSE<span id="SocialMediaSpan">BET</span></a>
                    <small id="WebsiteRights">ZSEBET &copy; 2022 Wszelkie prawa zastrzeżone.</small>

                    <div id="WebsiteCreators">
                        <p id="WebsiteText">Created by: <a href="https://www.facebook.com/DuolyStudio" target="_blank" id="FooterLinkOther">Duoly </a></p>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <script src="index.js"></script>
    <script src="../particles.js-master/dist/particles.min.js"></script>
    <script>
        window.onload = function() {
            Particles.init({
                selector: '.background',
                connectParticles: true,
                maxParticles: 200,
                color: ["#0099ff"]

            });
        };
    </script>
</body>
</html>