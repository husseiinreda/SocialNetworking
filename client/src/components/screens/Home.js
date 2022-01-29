import React, { useEffect, useState , useContext } from 'react';
import { userContext } from '../../App';

export const Home = () => {
    const [data, setData] = useState([]);
    const {state,dispatch} = useContext(userContext);
    useEffect(async() => {
        let res = await fetch('/allposts',{
            method:"get",
            headers:{
                "authorization":localStorage.getItem('Jwt')
            }
        });
        res = await res.json();
        setData(res);
    },[]);

    const likePost = async (id)=>{
        let res = await fetch('/like',{
            method:"put",
            headers:{
                "authorization":localStorage.getItem('Jwt'),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                postId:id
            })
        });
        res = await res.json();
        const newData = data.map(item=>{
            console.log(item,res);
            if(item._id==res._id) return res;
            else return item;
        })
        setData(newData);
    }
    
    const unlikePost = async (id)=>{
        let res = await fetch('/unlike',{
            method:"put",
            headers:{
                "authorization":localStorage.getItem('Jwt'),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                postId:id
            })
        });
        res = await res.json();
        const newData = data.map(item=>{
            console.log(item,res);
            if(item._id==res._id) return res;
            else return item;
        })
        setData(newData);
    }
    
    return (
        <div className="home">
            {data.map(item=>{
                return(
                    <div className="card home-card" key={item._id}>
                        <h5 style={{padding: "5px 5px"}}>{item.postedBy.name}</h5>
                        <div className="card-image">
                            <img src={item.photo}></img>
                        </div>
                        <div className="card-content">
                            <div style={{display:"flex"}}>
                                <p style={{fontSize:18,marginRight:"3px"}}>{item.likes.length}</p>
                                {
                                    //something going wrong
                                    item.likes.includes(state._id)?                                
                                        <i className="material-icons" onClick={()=>{
                                            unlikePost(item._id);
                                        }}>favorite</i>
                                    :
                                        <i className="material-icons" onClick={()=>{
                                            likePost(item._id);
                                        }}>favorite_border</i>
                                }
                            </div>
                            <h6>{item.title}</h6>
                            <h6>{item.body}</h6>
                        </div>
                        <div className="card-action">             
                                <input type="text" placeholder="Type a comment"/>
                        </div>
                    </div>
                );})}
        </div>
    );
};
