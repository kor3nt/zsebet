// Get input's id
const name1 = document.getElementById("name1") 
const surname = document.getElementById("surname") 
const username = document.getElementById("username") 
const email = document.getElementById("email") 
const password = document.getElementById("password") 
const password2 = document.getElementById("password2") 

// Validate and send to php file
function validateForm(){
    const nameValidate = checkName(name1.value.trim(), document.getElementById('errors-name'), "Podaj imię!");
    const surnameValidate = checkName(surname.value.trim(), document.getElementById('errors-surname'), "Podaj nazwisko!");
    const usernameValidate = checkUsername();
    const emailValidate = checkEmail();
    const passwordValidate = checkPassword();
    const confirmPasswordValidate = CheckConfirmPassowrd();

    if(nameValidate && surnameValidate && usernameValidate && emailValidate && passwordValidate && confirmPasswordValidate){
        return true;
    }

    return false;
}

// Validate name and surname
function checkName(value, error, errorValue){
    if(!value || !/^[ a-zA-ZąćęłńóżźśĄĆĘŁŃÓŻŹĆŚ]{2,}$/.test(value)){ 
        error.innerHTML = errorValue;
        return false;
    } 
    else{
        error.innerHTML = "";
        return true;
    }
}

// Validate username
function checkUsername(){
    if(!username.value.trim() || !/^[a-zA-Z0-9ąćęłńóżźśĄĆĘŁŃÓŻŹĆŚ._%+-]{3,}$/.test(username.value.trim())){
        document.getElementById('errors-username').innerHTML = "Podaj nick!";
        return false;
    } 
    else{
        document.getElementById('errors-username').innerHTML = "";
        return true;
    }  
}

// Validate email
function checkEmail(){
    if(!email.value.trim()){
        document.getElementById('errors-email').innerHTML = "Podaj e-mail!";
        return false;
    } 
    else if(!/^[a-zA-Z0-9._%+-]+@(zse.krakow.pl)$/.test(email.value.trim())){
        document.getElementById('errors-email').innerHTML = "E-mail jest nie poprawny!";
        return false;
    }
    else{
        document.getElementById('errors-email').innerHTML = "";
        return true;
    } 
}

// Validate password
function checkPassword(){
    if(!password.value.trim()){
        document.getElementById('errors-password').innerHTML = 'Podaj hasło!';
        return false;
    }   
    else if(password.value.trim().length < 6){
        document.getElementById('errors-password').innerHTML = 'Hasło musi być dłuższe niż 6 znaków!';
        return false;
    }
    else if (password.value.trim().search(/[a-z]/i) < 0) {
        document.getElementById('errors-password').innerHTML = "Hasło musi zawierać literę!";
        return false;
    }
    else if (password.value.trim().search(/[0-9]/) < 0) {
        document.getElementById('errors-password').innerHTML = "Hasło musi zawierać liczbę!";
        return false;
    }
    else if(password.value.trim().search(/\W|_/g) < 0){
        document.getElementById('errors-password').innerHTML = "Hasło musi zawierać znak specjalny!";
        return false;
    }
    else{
        document.getElementById('errors-password').innerHTML = "";
        return true;
    }
}

// Validate confirmed password
function CheckConfirmPassowrd(){
    if(!password2.value.trim()){
        document.getElementById('errors-password2').innerHTML = 'Musisz potwierdzić hasło!';
        return false;

    } 
    else if(password2.value.trim() !== password.value.trim()){
        document.getElementById('errors-password2').innerHTML =  'Hasła nie są podobne!';
        return false;
    }
    else{
        document.getElementById('errors-password2').innerHTML = "";
        return true;
    }
}



