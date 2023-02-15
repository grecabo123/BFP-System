<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BarangayData extends Model
{
    use HasFactory;

    protected $table = 'address';

    protected $fillable = [
        "barangay_id",
        "Barangay_list",
        "Latitude",
        "Long",
    ];
}
