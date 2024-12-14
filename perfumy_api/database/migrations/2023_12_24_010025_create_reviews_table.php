<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();

            $table->integer('stars')->nullable(false)->default(5);
            $table->longText('message')->nullable(false);

            $table->text('name')->nullable(false);
            $table->text('email')->nullable();

            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users');

            $table->unsignedBigInteger('product_id')->nullable(false);
            $table->foreign('product_id')->references('id')->on('products');
        
              // Add 'deleted_at' column for soft deletes
              $table->softDeletes();

              // Add 'hide_at' column for hiding reviews
              $table->timestamp('hide_at')->nullable();
           
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
