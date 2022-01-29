import React , { useEffect, useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import M from 'materialize-css';
export const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const navigate = useNavigate();
    useEffect(async () => {
      if(url){
        fetch(
            "/createpost",
            {
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "authorization":localStorage.getItem('Jwt')
                },
                body:JSON.stringify({
                    title,
                    body,
                    photo:url
                })
            }
        ).then(async res=> {
            let data = await res.text();
            if(res.status!=200) M.toast({html:data,classes:'#c62828 red darken-3'});
            else {
                M.toast({html:data,classes:'#ce93d8 purple lighten-3'});
                navigate('/Profile');
            }
        });
      }
    }, [url]);
    const PostData = async()=>{
        const data = new FormData();
        data.append('file',image);
        data.append('upload_preset','SocialNetwork');
        data.append('cloud_name','xiaodi');
        await fetch('http://api.cloudinary.com/v1_1/xiaodi/image/upload',{
            method:'post',
            body:data
        }).then(async res=> setUrl((await res.json()).url));
    };
  return (
      <div>
          <div className="card auth-card">
                <h3>Create Post</h3>
                <input placeholder="Title" 
                    type="text"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}/>
                <input placeholder="Caption" 
                    type="text"
                    value={body}
                    onChange={(e)=>setBody(e.target.value)}/>
                <div class="file-field input-field">
                    <div class="btn">
                        <span>Upload Photo</span>
                        <input type="file"
                            onChange={(e)=>setImage(e.target.files[0])}/>
                    </div>
                    <div class="file-path-wrapper">
                        <input class="file-path validate" type="text"/>
                    </div>
                </div>
                <button className="btn waves-effect waves-light" type="submit" name="action" onClick={()=>PostData()}>Post
                    <i className="material-icons right">send</i>
                </button>
            </div>
      </div>
  );
};
