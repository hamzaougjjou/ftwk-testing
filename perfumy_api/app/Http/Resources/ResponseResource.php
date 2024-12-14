<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ResponseResource extends JsonResource
{
    public static function success($data, $message = null)
    {
        return response()->json([
            'success' => true,
            'data' => $data,
            'message' => $message,
        ] , 200 );
    }

    public static function error($message = "result not found", $code = 404 , $errors = [])
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors
        ], $code);
    }

    public function toArray($request)
    {
        // Default transformation logic can go here
        // You can override this method in child classes if needed
        return parent::toArray($request);
    }

}
