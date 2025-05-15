<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class General extends Model
{


    protected $fillable = [
        'version',
        'token',
        'playstore',
        'appstore',
    ];
}
