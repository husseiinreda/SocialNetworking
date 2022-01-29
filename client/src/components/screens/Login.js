import React , { useState , useContext } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import { userContext } from '../../App';

export const Login = () => {
    const {state,dispatch} = useContext(userContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const PostData = ()=>{
        fetch(
            "/signin",
            {
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email,
                    password
                })
            }
        ).then(async res=> {
            let data = await res.json();
            if(res.status!=200) M.toast({html:data,classes:'#c62828 red darken-3'});
            else {
                localStorage.setItem('Jwt',data.auth);
                localStorage.setItem('user',JSON.stringify(data.user));
                dispatch({type:"USER",payload:data.user});
                M.toast({html:"Signed in successfully...",classes:'#ce93d8 purple lighten-3'});
                navigate('/');
            }
        })
    };
    return (
        <div>
            <div className="card auth-card">
                <h3>Sign in</h3>
                <input id="email_inline" 
                    type="email" 
                    className="validate" 
                    placeholder='Email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}/>
                <input id="password" 
                    type="password" 
                    className="validate" 
                    placeholder='Password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}/>
                <button className="btn waves-effect waves-light" type="submit" name="action" onClick={()=>PostData()}>Login
                    <i className="material-icons right">send</i>
                </button>
                <p><Link to='/SignUp'>Don't have an account? <br/> Create an account</Link></p>
            </div>
        </div>
    );
};
