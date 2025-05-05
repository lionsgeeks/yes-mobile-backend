<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

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


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
