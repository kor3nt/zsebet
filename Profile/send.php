<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    use PHPMailer\PHPMailer\SMTP;
        
    if(isset($_POST['kname']) && isset($_POST['kemail']) && isset($_POST['ktheme']) && isset($_POST['kdescript'])){
    $name = $_POST['kname'];
    $email = $_POST['kemail'];
    $theme = $_POST['ktheme'];
    $body = $_POST['kdescript'];

    require "../PHPMailer/PHPMailer.php";
    require "../PHPMailer/SMTP.php";
    require "../PHPMailer/Exception.php";

     $mail = new PHPMailer();

    //smtp settings 
    $mail->CharSet = "UTF-8";
    $mail -> isSMTP();
    $mail ->Host = "ssl0.ovh.net";
    $mail -> SMTPAuth = true;
    $mail -> Username = "kontakt@esportwzse.pl";
    $mail -> Password = 'haslo';
    $mail -> Port = 465;
    $mail -> SMTPSecure = "ssl";


    //email settings
    $mail -> isHTML(true);
    $mail -> setFrom($email);
    $mail -> addAddress("zsecup@zse.krakow.pl");
    $mail -> Subject = $theme;
    $mail -> Body = "Imie i nazwisko: ".$name." <br>
    email: ".$email." <br>
    temat: ".$theme."<br>
    opis: ".$body;

    if($mail -> Send()){
        echo '<script>alert("Wiadomość wysłana! Odezwiemy się wktórce!")</script>';
    }
    else{
        echo "error";
        //echo 'Mailer Error: ' . $mail->ErrorInfo;
    }
        
    $mail -> smtpClose();
    }
    
    header("Location: ../Main/main.php");
?>