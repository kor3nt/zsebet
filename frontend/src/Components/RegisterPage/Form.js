import React, { useState } from 'react'
import FormSignup from './FormSignup'
import FormSuccess from './FormSuccess'
import Footer from '../Footer'
import Axios from 'axios';

const Form = (values) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    function submitForm(){
        Axios.post("http://localhost:3001/signin",{
            nickname: values.username,
            password: values.password, 
            name: values.name, 
            surname: values.surname, 
            email: values.email
        }).then((response) => {
            console.log(response);
        });

        //setIsSubmitted(true);
    }

    return (
        <>
            {!isSubmitted ? (
                <div>
                    <div className='form-container'>
                        <div className='form-content-left'>
                            <img className='form-img' src={require('../../Img/svg4.svg').default} alt='join' />
                        </div>
                        <FormSignup submitForm={submitForm} />
                    </div>
                    <Footer/>
                </div>
                
                
                ) : (<FormSuccess />)}
        </>
    )
}




export default Form