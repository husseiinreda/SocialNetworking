import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Home } from './components/screens/Home';
import { SignUp } from './components/screens/SignUp';
import { Login } from './components/screens/Login';
import { Profile } from './components/screens/Profile';
import { CreatePost } from './components/screens/CreatePost';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { initialState, reducer } from './reducers/userReducer';

export const userContext = createContext();
const Routing = ()=>{
  const navigate = useNavigate();
  const {state,dispatch} = useContext(userContext);
  useEffect(()=>{
    const user = localStorage.getItem("user");
    if(!user){
      navigate('/Login');
    }
    else{
      dispatch({type:"USER",payload:user});
    }
  },[]);
  return(
    <Routes>
      <Route exact path='/' element={<Home/>}></Route>
      <Route path="/Profile" element={<Profile/>}></Route>
      <Route path='/Login' element={<Login/>}></Route>
      <Route path='/SignUp' element={<SignUp/>}></Route>
      <Route path='/CreatePost' element={<CreatePost/>}></Route>
    </Routes>
  );
}
function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <userContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Navbar/>
        <Routing/>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
