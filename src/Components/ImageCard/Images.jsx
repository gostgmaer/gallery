import React from 'react'
import { MdDownload } from 'react-icons/md';
import './Images.scss'
const Images = ({item}) => {
 
  return (

    <div className='Image-card'>
      <div className="imageBlock">
        <img src={item.urls.regular} alt={item.alt_description} />
      </div>
      <div className="userBlock"><div className="imageInfo">
        <div className="user"><img src={item.user.profile_image.large} alt={item.user.name} /> <span>{item.user.name}</span> </div>
        <div className="action"><MdDownload></MdDownload></div>
      </div></div>
      
    </div>
  )
}

export default Images