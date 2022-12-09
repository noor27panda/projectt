import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/signin/Signin';
import Nav from './pages/nav/Nav';
import Profile from './pages/profile/Profile';
import Signout from './pages/signin/Signout.js/Signout';
import Home from './pages/Home';
function App() {
  return (
  <Routes>
 <Route path='/Signup' element={<Signup/>}></Route>
 <Route path='/Signin' element={<Signin/>}></Route>
 <Route path='/' element={<Home/>}></Route>
 <Route path='/signout' element={<Signout/>}></Route>
 <Route path='/profile' element={<Profile/>}></Route>
 </Routes>
  );
}

export default App;
