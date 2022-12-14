import React, { useState } from "react";
import moment from "moment/moment";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import classes from "../../pages/home.module.css";
import { AuthContext } from "../../context/AuthContext";
import { useEffect, useContext,  } from "react";
import Comments from "../Comments";

const Post = ({
  id,
  avatar,
  name,
  content,
  likes_count,
  comments_count,
  createdAt,
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
          <div ><span className={classes.heart1}>
            <FavoriteBorderIcon />
            <input type="button" value={likes_count}></input>
          </span>
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
                    <h6>{moment(createdAt).startOf("hh").fromNow()}</h6>

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
          <input className={classes.commentbox} type='text' placeholder="add a new comment"></input>
          <input className={classes.commentbutton} type='button' value="add"></input>
          </div>

      
        

        </div>
      )}
      </div> 
    </div>
  );
};

export default Post;
