<?php 
    session_start();
    if ((isset($_SESSION['verify'])) && ($_SESSION['verify'] == 0))
    {
        header('Location: ../verify');
    }

    if((isset($_SESSION['verify'])) && ($_SESSION['verify'] == 1)){
        header('Location: ../');
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
            

            <!-- Form -->
            <form class='form' id='form'>
                <h1>ZSE<span class="span-color">BET</span> </h1>
                <div class='form-inputs'>
                    <label for="email" class='form-label'>E-mail</label>
                    <input id="email" type="email" class="form-input" name="email" placeholder="E-mail"/>
                </div>
                

                <div class='form-inputs'>
                    <label for="password" class='form-label'>Hasło</label>
                    <input id="password"  type="password" class="form-input" name="password" placeholder="Hasło"/>
                
                    <small id="error"></small>
                </div>
                
                <button class='form-input-btn' type="submit" id='submit'>Zaloguj</button>
                <span class='form-input-login'><a href="../ForgetPassword">Zapomniałeś hasła?</a></span>
                <span class='form-input-login'>Chcesz otworzyć nowe konto? <a href="../SignUp">Zarejestruj się</a></span>
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

    <script src="login.js"></script>
</body>
</html>