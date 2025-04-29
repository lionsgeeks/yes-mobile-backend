<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::resource("message", MessageController::class);
Route::get("conversation/{sender}/{receiver}", [MessageController::class, "conversation"]);
Route::get("chats/{userId}", [MessageController::class, "chats"]);


Route::post('/sanctum/token', [UserController::class, 'signin']);
Route::post('/getuser/token', [UserController::class, 'userinfo']);

// require __DIR__.'/message.php';
