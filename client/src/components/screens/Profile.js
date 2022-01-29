import React, { useEffect, useState , useContext } from 'react';
import { userContext } from '../../App';

export const Profile = () => {
    const {state,dispatch} = useContext(userContext);
    const [data, setData] = useState([]);
    useEffect(async() => {
        let res = await fetch('/myposts',{
            method:"get",   
            headers:{
                "authorization":localStorage.getItem('Jwt')
            }
        });
        res = await res.json();
        setData(res);
    },[]);
    return (
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin: "18px 10px",
                borderBottom: "1px solid grey"
            }}>
                <div>
                    <img style={{ 
                        width:"160px",
                        height:"160px", 
                        borderRadius:"80px"
                    }} 
                    src="https://amayei.nyc3.digitaloceanspaces.com/2018/09/Mohamed-Salah-signs-new-long-term-Liverpool-deal.jpeg"></img>
                </div>
                <div>
                    <h3>{JSON.parse(state).name}</h3>
                    <div style={{
                        display:"flex",
                        justifyContent:"space-around",
                        width:"108%" 
                    }}>
                        <h6> {data.length} Posts</h6>
                        <h6> 0 Following</h6>
                        <h6> 0 Follower</h6>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {data.map(item=>{
                    return(
                        <img className="item" key={item._id} src={item.photo}></img>
                    );
                })}
            </div>
        </div> 
    );
};
