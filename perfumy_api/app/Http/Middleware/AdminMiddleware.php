<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        // return response()->json(['error' => 'Token is invalid or missing'], 401);
        
        try {
            // Get the authenticated user from the JWT token
            $user = Auth::user();
            // Check if the user's role is 'admin'
            if ( !$user || $user->role !== 'admin') {
                return response()->json(['error' => 'Unauthorized. Admins only'], 403);
            }

        } catch (Exception $e) {
            return response()->json(['error' => 'Token is invalid or missing'], 401);
        }

       
 
        return $next($request);
    }
}
