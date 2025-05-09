<?php

use App\Http\Controllers\SponsorController;
use Illuminate\Support\Facades\Route;





Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('sponsors', SponsorController::class);
});
