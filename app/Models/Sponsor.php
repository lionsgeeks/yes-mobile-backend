<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sponsor extends Model
{
    protected $fillable = [
        'name',
        'image',
        'website',
        'description',
        'type',
        'rank',
    ];
}
