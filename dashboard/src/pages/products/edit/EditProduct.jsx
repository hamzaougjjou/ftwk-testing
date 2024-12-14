import React from 'react'

function EditProduct() {
  return (
    <div className="rounded-lg border bg-gray-200 max-w-[1500px]
    text-card-foreground shadow-sm w-full my-12 mx-auto">

      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight
        text-green-600
        ">Add New Product</h3>
      </div>

      <div className="p-6 block md:block lg:flex gap-12 flex-wrap">
        <form className="flex-1">
          <div className="mt-[30px] grid gap-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="title"
            >
              Title
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="title"
              required=""
              type="text"
              value=""
              name="title"
            />
          </div>
          <div className="mt-[30px] grid gap-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="description"
            >
              Description
            </label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="description"
              name="description"
              required=""
            ></textarea>
          </div>
          <div className="mt-[30px] grid gap-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="price"
            >
              Price
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="price"
              required=""
              type="number"
              value=""
              name="price"
            />
          </div>
          <div className="mt-[30px] grid gap-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="image_id"
            >
              Main Image
            </label>
            {/* <UploadMainImage /> */}
          </div>
          <div className="mt-[30px] grid gap-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="category_id"
            >
              Category ID
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="category_id"
              required=""
              type="text"
              value=""
              name="category_id"
            />
          </div>
          <div className="mt-[30px] grid gap-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="old_price"
            >
              Old Price
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="old_price"
              type="number"
              value=""
              name="old_price"
            />
          </div>
          <div className="mt-[30px] grid gap-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="has_offer"
            >
              Has Offer
            </label>
            <button
              type="button"
              role="checkbox"
              aria-checked="false"
              data-state="unchecked"
              value="on"
              className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              id="has_offer"
            ></button>
            <input
              aria-hidden="true"
              tabindex="-1"
              type="checkbox"
              value="on"
              name="has_offer"

            />
          </div>
          <div className="mt-[30px] grid gap-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="sub_images"
            >
              Sub Images
            </label>
            {/* <UploadSubmages /> */}
          </div>
          <div className="mt-[30px] grid gap-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="approved"
            >
              Approved
            </label>
            <button
              type="button"
              role="checkbox"
              aria-checked="false"
              data-state="unchecked"
              value="on"
              className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              id="approved"
            ></button>
            <input
              aria-hidden="true"
              tabindex="-1"
              type="checkbox"
              value="on"
              name="approved" />
          </div>
          <div className="mt-[30px] grid gap-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="is_collection"
            >
              Is Collection
            </label>
            <button
              type="button"
              role="checkbox"
              aria-checked="false"
              data-state="unchecked"
              value="on"
              className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              id="is_collection"
            ></button>
            <input
              aria-hidden="true"
              tabindex="-1"
              type="checkbox"
              value="on"
              name="is_collection" />
          </div>
        </form>


        <button
          className="
          whitespace-nowrap rounded-md text-sm font-medium 
          ring-offset-background transition-colors focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
          disabled:pointer-events-none disabled:opacity-50 bg-green-700 
          text-primary-foreground flex-item-end
          px-4 py-2 w-[300px] h-[50px]"
          type="submit"
        >
          Add Product
        </button>

      </div>
    </div>
  )
}

export default EditProduct