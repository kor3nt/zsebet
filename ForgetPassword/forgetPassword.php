<?php 
    session_start();
    if ((isset($_SESSION['verify'])) && ($_SESSION['verify'] == 0))
    {
        header('Location: ../Verify');
        exit();
    }

    if((isset($_SESSION['verify'])) && ($_SESSION['verify'] == 1)){
        header('Location: ../Bets');
        exit();
    }

    if(!$_GET['token'] || !$_GET['email']){
        header('Location: ../ForgetPassword');
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
    <canvas class="background"></canvas>
    <div class='form-container'>
        <div class='form-content-left'>
            <img class='form-img' src="../Img/svg6.svg" alt='join' />
        </div>
        
        <div class='form-content-right'>
            
            <!-- Ekran ładowania -->
            <div class="loading">
                <div class="lds-ring"><div></div><div></div></div>
            </div>

            <!-- Ekran powodzenia -->
            <div id="send">
                <div class="wrapper">
                    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
                </div>

                <div class="text-success">
                    <h1>Zmieniono!</h1>
                    <p>Twoje hasło zostało zmienione.</p><br>
                    <a class='return-button' href='../SignIn'>Powrót</a>
                </div>
            </div>

            <!-- Formularz -->
            <form class='form' id='form'>
                <h1>ZSE<span class="span-color">BET</span> </h1>
                
                <input style='display: none;' id="token" type="text" class="form-input" name="token" placeholder="token" value=" <?php echo $_GET["token"] ?>"/>

                <div class='form-inputs'>
                    <label for="email" class='form-label'>E-mail</label>
                    <input id="email" type="email" class="form-input" name="email" placeholder="E-mail" value=" <?php echo $_GET["email"] ?>"/>
                    <small id="errors-email"></small>
                </div>

                <div class='form-inputs'>
                    <label for="password" class='form-label'>Hasło</label>
                    <input id="password" type="password" class="form-input" name="password" placeholder="Hasło"/>
                    <small id="errors-password"></small>
                </div>

                <div class='form-inputs'>
                    <label for="password2" class='form-label'>Potwierdź hasło</label>
                    <input id="password2" type="password" class="form-input" name="password2" placeholder="Potwierdź hasło"/>
                    <small id="errors-password2"></small>
                    <small id="error"></small>
                </div>
                
                <button class='form-input-btn' type="submit" id='submit'>Zmień hasło</button>
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

    <script src="resetPassword.js"></script>

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