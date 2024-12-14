<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StoreInfo extends Model
{
    use HasFactory;
    protected $fillable = [
        "about",
        "facebook",
        "x",
        "instagram",
        "address",
        "location",
        "location_url",
        "working_time",
        "phone",
        "email",
        "logo_id",
        "whatsapp"
    ];
}
