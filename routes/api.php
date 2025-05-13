<?php

use App\Http\Controllers\Api\InvitationController;
use App\Http\Controllers\Api\RegisterNgoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MessageController;
use Ably\AblyRest;
use App\Http\Controllers\Api\InterestController;
use App\Http\Controllers\Api\ParticipantController;
use App\Http\Controllers\Api\SponsorController;
use App\Http\Controllers\ParticipantController as ControllersParticipantController;
use App\Http\Controllers\ProgrameController;
use App\Http\Controllers\QrCodeController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::resource("message", MessageController::class);
Route::get("conversation/{sender}/{receiver}", [MessageController::class, "conversation"]);
Route::get("chats/{userId}", [MessageController::class, "chats"]);
Route::get('/invitation/image',[InvitationController::class, 'shareInvitationImage']);
Route::post('/register/participant', [RegisterNgoController::class, 'register']);

Route::get('/qrcodes', [QrCodeController::class, 'index'])->name('qrcodes.index');
Route::get('/programe/create', [ProgrameController::class, 'create'])->name('programe.create');
Route::post('/programe/enrolled', [ProgrameController::class, 'enrolled'])->name('programe.enrolled');

Route::get('/qrcodes', [QrCodeController::class, 'index'])->name('qrcodes.index');
Route::get('/programe/create', [ProgrameController::class, 'create'])->name('programe.create');
Route::get('/programe/{programe}', [ProgrameController::class, 'show'])->name('programe.show');
Route::post('/programe/enrolled', [ProgrameController::class, 'enrolled'])->name('programe.enrolled');
Route::post('/programe/enrolleddelete', [ProgrameController::class, 'cancel'])->name('programe.cancel');


// TODO middleware ?
Route::post('/sanctum/token', [ParticipantController::class, 'signin']);
Route::post('/getuser/token', [ParticipantController::class, 'userinfo']);

Route::post('/participant/image/{participant}', [ParticipantController::class, 'updateImage']);

Route::put('/participant/password/{participant}', [ParticipantController::class, 'updatePassword']);
Route::put('/participant/{participant}', [ParticipantController::class, 'update']);
Route::delete('/participant/{participant}', [ParticipantController::class, 'destroy']);

Route::get('sponsors', [SponsorController::class, 'index']);
Route::get('speakers', [ParticipantController::class, 'speakers']);

Route::get('interests', [InterestController::class, 'index']);
Route::post('interest/participant/{participant}', [InterestController::class, 'participantInterests']);

Route::get('/participants', [ControllersParticipantController::class, 'sendParticipants']);
Route::post('/participants/action', [ControllersParticipantController::class, 'storeAction']);
// Route::post('/participant/logged', [ControllersParticipantController::class, 'currentParticipant']);
Route::get('/participants/matches', [ControllersParticipantController::class, 'sendMatches']);






// Route::get('/ably/auth', function (Request $request) {
//     $ably = new AblyRest(env('ABLY_KEY'));

//     $tokenRequest = $ably->auth->createTokenRequest([
//         'clientId' => "j"
//     ]);

//     return response()->json($tokenRequest);
// });


// require __DIR__.'/message.php';
