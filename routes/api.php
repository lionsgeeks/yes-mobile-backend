<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Ably\AblyRest;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::resource("message", MessageController::class);
Route::get("conversation/{sender}/{receiver}", [MessageController::class, "conversation"]);
Route::get("chats/{userId}", [MessageController::class, "chats"]);


Route::post('/sanctum/token', [UserController::class, 'signin']);
Route::post('/getuser/token', [UserController::class, 'userinfo']);




Route::get('/ably/auth', function (Request $request) {
    $ably = new AblyRest(env('ABLY_KEY'));

    $tokenRequest = $ably->auth->createTokenRequest([
        'clientId' => "j"
    ]);

    return response()->json($tokenRequest);
});


// require __DIR__.'/message.php';
