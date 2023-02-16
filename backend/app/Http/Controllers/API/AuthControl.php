<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthControl extends Controller
{
    public function Create(Request $request){

        $validate = Validator::make($request->all(), [
            "email" => "email|unique:users,email",
        ]);
        
        if($validate->fails()){
            return response()->json([
                "error"=> $validate->messages(),
                
            ]);
        }
        else{
            $user = new User;

            $user->name = $request->owner;
            $user->business_name = $request->business;
            $user->email = $request->email;
            $user->contact = $request->contact;
            $user->address = $request->location;
            $user->barangay_fk = $request->address;
            $user->password = Hash::make($request->password);

            
            if($request->hasFile('file')){
                $file = $request->file('file');
                $extension = $file->getClientOriginalExtension();
                $filename = $request->business.".".$extension;
                $file->move('Uploads/file/',$filename);
                $user->file = "Uploads/file/".$filenam;
            }
            $user->save();

            return response()->json([
                "status"=>200,
                "file" =>$request->hasFile('file'),
                "message"=> "Account Created",
            ]);
        }
    }

    public function Login(Request $request){

        $validate = Validator::make($request->all(), [
            "email" => "required|email|unique:users,email",
        ]);

        if($validate->fails()){
            return response()->json([
                "error"=> $validate->messages(),
            ]);
        }
        else{

        }
    }
}
