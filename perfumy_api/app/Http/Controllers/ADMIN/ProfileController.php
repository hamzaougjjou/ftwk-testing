<?php
namespace App\Http\Controllers\ADMIN;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    // Update the authenticated user's name
    public function updateName(Request $request)
    {
        // Validate the new name input
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        // Get the authenticated user
        $user = Auth::user();

        // Update user's name
        $user->name = $request->input('name');
        $user->save();

        return response()->json([
            'message' => 'Name updated successfully!',
            'user' => $user
        ], 200);
    }

    // Update the authenticated user's password
    public function updatePassword(Request $request)
    {
        // Validate the password input
        $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:6',
        ]);

        $user = Auth::user();

        // Check if the current password is correct
        if (!Hash::check($request->input('current_password'), $user->password)) {
            return response()->json([
                'error' => 'Current password is incorrect.'
            ], 400);
        }

        // Update the user's password
        $user->password = Hash::make($request->input('new_password'));
        $user->save();

        return response()->json([
            'message' => 'Password updated successfully!'
        ], 200);
    }
}
