<?php

namespace App\Http\Controllers\ADMIN;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        // Validate credentials
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6'
        ]);
    
        // Send failed response if validation fails
        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 403);
        }
    
        // Attempt to log the user in
        if (!$token = Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'success' => false,
                'code' => 0,
                'message' => 'Login credentials are invalid.'
            ], 400);
        }
    
        // Return successful response with token
        return response()->json([
            'success' => true,
            'status' => 'success',
            'message' => 'User login successfully',
            'user' => Auth::user(),
            'auth' => [
                'token' => $token,
                'type' => 'bearer'
            ]
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

    public function changePassword(Request $request)
    {
        $auth_user = Auth::user()->id;
        // Validate input
        $request->validate([
            'old_password' => 'required',
            'password' => 'required|min:6',
        ]);

        // Get the user by ID
        $user = User::findOrFail($auth_user);

        // Check if old password is correct
        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json([
                "success" => false,
                "message" => 'The old password is incorrect'
            ], 200);
        }

        // Update the user's password
        $user->password = bcrypt($request->password);
        // $user->password = Hash::make($request->password);
        $user->save();
        // Redirect back to the user's profile page
        return response()->json([
            "success" => true,
            "message" => 'password is updated successfully'
        ], 200);
    }


}