import Nav from "./nav/Nav"
import { lazy, useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import './home.css'
const Home =() =>{
    const { token } = useContext(AuthContext)
    const [posts, setPosts] = useState([])
    let [count, setCount] = useState(1)
    
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
        <div>
            {   
               posts?.length > 0 &&  posts.map((post, i) => {        
                    return (
                        <div className="post" key={i}>
                            {post.content}{post.likes_count}{post.comments_count}{post.avatar}
                            {post.avatar}
                            <div>
                            <p>{post.user.name}</p>
                            <img src={post.user.avatar}></img>
                            </div>
                        </div>
                    )
                })
                
            }
        
        <input type="button" className="button"  value="load more" onClick={page1 }></input>
        </div>
        
        </>
   )
}
export default Home