<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;


use App\Http\Resources\ResponseResource;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function homeReviews(Request $request)
    {
        // Get the 'limit' query parameter from the request
        $limit = $request->query('limit', 5); // default limit is 10 if not provided
        $reviews = Review::where("hide_at", null)
            ->orderBy("stars", 'desc')
            ->limit($limit)
            ->get(['id', 'name', 'message', 'stars', 'created_at', 'product_id', 'user_id']);

        if (!$reviews) {
            return ResponseResource::error('something went wrong', 500);
        }

        foreach ($reviews as $review) {
            # code...
            $review->created_at_formatted = $review->getCreatedAtFormattedAttribute();
        }

        return ResponseResource::success($reviews, 'products retrieved successfully');
    }




    /**
     * Display a listing of the resource.
     */
    public function index($book_id)
    {
        $reviews = Review::where("book_id", $book_id)->get();

        if (!$reviews) {
            return response()->json([
                'success' => false,
                'error' => 'something went wrong',
                'code' => 'X500'
            ], 500);
        }

        foreach ($reviews as $review) {
            # code...
            $review->user = User::find($review->user_id, ['name', 'profile_id', 'id']);
        }
        return response()->json([
            'success' => true,
            'message' => 'reviews retrieved successfully',
            "reviews" => $reviews
        ], 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //validate data
        $validator = Validator::make(
            $request->all(),
            [
                "name" => "string|required",
                "email" => "email|required",
                "message" => "string|required",
                "stars" => "integer|required",
                "product_id" => "required"
            ]
        );

        if ($validator->fails()) {
            return ResponseResource::error('something went wrong', 409, $validator->errors());
        }

        $auth = Auth::user();

        $review = Review::create([
            'message' => $request->message,
            'stars' => $request->stars,
            'name' => $request->name,
            'user_id' => $auth ? $auth->id : null,
            'product_id' => $request->product_id
        ]);

        $review->created_at_formatted = $review->getCreatedAtFormattedAttribute();

        return ResponseResource::success($review, 'review added successfully', );

    }

    /**
     * Display the specified resource.
     */

    public function show($review_id)
    {
        $reviews = Review::find($review_id);

        if (!$reviews) {
            return response()->json([
                'success' => false,
                'error' => 'revew not found',
                'code' => 'X404'
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'reviews retrieved successfully',
            "review" => $reviews
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $review_id)
    {
        $auth = Auth::user();
        $review = Review::find($review_id);
        if (!$review) {
            return response()->json([
                'success' => false,
                'error' => 'revew not found',
                'code' => 'X404'
            ]);
        }

        if ($review->user_id != $auth->id) {
            return response()->json([
                'success' => false,
                'error' => 'unautherized',
                'code' => 'X405'
            ]);
        }

        //validate data
        $validator = Validator::make(
            $request->all(),
            [
                "message" => "string|required",
                "stars" => "integer|required|min:1|max:5"
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => 'invalid data send',
                "errors" => $validator->errors()
            ], 200);
        }

        $review->message = $request->message;
        $review->stars = $request->stars;
        $review->save();

        return response()->json([
            'success' => true,
            'message' => 'review updated successfully',
            'user' => $auth,
            "review" => $review
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($review_id)
    {
        $review = Review::find($review_id);
        if (!$review) {
            return response()->json([
                'success' => false,
                'error' => 'revew not found',
                'code' => 'X404'
            ]);
        }

        if ($review->user_id != Auth::user()->id) {
            return response()->json([
                'success' => false,
                'error' => 'unautherized',
                'code' => 'X405'
            ]);
        }
        $review->delete();

        return response()->json([
            'success' => true,
            'message' => 'review deleted successfully'
        ]);
    }


    public function productReviews($product_id)
    {

        $reviews = Review::where("product_id", $product_id)
            ->orderBy("stars", 'desc')
            ->get(['id', 'name', 'message', 'stars', 'created_at', 'product_id', 'user_id']);

        if (!$reviews) {
            return ResponseResource::error('something went wrong', 500);
        }

        foreach ($reviews as $review) {
            # code...
            $review->created_at_formatted = $review->getCreatedAtFormattedAttribute();
        }

        return ResponseResource::success($reviews, 'products retrieved successfully');
    }

}
