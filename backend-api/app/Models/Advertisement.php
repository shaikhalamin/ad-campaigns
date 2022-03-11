<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Advertisement extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'from',
        'to',
        'total_budget',
        'daily_budget',
    ];

    public function images()
    {
        return $this->hasMany(Image::class);
    }
}
