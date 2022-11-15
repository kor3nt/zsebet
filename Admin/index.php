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

    if($_SESSION['role'] == "user"){
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

    <!-- Ikony -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <!-- JQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</head>
<body>
    <!-- Nawigacja -->
    <div id="Nav">
        <div id="NavbarContainer">
            <div class="row">
                <h1 id="NavLogo">ZSE<span class='yellow-color'>BET</span></h1>
                
                <div id="NavInfo">
                    <ul id="NavMenu">
                        <li class="NavItem"><a class="NavLinks" href="../Profile"><i class="fa fa-user" id='userNav' aria-hidden="true"></i>&nbsp;<span id='profil'><?php echo $_SESSION['username']?></span></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Dodawanie meczy, info o graczach, dodawanie tytułów gier -->
    <div class="menu">
        <a href="../Bets">< Powrót</a>
        <a href="#" id="addBtn">Dodaj mecz</a>
        <?php
            if($_SESSION['role'] == "admin"){
                echo '<a href="Players">Gracze</a>';
                echo '<a href="#" id="codeBtn">Kody</a>';
            }
        ?>
        
        
    </div>
    
    <?php
        if($_SESSION['role'] == "admin"){
            echo '<!-- Tytuły gier -->
            <div class="gameSection">
                    <div class="row">
                        <div class="addGameForm">
                            <form>
                                <label for="titleGame">Tytuł gry: </label><br>
                                <input type="text" id="titleGame" name="titleGame"><br>
        
                                <button type="button" id="addGame">Dodaj</button>
                            </form>
                        </div>
        
                        <div id="gamesSection">
                            
                        </div>
                    </div>
            </div>
        ';
        }
    ?>
    
    <!-- Panel z meczami zablokowanymi i aktywnymi -->
    <div class="Section">   
        <div class="choose">
            <form id="filterMatch">
                <label for='active' class='custom-radio'>
                    <input type='radio' id='active' name='match' value='0' onclick="matchesWrite(0);" checked>
                    <span class="radio-btn">Aktywne</span>
                </label>

                <label for='block' class='custom-radio'>
                    <input type='radio' id='block' name='match' value='1' onclick="matchesWrite(1);">
                    <span class="radio-btn">Zablokowane</span>
                </label>
            </form>
        </div>
        <div class="output">
            <div class="none">
                <h1><i class="fa fa-exclamation-circle" aria-hidden="true"></i></h1>
                <p>Brak meczy!</p>
            </div>

            <div class="outputs">

            </div>
        </div>
    </div>
    

    <!-- Modal edycji meczu -->
    <div id="editModal" class="modal">
        <div class="modal-content">
            <span id="close">&times;</span>
            
            <h2 id="title"></h2>
            
            <form>
                <div class="input">
                    <label for='Label'>Tytuł: </label><br>
                    <input type='text' id='Label' name="Label" placeholder='Team A - Team B'>
                </div>

                <div class="input">
                    <label for='TeamA'>Guzik 1:</label><br>
                    <input type='text' id='TeamA' name="TeamA" placeholder='Wprowadź drużynę 1'>
                </div>

                <div class="input">
                    <label for='TagA'>Tag 1:</label><br>
                    <input type='text' id='TagA' name="TagA" placeholder='Wprowadź tag drużyny 1'>
                </div>

                <div class="input">
                    <label for='TeamB'>Guzik 2:</label><br>
                    <input type='text' id='TeamB' name="TeamB" placeholder='Wprowadź drużynę 2'>
                </div>

                <div class="input">
                    <label for='TagB'>Tag 2:</label><br>
                    <input type='text' id='TagB' name="TagB" placeholder='Wprowadź tag drużyny 2'>
                </div>

                <div class="input">
                    <label for='game'>Gra: </label><br>
                    <select id='game'>
                        
                    </select>
                </div>

                <div class="input">
                    <label for='date'>Data:</label><br>
                    <input type="datetime-local" id='date' name="date">
                </div>

                <div class="input" id='winnerInput'>

                </div>

                <div class="input-btn" id="SaveMatch">
                    
                </div>
            </form>
        </div>
    </div>

    <!-- Modal dodawania meczu -->
    <div id="addModal" class="modal">
        <div class="modal-content">
            <span id="AddClose">&times;</span>
            
            <h2 id="AddTitle">Dodaj mecz</h2>
            
            <form id='MatchAdded'>
                <div class="input">
                    <label for='AddLabel'>Tytuł: </label><br>
                    <input type='text' id='AddLabel' name="AddLabel" placeholder='Team A - Team B'>
                </div>

                <div class="input">
                    <label for='AddTeamA'>Guzik 1:</label><br>
                    <input type='text' id='AddTeamA' name="AddTeamA" placeholder='Wprowadź drużynę 1'>
                </div>

                <div class="input">
                    <label for='AddTagA'>Tag 1:</label><br>
                    <input type='text' id='AddTagA' name="AddTagA" placeholder='Wprowadź tag drużyny 1'>
                </div>

                <div class="input">
                    <label for='AddTeamB'>Guzik 2:</label><br>
                    <input type='text' id='AddTeamB' name="AddTeamB" placeholder='Wprowadź drużynę 2'>
                </div>

                <div class="input">
                    <label for='AddTagB'>Tag 2:</label><br>
                    <input type='text' id='AddTagB' name="AddTagB" placeholder='Wprowadź tag drużyny 2'>
                </div>

                <div class="input">
                    <label for='chooseGame'>Gra: </label><br>
                    <select id='chooseGame'>
                        <option value="" selected hidden>Wybierz grę</option>
                    </select>
                </div>

                <div class="input">
                    <label for='AddDate'>Data:</label><br>
                    <input type="datetime-local" id='AddDate' name="AddDate">
                </div>

                <div class="input-btn">
                    <button type="button" class="btnUnlock" id="btnAddModal">Stwórz</button>
                </div>
            </form>
        </div>
    </div>

    

    <?php
        if($_SESSION['role'] == "admin"){
            echo '<!-- Modal kodów -->
            <div id="codeModal" class="modal">
                <div class="modal-code">
                    <span id="codeClose">&times;</span>
                    
                    <h2 id="codeTitle">Stwórz kod:</h2>
                    
                    <form id="MatchCode">
                        <div class="input-code">
                            <label for="codeLabel">Kod: </label><br>
                            <input type="text" id="codeLabel" name="codeLabel" placeholder="Wprowadź kod">
                        </div>
        
                        <div class="input-code">
                            <label for="codeValue">Wartość: </label><br>
                            <input type="number" id="codeValue" name="codeValue" placeholder="Wprowadź wartość">
                        </div>
        
                        <div class="input-code">
                            <p>Typ użycia:</p>
                            <input type="radio" value="1" name="code" id="one"> <label for="one">Jednorazowy - 1 gracz</label><br>
                            <input type="radio" value="2" name="code" id="few"> <label for="few">Wielorazowy - każdy gracz po 1 raz</label><br>
                            <small id="errorCode" class="error"></small>
                        </div>
        
                        <div class="input-btn">
                            <button type="button" class="btnUnlock" id="btnCodeModal">Stwórz</button>
                        </div>
        
                        <div class="scrollCode">
                            <table id="codeTable">
        
                            </table>
                        </div>
                    </form>
                </div>
            </div>';

            echo "<script src='code.js'></script>";
            echo "<script src='game.js'></script>";
        }
    ?>
    <script src='matches.js'></script>
    <script src='buttons.js'></script>
    <script src='modals.js'></script>
    <script src='createMatch.js'></script>
    
</body>
</html>