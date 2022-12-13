import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";

const Comments = async() =>{
const { token } = useContext(AuthContext);
 
        const respo = await fetch('http://ferasjobeir.com/api/posts/942', {
          method: "get",
          headers: {
            // "Content-Type": `application/json`,
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await respo.json();
        console.log(json.data);
        useEffect(()=>{Comments()},[])
return(
    <input  type = 'button' value='click meeeeeee' onClick={Comments}/>
)

}
export default Comments