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
        Schema::create('store_infos', function (Blueprint $table) {
            $table->id();
            $table->longText("about")->nullable(true);
            $table->longText("facebook")->nullable(true);
            $table->longText("x")->nullable(true);
            $table->longText("instagram")->nullable(true);
            $table->longText("address")->nullable(true);
            $table->longText("location")->nullable(true);
            $table->longText("location_url")->nullable(true);
            $table->longText("working_time")->nullable(true);
            $table->text("phone")->nullable(true);
            $table->text("email")->nullable(true);
            $table->unsignedBigInteger('logo_id')->nullable();
            $table->foreign('logo_id')->references('id')->on('files');
            $table->text("whatsapp")->nullable(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('store_infos');
    }
};
