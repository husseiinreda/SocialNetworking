import React , { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../App';

const Navbar = ()=>{
    const {state,dispatch}= useContext(userContext);
    const render = ()=>{
        if(state){
            return [
                <li><Link to ="/CreatePost">Create Post</Link></li>,
                <li><Link to ="/Profile">Profile</Link></li>,
                <li><Link to ="/Login" onClick={()=>{
                    localStorage.clear();
                    dispatch({type:"CLEAR"});
                }}>LogOut</Link></li>
            ]
        }
        else return [
            <li><Link to ="/Login">Login</Link></li>,
            <li><Link to ="/SignUp">SignUp</Link></li>
        ]
    }
    return(
        <nav>
            <div className="nav-wrapper">
            <Link to ={state?"/":"/Login"} className="brand-logo">Social Network</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                {render()}                
            </ul>
            </div>
        </nav>
    );
}

export default Navbar;