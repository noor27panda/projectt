import Nav from "./nav/Nav";
import {  useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import classes from "./home.module.css";
import { useRef } from "react";
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';
import Post from "../components/Post/Post";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";
import { Favorite } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [allcomments, setallcomments] = useState([]);
  const navigate = useNavigate()
  let [count, setCount] = useState(1);
  const [data, setUserData] = useState(user);
  const [mysinglepost, setmysinglepost] = useState({
    content: "",
  });
  const postonclick = (e) => {
    mysinglepost[e.target.name] = e.target.value;
  };
  
  const textpartref = useRef();
  const addpost = async () => {
    const respo = await fetch("http://ferasjobeir.com/api/posts", {
      method: "post",
      headers: {
        "Content-Type": `application/json`,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(mysinglepost),
    });
    const jsonpost = await respo.json();
    console.log(jsonpost);
    if (jsonpost.success) {
      const newData = [jsonpost.data, ...posts];
      textpartref.current.value = "";
      setPosts(newData);
    } else {
      alert(jsonpost.messages);
    }
  };
  const sendpost = async (e) => {
    await addpost(mysinglepost);
  };
  


  // let timerRef = useRef();

  useEffect(() => {
    const getPosts = async (count) => {
      const response = await fetch(
        `http://ferasjobeir.com/api/posts?page=${count}`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await response.json();
      console.log(json);
      setPosts([...posts,...json.data.data]);
    };
    getPosts(count);
  }, [count]);
  const page1 = () => {
    if (count <= 100) {
      setCount(count + 1);
    }
  };
  

  return (
    <>
      <Nav />
      <div className={classes.headers}>
        <div className={classes.home}>
          <div><h1>Home</h1></div>
         <ul className={classes.iconshidden1}> 
         <li onClick={()=>navigate('/signout')} className={classes.iconshidden}><LockIcon/> </li>
          <li onClick={()=>navigate('/profile')} className={classes.iconshidden} ><PersonIcon/></li>
          <li onClick={()=>navigate('/')} className={classes.iconshidden}><HomeIcon/></li>
          </ul>
        </div>
        <div className={classes.mypost}>
          <div>
            {" "}
            <img className={classes.imagepnd} src={data.avatar}></img>
          </div>
          <input
            className={classes.buttontype}
            ref={textpartref}
            onChange={postonclick}
            type="text"
            name="content"
            placeholder="what is happening?"></input>
          <input
            className={classes.create}
            onClick={() => sendpost()}
            type="button"
            value="create post"></input>
        </div>
      </div>
      <div>
        {posts?.length > 0 &&
          posts.map((post, i) => {
            const er = post.created_at;
            // console.log(er)
            return (
        
              <Post
                id={post.id}
                avatar={post.user.avatar}
                name={post.user.name}
                content={post.content}
                likes_count={post.likes_count}
                comments_count={post.comments_count}
                createdAt={post.created_at}
                likedd ={post.liked_by_current_user}
                posts = {posts}
                setPosts = {setPosts} 
                
                
              />
             
            );  
          })}
      

        <div className={classes.button}>
          <input
            type="buttons"
            className={classes.button} 
            onClick={page1}
            value="Load More"></input>
        </div>
      </div>
    </>
  );
};
export default Home;
