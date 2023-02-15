<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthControl extends Controller
{
    public function Create(Request $request){
        $user = new User;
    }
}
