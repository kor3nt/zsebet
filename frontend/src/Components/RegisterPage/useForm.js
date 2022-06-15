import { useState, useEffect } from "react";
import Axios from 'axios'

const useForm = (callback, validate) => {
    const [values, setValues] = useState({
        name1: '',
        surname: '',
        email: '',
        username: '',
        password: '',
        password2: ''
    });

    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = e => {
        const {name, value} = e.target

        setValues({
            ...values,
            [name]: value
        });
    };
    
    const [registerStatus, setRegisterStatus] = useState("");
    const handleSubmit = e => {
        e.preventDefault();

        Axios.post("http://localhost:3001/signup",{
            nickname: values.username,
            password: values.password, 
            name1: values.name1, 
            surname: values.surname, 
            email: values.email
        }).then((response) => {
            if(response.data){
                setRegisterStatus(response.data);
            } else{
                setRegisterStatus("");
            }
        });
        setErrors(validate(values));
        setIsSubmitting(true);
    }

    useEffect(() => {
        if(Object.keys(errors).length === 0 && isSubmitting){
            callback();
        }
    }, [errors])

    return {handleChange, values, handleSubmit, errors, registerStatus};
}

export default useForm;