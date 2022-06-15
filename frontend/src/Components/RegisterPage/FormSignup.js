import React from 'react'
import useForm from './useForm'
import validate from './validateinfo';
import './Form.css'

const FormSignup = ({submitForm}) => {
    const {handleChange, values, handleSubmit, errors,registerStatus} = useForm(submitForm, validate);

    

    return (
        <div className='form-content-right'>
            <form className='form' onSubmit={handleSubmit}>
                <h1><span className="span-color">Dołącz do nas już teraz!</span> Utwórz swoje konto, wypełniając poniższe informacje.</h1>

                <div className='form-inputs'>
                    <label htmlFor="name1" className='form-label'>Imię</label>
                    <input id="name1" type="text" className="form-input" name="name1" placeholder="Imię" value={values.name1} onChange={handleChange}/>
                    {errors.name && <p>{errors.name}</p>}
                </div>
                

                <div className='form-inputs'>
                    <label htmlFor="surname" className='form-label'>Nazwisko</label>
                    <input id="surname" type="text" className="form-input" name="surname" placeholder="Nazwisko" value={values.surname} onChange={handleChange}/>
                    {errors.surname && <p>{errors.surname}</p>}
                </div>
                

                <div className='form-inputs'>
                    <label htmlFor="email" className='form-label'>E-mail</label>
                    <input id="email" type="email" className="form-input" name="email" placeholder="E-mail" value={values.email} onChange={handleChange}/>
                    {errors.email && <p>{errors.email}</p>}
                </div>
                

                <div className='form-inputs'>
                    <label htmlFor="username" className='form-label'>Login</label>
                    <input id="username" type="text" className="form-input" name="username" placeholder="Login" value={values.username} onChange={handleChange}/>
                    {errors.username && <p>{errors.username}</p>}
                </div>
                

                <div className='form-inputs'>
                    <label htmlFor="password" className='form-label'>Hasło</label>
                    <input id="password"  type="password" className="form-input" name="password" placeholder="Hasło" value={values.password} onChange={handleChange}/>
                    {errors.password && <p>{errors.password}</p>}
                </div>
                

                <div className='form-inputs'>
                    <label htmlFor="password2" className='form-label'>Potwiedz hasło</label>
                    <input id="password2"  type="password" className="form-input" name="password2" placeholder="Potwierdz hasło" value={values.password2} onChange={handleChange}/>
                    {errors.password2 && <p>{errors.password2}</p>}
                </div>
                
                <div className='form-inputs'>
                    <p>{registerStatus}</p>
                </div>
                
                <button className='form-input-btn' type="submit">Zarejestruj</button>
                <span className='form-input-login'>Masz już konto? <a href="#">Zaloguj się</a></span>
            </form>
        </div>
    )
}

export default FormSignup