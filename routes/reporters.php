<?php

use App\Http\Controllers\ParticipantController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('reporters', ReportController::class);
    Route::delete('report/delete/all', [ReportController::class, 'destroyAll'])->name('report.deleteAll');
});
