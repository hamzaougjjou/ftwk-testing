import React, { useState, useEffect } from 'react';
import slider_1 from "./../../assets/slider_1.png";
import slider_2 from "./../../assets/slider_2.png";
import slider_3 from "./../../assets/slider_3.png";
function App() {

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  const navigateSlide = (slideIndex) => {
    if (slideIndex >= 0 && slideIndex < totalSlides) {
      setCurrentSlide(slideIndex);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  return (

    <>

      <div className="relative w-full h-[350px] mx-auto overflow-hidden">

        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          <div className="min-w-full  h-[350px] bg-cover bg-center"
            style={{ backgroundImage: `url(${slider_1})` }}
          >

          </div>

          <div className="min-w-full  h-[350px] bg-cover bg-center"
            style={{ backgroundImage: `url(${slider_2})` }}
          >

          </div>
          <div className="min-w-full  h-[350px] bg-cover bg-center"
            style={{ backgroundImage: `url(${slider_3})` }}
          >

          </div>
        </div>
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <div className="w-3 h-3 bg-white rounded-full cursor-pointer hover:bg-gray-300"
            onClick={() => navigateSlide(0)}></div>
          <div className="w-3 h-3 bg-white rounded-full cursor-pointer hover:bg-gray-300"
            onClick={() => navigateSlide(1)}></div>
          <div className="w-3 h-3 bg-white rounded-full cursor-pointer hover:bg-gray-300"
            onClick={() => navigateSlide(2)}></div>
        </div>
      </div>
    </>

  )
}

export default App;
