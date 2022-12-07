import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/signin/Signin';

function App() {
  return (
  <Routes>
 <Route path='/Signup' element={<Signup/>}></Route>
 <Route path='/Signin' element={<Signin/>}></Route>
 </Routes>
  );
}

export default App;
