import { useEffect, useState } from 'react';

function UploadSubmages( { product , setProduct} ) {


    //   =====================================
    const [images, setImages] = useState([]);

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map((file) => ({
            id: URL.createObjectURL(file),
            file,
        }));
        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    const removeImage = (id) => {
        setImages((prevImages) => prevImages.filter((image) => image.id !== id));
        URL.revokeObjectURL(id);
    };

    useEffect(() => {
        setProduct({
            ...product ,
            sub_images : images
        })
    }, [images])
    
    return (
        <div className="p-4">
            <input
                type="file"
                multiple
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
            <div className="flex flex-wrap mt-4">
                {images.map((image) => (
                    <div key={image.id} className="relative m-2">
                        <img
                            src={image.id}
                            alt="Uploaded"
                            className="w-24 h-24 object-cover"
                            name="sub_images[]"
                        />
                        <button
                            onClick={() => removeImage(image.id)}
                            className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
    // ?=========================================
}

export default UploadSubmages
