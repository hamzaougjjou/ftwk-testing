<?php

namespace App\Http\Controllers\ADMIN;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\File;
use Illuminate\Http\Request;
use App\Traits\FileTrait;
use Illuminate\Support\Facades\Validator;


class ProductController extends Controller
{

    use FileTrait;
    // get and search for all product
    public function index(Request $request)
    {

        // / Retrieve a single parameter
        $sort = $request->input('sort'); //asc or desc
        $category = $request->input('category'); //category id
        $price = $request->input('price'); //asc or desc
        $q = $request->input('q'); //search text

        if (!$q)
            $q = "";

        // =====================================
        if ($sort) {
            $products = Product::
                where("title", "like", "%" . $q . "%")
                ->orderBy("created_at", $sort)
                ->paginate(9);
        } else if ($price) {
            $products = Product::
                where("title", "like", "%" . $q . "%")
                ->orderBy('price', $price)
                ->paginate(9);
        } else if ($category) {
            $products = Product::
                where("title", "like", "%" . $q . "%")
                ->where('category_id', $category)
                ->paginate(9);
        } else {
            $products = Product::
                where("title", "like", "%" . $q . "%")
                ->paginate(9);
        }


        // =====================================

        // $products = Product::paginate(10);
        // $page = 1;

        foreach ($products as $product) {
            $product->image = $this->getFilePath($product->image_id);
        }

        return response()->json([
            "success" => true,
            "message" => 'products retrieved successfully',
            "products" => $products
        ], 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {



        $validator = Validator::make(
            $request->all(),
            [
                "title" => "required|string|min:2|max:250",
                "price" => "required",
                "description" => "required|string|min:2",
                "main_image" => "required"
            ]
        );



        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "error" => 'invalid data',
                "errors" => $validator->errors()
            ], 422);
        }

        $has_offer = false;
        if ($request->has_offer) {
            if ($request->has_offer === "on") {
                $has_offer = true;
            }
        }


        // Handle image upload and store the file path in the files table
        if ($request->hasFile('main_image')) {


            $file = $request->file('main_image');

            $origin_name = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $size = $file->getSize();
            // $images[] = $name;

            // $image_path = $file->store('images/products', 'public');

             // Store the file
        $fileName = time() . '_' . $request->main_image->getClientOriginalName();
            $filePath = $request->file('main_image')->storeAs('images/products', $fileName, 'public');

            // Create a new file record and get its ID
            $file_db = File::create([
                "type" => "image/" . $extension,
                "size" => $size,
                "path" => $filePath,
                "origin_name" => $origin_name,
            ]);

            $imageId = $file_db->id;
        }

        $sub_images_paths = [];
        if ($request->sub_images)
            foreach ($request->sub_images as $file) {
                $path = $file->store('images/products/sub_images', 'public');
                $sub_images_paths[] = $path;
            }

        $approuved = true;
        // $old_price = null;
        // if ($request->old_price)
        //     $old_price = $request->old_price;

        $product = Product::create(
            [
                "title" => $request->title,
                "description" => $request->description,
                "price" => $request->price,
                $request->old_price && "old_price"=>$request->old_price ,
                "has_offer" => $has_offer,
                "image_id" => $imageId ? $imageId : 1,
                "sub_images" => count($sub_images_paths)>0 ? json_encode($sub_images_paths) : null, //inset array whene contains items and null whene array is empty
                "approuved" => $approuved,
                "category_id" => $request->category_id
            ]
        );

        if (!$product) {
            return response()->json([
                "success" => false,
                "error" => 'internal server error'
            ], 500);
        }

        return response()->json([
            "success" => $file,
            "message" => 'product created successfully c',
            "product" => $product,
        ], 200);

    }


    public function saveImage($request, $name, $saving_path = "images/products")
    {

        $file = $request->file($name);

        $origin_name = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();
        $size = $file->getSize();

        $image_path = $file->store($saving_path, 'public');

        // Create a new file record and get its ID
        return [
            "type" => "image/" . $extension,
            "size" => $size,
            "path" => $image_path,
            "origin_name" => $origin_name,
        ];
    }
}
