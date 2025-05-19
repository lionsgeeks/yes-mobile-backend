<?php

use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('notifications', NotificationController::class)->except('update');
});
