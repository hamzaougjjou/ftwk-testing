<?php

namespace App\Http\Controllers\ADMIN;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // / Retrieve a single parameter
        $rating = $request->input('rating'); //rating

        if ($rating && is_numeric($rating)) {
            $reviews = Review::
                where("stars", $rating)
                ->paginate(15);
        } else {
            $reviews = Review::paginate(15);
        }

        return response()->json([
            "success" => true,
            "message" => 'reviews retrieved successfully',
            "reviews" => $reviews
        ], 200);
    }

    //update review visibility
    public function updateVisibility(string $id)
    {
        $review = Review::find($id);

        if (!$review) {
            return response()->json([
                "success" => false,
                "message" => 'review not found'
            ], 404);
        }

        if ($review->hide_at == null) {
            $review->hide_at = now();
        } else {
            $review->hide_at = null;
        }

        $review->save();

        return response()->json([
            "success" => true,
            "message" => 'review vsibility updated successfully',
            "review" => $review
        ], 200);

    }

}
