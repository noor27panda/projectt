import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import Loading from './components/loading/Loading';
import React from 'react';
const   Home = React.lazy(() => import("./pages/Home/Home")) ;
const Signout = React.lazy(() => import( "./pages/signin/Signout"))
const Signin = React.lazy(() => import( "./pages/signin/Signin"))
const Signup = React.lazy(() => import  ( "./pages/signup/Signup"))
const Profile = React.lazy(() => import('./pages/profile/Profile'))
function App() {
  return (
    <>
 
  <Routes>
 <Route path='/Signup' element={<Suspense fallback={<Loading/>}><Signup/></Suspense>}></Route>
 <Route path='/Signin' element={<Suspense fallback={<Loading/>}><Signin/></Suspense>}></Route>
 <Route path='/' element={<Suspense fallback={<Loading/>}><Home/></Suspense>}></Route>
 <Route path='/signout' element={<Suspense fallback={<Loading/>}><Signout/></Suspense>}></Route>
 <Route path='/profile' element={<Suspense fallback={<Loading/>}><Profile/></Suspense>}></Route>
 </Routes>
 </>
  );
}

export default App;