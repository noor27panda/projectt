import Nav from "./nav/Nav"
import { lazy, useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import classes from './home.module.css'
import { useRef } from "react"
import dayjs from "dayjs"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Gravatar from "react-gravatar"
const Home =() =>{
    const { token } = useContext(AuthContext)
    const [posts, setPosts] = useState([])
    let [count, setCount] = useState(1)
    let timerRef= useRef()
    useEffect(() => {
        const getPosts = async (count) => {
            const response = await fetch(`http://ferasjobeir.com/api/posts?page=${count}`, {
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const json = await response.json()
            console.log(json)
            setPosts([...posts,...json.data.data])
        }
        getPosts(count)
       
       
    }, [count])
    const page1 =() =>{
        if (count <= 100){
            setCount(count + 1)
        }
    }
    
    
   return(
            <>
            <Nav/>
            <div className={classes.headers} >
                        <div className={classes.home}><h1>Home</h1></div>
                        <div className={classes.mypost} >
                        <Gravatar
                    
                    clasName={classes.imagepand} email="noorpro@icloud.com" size={60} style={{
                        borderRadius: '80px',
                        
                        
                    }}/>
                       <input className={classes.buttontype} type='text'></input> 
                       <input className={classes.create} type='button' value='create post'></input>    
                        </div>
                    </div>
        <div >
            {   
               posts?.length > 0 &&  posts.map((post, i) => {        
                    return (
                        <>
                
                        <div className={classes.post} key={i}>
                            
                            <img src={post.user.avatar}></img>
                            <div className={classes.writings}>
                                <h3>{post.user.name}</h3>
                                <h6>time</h6>
                            <p>{post.content}</p>
                            <div className={classes.iconandcomm}>
                            <span className={classes.heart}><FavoriteBorderIcon/><input type='button' value={post.likes_count}  ></input></span>
                          
                            <span className={classes.heart}><ChatBubbleOutlineIcon/><input type='button' value={post.comments_count}  ></input></span>
                           
                            </div>
                            </div>
                            
                        </div>
                        </> )
                })
                
            }
        
        <div className={classes.button}><input type="buttons" className={classes.button}  value="Load More" onClick={page1 }></input></div>
        </div>
        
        </>
   )
}
export default Home