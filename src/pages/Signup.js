import { useEffect,useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import  './signup.css'

const Signup = () =>{
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()
    const navigate = useNavigate()
 
    const register = async() =>{
     const name = nameRef.current.value.trim
     const email = emailRef.current.value
     const password = passwordRef.current.value
     const passwordConfirmation = passwordConfirmationRef.current.value
    
     const response  = await fetch('http://ferasjobeir.com/api/users/register',{
         method: 'POST',
         body: JSON.stringify({
        
             name: name,
             email: email,
             password: password,
             password_confirmation: passwordConfirmation
         }),
         headers: {
             'Content-Type': 'application/json'
         } 
         
     })
     const json = await response.json()
    
     if (json.success){
       setTimeout(() => {
         navigate('/Signin')
       }, 2000)
     } else{
         window.alert(json.messages[0])
     }
 }
    return(
        <div className="signup1">
             
            <div className="all">

                <div className="form">
                <img className="image" src='https://ferasjobeir.com/frontend-app/static/media/logo.1bb8db420e540d66b7c4a6a8350ca833.svg'></img>
                <h1 className="acc">Create Account</h1>
                    <div className="signup">
                    <label htmlFor='name' className='name'>Name</label>
                        <input  ref={nameRef} type="text" name="name" className='name'/>
                        <label htmlFor='Email' className='email'>Email Adress</label>
                        <input  ref={emailRef} type="text" name="name" className='email'/>
                        <label htmlFor='password' className='password' >Password</label>
                        <input  ref={passwordRef} type="password" name="name" className='password'/>
                        <label htmlFor='password_confermation' className='passwordconf'>Password confirmation</label>
                        <input  ref={passwordConfirmationRef} type="password" name="name" className='passwordconf'/>
                        {/* <input  ref={passwordRef} type="text" name="name" className='password'/> */}
                        <div className="buttonss">
                        <input type="button" value="login"  ></input>
                         <input type="button" value="Register" className="reg" onClick={register}></input>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Signup;