import React, { Fragment, useState } from 'react'
import { Data } from '../../Assets/StaticData/Data'
import Images from '../../Components/ImageCard/Images'
import { useGlobalContext } from '../../Utils/Context/Context'
import Filter from '../../Components/Filter'
import './Home.scss'
import Pagination from './Pagination'
import Loader from 'react-loaders'

import { Bars, TailSpin } from 'react-loader-spinner'



const Home = () => {
  const [newLoading, setNewLoading] = useState(true);


  const {

    indexPage,
    images, loading

  } = useGlobalContext();


  return (
    <div className='Home'>
      <div className="homeWrapper">
        {loading ? <div className="loader"><TailSpin></TailSpin></div> : <Fragment><div className="filterOption">
          <Filter></Filter>
        </div>
          <div className="ImageCards">
            {
             loading?<TailSpin></TailSpin>: images?.photos?.results?.map((item) => {
              return (<Images key={item.id} item={item} ></Images>)
            })
            }
          </div>
          <div className="navigation">
            <Pagination></Pagination>
          </div></Fragment>}



      </div>
    </div>
  )
}

export default Home