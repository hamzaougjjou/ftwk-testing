import React, { useRef, useState } from 'react'

function UploadMainImage( { product , setProduct } ) {
    const [image, setImage] = useState(null);
    let imageInput = useRef();

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage({ id: imageUrl, file });

            setProduct({...product , main_image:file})
        }
    };

    const removeImage = () => {
        if (image) {
            URL.revokeObjectURL(image.id);
            setImage(null);
            setProduct({...product , main_image: null })
            imageInput.current.value = '';
        }
    };

    return (
        <div className="p-4">
            <input
                type="file"
                ref={imageInput}
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-900 border
                border-gray-300 rounded-lg cursor-pointer
                bg-gray-50 focus:outline-none"
            />
            {image && (
                <div className="relative mt-4 w-fit">
                    <img
                        src={image.id}
                        alt="Uploaded"
                        className="w-24 h-24 object-cover"
                    />
                    <button
                        onClick={removeImage}
                        className="absolute top-0 right-0 bg-red-600 text-white rounded w-8 h-8"
                    >
                        &times;
                    </button>
                </div>
            )}
        </div>
    );
}

export default UploadMainImage