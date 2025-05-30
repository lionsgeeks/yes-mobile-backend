<?php

namespace App\Imports;

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
    public function __construct($role){
        $this->role = $role;
    }
    public function model(array $row)
    {
        // dd($row);
        $password = Hash::make(Str::random(8));
        return new Participant([
            'name' => $row['name'],
            'email' => $row['email'],
            'role' => $this->role,
            'password' => $password
        ]);
    }
}
