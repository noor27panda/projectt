import { useRef } from "react"
import {  useNavigate} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext.js"
import {useContext} from 'react'

const Signin =() =>{
    const emailRef = useRef()
   const passwordRef = useRef()
const navigate = useNavigate()
const authCtx = useContext(AuthContext)
    const   login = async() =>{
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const responce = await fetch ('http://ferasjobeir.com/api/users/login',{
        method: 'POST',
        body: JSON.stringify({
    
            email: email,
            password: password,

        }),
        headers: {
            'Content-Type': 'application/json'
        } 
    })
    const json = await responce.json()
   
    if (json.success){
        authCtx.signIn(json)
      setTimeout(() => {
        navigate('/')
      })
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
       
            <label htmlFor='Email' className='email'>Email Adress</label>
            <input  ref={emailRef} type="text" name="name" className='email'/>
            <label htmlFor='password' className='password' >Password</label>
            <input  ref={passwordRef} type="password" name="name" className='password'/>
            <div className="buttonss">
            <input type="button" value="Register" className="re" onClick={()=>navigate('/Signup')} ></input>
            <input  type="button" className="reg" value = "sign in"name="name" onClick={login} ></input>
            
            </div>
        </div>
    </div>
</div>
</div>
)
    }
export default Signin