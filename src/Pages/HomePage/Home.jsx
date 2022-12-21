import React from 'react'
import { Data } from '../../Assets/StaticData/Data'
import Images from '../../Components/ImageCard/Images'
import './Home.scss'




const Home = () => {
  return (
    <div className='Home'>
      <div className="homeWrapper">
          <div className="filterOption"></div>
          <div className="ImageCards">
            {
              Data.Images.results.map((item)=>{
                return ( <Images key={item.id} item={item} ></Images> )
              })
            }
          </div>
          <div className="navigation"></div>
      </div>
    </div>
  )
}

export default Home