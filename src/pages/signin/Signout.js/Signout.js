import { useContext, useEffect } from "react"
import { useNavigate, navigate } from "react-router-dom"
import { AuthContext } from "../../../context/AuthContext"

const Signout = () =>{
    const authCtx= useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() =>{
        authCtx.signout()
        setTimeout(() =>{
            navigate ('/signin')
        },2000)
    },[])
    return(
        <h3 classname="text-center my-5"> 
        Looking Forward to see you again!
        </h3>

    )
}
export default Signout