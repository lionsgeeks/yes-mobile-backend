<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Programe extends Model
{
    //
    protected $fillable = [
        'name',
        'description',
        'start_date',
        'end_date',
        'capacity',
        'location',
        'date',
        "category_id",
    ];
    public function participants()
    {
        return $this->belongsToMany(Participant::class, 'participant_program');
    }
    public function participantes()
    {
        return $this->belongsToMany(Participant::class, 'resarvations');
    }
}
