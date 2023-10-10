import React, { useEffect } from 'react'
import { Bars } from 'react-loader-spinner'
import { useParams } from 'react-router-dom'
import Imageoverlay from '../../Components/ImageOverlay/Imageoverlay'
import InvokeAPI from '../../Utils/Apicall'
import { useGlobalContext } from '../../Utils/Context/Context'

const SingleImage = () => {
  const { reqParam,setImageId,loading,setRealted, setloading, image, setImage } = useGlobalContext()

  const id = useParams().id
  // console.log(id);
  // setImageId(id)


  const getImage = async () => {
    setloading(true)
    const res = await InvokeAPI(`photos/${id}`, 'get', '', '', reqParam)
   
    setImage(res)
    setloading(false)
  }
  const getRelated = async () => {
    setloading(true)
    const res = await InvokeAPI(`photos/${id}/related`, 'get', '', '', reqParam)
  
    setRealted(res)
    setloading(false)
  }

  useEffect(() => {
    getImage()
    getRelated()
  }, [id]);

  return (
    <div className='SingleImage'>
      {loading?<Bars height={200} width={''}></Bars>:<Imageoverlay></Imageoverlay>}
    </div>
  )
}

export default SingleImage