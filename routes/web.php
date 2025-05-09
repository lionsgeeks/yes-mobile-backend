<?php

use App\Http\Controllers\ProgrameController;
use App\Http\Controllers\QrCodeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');
Route::get('/linkedinpost', function () {
    return view('postlinkdein');
});
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

use App\Events\MyEvent;
use Ably\AblyRest;

Route::get('/test', function () {
    $ably = new AblyRest('lExbbw.OPqhwQ:cAV6W9IMcdzXejWqZb78-NZhDE2RisM1xKtscw7cd9s'); // Replace with your Ably API key

    $channel = $ably->channel('my-channel'); // same channel you use in front-end

    $channel->publish('my-event', ['text' => 'Hello from Laravel 👋']);

    return 'Message sent!';
});



// routes/web.php


// Manually include the routes as API routes
Route::prefix('api')->group(function () {
    Route::get('/qrcodes', [QrCodeController::class, 'index'])->name('qrcodes.index');
    Route::get('/qrcodes/create', [QrCodeController::class, 'create'])->name('qrcodes.create');
    Route::post('/qrcodes', [QrCodeController::class, 'store'])->name('qrcodes.store');
    Route::get('/programe/create', [ProgrameController::class, 'create'])->name('programe.create');
    Route::resource('programe', ProgrameController::class);
});

Route::resource('programe', ProgrameController::class);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/participants.php';
require __DIR__.'/sponsors.php';
