import React, { useState } from "react";
import moment from "moment/moment";
import { Favorite } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import classes from "../../pages/home.module.css";
import { AuthContext } from "../../context/AuthContext";
import { useEffect, useContext, useRef  } from "react";
import Comments from "../Comments";

const Post = ({
  id,
  avatar,
  name,
  content,
  likes_count,
  comments_count,
  createdAt,
  posts,
  likedd,
  setPosts,
}) => {
  const [comentts, setmycomentts] = useState([])
  const { token } = useContext(AuthContext);
  
  const comments = async() =>{
    setwait(true)
            const respo = await fetch(`http://ferasjobeir.com/api/posts/${id}`, {
              method: "get",
              headers: {
                "Content-Type": `application/json`,
                Authorization: `Bearer ${token}`,
              },
            });
            const json = await respo.json();
          
            
          setmycomentts(json.data.comments)
          setOpen(!open)
          setwait(false)
           }
          //  comments()
          // useEffect(()=>{comments()},[]) 
          console.log(comentts)
          console.log("hi") 
         
 const [open, setOpen] = useState(false);
 const [wait, setwait] = useState(false);
  const [mycomment, setmycomment] = useState({
    content: "",
    post_id: id,
  }); 
  const postonclick = (e) => {
    mycomment[e.target.name] = e.target.value;
  };
  const textpartref = useRef();

 const addcomment = async() =>{
 
  const respondcomm = await fetch(`http://ferasjobeir.com/api/comments`, {
    method: "post",
    headers: {
      "Content-Type": `application/json`,
      Authorization: `Bearer ${token}`,
      
    },
    body:(JSON.stringify(mycomment))
    
  });
  const json = await respondcomm.json();
  console.log(json)
  if (json.success) {
    const newData = [json.data, ...comentts];
    textpartref.current.value = "";
    setmycomentts(newData);
  } else {
    alert(json.messages);
  }
};
console.log(mycomment)
const sendcomment = async (e) => {
  await addcomment(mycomment);
};
const [liked, setliked] = useState(
  {
    post_id: id
  }
)
const postlike = async () => {
  const resp = await fetch(`http://ferasjobeir.com/api/posts/${likedd ? 'unlike':'like'}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body:(JSON.stringify(liked))
      
  });
  const json = await resp.json();
  if (json.success) {
      const newPosts = [...posts]
      const index = newPosts.findIndex(singlePost => singlePost.id == json.data.id)
      newPosts[index] = json.data
      setPosts(newPosts)
  }
};
// const ifnotnull () =>
// {if (comments?.length>0) return(setOpen())}
  return (
    <div className={classes.post} key={id}>
      <img src={avatar}></img>
      <div className={classes.writings}>
        <h3>{name}</h3>
        <h6>{moment(createdAt).startOf("hh").fromNow()}</h6>
        <p>{content}</p>

        <div className={classes.iconandcomm}>
          <div ><div className={classes.heart1}>
            {/* <FavoriteBorderIcon /> */}
            {/* <div  value={likes_count}>
         
          </div> */}
          <button className={classes.newheart}
                        type="button"
                        id={liked}
                        onClick={()=>postlike(posts.id)}><div className={classes.iconheart}>

                            {likedd?<Favorite style={{ color: '#d32f2f' }}/> :<FavoriteBorderIcon />}  

                    
                        </div>
                        
                      </button>
                      <div className={classes.count}>{likes_count}</div>
                      </div>
                      </div>
          <div >
            <span    className={classes.heart}>
            <ChatBubbleOutlineIcon />
            <input type="button" disabled={wait} onClick={() => {  
            comments()} } value={comments_count}></input>
          </span>
          </div>
          </div> 
      
      {open && (
        
        <div className={classes.fitt}
          >
            
            <p style={{display:'block'}}>
              {comentts?.length>0 &&
              comentts.map((coment,i) =>{
                return(
                  <div className={classes.allcomment} key={i}>
                    <img className={classes.imgcomment} src={coment.user.avatar}></img>
                    <div className={classes.commentwriting}>
                    <h2 className={classes.usercomment}>{coment.user.name}</h2>
                    <h6>{moment(coment.created_at).startOf("hh").fromNow()}</h6>

                    <label>{coment.content}</label>
                    </div>
                  </div>

                )
              })}
            </p>
            <div style={{
              backgroundColor: '#f3f4f5',
              width: '100%',
              height:1,
              margin: '10px 0'
            }}>
            </div>
         <div className={classes.borderrr}>
          <input ref={textpartref} onChange={postonclick} className={classes.commentbox} type='text' name="content" placeholder="add a new comment"></input>
          <input onClick={() => sendcomment()} className={classes.commentbutton} type='button' value="add"></input>
          </div>

      
        

        </div>
      )}
      </div> 
    </div>
  );
};

export default Post;
