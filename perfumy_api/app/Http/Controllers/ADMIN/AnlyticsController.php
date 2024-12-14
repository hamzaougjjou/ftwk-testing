<?php

namespace App\Http\Controllers\ADMIN;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use App\Models\Visitor;
use App\Models\Product;
use DB;
use Illuminate\Http\Request;

class AnlyticsController extends Controller
{
    //get users analytycs
    public function users()
    {
        $last15Days = [];

        for ($i = 0; $i < 15; $i++) {
            $date = now()->subDays($i)->format('Y-m-d');

            $last15Days[] = [
                'created_day' => $date,
                'user_count' => 0
            ];
        }

        $last15Days = array_reverse($last15Days);
        $oldestDay = $last15Days[0]["created_day"];

        $usersByDay = User::select(DB::raw('DATE(created_at) as created_day'), DB::raw('count(*) as user_count'))
            ->where('created_at', '>=', $oldestDay)
            ->groupBy('created_day')
            ->orderBy("created_at")
            ->get();


        if (!$usersByDay) {
            return response()->json([
                'success' => false,
                'error' => "something went wrong"
            ]);
        }

        $dataResult = [];

        for ($i = 0; $i < count($last15Days); $i++) {

            $inserted = false;

            for ($j = 0; $j < count($usersByDay); $j++) {
                if (
                    $last15Days[array_keys($last15Days)[$i]]["created_day"]
                    ==
                    $usersByDay[$j]["created_day"]

                    &&

                    $usersByDay[$j]["user_count"] > 0
                ) {
                    array_push($dataResult, $usersByDay[$j]);
                    $inserted = true;
                    continue;
                }

            }

            if (!$inserted) {
                array_push($dataResult, $last15Days[array_keys($last15Days)[$i]]);
            }
        }

        return response()->json([
            'success' => true,
            'message' => "users retrieved successfully",
            "users_count" => count($dataResult),
            "users_by_days" => $dataResult,
        ]);
    }
    public function booksStatics()
    {
        // =====================================
        $last15Days = [];
        for ($i = 0; $i < 15; $i++) {
            $date = now()->subDays($i)->format('Y-m-d');

            $last15Days[] = [
                'created_day' => $date,
                'user_count' => 0
            ];
        }

        // Reverse the array if you want the dates in ascending order
        $last15Days = array_reverse($last15Days);
        $oldestDay = $last15Days[0]["created_day"];


        $usersByDay = Product::select(DB::raw('DATE(created_at) as created_day'), DB::raw('count(*) as user_count'))
            ->where('created_at', '>=', $oldestDay)
            ->groupBy('created_day')
            ->orderBy("created_at")
            ->limit(15)
            ->get();


        if (!$usersByDay) {
            return response()->json([
                'success' => false,
                'error' => "something went wrong"
            ]);
        }

        $dataResult = [];

        for ($i = 0; $i < count($last15Days); $i++) {

            $inserted = false;

            for ($j = 0; $j < count($usersByDay); $j++) {
                if (
                    $last15Days[array_keys($last15Days)[$i]]["created_day"]
                    ==
                    $usersByDay[$j]["created_day"]

                    &&

                    $usersByDay[$j]["user_count"] > 0
                ) {
                    array_push($dataResult, $usersByDay[$j]);
                    $inserted = true;
                    continue;
                }
            }

            if (!$inserted) {
                array_push($dataResult, $last15Days[array_keys($last15Days)[$i]]);
            }
        }

        return response()->json([
            'success' => true,
            'message' => "users retrieved successfully",
            "users_count" => count($dataResult),
            "users_by_day" => $dataResult,
        ]);
    }



