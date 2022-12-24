
import {  useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import classes from "./home.module.css";
import { useRef } from "react";

import Post from "../post/Post";
import Wrapper from '../../components/wrapper/Wrapper'
const Home = () => {
  const { user, token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  let [count, setCount] = useState(1);
  const [counterc, setcounterc] = useState()
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
      setcounterc(posts.comments_count)
    };
    getPosts(count);
  }, [count]);
  const page1 = () => {
    if (count <= 100) {
      setCount(count + 1);
    }

  };
  
  return (
      <Wrapper title='Home'>
      
      <div className={classes.headers}>
        
        <div className={classes.mypost}>
          <div >
            {" "}
            <img className={classes.imagepnd} src={data.avatar}></img>
          </div>
          <input
            className={classes.buttontype}
            ref={textpartref}
            onChange={postonclick}
            type="text"
            name="content"
            style={{border: 'none'}}
            placeholder="what is happening?"></input>
          <input
            className={classes.create}
            onClick={() => sendpost()}
            type="button"
            value="create post"></input>
        </div>
      </div>
      <div className={classes.singlepost}>
        {posts?.length > 0 &&
          posts.map((post, i) => {
            const er = post.created_at;
            
            return (
        
              <Post
                id={post.id}
                avatar={post.user.avatar}
                name={post.user.name}
                content={post.content}
                likes_count={post.likes_count}
                commentcount={post.comments_count}
                createdAt={post.created_at}
                likedd ={post.liked_by_current_user}
                posts = {posts}
                setPosts = {setPosts} 
                mysinglepost = {mysinglepost}
                setcounterc = {setcounterc}
                counterc={counterc}
                
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
      </Wrapper>
  
  );
};
export default Home;