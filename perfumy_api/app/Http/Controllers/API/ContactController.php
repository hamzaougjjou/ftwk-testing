<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Contact;
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
            # code...
            return response()->json([
                'success' => false,
                'errors' => $validator->errors() ,
                'error' => "invalid data sent"
            ]);
        }

        $contact = Message::create(
            [
                "name"=> $request->name,
                "email"=> $request->email,
                "message"=>$request->message,
                "phone"=> $request->phone,
                "city"=> $request->city
            ]
        );
        return response()->json( [
            'success' => true,
            "message"=> "message sent successfully"
        ]);
    }
  
}
