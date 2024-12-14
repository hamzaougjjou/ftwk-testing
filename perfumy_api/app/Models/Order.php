<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        "total",
        "name",
        "phone",
        "city",
        "email",
        "address",
        "user_id",
        "order_status"
    ];

    /**
     * Get all of the comments for the Order
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function order_items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
