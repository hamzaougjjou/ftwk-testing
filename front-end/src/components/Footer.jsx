import { Link } from "react-router-dom";
import useAxios from './hooks/useAxios'
import Loading from './utils/Loading'
function Footer() {

    const { data: latestProducts,
        loading: loadingLatestProducts,
        error: errorLatestProducts
    }
        = useAxios('/products?filter=latest&limit=2', {
            method: 'GET',
        });

    return (

        <footer className="">
            <div className="containerd">
                <div className="info-foot">
                    <div className="col">
                        <h2>
                            About Us
                        </h2>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            Quae maxime omnis molestiae magni aperiam reiciendis
                            voluptatum harum dicta impedit? Maxime nobis quis pariatur
                            alias veritatis. Id vitae eveniet accusamus exercitationem, ullam quaerat,
                            autem facilis nobis ratione aut ad, dicta natus!
                        </p>
                        <div className="icon-socail-foot">
                            <div className="twitter"><i className="fa-brands fa-twitter"></i></div>
                            <div className="facebook"><i className="fa-brands fa-facebook-f"></i></div>
                            <div className="instagram"><i className="fa-brands fa-instagram"></i></div>
                        </div>
                    </div>
                    <div className="col">
                        <h2>Latest Products</h2>
                        <ul>
                            {
                                errorLatestProducts ?
                                    null :

                                    !loadingLatestProducts && !errorLatestProducts?
                                        latestProducts.data.data.map(item => (
                                            <li key={item.id} >
                                                <Link to={"/products/"+item.id}
                                                    className="!flex gap-[12px]"
                                                >
                                                    <img src={item.image} alt={item.title} />
                                                    <p>
                                                        {item.title}
                                                        <span>{item.human_readable_created_at}</span>
                                                    </p>
                                                </Link>
                                            </li>
                                        ))
                                        :
                                        <>
                                            <Loading />
                                            <br />
                                            <br />
                                            <Loading />
                                        </>

                            }


                        </ul>
                    </div>
                    <div className="col">
                        <h2>Quick Links</h2>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            {/* <li><Link to="/about">About</Link></li>
                            <li><Link to="/services">Services</Link></li>
                            <li><Link to="#">Works</Link></li>
                            <li><Link to="#">Blog</Link></li> */}
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/products">Products</Link></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h2>Have a Questions?</h2>
                        <ul>
                            <li>203 Fake St. Mountain View, San Francisco, California, USA</li>
                            <li><Link to="tel:9837873">+2 392 3929 210</Link></li>
                            <li><Link to="mailto:@knfl.gmail.com">info@yourdomain.com</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="copy">Copyright ©2022 All rights reserved | This template is made with <i
                    className="fa-solid fa-heart"></i> by
                    <Link
                        target='_blank'
                        to="https://ougjjou.com">hamza ougjjou</Link>
                </div>
            </div>

        </footer>
    )
}

export default Footer