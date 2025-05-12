<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Interest extends Model
{
    //
    protected $fillable = [
        "name"
    ];

    public function participants(){
        return $this->morphedByMany(Participant::class, 'profile_interests');
    }
}
