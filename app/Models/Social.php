<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Social extends Model
{
    //
    protected $fillable = [
        "linkedin",
        "instagram",
        "website",
        "youtube",
    ];

    public function participant () {
        return $this->belongsTo(Participant::class);
    }
}
