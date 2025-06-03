<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    //
    protected $fillable = [
        'name',
        'description',
        'location',
        'start_date',
        'end_date',
        'date',
    ];
}
