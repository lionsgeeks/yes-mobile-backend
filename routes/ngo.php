<?php

use App\Http\Controllers\NgoController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('ngos', NgoController::class);
});
