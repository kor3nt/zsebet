<?php 
    session_start();
    if ((isset($_SESSION['verify'])) && ($_SESSION['verify'] == 0))
    {
        header('Location: ../verify');
    }

    if((isset($_SESSION['verify'])) && ($_SESSION['verify'] == 1)){
        header('Location: ../');
    }

    if(!$_GET['token'] ){
        header('Location: ../ForgetPassword');
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
            <img class='form-img' src="../Img/svg6.svg" alt='join' />
        </div>
        
        <div class='form-content-right'>
            
            <!-- Loading screen -->
            <div class="loading">
                <div class="lds-ring"><div></div><div></div></div>
            </div>
            
            <!-- http://localhost/zsebet/ForgetPassword/forgetPassword.php?token=111sasd1&email=klaudiusz.jedrzejczyk@zse.krakow.pl -->
            <!-- Form -->
            <form class='form' id='form'>
                <h1>ZSE<span class="span-color">BET</span> </h1>
                
                <input id="token" type="text" class="form-input" name="token" placeholder="token" value=" <?php echo $_GET["token"] ?>"/>

                <div class='form-inputs'>
                    <label for="email" class='form-label'>E-mail</label>
                    <input id="email" type="email" class="form-input" name="email" placeholder="E-mail" value=" <?php echo $_GET["email"] ?>"/>
                    <small id="error"></small>
                </div>

                <div class='form-inputs'>
                    <label for="password" class='form-label'>Hasło</label>
                    <input id="password" type="password" class="form-input" name="password" placeholder="Hasło"/>
                    <small id="error-password"></small>
                </div>

                <div class='form-inputs'>
                    <label for="password2" class='form-label'>Potwierdź hasło</label>
                    <input id="password2" type="password" class="form-input" name="password2" placeholder="Potwierdź hasło"/>
                    <small id="error-password2"></small>
                </div>
                
                <button class='form-input-btn' type="submit" id='submit'>Zmień hasło</button>
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

    <script src="validateMail.js"></script>
</body>
</html>