<?php

namespace App\Imports;

use Illuminate\Support\Facades\Mail;
use App\Mail\InvitationMail;
use App\Models\General;
use App\Models\Participant;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ParticipantsImport implements ToModel, WithHeadingRow
{

    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public $role;
    public function __construct($role)
    {
        $this->role = $role;
    }
    public function model(array $row)
    {
        // dd($row);
        $password = Str::random(8);
        $participant = new Participant([
            'name' => $row['name'],
            'email' => $row['email'],
            'role' => $this->role,
            'password' => Hash::make($password),
        ]);
        $link = General::all()->first();
        if ($this->role == 'visitor' || $this->role == 'moderator') {
            Mail::to($row['email'])->send(new InvitationMail($participant->name, $participant->email, $password, $link->appstore, $link->playstore));
        }
        return $participant;
    }
}
