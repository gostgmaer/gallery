import React from 'react'
import { Data } from '../../Assets/StaticData/Data'
import Images from '../../Components/ImageCard/Images'
import { useGlobalContext } from '../../Utils/Context/Context'
import Filter from './Filter'
import './Home.scss'
import Pagination from './Pagination'




const Home = () => {
  const{indexPage}=useGlobalContext()

  console.log(Data);
  return (
    <div className='Home'>
      <div className="homeWrapper">
          <div className="filterOption">
            <Filter></Filter>
          </div>
          <div className="ImageCards">
            {
              Data.Images.results.map((item)=>{
                return ( <Images key={item.id} item={item} ></Images> )
              })
            }
          </div>
          <div className="navigation">
           <Pagination></Pagination>
          </div>
      </div>
    </div>
  )
}

export default Home