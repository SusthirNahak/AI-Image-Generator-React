import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import def_img from '../../assets/medium.webp'
export default function ImageGenerator() {

    const [image_url,setImage_url] =useState('/');
    let inputRef = useRef(null);

    const imageGenerator = async()=>{
        if(inputRef.current.value === ""){
            return 0;
        }
        const responce = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method:"POST",
                headers:{
                    "content-Type":"application/json",
                    Authorization:
                    "Bearer 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",
                    "User-Agent":"Chrome",
                },
                body:JSON.stringify({
                    prompt:`${inputRef.current.value}`,
                    n:1,
                    size:"512x512",

                }),
            }

        );
        let data =await responce.json();
        console.log(data);
            }

  return (
    <div className='ai-image-generator'>
    <div className="header">Ai Image <span>Generator</span></div>
    <div className="img-loading">
    <div className="image">
        <img src={image_url==='/'?def_img:image_url} alt="" />
    </div>
    </div>
    <div className="search-box">
    <input type="text" ref={inputRef} className='search-input' placeholder='Describe what you want to see' />
    <div className="genearte-btn" onClick={()=>{imageGenerator()}}>Generate</div>
    </div>
    </div>
  )
}
