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
use App\Http\Controllers\UserController;




// routes/web.php


// Manually include the routes as API routes
    Route::get('/qrcodes/create', [QrCodeController::class, 'create'])->name('qrcodes.create');
    Route::post('/qrcodes', [QrCodeController::class, 'store'])->name('qrcodes.store');
    Route::resource('programe', ProgrameController::class);

    Route::resource('programe', ProgrameController::class);
    Route::get('/programe/show/{programe}', [ProgrameController::class, 'showw']);




Route::get('/send-report', [UserController::class, 'sendReport']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/participants.php';
require __DIR__.'/sponsors.php';
require __DIR__.'/funders.php';
require __DIR__.'/ngo.php';
