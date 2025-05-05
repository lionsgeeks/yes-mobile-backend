<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Participant extends Model
{
    use HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'password',
        'image',
        'role',
        'company',
        'country',
        'city',
        'location',
        'description',
    ];

    protected $hidden = [
        'password',
    ];


}
