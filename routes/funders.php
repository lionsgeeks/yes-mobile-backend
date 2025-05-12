<?php

use App\Http\Controllers\FunderController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('funders', FunderController::class);
});
