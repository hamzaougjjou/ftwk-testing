<?php

namespace App\Http\Controllers\ADMIN;

use App\Http\Controllers\Controller;
use App\Http\Resources\ResponseResource;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{

    public function index(Request $request)
    {

        $filter = $request->input("filter");
        if ($filter) {
            $orders = Order::
                where("order_status", $filter)
                ->paginate(15);
        } else {
            $orders = Order::
                paginate(15);
        }


        foreach ($orders as $order) {
            # code...
            $order->date = $order->created_at->toDateTimeString();

        }

        return response()->json([
            "success" => true,
            "message" => 'orders retrieved successfully',
            "orders" => $orders
        ], 200);
    }


    public function show($id)
    {

        $order = Order::find($id);
        if (!$order)
            return ResponseResource::error("ordernot found", 404);
        $order->date = $order->created_at->toDateTimeString();
        $order->order_items;

        return ResponseResource::success(
            $order,
            "order retrieved successfully"
        );

    }
}
