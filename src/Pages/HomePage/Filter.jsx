// @ts-nocheck
import React, { Fragment, useEffect, useState } from 'react'
import { Data } from '../../Assets/StaticData/Data';
import { useGlobalContext } from '../../Utils/Context/Context';

const Filter = () => {
    const {

        indexPage,
        setIndexPage, keyword, setkeyword, orientation, setOrientation,

    } = useGlobalContext();


    const ItemsMenu = () => {
        const [openTab, setopenTab] = useState(false);
        return (
            <Fragment>
                <div className="icon-wrapper">
                    <label className="hamburger btn menu-button" onClick={() => setopenTab(!openTab)}>
                    Orientation
                    </label>
                </div>
                {openTab ? <ul className="item-list">
                <li  onClick={(e) => setOrientation('')}>{'any Orientation'}</li>
                    {Data.newData.map((item) => <li key={item.id} onClick={(e) => setOrientation(e.target.innerHTML)}>{item.text}</li>)}

                </ul> : ''}
            </Fragment>
        )

    }

    // eslint-disable-next-line no-undef
    useEffect(() => {
        console.log(indexPage);
        console.log(keyword);
    }, [indexPage, keyword]);
    return (
        <div className="filter">
            <div className="filter-element">
                <div className="query">
                    <div className='myquery'>{keyword}</div>
                    <div className='related'>
                        <ul className="related-items">


                            {Data.FullData.related_searches.map((item, index) => (
                                <li
                                    className={`tag-item btn`}
                                    key={index}
                                    onClick={(e) => setkeyword(item.title)}>
                                    {item.title}
                                </li>
                            ))}

                        </ul>
                    </div>
                </div>

                <div className="filterSearch">
                    <div className="Orientaion">
                        <ItemsMenu></ItemsMenu>
                    </div>
                    {/* <div className="color">
                        Showing <span>0-20 </span> of
                        <span>{Data.Images.total} Items</span>
                    </div> */}

                </div>
            </div>
        </div>
    )
}

export default Filter