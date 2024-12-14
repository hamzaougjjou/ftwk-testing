import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Error500 from '../../components/errors/Error500'
import Pagination from './Pagination'
import useAxiosFetch from "./../../utils/useFetch";
import Loading from '../../components/Loading';
import { currency } from '../../utils/Vars';
import TextTruncator from '../../utils/TextTruncator';
import Search from './Search';

function Products() {


    let [urlParams, setUrlParams] = useState("");
    let [page, setPage] = useState(1);

    let [products, setProducts] = useState([]);

    let { data, loading, error } = useAxiosFetch(`/admin/products?page=${page}&${urlParams}` );

    console.log(products);

    useEffect(() => {
        if (!error && !loading) {
            if (page === 1) {
                setProducts([...data.products.data]);
            } else {
                setProducts([...products, ...data.products.data]);
            }
        }

    }, [data]);

    useEffect(() => {
      setProducts([]);
    }, [ urlParams ] );
    
    

    return (
        <main>
            <div className="grid md:grid-cols-[300px_1fr] gap-8 p-4 md:p-8">

                <Search setUrlParams={setUrlParams} setPage={setPage}/>

                {
                    error ?

                        <Error500 />
                        :


                        <div className="flex flex-wrap gap-6  justify-center">
                            {/* ================================== */}
                            {
                                (loading && products.length === 0) ?
                                    <>
                                        <div className="bg-white rounded-lg shadow-md
                                        overflow-hidden w-[300px]
                                        h-[410px] flex items-center justify-center
                                        ">
                                            <Loading width={16} height={16} text="" />
                                        </div>
                                        <div className="bg-white rounded-lg shadow-md
                                        overflow-hidden w-[300px]
                                        h-[410px] flex items-center justify-center
                                        ">
                                            <Loading width={16} height={16} text="" />
                                        </div>
                                        <div className="bg-white rounded-lg shadow-md
                                        overflow-hidden w-[300px]
                                        h-[410px] flex items-center justify-center
                                        ">
                                            <Loading width={16} height={16} text="" />
                                        </div>
                                        <div className="bg-white rounded-lg shadow-md
                                        overflow-hidden w-[300px]
                                        h-[410px] flex items-center justify-center
                                        ">
                                            <Loading width={16} height={16} text="" />
                                        </div>
                                        <div className="bg-white rounded-lg shadow-md
                                        overflow-hidden w-[300px]
                                        h-[410px] flex items-center justify-center
                                        ">
                                            <Loading width={16} height={16} text="" />
                                        </div>
                                        <div className="bg-white rounded-lg shadow-md
                                        overflow-hidden w-[300px]
                                        h-[410px] flex items-center justify-center
                                        ">
                                            <Loading width={16} height={16} text="" />
                                        </div>
                                    </>
                                    :
                                    <>

                                        {
                                            products.map((product) => {
                                                return (<ProductItem key={product.id} product={product} />);
                                            }
                                            )
                                        }

                                    </>
                            }

                            {/* ================================== */}
                        </div>

                }
            </div>

            {
                (loading && products.length > 0) &&
                <>
                    <br />
                    <Loading width={16} height={16} text="" />
                    <br />
                </>
            }
            {

                !(loading || error || data.products.next_page_url === null) &&
                <Pagination
                    page={page}
                    setPage={setPage}

                    next_page_url={data.products.next_page_url}
                    current_page={data.products.current_page}
                />

            }
        </main>
    )
}






const ProductItem = ({ product }) => {

    return (
        <div className="bg-white rounded-lg shadow-md
                            overflow-hidden w-[300px]
                            h-[410px]
                            ">
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full object-cover
                                    h-[200px]
                                    " />
            </div>
            <div className="p-6 space-y-4">
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold h-[35px]">
                        <TextTruncator text={product.title}
                            len={60} />
                    </h3>
                    <p className="text-muted-foreground text-sm h-[75px]">

                        <TextTruncator text={product.description}
                            len={150} />

                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">
                        {
                            product.price
                        }
                        {currency}
                    </div>
                    <Link
                        to={`products/${product.id}/edit`}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                        Edit Product
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Products
