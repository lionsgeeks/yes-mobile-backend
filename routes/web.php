<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\GeneralController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProgrameController;
use App\Http\Controllers\QrCodeController;
use App\Models\General;
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

    Route::get('/general/info/table', function () {
        $general = General::find(1);
        return Inertia::render('general/index', [
            'general' => $general
        ]);
    });
    Route::post('general', [GeneralController::class, 'update'])->name('general.update');
});

Route::get('/clearSubscribers', [NotificationController::class, 'clearSubscribers'])->middleware(['auth', 'verified']);





// routes/web.php


// Manually include the routes as API routes
Route::get('/qrcodes/create', [QrCodeController::class, 'create'])->name('qrcodes.create');
Route::post('/qrcodes', [QrCodeController::class, 'store'])->name('qrcodes.store');
Route::resource('programe', ProgrameController::class);

Route::resource('programe', ProgrameController::class);
Route::get('/programe/show/{programe}', [ProgrameController::class, 'showw']);



Route::get('/send-report', [UserController::class, 'sendReport']);

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/participants.php';
require __DIR__ . '/sponsors.php';
require __DIR__ . '/funders.php';
require __DIR__ . '/ngo.php';
require __DIR__ . '/reporters.php';
require __DIR__ . '/notifications.php';
