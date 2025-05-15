<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $fillable = [
        'name',
        'participant_id',
        'time',
        'operator_system',
        'screen_name',
    ];
    public function participant()
    {
        return $this->belongsTo(Participant::class);
    }
}
