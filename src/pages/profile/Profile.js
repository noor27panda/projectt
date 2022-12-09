import { useContext, useEffect, useState, useRef } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import Nav from "../nav/Nav"
import Gravatar from 'react-gravatar'
import './profile.css'
const Profile = () =>{
    const { user, token } = useContext(AuthContext)
    const [data, setUserData] = useState(user)
    const fileRef = useRef()
    const updateProfile = async(e) =>{

        e.preventDefault()
        console.log(fileRef.current.files[0])
         const form = e.target
        const newData = new FormData(form)
        console.log(form.method)
        for(var key of newData.keys()){
            console.log(key, newData.get(key))
        }
        
        const response = await fetch('http://ferasjobeir.com/api/users/me', {
            method: 'post',
            body: newData,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': `application/json`
            }
        })
    const json = await response.json()
    console.log(json)
    }
   
    return(
        <>
        <Nav/>
        <div className='all'>
            <div >
                <div className="header">
                <h2>Profile</h2>
                </div>
                <div className='header2'>
                    My Information
                    </div>
                    <input ref={fileRef} type={'file'} style={{
                        display: 'none'
                    }} />
                   
                     <Gravatar
                    onClick={()=> fileRef.current.click()} 
                    clasName='imagepand' email="noorpro@icloud.com" size={150} style={{
                        borderRadius: '80px',
                        marginLeft: 240,
                        
                    }}/>
                    
                    <div className="form1">
                    <form onSubmit={updateProfile}>
                    
                    <label htmlFor="name" >Name <span style={{ color: 'red' }}>*</span></label>
                    <input required="required"  id = 'name' type='text' name='name' value={data.name} onChange={(e) =>{
                        setUserData({
                            ...data,
                            name: e.target.value
                        })
                    }}></input>
                    <label htmlFor="email" >Email Adress <span style={{ color: 'red' }}>*</span></label>
                    <input  required="required" id='email' type='text' name='email' value={data.email} onChange={(e) =>{
                        setUserData({
                            ...data,
                            email: e.target.value
                        })
                        
                    }}></input>
                    <label htmlFor="password" >Password</label>
                    <input required="required" id='password' type="password" name='password' value={data.password} onChange={(e) =>{
                        setUserData({
                            ...data,
                            password: e.target.value
                        })
                    }}></input>
                     <label htmlFor="newpassword" > New Password</label>
                    <input id='newpassword' type="password"  name='new_password' onChange={(e) =>{
                        setUserData({
                            ...data,
                            newpassword: e.target.value
                        })
                    }}></input>
                     <label htmlFor="newpasswordconf" > New Password Confirmation</label>
                    <input id='newpasswordconf' type="password" name='new_password_confirmation' onChange={(e) =>{
                        setUserData({
                            ...data,
                            newpasswordconf: e.target.value
                        })
                    }}></input>
                    <input type="hidden" name="_method" value="put" />
                    <button className="btn" type='submit'> update profile </button>
                    </form>
                </div>
            </div>
               </div>
               </>
        )
}
export default Profile