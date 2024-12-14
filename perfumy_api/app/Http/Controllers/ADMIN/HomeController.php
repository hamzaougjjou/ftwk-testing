<?php

namespace App\Http\Controllers\ADMIN;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use App\Traits\FileTrait;

class HomeController extends Controller
{


    use FileTrait;
    //heading info in dashboard home page
    public function index()
    {
        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;

        $orders = Order::
            whereMonth('created_at', $currentMonth)
            ->whereYear('created_at', $currentYear);

        $total_sales = $orders->sum('total');
        $orders_count = $orders->count();

        $usersCount = User::where('role', 'user')
            ->whereMonth('created_at', $currentMonth)
            ->whereYear('created_at', $currentYear)
            ->count();

        return response()->json([
            "success" => true,
            "message" => 'data retrieved successfully',
            "data" => [
                "total_sales" => $total_sales,
                "users" => $usersCount,
                "order_avg" => $orders_count > 0 ? $total_sales / $orders_count : 0,

                "orders" => [

                    "all" => $orders->count(),

                    "pending" => $orders->where("order_status", "pending")->count(),
                    "shipped" => $orders->where("order_status", "shipped")->count(),
                    "confirmed" => $orders->where("order_status", "confirmed")->count(),
                    "delivered" => $orders->where("order_status", "delivered")->count(),
                    "returned" => $orders->where("order_status", "returned")->count(),
                    "canceled" => $orders->where("order_status", "canceled")->count(),
                    "failed" => $orders->where("order_status", "failed")->count()
                ],
            ]
        ], 200);

    }


    public function bestSellingProducts()
    {
        $products_high_ordered = Product::select('products.id')
            ->join('order_items', 'order_items.product_id', '=', 'products.id')
            ->selectRaw('SUM(order_items.quantity) as total_sold')
            ->groupBy('products.id')
            ->orderBy('total_sold', 'desc')
            ->get();


        // Step 1: Extract the product IDs
        $product_ids = $products_high_ordered->pluck('id');

        $bestSellingProducts = Product::whereIn('id', $product_ids)->get();

        foreach ($bestSellingProducts as $product) {
            $product->image = $this->getFilePath($product->image_id);
            $sales = 0;
            $revenue = 0;

            $orderItems = OrderItem::where('product_id', $product->id)->get();

            $sales = $orderItems->sum('quantity');
            $revenue = $orderItems->sum(function ($orderItem) {
                return $orderItem->quantity * $orderItem->price;
            });

            $product->sales = [
                "totale_sales" => $sales,
                "revenue" => $revenue
            ];
        }

        // Use reverse() method to reverse the collection
        // $bestSellingProducts = $bestSellingProducts->reverse();

        return response()->json([
            "success" => true,
            "message" => 'products retrieved successfully',
            "products" => $bestSellingProducts->values() // Ensure collection is indexed by numbers

        ], 200);
    }


    public function orders()
    {

        $orders = Order::
            latest()
            ->limit(6)
            ->get();

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




    public function users()
    {
        $users = User::where("role", 'user')
            ->latest()
            ->limit(6)
            ->get();

        foreach ($users as $user) {
            # code...
            $user->joined_at = $user->created_at->diffForHumans();
        }

        return response()->json([
            "success" => true,
            "message" => 'users retrieved successfully',
            "users" => $users
        ], 200);
    }

}
