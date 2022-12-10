
import { NavLink} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"
import './nav.css'
import { useRef } from "react"
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ExploreIcon from '@mui/icons-material/Explore';
import ListIcon from '@mui/icons-material/List';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { display, style } from "@mui/system"
import { useState } from "react"
import { Done } from "@mui/icons-material"
const Nav = () => {
    const {token} = useContext(AuthContext)
    const navigate = useNavigate()
    const [isActive, setIsActive] = useState(false);
    const [Active, setActive] = useState(false);
    const handleClick = () => {
      setIsActive(current => !current);}
      const handleClick2 = () => {
        setActive(current => !current);}
    return (
      
        <nav className="navbar">
        <img className="image"src="https://ferasjobeir.com/frontend-app/static/media/logo.1bb8db420e540d66b7c4a6a8350ca833.svg"/>
        <ul className="iconsandwords" >
        
          <span   onClick={handleClick} style={{
          
          color: isActive ? '#1da1f2' : '',
        }}><HomeIcon/><li  onClick={()=>navigate('/')} className='tab'   >Home </li></span>
          <span ><EmailIcon/><li className='tab'  onClick={()=>navigate('/somewhere')}>Messages</li></span>
          <span><BookmarkIcon/><li className='tab'   onClick={()=>navigate('/somewhere')} >Bookmarks</li></span>
          <span><ExploreIcon/><li className='tab'  onClick={()=>navigate('/somewhere')}>Explore</li></span>
          <span><ListIcon/><li className='tab' onClick={()=>navigate('/somewhere')} >Lists</li></span>
          <span onClick={handleClick2} style={{
          
          color: Active ? '#1da1f2' : '',
        }}><PersonIcon/><li className='tab'  onClick={()=>navigate('/profile')} >Profile</li></span>
          <span><LockIcon/><li className='tab'  onClick={()=>navigate('/Signin')}>Sign Out</li></span>
  
        </ul>
      </nav>

    )
}
export default Nav