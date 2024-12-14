import React from 'react'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./style.css"

function Slider() {


    return (
        <div className='h-[500px] relative overflow-hidden'>
            <Carousel>
                <div>
                    <img className='h-[500px] object-cover' alt="" src="https://img.freepik.com/free-vector/mist-spray-cosmetic-bottle-ad-banner_107791-3010.jpg" />
                </div>
                <div>
                    <img className='h-[500px] object-cover' alt="" src="https://img.freepik.com/free-photo/front-view-cologne-bottle-rotten-tree-branch-blurred-beige-background_140725-145215.jpg" />
                </div>
                <div>
                    <img className='h-[500px] object-cover' alt="" src="https://img.freepik.com/free-vector/perfume-bottle-gold-ribbon-black_107791-2826.jpg" />
                </div>
                <div>
                    <img className='h-[500px] object-cover' alt="" src="https://img.freepik.com/premium-photo/luxurious-perfume-golden-fabric_160204-532.jpg" />
                </div>
                <div>
                    <img className='h-[500px] object-cover' alt="" src="https://img.freepik.com/premium-psd/clear-glass-perfume-bottle-scene-mockup_1119-3932.jpg" />
                </div>
               
            </Carousel>
            
        </div>

    );
}

export default Slider

