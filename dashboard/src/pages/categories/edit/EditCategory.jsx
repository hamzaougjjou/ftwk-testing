import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';
import useAxiosFetch from '../../../utils/useFetch';
import { api_url } from '../../../utils/Vars';
import placeholder_photo from "./../../../assets/placeholder_photo.png"
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

function EditCategory() {

  const defaultImage = placeholder_photo;
  const { id } = useParams();
  const imageInput = useRef(null);

  const [category, setCategory] = useState({});
  const [selectedImage, setSelectedImage] = useState(defaultImage);

  const [image, setImage] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState(null);
  const [success, setSuccess] = useState(null);

  const authHeader = useAuthHeader();
  
  let { data, loading, error } = useAxiosFetch("/admin/categories/" + id);

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

    setEditLoading(true);
    setEditError(null);
    setSuccess(null);






    try {
      // Create form data object to send with the request
      let formData = new FormData();
      formData.append("name", category.name);
      formData.append("description", category.description);
      if (image) {
        formData.append("image", image);
      }

      // Make the Axios request to update the category
      const response = await axios.put(`${api_url}/admin/categories/${id}`, formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': authHeader, // Pass token here
          },
        }
      );

      // Handle success
      console.log('Category updated successfully', response.data);
      // Handle success
      setSuccess('Category updated successfully!');
      imageInput.current.value = "";
    } catch (err) {
      // Handle error
      setEditError('There was an error update the category.');
      alert(err)
    } finally {
      setEditLoading(false);
    }

  };



  useEffect(() => {
    if (!loading) {
      setCategory(data.category);
      if (data.category.image)
        setSelectedImage(data.category.image);
    }
  }, [data])

  console.log('====================================');
  console.log(category);
  console.log('====================================');

  if (loading) {
    return (
      <div className='w-full h-[60vh] flex align-center justify-center'>
        <Loading
          width={10}
          height={10}
        />
      </div>
    )
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm mt-4 mx-4" data-v0-t="card">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Update Category</h3>
        <p className="text-sm text-muted-foreground"></p>
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
              defaultValue={category.name}
              onChange={(e) => setCategory({ ...category, name: e.target.value })}
              placeholder="Enter category name"
              className="flex h-10 w-full rounded-md border border-input bg-background
                          px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent 
                          file:text-sm file:font-medium placeholder:text-muted-foreground 
                          focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 
                          disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="description">
              Category Description
            </label>
            <textarea
              id="description"
              placeholder="Enter category description"
              className="flex w-full rounded-md border border-input
              bg-background px-3 py-2 text-sm ring-offset-background
              placeholder:text-muted-foreground focus-visible:outline-none
              focus-visible:ring-ring focus-visible:ring-offset-2
              disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
              defaultValue={category.description}
              onChange={(e) => setCategory({ ...category, description: e.target.value })}
            />
          </div>
          <div className="flex items-center p-6">
            <button
              type="submit"
              disabled={editLoading}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-500 text-green-500-foreground hover:bg-green-500/90 h-10 px-4 py-2 ml-auto"
            >

              {editLoading ? 'Upadting...' : 'update Category '}

            </button>
          </div>
          {
            editError && <p className="font-lg text-red-500">{error}</p>
          }
          {
            success && <p className="font-lg text-green-500">{success}</p>
          }
        </form>
      </div>
    </div>
  )
}

export default EditCategory