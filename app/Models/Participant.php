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

    public function interesets(){
        return $this->morphToMany(Interest::class, 'profile_interests');
    }

    public function connections(){
        return $this->belongsToMany(Participant::class, 'matches', 'participant_id', 'related_participant_id')
        ->withPivot('action');     }
    


    public function qrCodes()
    {
        return $this->hasMany(QrCode::class);
    }

    public function social()
    {
        return $this->hasOne(Social::class);
    }
    public function programs()
    {
        return $this->belongsToMany(Programe::class, 'participant_program');
    }
    public function reports(){
        return $this->hasMany(Report::class);
    }
}
