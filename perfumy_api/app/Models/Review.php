<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Review extends Model
{
    use HasFactory , SoftDeletes ;


    protected $fillable = [
        'message',
        'stars',
        'user_id',
        'name',
        'email',
        'product_id',
        'hide_at'
    ];

     // Accessor for created_at attribute
     public function getCreatedAtFormattedAttribute()
     {
         return Carbon::parse($this->attributes['created_at'])->format('F j, Y');
     }
     
}
