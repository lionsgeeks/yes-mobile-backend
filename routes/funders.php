<?php

use App\Http\Controllers\FunderController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('funders', FunderController::class);
    Route::get('account/show/{funder}', [FunderController::class, 'show'])->name('participant.show');
});
