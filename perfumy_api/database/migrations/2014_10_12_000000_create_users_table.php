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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('role')->default("user");
            $table->string('phone')->nullable(true);
            $table->timestamp('email_verified_at')->nullable(true);
            $table->timestamp('phone_verified_at')->nullable(true);
            $table->longText('password');
            $table->softDeletes();
            $table->timestamp("disabled_at")->nullable(true);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
    
};
