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
        Schema::create('resarvations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('programe_id')->constrained()->cascadeOnUpdate();
            $table->foreignId('participant_id')->constrained()->cascadeOnUpdate();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resarvations');
    }
};
