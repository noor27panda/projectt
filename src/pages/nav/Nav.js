
import { NavLink} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"
import './nav.css'

import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ExploreIcon from '@mui/icons-material/Explore';
import ListIcon from '@mui/icons-material/List';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
const Nav = () => {
    const {token} = useContext(AuthContext)
    const navigate = useNavigate()
    // const links = [
    //     {
    //         target: '/',
    //         text: 'Home',    
    //     },
       
    //     {
    //         target: '/somewhere',
    //         text: 'Sign out',
    //         forLogged: true
    //     },
       
    //     {
    //         target: '/somewhere',
    //         text: 'Profile',
    //         forLogged: true
    //     },
       
    //     {
    //         target: '/somewhere',
    //         text: 'Profile',
    //         forLogged: true
    //     },
       
    //     {
    //         target: '/somewhere',
    //         text: 'Profile',
    //         forLogged: true
    //     }
    // ]
    return (
        // <nav>
        //     {links.map((link,i) => {
        //         if((link.forGuest &&  token) || (link.forLogged && !token)){
        //             return
        //         }
        //         return(
                    
        //             <NavLink onClick={() => {
        //                 if(link.onclick){
        //                     link.onclick()
        //                 }
        //             }} key={i} to={link.target} className={({isActive}) =>{
        //                 return isActive ? 'current' :''}
                    
        //             } > {link.text}</NavLink>
        //         )
        // })}

        // </nav>
        <nav className="navbar">
        <img className="image"src="https://ferasjobeir.com/frontend-app/static/media/logo.1bb8db420e540d66b7c4a6a8350ca833.svg"/>
        <ul className="iconsandwords">
          <span><HomeIcon/><li onClick={()=>navigate('/Home')}>Home</li></span>
          <span><EmailIcon/><li onClick={()=>navigate('/somewhere')}>Messages</li></span>
          <span><BookmarkIcon/><li onClick={()=>navigate('/somewhere')} >Bookmarks</li></span>
          <span><ExploreIcon/><li onClick={()=>navigate('/somewhere')}>Explore</li></span>
          <span><ListIcon/><li onClick={()=>navigate('/somewhere')} >Lists</li></span>
          <span><PersonIcon/><li  onClick={()=>navigate('/profile')} >Profile</li></span>
          <span><LockIcon/><li onClick={()=>navigate('/signin')}>Sign Out</li></span>
  
        </ul>
      </nav>

    )
}
export default Nav