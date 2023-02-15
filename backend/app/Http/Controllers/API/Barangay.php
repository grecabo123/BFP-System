<?php

namespace App\Http\Controllers\API;


use App\Models\BarangayData;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class Barangay extends Controller
{
    public function display(){
        $data = BarangayData::select('*')->orderBy('name','ASC')->get();

        return response()->json([
            "status"=>200,
            "data"=>$data,
        ]);
    }
}
