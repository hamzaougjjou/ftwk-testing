<?php

namespace App\Http\Controllers\ADMIN;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //get all users 
    public function index(Request $request)
    {
        $q = $request->input("search_query");

        if (!$q)
            $q = '';

        $users = User::where("role", 'user')
            ->where("name", 'like', "%" . $q . "%")
            ->paginate(20);

        foreach ($users as $user) {
            # code...
            $user->joined_at = $user->created_at->diffForHumans();
        }

        return response()->json([
            "success" => true,
            "message" => 'users retrieved successfully',
            "users" => $users
        ], 200);
    }
}
