import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import def_img from '../../assets/medium.webp'
const apiKey = process.env.api;
const apiUrl = process.env.url;

const ImageGenerator = ()=> {

    const [image_url,setImage_url] =useState("/");
    let inputRef = useRef(null);

    const [loading,setLoading] =useState(false)
    const imageGenerator = async () =>{
        if(inputRef.current.value === ""){
            return 0;
        }
        setLoading(true);
        const responce = await fetch(
            "{apiUrl}",
            {
                method:"POST",
                headers:{
                    "content-Type":"application/json",
                    Authorization:
                    "Bearer {apiKey}",
                    "User-Agent":"Chrome"
                },
                body:JSON.stringify({
                    prompt:`${inputRef.current.value}`,
                    n:1,
                    size:"512x512",

                }),
            }

        );
        let data =await responce.json();
        let data_array = data.data;
        setImage_url(data_array[0].url);
        setLoading(false);
            }

  return (
    <div className='ai-image-generator'>
    <div className="header">Ai Image <span>Generator</span></div>
    <div className="img-loading">
    <div className="image">
        <img src={image_url==='/'?def_img:image_url} alt="" />
    </div>
    <div className='loading'>
        <div className={loading?"loading-bar-full":"loading-bar"}></div>
        <div className={loading?"loading-text":"display-none"}>Loading....</div>
    </div>
    </div>
    <div className="search-box">
    <input type="text" ref={inputRef} className='search-input' placeholder='Describe what you want to see' />
    <div className="genearte-btn" onClick={()=>{imageGenerator()}}>Generate</div>
    </div>
    </div>
  )
}
export default ImageGenerator