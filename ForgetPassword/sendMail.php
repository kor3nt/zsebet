<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require "../PHPMailer/PHPMailer.php";
require "../PHPMailer/SMTP.php";
require "../PHPMailer/Exception.php";

function sendMail($email, $otp){
  $mail = new PHPMailer();

	//smtp settings 
	$mail->CharSet = "UTF-8";
  $mail -> isSMTP();
  $mail ->Host = "ssl0.ovh.net";
  $mail -> SMTPAuth = true;
  $mail -> Username = "email@email.com";
  $mail -> Password = 'haslo';
  $mail -> Port = 465;
  $mail -> SMTPSecure = "ssl";


    //email settings
    $mail -> isHTML(true);
    $mail -> setFrom("zsecup@zse.krakow.pl");
		$mail -> addAddress($email);
		$mail -> Subject = "Odzyskaj hasło";
		$mail -> Body = '<table style="width:100%;margin:auto;text-align:center">
        <thead>
          <tr>
            <td style="width: 100%; background: #1f1f1f; font-family: &quot;Encode Sans Expanded&quot;, sans-serif; border-bottom-right-radius: 100%;"><h1 style="color: rgb(226, 226, 226);">ZSE<span style="color:rgb(255,191,0)">BET</span></h1></td>
          </tr>
        </thead>
        <tbody>          
            <tr>
                <td><h2>Cześć!</h2></td>
            </tr>
            <tr>
                <td style="font-size:14px"><p>By odzyskać hasło, kliknij poniższy link:</p></td>
            </tr>
            <tr>
                <td><h3 style="margin-bottom:50px"><b>'.$link.'</b></h3></td>
            </tr>
        </tbody>
        <tfoot>
          <tr>
            <td style="width: 100%; background: rgb(255, 191, 0); font-family: &quot;Encode Sans Expanded&quot;, sans-serif; border-top-left-radius: 50% 30%;"><p><small><span zeum4c2="PR_2_0" data-ddnwab="PR_2_0" aria-invalid="spelling" class="LI ng">ZSEBET</span> © 2022 Wszelkie prawa zastrzeżone.</small></p><p>Created by: <a href="https://www.facebook.com/DuolyStudio" style="text-decoration-line: none; color: rgb(17, 107, 224); font-weight: bold;" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/DuolyStudio&amp;source=gmail&amp;ust=1667138774371000&amp;usg=AOvVaw1Ky6434K5N8Sx75rlzQV-X">Duoly </a></p></td>
          </tr>
        </tfoot>
      </table>';

		if($mail -> Send()){
            $mail -> smtpClose();
			return true;
		}
		else{
            $mail -> smtpClose();
			return false;
		}	
}

?>