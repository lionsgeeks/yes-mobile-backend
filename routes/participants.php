<?php

use App\Http\Controllers\ParticipantController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('participants', ParticipantController::class);
    Route::get('speakers', [ParticipantController::class, 'showCreateSpeaker']);
    Route::get('moderators', [ParticipantController::class, 'moderatorIndex']);
    Route::get('participant/export/{role}', [ParticipantController::class, 'export']);
});
