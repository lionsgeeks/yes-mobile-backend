<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MessageController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::resource("message" , MessageController::class);
Route::get("conversation/{sender}/{receiver}" , [MessageController::class , "conversation"]);
Route::get("chats/{userId}" , [MessageController::class , "chats"]);

// require __DIR__.'/message.php';
