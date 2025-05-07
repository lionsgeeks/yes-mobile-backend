<?php

use App\Http\Controllers\ParticipantController;
use Illuminate\Support\Facades\Route;


// TODO add middleware
Route::resource('participants', ParticipantController::class);



