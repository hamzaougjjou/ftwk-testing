<?php

namespace App\Http\Controllers\API;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use JWTAuth;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Validator;
use DB;

class AuthController extends Controller
{

    
    public function register(Request $request)
    {
        // check if email exist in database
        $userEmailDetails = User::where('email', "=", $request->email)->first();
        if ($userEmailDetails != null) {
            return response()->json([
                'success' => false,
                'code' => -1,
                'error' => "user aleady exists",
            ]);
        }
        
            // Validate incoming request
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255|unique:users',
                'password' => 'required|string|min:6',
                'phone' => 'required|string|max:20'
            ]);
        
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors(),
                ], 422);
            }
        
            // Create user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone' => $request->phone,
                'birthday' => $request->birthday,
                'address' => $request->address,
                'gender' => $request->gender,
            ]);
        
            // Attempt to create token
            try {
                if (!$token = Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Login credentials are invalid.',
                    ], 400);
                }
            } catch (Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'Could not create token.',
                ], 500);
            }
        
            // Return successful response with token
            return response()->json([
                'success' => true,
                'message' => 'User created successfully',
                'user' => $user,
                'auth' => [
                    'token' => $token,
                    'type' => 'bearer'
                ],
            ]);
        
        // ===================================================
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

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        //valid credential
        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required|string|min:6'
        ]);
        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 403);
        }
        //Request is validated
        //Crean token
        try {
            if (!$token = Auth::attempt($credentials)) {
                return response()->json([
                    'success' => false,
                    'code' => 0,
                    'message' => 'Login credentials are invalid.'
                ], 400);
            }
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Could not create token.',
            ], 500);
        }
      
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

    public function profileInfo()
    {
        $user_id = Auth::user()->id;
        $user = DB::select("CALL user_profile_info($user_id) ");

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'error to get data'
            ], 400);
        }

        return response()->json([
            'success' => true,
            'message' => 'user info retrieved successfully',
            "user" => $user
        ], 200);
    }

    public function setLastLogin()
    {
        $auth_user = JWTAuth::user()->id;
        $user = User::find($auth_user);
        $user->last_login = time();
        if ($user->save()) {
            return response()->json([
                "success" => true,
                "message" => 'last login updated successfully'
            ], 200);
        }
        return response()->json([
            "success" => false,
            "message" => 'error to update user last login'
        ], 200);
    }

    public function changePassword(Request $request)
    {
        $auth_user = JWTAuth::user()->id;
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