    public function ordersStatics()
    {


        $orders = Order::select(DB::raw('DISTINCT order_id, COUNT(order_id) as orders_count,
             DATE(created_at) as created_day'))
            ->where('created_at', '>=', now()->subDays(15)->toDateString())
            ->groupBy(DB::raw('DATE(created_at)'))
            ->get();


        $dataResult = [];

        //get array of last 15 days empty data
        $last15Days = [];
        for ($i = 0; $i < 15; $i++) {
            $date = now()->subDays($i)->format('Y-m-d');

            $last15Days[] = [
                'order_id' => null,
                'created_day' => $date,
                'orders_count' => 0
            ];
        }

        // Reverse the array if you want the dates in ascending order
        $last15Days = array_reverse($last15Days);
        $oldestDay = $last15Days[0]["created_day"];


        $dataResult = [];

        for ($i = 0; $i < count($last15Days); $i++) {
            $inserted = false;
            for ($j = 0; $j < count($orders); $j++) {
                if (
                    $last15Days[array_keys($last15Days)[$i]]["created_day"]
                    ==
                    $orders[$j]["created_day"]

                    &&

                    $orders[$j]["orders_count"] > 0
                ) {
                    array_push($dataResult, $orders[$j]);
                    $inserted = true;
                    // continue;
                }
            }

            if (!$inserted) {
                array_push($dataResult, $last15Days[array_keys($last15Days)[$i]]);
            }
        }

        if (!$orders) {
            return response()->json([
                'success' => false,
                'error' => "something went wrong"
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => "users retrieved successfully",
            "orders" => $dataResult,
            "orders_count" => $orders,
        ]);
    }


    public function orders()
    {



        $results = DB::select("
            SELECT order_id , 
            deleted_at ,
            shipped,
            delivered,
            confirmed
            FROM orders
            GROUP BY order_id
        ");

        // $orders = Order::
        //     latest()->
        //     groupBy('order_id')
        //     ->select(
        //         '*',
        //         DB::raw('COUNT(order_id) as items_count , deleted_at as deleted_date')
        //     )->get();


        if (!$results) {
            return response()->json([
                'success' => false,
                'error' => "something went wrong"
            ]);
        }

        $orders = [];

        foreach ($results as $result) {
            $orders[$result->order_id] = [
                'deleted_at' => $result->deleted_at,
                'shipped' => $result->shipped,
                'delivered' => $result->delivered,
                'confirmed' => $result->confirmed
            ];
        }
        // Initialize arrays for different order statuses
        $deliveredOrders = [];
        $shippedOrders = [];
        $confirmedOrders = [];
        $pendingOrders = [];
        $deletedOrders = [];

        // Iterate through orders and organize them based on status
        foreach ($orders as $order) {
            if ($order['deleted_at'] != null) {
                $order['status'] = "canceled";
                array_push($deletedOrders, $order);
            } else if ($order['delivered'] == 1) {
                $order['status'] = "delivered";
                array_push($deliveredOrders, $order);
            } elseif ($order['shipped'] == 1) {
                $order['status'] = "shipped";
                array_push($shippedOrders, $order);
            } elseif ($order['confirmed'] == 1) {
                $order['status'] = "confirmed";
                array_push($confirmedOrders, $order);
            } else {
                $order['status'] = "pending";
                array_push($pendingOrders, $order);
            }


        }


        // Output or use the arrays as needed
        $finalOrdersArray = [
            "canceled" => $deletedOrders,
            "delivered" => $deliveredOrders,
            "shipped" => $shippedOrders,
            "confirmed" => $confirmedOrders,
            "pending" => $pendingOrders,
        ];
        return response()->json([
            'success' => true,
            'message' => "orders retrieved successfully",
            "orders" => $finalOrdersArray,
        ]);
    }

    public function visitors()
    {

        $visitorsByDay = Visitor::select(DB::raw('DATE(created_at) as created_date'), DB::raw('COUNT(*) as visitors_count'))
            ->groupBy('created_date')
            ->get();


        $last15Days = [];

        for ($i = 0; $i < 15; $i++) {
            $date = now()->subDays($i)->format('Y-m-d');

            $last15Days[] = [
                'created_date' => $date,
                'visitors_count' => 0
            ];
        }
        $last15Days = array_reverse($last15Days);
        $dataResult = [];

        for ($i = 0; $i < count($last15Days); $i++) {
            $inserted = false;
            for ($j = 0; $j < count($visitorsByDay); $j++) {
                if (
                    $last15Days[$i]["created_date"]
                    ==
                    $visitorsByDay[$j]["created_date"]
                ) {
                    array_push($dataResult, $visitorsByDay[$j]);
                    $inserted = true;
                    break;
                }
            }

            if (!$inserted) {
                array_push($dataResult, $last15Days[$i]);
            }
        }


        return response()->json([
            'success' => true,
            'message' => "visitors retrieved successfully",
            "visitors" => $dataResult,
        ]);

    }
    public function visitorsByCounry()
    {

        $visitorsByCountry = DB::table('visitors')
            ->select('country', DB::raw('count(id) as visitors_count'))
            ->groupBy('country')
            ->get();


        return response()->json([
            'success' => true,
            'message' => "visitors retrieved successfully",
            "visitors" => $visitorsByCountry,
        ]);

    }

    public function sales()
    {


        $number_days = 30;
        $day_30_before = now()->subDays($number_days)->format('Y-m-d');

        $sales = Order::select(
            DB::raw('DATE(created_at) as order_date')
            ,
            DB::raw('SUM(total) as total_sales')
        )
            ->where('created_at', '>=', $day_30_before)
            ->groupBy('order_date')
            ->orderBy('order_date', 'DESC')
            ->get();

        $new_sales = [];


        # code...
        for ($i = $number_days; $i >= 0; $i--) {
            $date = now()->subDays($i)->format('Y-m-d');
            $found = false;
            foreach ($sales as $item) {
                if ($date == $item->order_date) {
                    $found = true;
                    array_push($new_sales, $item);
                    break; // Exit the foreach loop if found, no need to keep checking
                }
            }
        
            if (!$found) {
                array_push($new_sales, [
                    "order_date" => $date,
                    "total_sales" => 0
                ]);
            }

        }

        return response()->json([
            'success' => $day_30_before,
            'message' => "sales retrieved successfully",
            "sales" => $new_sales,
            "total_sales" => Order::
                where('created_at', '>=', $day_30_before)
                ->sum('total')
        ]);

    }
}
