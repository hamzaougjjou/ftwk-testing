<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        "title",
        "description",
        "price",
        "old_price",
        "has_offer",
        "category_id",
        "sub_images",
        "image_id",
        "approuved"
    ];

}
