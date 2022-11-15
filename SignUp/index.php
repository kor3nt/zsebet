<?php 
    session_start();
    if ((isset($_SESSION['verify'])) && ($_SESSION['verify'] == 0)){
        header('Location: ../Verify');
        exit();
    }

    if((isset($_SESSION['verify'])) && ($_SESSION['verify'] == 1)){
        header('Location: ../Bets');
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
            <img class='form-img' src="../Img/svg4.svg" alt='join' />
        </div>
        
        <div class='form-content-right'>
            
            <!-- Ekran ładowania -->
            <div class="loading">
                <div class="lds-ring"><div></div><div></div></div>
            </div>
            

            <!-- Formularz -->
            <form class='form' id='form'>
                <h1><span class="span-color">Dołącz do nas już teraz!</span> Utwórz swoje konto, wypełniając poniższy formularz.</h1>

                <div class='form-inputs'>
                    <label for="name1" class='form-label'>Imię</label>
                    <input id="name1" type="text" class="form-input" name="name1" placeholder="Imię"/>
                    <small id="errors-name"></small>
                </div>
                

                <div class='form-inputs'>
                    <label for="surname" class='form-label'>Nazwisko</label>
                    <input id="surname" type="text" class="form-input" name="surname" placeholder="Nazwisko"/>
                    <small id="errors-surname"></small>
                </div>
                

                <div class='form-inputs'>
                    <label for="email" class='form-label'>E-mail</label>
                    <input id="email" type="email" class="form-input" name="email" placeholder="E-mail"/>
                    <small id="errors-email"></small>
                </div>
                

                <div class='form-inputs'>
                    <label for="username" class='form-label'>Login</label>
                    <input id="username" type="text" class="form-input" name="username" placeholder="Login"/>
                    <small id="errors-username"></small>
                </div>
                

                <div class='form-inputs'>
                    <label for="password" class='form-label'>Hasło</label>
                    <input id="password"  type="password" class="form-input" name="password" placeholder="Hasło"/>
                    <small id="errors-password"></small>
                </div>
                

                <div class='form-inputs'>
                    <label for="password2" class='form-label'>Potwiedz hasło</label>
                    <input id="password2"  type="password" class="form-input" name="password2" placeholder="Potwierdz hasło"/>
                    <small id="errors-password2"></small>
                </div>
                
                <button class='form-input-btn' type="submit" id='submit'>Zarejestruj</button>
                <span class='form-input-login'>Masz już konto? <a href="../SignIn">Zaloguj się</a></span>
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

    <script src="validate.js"></script>
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