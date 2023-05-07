<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('login', LoginController::class);
    Route::apiResource('teams', TeamController::class)->middleware('auth.bearer');
});
