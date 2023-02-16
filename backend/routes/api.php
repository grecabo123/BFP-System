<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\Barangay;
use App\Http\Controllers\API\AuthControl;

Route::get('Barangay',[Barangay::class, 'display']);

// Register
Route::post('register',[AuthControl::class, 'Create']);

// Login
Route::post('login',[AuthControl::class, 'Login']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
