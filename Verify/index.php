<?php
    session_start();
    if (!isset($_SESSION['otp']))
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

    <!-- Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <!-- JQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</head>
<body>
    <div class='form-container'>
        <div class='form-content-left'>
            <img class='form-img' src="../Img/svg5.svg" alt='verify' />
        </div>
        
        <div class='form-content-right'>
            
            <!-- Loading screen -->
            <div class="loading">
                <div class="lds-ring"><div></div><div></div></div>
            </div>
            

            <!-- Form -->
            <form class='form' id='form'>
                <h1><span class="span-color">Został ostatni krok!</span> Podaj kod weryfikacyjny i utwórz konto.</h1>

                <div class="otp-field">
                    <input type="text" maxlength="1" id="first">
                    <input type="text" maxlength="1" id="second">
                    <input class="space" type="text" maxlength="1" id="third">
                    <input type="text" maxlength="1" id="fourth">
                    <input type="text" maxlength="1" id="fifth">
                    <input type="text" maxlength="1" id="sixth">
                </div>
                <small id='error'></small>
                <button class='form-input-btn' type="submit" id='submit'>Zweryfikuj</button>
            </form>
        </div>
    </div>
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

    <script src="verify.js"></script>
</body>
</html>