<?php

use App\Http\Controllers\ParticipantController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('participants', ParticipantController::class);
});
