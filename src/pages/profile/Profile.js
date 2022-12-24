import { useContext, useEffect, useState, useRef } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import './profile.css'
import Wrapper from '../../components/wrapper/Wrapper'

const Profile = () =>{
    const { user, token } = useContext(AuthContext)
    const [data, setUserData] = useState(user)
    const [myposts, setMypost] = useState([])
    const [mydel, setmydel] = useState([])
    const navigate = useNavigate()
 
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
    // console.log(data)
    if (json.success){
        setTimeout(() => {
          navigate('/signin')
        })
          }
    
    }
    
    const update = async(e) =>{
    const res = await fetch('http://ferasjobeir.com/api/users/me', {
        method: 'GET',
        
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
const json1 = await res.json()
console.log(json1)
setMypost(json1.data.posts)
console.log(data)
}
   useEffect(()=>{update()},[])

   const vardelete = async (mydel) => {
    const del = await fetch(`http://ferasjobeir.com/api/posts/${mydel}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
const json2 = await del.json()
console.log(json2)
if(json2.success){
    const newPost = [...myposts]
    const index = newPost.findIndex(post => post.id == mydel)
    newPost.splice(index, 1)
    setMypost(newPost)
    
}
}


// useEffect(()=>{vardelete()},[])
    return(
        <>
    <Wrapper title='Profile'>
        <div className='all'>
            <div  >
                {/* <div className="header">
                <h2>Profile</h2>
                </div> */}
                <div className='header2'>
                    My Information
                    </div>
                    
                    <div className="form1">
                    <form onSubmit={updateProfile}>
                        <>
                    <input  ref={fileRef} type={'file'} name="avatar" onChange={(e) =>{
                        setUserData({
                            ...data,
                            avatar: e.target.value
                        })}} style={{display:'none',
                       
                       }}  />
                    
                     <div className="imageee" ><div className="icon"><CameraAltIcon style={{color:'white'}}className="iconcamera" /></div><img className="imgpd"  src={data.avatar} value={data.avatar} onClick={()=> fileRef.current.click()}></img> </div>  
                     </>
                  
                   <br/>
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
                <div className='header2'>My Posts</div>
               <div>
               {
                     myposts?.length > 0 &&  myposts.map((mypost, i) => {
                        return(
                            <div className='mypostsss'>
                            <label>{mypost.content}</label>
                            <button  onClick={()=>vardelete(mypost.id) (window.confirm('Are you sure you wish to delete this item?'))}>Delete</button>
                            </div>
                        )

                })
            }
               </div>
              
               </div>
               </div>
               </Wrapper>
       </>
        )
            }
export default Profile