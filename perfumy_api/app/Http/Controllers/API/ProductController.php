<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ResponseResource;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;
use App\Traits\FileTrait;
use Carbon\Carbon;

class ProductController extends Controller
{


    use FileTrait;
    /**
     * Display a listing of the resource.
     */


    public function index(Request $request)
    {
        // Get the 'limit' query parameter from the request
        $limit = $request->query('limit', 10); // default limit is 10 if not provided
        $filter = $request->query('filter', null); // default no filter

        if ($filter) {

            switch ($filter) {
                case 'latest':
                    # code...
                    $products = Product::latest()->paginate($limit);
                    break;
                case 'new':
                    # code...
                    $products = Product::paginate($limit);
                    break;
                case 'low_price':
                    // Retrieve products ordered by price in ascending order
                    $products = Product::orderBy('price')->paginate($limit);
                    break;
                case 'high_price':
                    // Retrieve products ordered by price in descending order
                    $products = Product::orderByDesc('price')->paginate($limit);
                    break;
                default:
                    # code...
                    $products = Product::paginate($limit);
                    break;
            }
        } else {

            $products = Product::paginate($limit);
        }


        foreach ($products as $product) {
            $product->image = $this->getFilePath($product->image_id);
            $product->time = $product->updated_at->diffForHumans();
            $product->human_readable_created_at = Carbon::parse($product->created_at)->diffForHumans();
        }
        if (!$products) {
            return ResponseResource::error('something went wrong', 500);
        }

        return ResponseResource::success($products, 'products retrieved successfully');
    }

    public function show($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return ResponseResource::error('product not found', 404);
        }

        $product->image = $this->getFilePath($product->image_id);


        $product->sub_images = [
            "https://i.pinimg.com/564x/31/17/f6/3117f65e6e8aa3eff770862933bf49b7.jpg",
            "https://i.pinimg.com/564x/4b/be/af/4bbeaf371daa5defa06d41459052bf35.jpg",
            "https://i.pinimg.com/564x/0e/24/d7/0e24d742929bab95e5fe594518506aea.jpg"

        ];
        $product->properties = [
            ["key1" => "value1"],
            ["key2" => "value2"],
            ["key3" => "value3"],
            ["key4" => "value4"],
            ["key5" => "value5"],
            ["key6" => "value6"],
            ["key7" => "value7"]
        ];

        // get review fot this product
        $reviews = Review::where("product_id", $id)->get();
        $rate_total = 0;
        $rate_count = 0;

        foreach ($reviews as $review) {
            $rate_total = $rate_total + $review->stars;
            $rate_count = $rate_count + 1;
        }

        $product->reviews = [
            "rate_avg" => $rate_count > 0 ? $rate_total / $rate_count : 5,
            "rate_count" => $rate_count,
            "details" => $reviews,
        ];

        return ResponseResource::success($product, 'products retrieved successfully');
    }

    public function showRandom()
    {
        // Fetch a single random product
        $product = Product::inRandomOrder()->first();

        // Check if a product was found
        if (!$product) {
            return ResponseResource::error('product not found', 404);
        }
        // Get the file path of the product's image
        $product->image = $this->getFilePath($product->image_id);

        // Return the product in the response
        return ResponseResource::success($product, 'product retrieved successfully');
    }



    public function collections(Request $request)
    {
        // Get the 'limit' query parameter from the request
        $limit = $request->query('limit', 10); // default limit is 10 if not provided
        $filter = $request->query('filter', null); // default no filter
        $is_collection = $request->query('is_collection', 1); // select only collections

        if ($filter) {

            switch ($filter) {
                case 'old':
                    # code...
                    $products = Product::where("is_collection", $is_collection)->latest()->paginate($limit);
                    break;
                case 'new':
                    # code...
                    $products = Product::where("is_collection", $is_collection)->paginate($limit);
                    break;
                case 'low_price':
                    // Retrieve products ordered by price in ascending order
                    $products = Product::where("is_collection", $is_collection)->orderBy('price')->paginate($limit);
                    break;
                case 'high_price':
                    // Retrieve products ordered by price in descending order
                    $products = Product::where("is_collection", $is_collection)->orderByDesc('price')->paginate($limit);
                    break;
                default:
                    # code...
                    $products = Product::where("is_collection", $is_collection)->paginate($limit);
                    break;
            }
        } else {

            $products = Product::where("is_collection", $is_collection)->paginate($limit);
        }

        if (!$products) {
            return ResponseResource::error('something went wrong', 500);
        }

        foreach ($products as $product) {
            $product->image = $this->getFilePath($product->image_id);
        }
        return ResponseResource::success($products, 'products retrieved successfully');
    }


    public function bestSelling(Request $request)
    {
        // Get the 'limit' query parameter from the request
        $limit = $request->query('limit', 10); // default limit is 10 if not provided


        $products = Product::inRandomOrder()->paginate($limit);

        if (!$products) {
            return ResponseResource::error('something went wrong', 500);
        }

        foreach ($products as $product) {
            $product->image = $this->getFilePath($product->image_id);
        }
        return ResponseResource::success($products, 'products retrieved successfully');
    }


    //get all relted products with this product
    public function reletedProducts($curent_product_id)
    {

        $products = Product::where("id", "!=", $curent_product_id)
            ->inRandomOrder()
            ->paginate(6);

        if (!$products) {
            return ResponseResource::error('something went wrong', 500);
        }

        foreach ($products as $product) {
            $product->image = $this->getFilePath($product->image_id);
        }
        
        return ResponseResource::success($products, 'products retrieved successfully');
    }


}
