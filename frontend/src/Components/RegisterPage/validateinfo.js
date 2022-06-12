export default function validateInfo(values) {
    let errors = {}

    if(!values.name.trim()){
        errors.name = "Podaj imię!"
    } else if(!/^[a-zA-ZąćęłńóżźśĄĆĘŁŃÓŻŹĆŚ]{2,}$/.test(values.name)){
        errors.name = "Podaj imię!"
    }

    if(!values.surname.trim()){
        errors.surname = "Podaj nazwisko!"
    } else if(!/^[a-zA-ZąćęłńóżźśĄĆĘŁŃÓŻŹĆŚ-]{2,}$/.test(values.surname)){
        errors.surname = "Podaj nazwisko!"
    }

    if(!values.username.trim()){
        errors.username = "Podaj nick!"
    } else if(!/^[a-zA-Z0-9ąćęłńóżźśĄĆĘŁŃÓŻŹĆŚ._%+-]{3,}$/.test(values.username)){
        errors.surname = "Podaj nazwisko!"
    }

    if(!values.email){
        errors.email = "Podaj e-mail!"
    }  else  if(!/^[a-zA-Z0-9._%+-]+@(zse.krakow.pl)$/.test(values.email)){
        errors.email = "E-mail jest nie poprawny!"
    }

    if(!values.password){
        errors.password = 'Podaj hasło!'
    } else if(values.password.length < 6){
        errors.password = 'Hasło musi być dłuższe niż 6 znaków!'
    }

    if(!values.password2){
        errors.password2 = 'Musisz potwierdzić hasło!'
    } else if(values.password2 !== values.password){
        errors.password2 = 'Hasła nie są podobne!'
    }

    return errors;
}