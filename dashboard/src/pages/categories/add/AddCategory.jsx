import axios from 'axios';
import { useRef } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import placeholder_photo from "./../../../assets/placeholder_photo.png"
import { api_url } from './../../../utils/Vars';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';


function AddCategory() {

  const defaultImage = placeholder_photo;
  const [selectedImage, setSelectedImage] = useState(defaultImage);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const imageInput = useRef(null);
  const authHeader = useAuthHeader();


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  // Reset image to default
  const handleResetImage = () => {
    setSelectedImage(defaultImage);
    imageInput.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(null);

    // Create form data object to send with the request
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      // Replace 'http://your-server-url/api/categories' with your actual API endpoint
      const response = await axios.post(api_url + '/admin/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': authHeader, // Pass token here
        },
      });

      // Handle success
      setSuccess('Category created successfully!');
      setName('');
      setDescription('');
      setImage(null);
      imageInput.current.value = "";
      setSelectedImage(defaultImage);
    } catch (err) {
      // Handle error
      setError('There was an error creating the category.');
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm mt-4 mx-4" data-v0-t="card">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Create New Category</h3>
        <p className="text-sm text-muted-foreground">Add a new category to your product catalog.</p>
      </div>
      <div className="p-6">
        <form className="grid gap-4"
          onSubmit={e => handleSubmit(e)}
        >
          <div className="grid gap-2">
            <img src={selectedImage} alt="Selected" className="rounded-md w-full max-w-[480px] max-h-[300px]
            object-cover block mx-auto
            " />
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="image">
              Category Image
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="image"
              type="file"
              ref={imageInput}
              onChange={handleImageChange}
            />
            <button
              type="button"
              className="mt-2 inline-flex items-center justify-center rounded-md text-sm font-medium bg-red-500 text-white h-8 px-3 py-1"
              onClick={handleResetImage}
            >
              Reset Image
            </button>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="name">
              Category Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="description">
              Category Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter category description"
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
            />
          </div>
          <div className="flex items-center p-6">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-500 text-green-500-foreground hover:bg-green-500/90 h-10 px-4 py-2 ml-auto"
            >
              {loading ? 'Saving...' : 'Save Category'}
            </button>
          </div>
          {error && <p className="text-red-500 font-bold text-2xl">{error}</p>}

          {
            success &&
            <div className="bg-[#12121212] flex items-center justify-center
            h-screen w-screen fixed top-0 left-0">
              <div className="bg-white p-6 h-[300px]">
                <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                  <path fill="currentColor"
                    d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                  </path>
                </svg>
                <div className="text-center">
                  <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                    Category Created
                  </h3>
                  <p className="text-gray-600 my-2">
                    {success}
                  </p>
                  <p> Have a great day!  </p>
                  <div className="py-10 text-center flex align-center justify-center gap-4">
                    <Link
                      to="/categories"
                      className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                      GO BACK
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
        </form>
      </div>
    </div>
  )
}

export default AddCategory



