
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

const Nav = () => {
    const {token} = useContext(AuthContext)
    const navigate = useNavigate()
    
        const links = [
          {
              target: '/',
              text: 'Home'
          },
          {
            target: '/profile',
            text: 'profile'
        },
      ]
    return (
      
        <nav className="navbar">
        <img className="image"src="https://ferasjobeir.com/frontend-app/static/media/logo.1bb8db420e540d66b7c4a6a8350ca833.svg"/>
        <ul className="iconsandwords" >
          <span><NavLink to="/" className='tab'   ><div style={{display:"flex",
        justifyContent: "space-between",
        gap: '3px'}}><div><HomeIcon/></div><div></div>Home</div> </NavLink></span>
          <span className="tab" ><EmailIcon/><li className='tab'  onClick={()=>navigate('/somewhere')}>Messages</li></span>
          <span className="tab"><BookmarkIcon/><li className='tab'   onClick={()=>navigate('/somewhere')} >Bookmarks</li></span>
          <span><ExploreIcon/><li className='tab'  onClick={()=>navigate('/somewhere')}>Explore</li></span>
          <span><ListIcon/><li className='tab' onClick={()=>navigate('/somewhere')} >Lists</li></span>
          <span><NavLink to='/profile' className='tab'    ><div classname='navadjust' style={{display:"flex",
        justifyContent: "space-between",
        gap: '3px'}}><div><PersonIcon/></div><div>Profile</div> </div></NavLink></span>
          <span><LockIcon/><li className='tab'  onClick={()=>navigate('/Signout')}>Sign Out</li></span>
  
        </ul>
      </nav>

    )
}
export default Nav