import React , { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import M from 'materialize-css';
export const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const PostData = ()=>{
        fetch(
            "/signup",
            {
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name,
                    email,
                    password
                })
            }
        ).then(async res=> {
            let data = await res.text();
            if(res.status!=200) M.toast({html:data,classes:'#c62828 red darken-3'});
            else {
                M.toast({html:data,classes:'#ce93d8 purple lighten-3'});
                navigate('/Login');
            }
        })
    };
    return (
        <div>
            <div className="card auth-card">
                <h3>Sign up</h3>
                <input placeholder="Name"
                    id="first_name" 
                    type="text" 
                    className="validate" 
                    value={name} 
                    onChange={(e)=>setName(e.target.value)}/>
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
                <button className="btn waves-effect waves-light" type="submit" name="action" onClick={()=>PostData()}>SignUp
                    <i className="material-icons right">send</i>
                </button>
                <p><Link to='/Login'>Already have an account?</Link></p>
            </div>
        </div>
    );
};
