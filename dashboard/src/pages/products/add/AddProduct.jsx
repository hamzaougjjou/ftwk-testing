import { useState } from "react"
import UploadMainImage from "./UploadMainImage"
import UploadSubmages from "./UploadSubmages"
import Loading from './../../../components/Loading';
import useAxiosFetch from "./../../../utils/useFetch";
import axios from "axios";
import { api_url, store_url } from "../../../utils/Vars";
import { Link } from "react-router-dom";
import XIcon from "../../../utils/XIcon";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

function AddProduct() {


  const [loading, setLoading] = useState();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [createdProductId, setCreatedProductId] = useState(null);
  const authHeader = useAuthHeader();


  let { data: categories,
    loading: loadingCategories,
    error: categoriesError
  }
    = useAxiosFetch("/admin/categories");


  const [product, setProduct] = useState({
    "title": null,
    "description": null,
    "price": null,
    "old_price": null,
    "category_id": null,
    "is_collection": false,
    "has_offer": false,
    "main_image": null,
    "sub_images": [],
  });


  const hndleStats = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
    setError(null)
  }

  const submitData = async (e) => {
    e.preventDefault();
    // Create form data object to send with the request
    const formData = new FormData();


    for (let key in product) {
      if (product.hasOwnProperty(key)) {
        if (key != "sub_images") {
          formData.append(key, product[key]);
        }
      }
    }

    product.sub_images.forEach((image) => {
      formData.append('sub_images[]', image.file);
    });

    // formData.append("sub_images[]", product.sub_images);

    if (!product.title || product.title.length === 0) {
      setError('Product Title is required');
      return 0;
    }
    if (!product.price || product.price.length === 0) {
      setError('Product Price is required');
      return 0;
    }
    if (!product.description || product.description.length === 0) {
      setError('Product description is required');
      return 0;
    }
    if (!product.main_image) {
      setError('Product Main Image is required');
      return 0;
    }

    setLoading(true);

    await axios.post(api_url + '/admin/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: authHeader, 
      },
    }).then(res => {
      // Handle success
      setSuccess('Product created successfully!');
      setCreatedProductId(res.data.product.id)

      setProduct({
        "title": null,
        "description": null,
        "price": null,
        "old_price": null,
        "category_id": null,
        "is_collection": false,
        "has_offer": false,
        "main_image": null,
        "sub_images": [],
      });

    }).catch(err => {

      setError('There was an error creating the Product.');

    }).finally(() => {

      setLoading(false);

    });



  }


  return (
    <div className="rounded-lg border bg-gray-50 max-w-[1500px]
    text-card-foreground shadow-sm w-full my-12 mx-auto">

      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight
        text-green-600
        ">Add New Product</h3>
      </div>

      <div className="p-6 block md:block lg:flex gap-12 flex-wrap">
        <form className="flex-1"
          onSubmit={e => submitData(e)}
        >

          <section className="flex flex-wrap gap-[30px]">


            <div className="mt-[30px] grid gap-2 flex-1">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="title"
              >
                Title
              </label>
              <input
                onChange={(e) => hndleStats(e)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="title"
                required=""
                type="text"
                name="title"
              />
            </div>
            <div className="mt-[30px] grid gap-2 flex-1">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="price"
              >
                Price
              </label>
              <input
                onChange={(e) => hndleStats(e)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="price"
                required=""
                type="number"
                name="price"
              />
            </div>
          </section>

          <div className="mt-[30px] grid gap-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="description"
              name="description"
              onChange={(e) => hndleStats(e)}
              required=""
            ></textarea>
          </div>



          <div className="mt-[30px] grid gap-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="image_id"
            >
              Main Image
            </label>
            <UploadMainImage product={product} setProduct={setProduct} />
          </div>

          <section className="flex flex-wrap gap-[30px] min-h-[80px]">
            <div className="mt-[30px] grid gap-2 flex-1 min-h-[80px]">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="category_id"
              >
                Category
              </label>

              {
                loadingCategories ?
                  <Loading width={4} height={4} text="loading" />
                  :
                  <select name="category_id" id="category"
                    className='outline-none bg-gray-200 p-5 cursor-pointer'
                    onChange={(e) => hndleStats(e)}
                  >
                    <option
                      className="cursor-pointer bg-blue-500"
                      value="" defaultValue={null}>
                      select category
                    </option>

                    {
                      categories.categories.map((category_item) => (
                        <option
                        key={category_item.id}
                          className="cursor-pointer bg-blue-500"
                          value={category_item.id} >
                          {category_item.name}
                        </option>
                      ))
                    }

                  </select>
              }

            </div>
            <div className="mt-[30px] grid gap-2 flex-1">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="old_price"
              >
                Old Price
              </label>
              <input
                onChange={(e) => hndleStats(e)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="old_price"
                type="number"
                name="old_price"
              />
            </div>
          </section>

          <div className="mt-[30px] flex gap-4 algn-center mb-[50px]">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="has_offer"
            >
              Has Offer
            </label>
            <input
              onChange={(e) => hndleStats(e)}
              aria-hidden="true"
              tabindex="-1"
              type="checkbox"
              className="p-2 w-8 h-8 cursor-pointer"
              name="has_offer"

            />
          </div>
          <div className="mt-[30px] grid gap-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="sub_images"
            >
              Sub Images
            </label>
            <UploadSubmages product={product} setProduct={setProduct} />
          </div>
          <div className="mt-[30px] flex gap-4 algn-center mb-[50px]">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="approved"
            >
              Approved
            </label>
            {/* <button
              type="button"
              role="checkbox"
              aria-checked="false"
              data-state="unchecked"
              
              className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              id="approved"
            ></button> */}
            <input
              onChange={(e) => hndleStats(e)}
              aria-hidden="true"
              className="p-2 w-8 h-8 cursor-pointer"
              tabindex="-1"
              type="checkbox"
              name="approved" />
          </div>
          <div className="mt-[30px] flex gap-4 algn-center mb-[50px]">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="is_collection"
            >
              Is Collection
            </label>
            {/* <button
              type="button"
              role="checkbox"
              aria-checked="false"
              data-state="unchecked"
              
              className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              id="is_collection"
            ></button> */}
            <input
              onChange={(e) => hndleStats(e)}
              aria-hidden="true"
              tabindex="-1"
              type="checkbox"
              className="p-2 w-8 h-8 cursor-pointer"

              name="is_collection" />

          </div>



          <button
            className={`
          whitespace-nowrap rounded-md text-sm font-medium 
          ring-offset-background transition-colors focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
          disabled:pointer-events-none disabled:opacity-50 bg-green-700
          text-primary-foreground flex-item-end
          px-4 py-2 w-[300px] h-[50px] ${loading && 'opacity-50 cursor-not-allowed'}`}
            type={loading ? "button" : "submit"}
          >
            Add Product
          </button>
        </form>
      </div>


      {error && (
        <div
          className="bg-gray-300 shadow-md rounded-lg py-6 px-12 max-w-md h-[100px] 
          w-fit fixed bottom-[50px] left-[50%] transform translate-x-[-50%]
      transition-transform duration-900 ease-out transform translate-x-0"
        >
          <XIcon
            className="w-5 h-5 stroke-current absolute top-2 right-2 cursor-pointer"
            onClick={() => {
              setError(null);
            }}
          />

          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <div>
              <h3 className="text-lg font-medium">Invalid Data</h3>
              <p className="text-gray-500">{error} </p>
            </div>
          </div>
          <div className="mt-4 text-right"></div>
        </div>
      )}


      {
        success &&
        <div className="bg-[#12121212] flex items-center justify-center
  h-screen w-screen fixed top-0 left-0">
          <div className="bg-white p-6 h-[340px]">
            <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
              <path fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
              </path>
            </svg>
            <div className="text-center">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Product Created
              </h3>
              <p className="text-gray-600 my-2">
                {success}
              </p>
              <p> Have a great day!  </p>
              <div className="py-10 text-center flex align-center justify-center gap-4">
                <Link
                  target="_blank"
                  to={store_url + "/products/" + createdProductId}
                  className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                  View in Store
                </Link>

                <button
                  onClick={() => setSuccess(null)}
                  className="px-10 bg-red-600 hover:bg-red-500 text-white font-semibold py-3">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      }

    </div>
  )
}

export default AddProduct