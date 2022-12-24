import Nav from '../../components/nav/Nav'
import "./wrapper.css";
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';
const Wrapper = (props) => {
  const navigate = useNavigate()

  return (
    <div
      style={{
        display: "flex",
      }}
      className="parent"
    >
      <header>
        <div className="navbar1">
          <Nav />
        </div>
      </header>
      <div className="child">
        <div className='headicon'><h3 className='title'>{props.title} <div className='home'>
      <ul className='iconshidden1'> 
      <li onClick={()=>navigate('/signout')} className='iconshidden'><LockIcon/> </li>
       <li onClick={()=>navigate('/profile')} className='iconshidden'><PersonIcon/></li>
       <li onClick={()=>navigate('/')} className='iconshidden'><HomeIcon/></li>
       </ul>
     </div></h3></div>
        {props.children}
      </div>
    </div>
  );
};
export default Wrapper;