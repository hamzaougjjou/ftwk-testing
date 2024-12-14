<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ResponseResource;
use App\Models\Category;
use App\Models\Product;
use App\Traits\FileTrait;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    use FileTrait;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        // Get the 'limit' query parameter from the request
        $limit = $request->query('limit', 10); // default limit is 10 if not provided

        $categories = Category::limit($limit)->get();

        if (count($categories) == 0) {
            return ResponseResource::error('categories not found', 404);
        }

        foreach ($categories as $category) {
            $category->image = $this->getFilePath($category->image_id);
        }
        if (!$categories) {
            return ResponseResource::error('something went wrong', 500);
        }

        return ResponseResource::success($categories, 'categories retrieved successfully');

    }
    public function show(string $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return ResponseResource::error('category not found', 404);
        }

        $category->image = $this->getFilePath($category->image_id);

        return ResponseResource::success($category, 'category retrieved successfully');
    }



    public function products(Request $request, $id)
    {

        $category = Category::find($id);
        if (!$category) {
            return ResponseResource::error('category not found', 404);
        }


        // Get the 'limit' query parameter from the request
        $limit = $request->query('limit', 10); // default limit is 10 if not provided

        $categories = Product::where('category_id', $id)->limit($limit)->paginate(10);

        if (count($categories) == 0) {
            return ResponseResource::error('products with this categories not found', 200);
        }

        foreach ($categories as $category) {
            $category->image = $this->getFilePath($category->image_id);
        }
        if (!$categories) {
            return ResponseResource::error('something went wrong', 500);
        }

        return ResponseResource::success($categories, 'products retrieved successfully');

    }

}