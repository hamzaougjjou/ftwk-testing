<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ResponseResource;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{

    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                "name" => "required|string",
                "address" => "required|string",
                "city" => "required|string",
                "email" => "required|email",
                "phone" => "required",
            ]
        );

        if ($validator->fails()) {
            return ResponseResource::error('invalid data sent', 409, $validator->errors());
        }


        // Your string representation of JSON array
        $cart = $request->cart;

        // Decode the JSON string into a PHP array
        $arrayCart = json_decode($cart, true);

        // Print the resulting PHP array
        // dd($cart);
        // dd($arrayCart[0]['id']);


        $total = 0;
        foreach ($arrayCart as $item) {
            $total = $total + ($item["quantity"] * $item["price"]);
        }


        $order = Order::create([
            "name" => $request->name,
            "phone" => $request->phone,
            "city" => $request->city,
            "email" => $request->email,
            "user_id" => Auth::user() ? Auth::id() : null,
            "total" => $total,
            "address" => $request->address
            //order_status id 'pending' by default
        ]);

        if (!$order)
            return ResponseResource::error("order not created", 500);

        foreach ($arrayCart as $item) {
            $order_item = OrderItem::create([
                "quantity" => $item["quantity"],
                "price" => $item["price"],
                "product_id" => $item["id"],
                "order_id" => $order->id
            ]);

            if (!$order_item) {
                OrderItem::where("order_id", $order->id)->delete();
                Order::find($order->id)
                    ->delete();
                return ResponseResource::error("order not created .", 500);
            }
        }

        return ResponseResource::success("order created successfully");

    }
}