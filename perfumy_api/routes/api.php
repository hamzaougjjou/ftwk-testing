<?php

use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ContactController;
use App\Http\Controllers\API\NewsLetterController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\ReviewController;
use App\Http\Controllers\API\AuthController;

use App\Http\Controllers\ADMIN\AuthController as AdminAuthController;
use App\Http\Controllers\ADMIN\HomeController as AdminHomeController;
use App\Http\Controllers\ADMIN\ProductController as AdminProductController;
use App\Http\Controllers\ADMIN\CategoryController as AdminCategoryController;
use App\Http\Controllers\ADMIN\ReviewController as AdminReviewController;
use App\Http\Controllers\ADMIN\UserController as AdminUserController;
use App\Http\Controllers\ADMIN\AnlyticsController as AdminAnlyticsController;
use App\Http\Controllers\ADMIN\OrderController as AdminOrderController;
use App\Http\Controllers\ADMIN\ProfileController as AdminProfileController;

use App\Http\Controllers\API\TrackingController;
use Illuminate\Support\Facades\Route;
// use App\Http\Middleware\AdminMiddleware;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::get('/*', function () {
    return response()->json(['error' => 'Token is invalid or missing'], 401);
});


//auth urls
Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::group(
        ['middleware' => 'auth:api'],
        function () {
            Route::post('logout', 'logout');
            Route::post('login/refresh', 'refresh');
            Route::get('profile/info', 'profileInfo');
        }
    );
});

Route::controller(ProductController::class)->group(function () {
    Route::get('products', 'index');
    Route::get('collections', 'collections');
    Route::get('products/best-selling', 'bestSelling');
    Route::get('products/{id}', 'show');
    Route::get('product/random', 'showRandom');
    Route::get('product/{curent_product_id}/releted-products', 'reletedProducts');
});

Route::controller(CategoryController::class)->group(function () {
    Route::get('categories', 'index');
    Route::get('categories/{id}', 'show');
    Route::get('categories/{id}/products', 'products');
});

Route::controller(ReviewController::class)->group(function () {
    Route::get('home/reviews', 'homeReviews');
    Route::post('reviews', 'store');
    //get reviews for singlr product item
    Route::get('products/{product_is}/reviews', 'productReviews');
});
Route::controller(NewsLetterController::class)->group(function () {
    Route::post('newsletter/join', 'store');
});
Route::controller(ContactController::class)->group(function () {
    Route::post('contact', 'contact');
});

Route::controller(OrderController::class)->group(function () {
    Route::post('orders', 'store');
});

Route::controller(TrackingController::class)->group(function () {
    Route::post('tarcking', 'trackVisit');
});




// ====================================== START ADMIN ROUTES====================================================

Route::group(['prefix' => 'admin'], function () {


    Route::controller(AdminAuthController::class)->group(function () {
        Route::post('login', 'login');
        Route::group(
            ['middleware' => ['auth:api', 'admin']],
            function () {
                Route::post('logout', 'logout');
                Route::post('/refresh', 'refresh');
            }
        );
    });

    // Route::group(['middleware' => 'admin'], function () {

        Route::controller(AdminHomeController::class)->group(function () {
            Route::get('home/info', 'index');
            Route::get('home/best-selling', 'bestSellingProducts');
            Route::get('home/orders', 'orders');
            Route::get('home/users', 'users');
        });

        Route::controller(AdminProductController::class)->group(function () {
            Route::get('products', 'index');
            Route::post('products', 'store');
        });

        Route::controller(AdminCategoryController::class)->group(function () {
            Route::get('categories', 'index');
            Route::post('categories', 'store');
            Route::delete('categories/{id}', 'destroy');
            Route::get('categories/{id}', 'show');
            Route::put('categories/{id}', 'update');
        });

        Route::controller(AdminReviewController::class)->group(function () {
            Route::get('reviews', 'index');
            Route::put('reviews/{id}/update-visibility', 'updateVisibility');
        });

        Route::controller(AdminUserController::class)->group(function () {
            Route::get('users', 'index');
        });

        Route::controller(AdminAnlyticsController::class)->group(function () {
            Route::get('anlytics/users', 'users');
            Route::get('anlytics/orders', 'orders');
            Route::get('anlytics/visitors', 'visitors');
            Route::get('anlytics/visitors-by-country', 'visitorsByCounry');
            Route::get('anlytics/sales', 'sales');
        });
        
        Route::controller(AdminOrderController::class)->group(function () {
            Route::get('orders', 'index');
            Route::get('orders/{id}', 'show');
        });

        Route::controller(AdminProfileController::class)->group(function () {
            // Route to update the admin's name
            Route::put('/profile/name', 'updateName');
            // Route to update the admin's password
            Route::put('/profile/password', 'updatePassword');
        });

    // }); //'middleware' => 'admin']



});





// ====================================== END ADMIN ROUTES======================================================