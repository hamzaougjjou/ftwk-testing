<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Visitor;
use Illuminate\Http\Request;
use Stevebauman\Location\Facades\Location;

class TrackingController extends Controller
{
    //

    public function trackVisit(Request $request)
    {
        $ipAddress = $request->ip();

        // Get the location information based on the IP address
        $currentUserInfo = Location::get($ipAddress);

        $visitorData = [
            'ip_address' => $ipAddress,
            'user_agent' => $request->userAgent(),
            'visited_url' => $request->url(),
            'country' => $currentUserInfo->countryName ?? null,
            'city' => $currentUserInfo->cityName ??  null,
        ];

        // Store visitor data
        Visitor::create($visitorData);

        return response()->json([
            'message' => 'Visit tracked successfully',
            'ipAddress' => $ipAddress,
            'currentUserInfo' => $currentUserInfo

        ]);

    }
}
