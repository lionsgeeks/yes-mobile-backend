<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QrCode extends Model
{
    //
    protected $fillable = [
        'content',
        'file_path',
        "participant_id",
        "badge_id"
    ];

    public function participant()
{
    return $this->belongsTo(Participant::class);
}

}
