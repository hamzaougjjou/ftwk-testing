<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ResponseResource;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
      //
      public function contact(Request $request ){
        $validator = Validator::make($request->all(), [
            "name"=> ["required"],    
            "email"=> ["email","required"],
            "message"=>["required","string"]
        ] );

        if ( $validator->fails() ) {
            return ResponseResource::error('invalid data sent', 422 , $validator->errors());
        }

        $contact = Message::create( 
            [
                "name"=> $request->name,
                "email"=> $request->email,
                "message"=>$request->message,
                "phone"=> $request->phone
            ]
        );

        return ResponseResource::success($contact, 'message sent successfully');
    }
  
}
