<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\Barangay;

Route::get('Barangay',[Barangay::class, 'display']);
Route::post('register',[AuthControl::class, 'Create']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
