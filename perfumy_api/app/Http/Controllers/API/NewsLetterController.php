<?php

namespace App\Http\Controllers\API;

use App\Http\Resources\ResponseResource;
use App\Models\NewsLetter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class NewsLetterController extends Controller
{

    public function store(Request $request)
    {

        $validate = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validate->fails()) {
            return ResponseResource::error('invalid email sent' , 400 , $validate->errors() );
        }

        $emailExists = NewsLetter::where("email", "=", $request->email)->first();

        if ($emailExists != null) {
            return ResponseResource::error('email already exist', 422 );
        }

        $newsLetter = NewsLetter::create([
            'email' => $request->email,
        ]);

        if (!$newsLetter) {
            return ResponseResource::error('something went wrong', 500);
        }

        return ResponseResource::success($newsLetter, 'you joined our news letter successfylly');
    }

}
