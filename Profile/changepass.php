<?php
    session_start();
    session_unset();
    header("Location: ../ForgetPassword/index.php");
?>