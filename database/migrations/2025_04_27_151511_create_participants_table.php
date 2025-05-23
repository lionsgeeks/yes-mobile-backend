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
        Schema::create('participants', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("email")->unique();
            $table->string("password");
            $table->string("image")->default("images/participants/avatar.png");
            $table->string("role")->default("visitor");
            $table->string("company")->nullable();
            $table->string("country")->nullable();
            $table->string("city")->nullable();
            $table->string("location")->nullable();
            $table->text("description")->nullable();
            $table->string('expoToken')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('participants');
    }
};
