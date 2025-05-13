<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $fillabe = [
        'name',
        'user_id',
        'device_name',
        'time',
        'operator_system',
        'screen_name',
    ];
}
