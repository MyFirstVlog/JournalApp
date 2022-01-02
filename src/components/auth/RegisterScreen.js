import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator';
import { useDispatch } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm({
        name:"Alejandro",
        email:"aestrada@cidenet.com",
        password:"123456",
        password2:"123456",
    })

    const {name,email,password,password2} = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        console.log(name,email,password,password2)
        if(isFormValid()){
            console.log("Formulario Correcto")
        }
    }

    const isFormValid = () => {
        if(name.trim().length === 0){
            console.log('name required')
            dispatch(setError('name required'));
            return false;
        }else if(!validator.isEmail(email)){
            console.log('email not valid')
            dispatch(setError('email not valid'));
            return false;
        }else if(password !== password2 || password.length < 5){
            console.log('Password should be at least of 6 characters // password does not match')
            dispatch(setError('Password should be at least of 6 characters // password does not match'));
            return false
        }

        dispatch(removeError());
        return true;
    }

    return (
        <>
            <h3 className='auth__title'>Register</h3>
            <form onSubmit={handleRegister}>
                <div className="auth___alert-error">
                    hey
                </div>
                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete='off'   
                    value={name}
                    onChange={handleInputChange}

                />
                <input 
                    type="text"
                    placeholder="email"
                    name="email"
                    className="auth__input"
                    autoComplete='off'
                    value={email}
                    onChange={handleInputChange}

                />

                <input 
                    type="password"
                    placeholder="password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}

                />
                <input 
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}

                />


                <button
                    className='btn btn-primary btn-block mb-5'
                    type="submit"
                >
                    Register
                </button>

                <Link className='link' to= "/auth/login">
                    Already Registered
                </Link>

            </form>
        </>
    )
}
