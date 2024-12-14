import React from 'react'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./style.css"

function Slider({ category }) {

    console.log(category);
    return (
        <div className='h-[500px] relative overflow-hidden'>
            <Carousel>
                <div>
                    <img className='h-[500px] object-cover'
                        alt={category.description + " " + category.name}
                        src={category.image} 
                            
                        />
                </div>

            </Carousel>

        </div>

    );
}

export default Slider

