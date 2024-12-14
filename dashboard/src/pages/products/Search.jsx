import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import useAxiosFetch from '../../utils/useFetch';

function Search({ setUrlParams , setPage }) {

    let { data, loading, error } = useAxiosFetch("/admin/categories");

    const handelCategory = (e) => {
        if (e.target.value === null || e.target.value === "null") {
            setUrlParams("");
            setPage(1);
        } else {
            setUrlParams("category=" + e.target.value);
            setPage(1)
        }
    }



    return (
        <div className="bg-background rounded-lg shadow-sm p-6">

            <Link
                to='/products/add'
                class="
        rounded-md text-sm mb-16 inline-block text-center
        font-medium transition-colors max-w-[250px]  w-full font-bold
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
        focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
        hover:bg-blue-500 h-10 px-4 py-2 bg-blue-600 text-white">
                Add Product
            </Link>

            <h2 className="text-lg font-semibold mb-4">Filters</h2>

            <div class="flex items-center mb-4 gap-4">
                <input
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
                    placeholder="Find your CG..."
                    type="search"
                />
                <button class="inline-flex items-center 
justify-center whitespace-nowrap rounded-md text-sm 
font-medium ring-offset-background transition-colors 
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
hover:bg-green-500 h-10 px-4 py-2 bg-green-600 text-white">
                    Sreach
                </button>
            </div>
            {
                error ?
                    null
                    :

                    <div className="border-b flex justify-between py-3 mt-4">
                        <h3 data-orientation="vertical" data-state="closed" className="flex">
                            Category
                        </h3>

                        {
                            loading ?
                                <Loading width={4} height={4} text="loading" />
                                :
                                <select name="category" id="category"
                                    className='outline-none'
                                    onChange={(e) => handelCategory(e) }
                                >
                                    <option value="null">All</option>
                                    {
                                        data.categories.map((category_item) => (
                                            <option value={category_item.id} >
                                                {category_item.name}
                                            </option>
                                        ))
                                    }

                                </select>
                        }


                    </div>
            }


            <div className="border-b flex justify-between py-3 mt-4">
                <h3 data-orientation="vertical" data-state="closed" className="flex">
                    Price
                </h3>

                <select name="price" id="price"
                    className='outline-none'
                    onChange={ (e) => setUrlParams("price=" + e.target.value) }
                >
                    <option value="asc">Asc</option>
                    <option value="desc">Desc</option>
                </select>

            </div>
            <div className="border-b flex justify-between py-3 mt-4">
                <h3 data-orientation="vertical" data-state="closed" className="flex">
                    Date
                </h3>

                <select name="date" id="date"
                    className='outline-none'
                    onChange={ e => setUrlParams("sort=" + e.target.value) && setPage(1) }
                >
                    <option value="asc">Latest</option>
                    <option value="desc">Newest</option>
                </select>


            </div>

        </div>
    )
}

export default Search