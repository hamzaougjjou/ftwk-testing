import Footer from "./components/Footer";
import Header from "./components/header/Header";
import NavPages from "./components/NavPages";
import NewsLetter from "./components/NewsLetter";

import { useLocation } from 'react-router-dom';
import { useEffect } from "react";
import ContactWhatsapp from "./components/ContactWhatsapp";
import axios from "axios";

function App() {


  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);



      const response = axios
        // .post(`http://127.0.0.1:8000/api/tarcking`, {
        //   "visited_url": pathname
        // }, {});
      .post(`${process.env.REACT_APP_API_URL}/tarcking`, {}, {})
      .catch( err => {
        console.log( err );
      });
    

  }, [pathname]);

  return (
    <div className="m-auto"
      style={{
        maxWidth: "1500px"
      }}
    >
      <Header />
      <NavPages />
      <NewsLetter />
      <ContactWhatsapp />
      <Footer />
    </div>
  );
}

export default App;
