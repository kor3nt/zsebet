import React, { useState } from 'react'
import FormSignup from './FormSignup'
import FormSuccess from './FormSuccess'
import Footer from '../Footer'
import values from './useForm'

const Form = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    function submitForm(){
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
                        <FormSignup submitForm={submitForm}/>
                    </div>
                    <Footer/>
                </div>
                
                
                ) : (<FormSuccess />)}
        </>
    )
}




export default Form