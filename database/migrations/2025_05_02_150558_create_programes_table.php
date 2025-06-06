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
        Schema::create('programes', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("description");
            $table->string("start_date");
            $table->string("end_date");
            $table->string("capacity");
            $table->string("location");
            $table->string("date");
            $table->foreignId("category_id")->nullable()->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('programes');
    }
};
